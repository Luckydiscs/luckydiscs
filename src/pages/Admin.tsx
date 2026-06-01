import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Package, Boxes, FileText, LogOut, Save, Trash2 } from "lucide-react";

const PW_KEY = "luckydiscs-admin-pw";

async function adminCall(password: string, action: string, payload: Record<string, unknown> = {}) {
  const { data, error } = await supabase.functions.invoke("admin-api", {
    body: { action, ...payload },
    headers: { "x-admin-password": password },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data;
}

const fmt = (cents: number) => (cents / 100).toFixed(2).replace(".", ",") + " €";

type Tab = "orders" | "inventory" | "blog";

const Admin = () => {
  const [password, setPassword] = useState<string>(() => localStorage.getItem(PW_KEY) ?? "");
  const [authed, setAuthed] = useState(false);
  const [loginPw, setLoginPw] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [tab, setTab] = useState<Tab>("orders");

  const login = async () => {
    setLoginErr("");
    try {
      await adminCall(loginPw, "list_orders");
      localStorage.setItem(PW_KEY, loginPw);
      setPassword(loginPw);
      setAuthed(true);
    } catch {
      setLoginErr("Väärä salasana");
    }
  };

  // auto-login jos tallennettu salasana toimii
  useEffect(() => {
    if (!password) return;
    adminCall(password, "list_orders")
      .then(() => setAuthed(true))
      .catch(() => localStorage.removeItem(PW_KEY));
  }, []); // eslint-disable-line

  const logout = () => {
    localStorage.removeItem(PW_KEY);
    setPassword("");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-1">Lucky Discs Admin</h1>
          <p className="text-sm text-gray-400 mb-6">Kirjaudu hallintapaneeliin</p>
          <Input
            type="password"
            placeholder="Salasana"
            value={loginPw}
            onChange={(e) => setLoginPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="bg-gray-900 border-gray-700 text-white mb-3"
          />
          {loginErr && <p className="text-red-400 text-sm mb-3">{loginErr}</p>}
          <Button onClick={login} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
            Kirjaudu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 sticky top-0 bg-[#0a0a0a]/95 backdrop-blur z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Lucky Discs Admin</h1>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Kirjaudu ulos
          </button>
        </div>
        <div className="container mx-auto px-4 flex gap-1">
          {([
            ["orders", "Tilaukset", Package],
            ["inventory", "Varasto", Boxes],
            ["blog", "Blogi", FileText],
          ] as [Tab, string, typeof Package][]).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                tab === key ? "border-emerald-400 text-emerald-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {tab === "orders" && <OrdersTab password={password} />}
        {tab === "inventory" && <InventoryTab password={password} />}
        {tab === "blog" && <BlogTab password={password} />}
      </main>
    </div>
  );
};

// ── TILAUKSET ──
const OrdersTab = ({ password }: { password: string }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    adminCall(password, "list_orders").then((d) => { setOrders(d.orders ?? []); setLoading(false); });
  }, [password]);
  useEffect(() => load(), [load]);

  const setStatus = async (orderId: string, status: string, trackingNumber?: string) => {
    await adminCall(password, "update_order_status", { orderId, status, trackingNumber });
    load();
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />;
  if (!orders.length) return <p className="text-gray-500">Ei tilauksia vielä.</p>;

  const statusColor: Record<string, string> = {
    pending: "text-yellow-400", paid: "text-emerald-400", shipped: "text-blue-400",
    failed: "text-red-400", cancelled: "text-gray-500", refunded: "text-purple-400",
  };

  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <div key={o.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div>
              <span className="font-mono font-bold text-emerald-400">{o.order_number}</span>
              <span className={`ml-3 text-sm font-medium ${statusColor[o.status] ?? ""}`}>{o.status.toUpperCase()}</span>
              <span className="ml-3 text-xs text-gray-500">{new Date(o.created_at).toLocaleString("fi-FI")}</span>
            </div>
            <span className="font-bold">{fmt(o.total_cents)}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="text-gray-300">
              <div className="font-medium">{o.customer_first_name} {o.customer_last_name}</div>
              <div className="text-gray-400">{o.customer_email} · {o.customer_phone}</div>
              <div className="text-gray-400">{o.shipping_address}, {o.shipping_postal_code} {o.shipping_city}</div>
            </div>
            <div className="text-gray-400">
              {(o.items ?? []).map((it: any, i: number) => (
                <div key={i}>{it.quantity}× {it.product_name}{it.variant ? ` ${it.variant}` : ""}{it.color ? ` · ${it.color}` : ""}{it.weight ? ` · ${it.weight}` : ""}</div>
              ))}
            </div>
          </div>
          {o.status === "paid" && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/10">
              <Input placeholder="Seurantanumero (Posti)" defaultValue={o.tracking_number ?? ""}
                id={`tn-${o.id}`} className="bg-gray-900 border-gray-700 text-white text-sm max-w-xs h-9" />
              <Button size="sm" className="bg-blue-500 hover:bg-blue-400 text-white"
                onClick={() => setStatus(o.id, "shipped", (document.getElementById(`tn-${o.id}`) as HTMLInputElement)?.value)}>
                Merkitse lähetetyksi
              </Button>
            </div>
          )}
          {o.status === "shipped" && o.tracking_number && (
            <div className="mt-3 pt-3 border-t border-white/10 text-sm text-blue-300">Lähetetty · seuranta: {o.tracking_number}</div>
          )}
        </div>
      ))}
    </div>
  );
};

