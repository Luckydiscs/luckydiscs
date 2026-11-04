import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

// Blogin sisältö on kevyttä markdownia: kappaleet tyhjällä rivillä erotettuina.
// Tuetut merkinnät (portti scripts/check-blog.mjs tarkistaa, ettei muuta käytetä):
//   ## otsikko · ### otsikko · ![alt](url) omalla rivillään
//   - luettelo · 1. numeroitu luettelo
//   **lihavointi** · [teksti](/sisainen-polku) · [teksti](https://ulkoinen)
// HTML:ää ei renderöidä koskaan: kaikki teksti kulkee Reactin kautta.

export type Block =
  | { kind: "h2" | "h3" | "p"; text: string }
  | { kind: "img"; alt: string; src: string }
  | { kind: "ul" | "ol"; items: string[] };

const UL = /^\s*[-*] +/;
const OL = /^\s*\d+[.)] +/;

export function parseBlocks(content: string): Block[] {
  return content
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p): Block => {
      if (p.startsWith("### ")) return { kind: "h3", text: p.slice(4) };
      if (p.startsWith("## ")) return { kind: "h2", text: p.slice(3) };
      const img = p.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (img) return { kind: "img", alt: img[1], src: img[2] };
      const lines = p.split("\n");
      if (lines.every((l) => UL.test(l))) return { kind: "ul", items: lines.map((l) => l.replace(UL, "")) };
      if (lines.every((l) => OL.test(l))) return { kind: "ol", items: lines.map((l) => l.replace(OL, "")) };
      return { kind: "p", text: p };
    });
}

const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function renderInline(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(<strong key={key++} className="font-semibold text-white">{renderInline(m[1])}</strong>);
    } else {
      const [label, href] = [m[2], m[3]];
      const cls = "text-lucky-green underline underline-offset-2 hover:text-white";
      out.push(
        href.startsWith("/") ? (
          <Link key={key++} to={href} className={cls}>{label}</Link>
        ) : /^https?:\/\//.test(href) ? (
          <a key={key++} href={href} target="_blank" rel="noopener" className={cls}>{label}</a>
        ) : (
          <Fragment key={key++}>{m[0]}</Fragment>
        ),
      );
    }
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length === 1 ? out[0] : out;
}
