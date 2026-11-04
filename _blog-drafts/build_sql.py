"""Kokoaa blogin tuontitiedoston (SQL) kahdesta kansiosta:

  _blog-drafts/valmiit/*.md   uudet artikkelit  -> INSERT, published=false (julkaisu hallinnan Julkaise-napista)
  _blog-drafts/korjatut/*.md  julkaistujen korjaukset (sama slug) -> UPDATE, julkaisutila ja -päivä ennallaan

Otsakelohko: slug, language, pair, title, description, category, keywords, reading_time, hero_image, hero_alt.

🔴 Aja ensin portti: node scripts/check-blog.mjs (vihreä).
🔴 Sisältö käyttää lihavointia, linkkejä ja luetteloita (src/lib/blogMarkup.tsx). Tuo SQL vasta, kun
   se koodi on luckydiscs.fi:ssä livenä, muuten merkinnät näkyvät lukijalle raakoina. Tarkistus:
   python _blog-drafts/build_sql.py --tarkista-live
Käyttö: python _blog-drafts/build_sql.py > supabase/migrations/<aikaleima>_blog_paivitys.sql
"""
import pathlib
import re
import sys
import urllib.request

sys.stdout.reconfigure(encoding="utf-8", newline="\n")  # Windowsin konsoli on muuten cp1252
BASE = pathlib.Path(__file__).parent
INSERT_KENTAT = ["slug", "title", "description", "content", "category", "keywords",
                 "reading_time", "author", "hero_image", "hero_alt", "published", "language"]
UPDATE_KENTAT = ["title", "description", "content", "category", "keywords",
                 "reading_time", "hero_image", "hero_alt"]


def live_tukee_merkintoja():
    """Etsii livenä olevasta JS-paketista blogMarkup.tsx:n luettelotyylin."""
    # Blogisivu on oma laiskasti ladattava paketti (BlogPost-*.js), johon pääpaketti viittaa.
    get = lambda u: urllib.request.urlopen("https://www.luckydiscs.fi" + u, timeout=20).read().decode("utf-8", "replace")
    for src in re.findall(r'src="(/assets/[^"]+\.js)"', get("/")):
        for chunk in set(re.findall(r'assets/(BlogPost-[\w-]+\.js)', get(src))):
            if "marker:text-lucky-green" in get("/assets/" + chunk):
                return True
    return False


def lue(polku):
    teksti = polku.read_text(encoding="utf-8").replace("\r\n", "\n")
    m = re.match(r"---\n(.*?)\n---\n(.*)", teksti, re.S)
    if not m:
        sys.exit(f"{polku.name}: otsakelohko puuttuu")
    meta = {}
    for rivi in m.group(1).splitlines():
        if rivi.strip():
            k, v = rivi.split(": ", 1)
            meta[k] = v
    meta["content"] = m.group(2).strip()
    meta["author"] = "Lucky Discs"
    meta["published"] = "false"
    return meta


def arvo(k, v):
    if k == "reading_time":
        return str(int(v))
    if k == "published":
        return v
    if "$lv$" in v:
        sys.exit("teksti sisältää lainausmerkkiparin $lv$")
    return "$lv$" + v + "$lv$"


if "--tarkista-live" in sys.argv:
    ok = live_tukee_merkintoja()
    print("✓ luckydiscs.fi renderöi lihavoinnit, linkit ja luettelot" if ok
          else "✗ luckydiscs.fi:n live-koodi ei vielä tunne merkintöjä: älä tuo SQL:ää")
    sys.exit(0 if ok else 1)

uudet = [lue(p) for p in sorted((BASE / "valmiit").glob("*.md"))]
korjatut = [lue(p) for p in sorted((BASE / "korjatut").glob("*.md"))]
if not uudet and not korjatut:
    sys.exit("ei artikkeleita")

print("-- Lucky Discs -blogi. Generoitu: _blog-drafts/build_sql.py. Portti: node scripts/check-blog.mjs")
print("begin;")
if uudet:
    print(f"-- {len(uudet)} uutta artikkelia piilotettuina")
    print(f"insert into public.blog_posts ({', '.join(INSERT_KENTAT)}) values")
    print(",\n".join("  (" + ", ".join(arvo(k, r[k]) for k in INSERT_KENTAT) + ")" for r in uudet))
    print("on conflict (slug) do nothing;")
for r in korjatut:
    sets = ", ".join(f"{k} = {arvo(k, r[k])}" for k in UPDATE_KENTAT)
    print(f"update public.blog_posts set {sets}, updated_at = now() where slug = {arvo('slug', r['slug'])} and language = '{r['language']}';")
print("commit;")