// ── VARASTO ──
const InventoryTab = ({ password }: { password: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminCall(password, "list_products").then((d) => {
      setProducts(d.products ?? []); setVariants(d.variants ?? []); setLoading(false);
    });
  }, [password]);
  useEffect(() => load(), [load]);

  const saveStock = async (variantId: string, stock: string) => {
    await adminCall(password, "update_stock", { variantId, stock });
    setSaved(variantId);
    setTimeout(() => setSaved(null), 1500);
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />;

  return (
    <div className="space-y-6">
      {products.map((p) => {
        const vs = variants.filter((v) => v.product_id === p.id);
        return (
          <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">{p.name}{p.variant ? ` ${p.variant}` : ""}</h3>
              <span className="text-sm text-emerald-400">{fmt(p.price_cents)}</span>
            </div>
            {vs.length === 0 ? (
              <p className="text-xs text-gray-500">Ei variantteja (yksinkertainen tuote)</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {vs.map((v) => (
                  <div key={v.id} className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-2">
                    <span className="text-sm flex-1">{v.color} · {v.weight}</span>
                    <Input type="number" min={0} defaultValue={v.stock}
                      onBlur={(e) => saveStock(v.id, e.target.value)}
                      className="bg-gray-900 border-gray-700 text-white w-20 h-8 text-sm" />
                    {saved === v.id && <span className="text-emerald-400 text-xs">✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <p className="text-xs text-gray-500">Muutos tallentuu automaattisesti kun klikkaat pois kentästä.</p>
    </div>
  );
};

// ── BLOGI ──
const emptyPost = {
  slug: "", title: "", description: "", content: "", category: "Markkina-analyysi",
  keywords: "", reading_time: 5, author: "Lucky Discs",
  hero_image: "/images/brand/blog-golf-course-green.webp", hero_alt: "", published: false,
};

const BlogTab = ({ password }: { password: string }) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminCall(password, "list_blogs").then((d) => { setBlogs(d.blogs ?? []); setLoading(false); });
  }, [password]);
  useEffect(() => load(), [load]);

  const save = async () => {
    await adminCall(password, "save_blog", { post: editing });
    setEditing(null); load();
  };
  const toggle = async (slug: string, published: boolean) => {
    await adminCall(password, "toggle_blog", { slug, published: !published }); load();
  };
  const del = async (slug: string) => {
    if (!confirm("Poistetaanko artikkeli?")) return;
    await adminCall(password, "delete_blog", { slug }); load();
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />;

  if (editing) {
    return (
      <div className="max-w-3xl space-y-3">
        <h3 className="text-lg font-bold mb-2">{editing._isNew ? "Uusi artikkeli" : "Muokkaa"}</h3>
        {[
          ["slug", "Slug (URL)"], ["title", "Otsikko"], ["description", "Kuvaus"],
          ["category", "Kategoria"], ["keywords", "Avainsanat"], ["hero_image", "Hero-kuva URL"], ["hero_alt", "Hero alt-teksti"],
        ].map(([k, label]) => (
          <div key={k}>
            <label className="text-xs text-gray-400">{label}</label>
            <Input value={editing[k] ?? ""} onChange={(e) => setEditing({ ...editing, [k]: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white" />
          </div>
        ))}
        <div>
          <label className="text-xs text-gray-400">Lukuaika (min)</label>
          <Input type="number" value={editing.reading_time ?? 5}
            onChange={(e) => setEditing({ ...editing, reading_time: parseInt(e.target.value, 10) || 5 })}
            className="bg-gray-900 border-gray-700 text-white w-24" />
        </div>
        <div>
          <label className="text-xs text-gray-400">Sisältö (markdown — ## otsikot, kappaleet tyhjällä rivillä)</label>
          <textarea value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })}
            rows={16} className="w-full bg-gray-900 border border-gray-700 rounded-md text-white p-3 text-sm font-mono" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!editing.published}
            onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
          Julkaistu
        </label>
        <div className="flex gap-2">
          <Button onClick={save} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
            <Save className="w-4 h-4 mr-1" /> Tallenna
          </Button>
          <Button onClick={() => setEditing(null)} variant="outline" className="border-gray-600 text-gray-300">Peruuta</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button onClick={() => setEditing({ ...emptyPost, _isNew: true })} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
        + Uusi artikkeli
      </Button>
      {blogs.map((b) => (
        <div key={b.slug} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-medium truncate">{b.title}</div>
            <div className="text-xs text-gray-500">{b.slug} · {b.published ? `julkaistu ${b.published_at ?? ""}` : "luonnos"}</div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300"
              onClick={() => toggle(b.slug, b.published)}>
              {b.published ? "Piilota" : "Julkaise"}
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300" onClick={() => setEditing(b)}>Muokkaa</Button>
            <Button size="sm" variant="outline" className="border-red-900 text-red-400" onClick={() => del(b.slug)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
