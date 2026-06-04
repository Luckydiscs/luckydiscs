import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Loader2, Package, Boxes, FileText, LogOut, Save, Trash2,
  Minus, Plus, Pencil, Upload, CheckCircle2, Clock, XCircle, Truck,
} from "lucide-react";

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

async function uploadImage(password: string, file: File): Promise<string> {
  const dataBase64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const d = await adminCall(password, "upload_image", {
    filename: file.name, dataBase64, contentType: file.type,
  });
  return d.url as string;
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

// ════════════════════════════ TILAUKSET ════════════════════════════
const STATUS_META: Record<string, { label: string; cls: string; Icon: typeof CheckCircle2; banner: string }> = {
  paid: { label: "MAKSU VAHVISTETTU — toimita tilaus", cls: "text-emerald-400", Icon: CheckCircle2, banner: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300" },
  pending: { label: "MAKSUA EI VAHVISTETTU — älä toimita", cls: "text-yellow-400", Icon: Clock, banner: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300" },
  failed: { label: "MAKSU EPÄONNISTUI — ei aito tilaus", cls: "text-red-400", Icon: XCircle, banner: "bg-red-500/10 border-red-500/30 text-red-300" },
  shipped: { label: "LÄHETETTY", cls: "text-blue-400", Icon: Truck, banner: "bg-blue-500/10 border-blue-500/30 text-blue-300" },
  cancelled: { label: "PERUUTETTU", cls: "text-gray-500", Icon: XCircle, banner: "bg-white/5 border-white/10 text-gray-400" },
  refunded: { label: "HYVITETTY", cls: "text-purple-400", Icon: XCircle, banner: "bg-purple-500/10 border-purple-500/30 text-purple-300" },
};

const OrdersTab = ({ password }: { password: string }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    adminCall(password, "list_orders").then((d) => { setOrders(d.orders ?? []); setLoading(false); });
  }, [password]);
  useEffect(() => load(), [load]);

  const setStatus = async (orderId: string, status: string, trackingNumber?: string) => {
    await adminCall(password, "update_order_status", { orderId, status, trackingNumber });
    load();
  };
  const del = async (orderId: string, num: string) => {
    if (!confirm(`Poistetaanko tilaus ${num} pysyvästi? Tätä ei voi perua.`)) return;
    await adminCall(password, "delete_order", { orderId });
    load();
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />;
  if (!orders.length) return <p className="text-gray-500">Ei tilauksia vielä.</p>;

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500">
        Toimita vain <span className="text-emerald-400 font-medium">maksu vahvistettu</span> -tilaukset. Muut ovat keskeneräisiä tai epäonnistuneita maksuyrityksiä.
      </p>
      {orders.map((o) => {
        const meta = STATUS_META[o.status] ?? STATUS_META.pending;
        const isPaid = o.status === "paid";
        const isReal = isPaid || o.status === "shipped";
        if (editingId === o.id) {
          return <OrderEditor key={o.id} order={o} password={password} onDone={() => { setEditingId(null); load(); }} />;
        }
        return (
          <div key={o.id} className={`bg-white/5 border rounded-xl p-5 ${isReal ? "border-white/10" : "border-white/5 opacity-70"}`}>
            {/* Status-banneri */}
            <div className={`flex items-center gap-2 text-xs font-semibold rounded-md border px-3 py-2 mb-3 ${meta.banner}`}>
              <meta.Icon className="w-4 h-4 shrink-0" /> {meta.label}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <span className="font-mono font-bold text-emerald-400">{o.order_number}</span>
                <span className={`ml-3 text-sm font-medium ${meta.cls}`}>{o.status.toUpperCase()}</span>
                <span className="ml-3 text-xs text-gray-500">{new Date(o.created_at).toLocaleString("fi-FI")}</span>
              </div>
              <span className="font-bold">
                {fmt(o.total_cents)}
                {!isReal && <span className="ml-2 text-xs font-normal text-gray-500">(ei maksettu)</span>}
              </span>
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

            {isPaid && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/10">
                <Input placeholder="Seurantanumero (Posti)" defaultValue={o.tracking_number ?? ""}
                  id={`tn-${o.id}`} className="bg-gray-900 border-gray-700 text-white text-sm max-w-xs h-9" />
                <Button size="sm" className="bg-blue-500 hover:bg-blue-400 text-white"
                  onClick={() => setStatus(o.id, "shipped", (document.getElementById(`tn-${o.id}`) as HTMLInputElement)?.value)}>
                  <Truck className="w-4 h-4 mr-1" /> Merkitse lähetetyksi
                </Button>
              </div>
            )}
            {o.status === "shipped" && o.tracking_number && (
              <div className="mt-3 pt-3 border-t border-white/10 text-sm text-blue-300">Lähetetty · seuranta: {o.tracking_number}</div>
            )}

            {/* Muokkaa / Poista */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/10">
              <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                onClick={() => setEditingId(o.id)}>
                <Pencil className="w-4 h-4 mr-1" /> Muokkaa
              </Button>
              <Button size="sm" className="bg-red-500/15 hover:bg-red-500/30 text-red-300 border border-red-500/30"
                onClick={() => del(o.id, o.order_number)}>
                <Trash2 className="w-4 h-4 mr-1" /> Poista
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ORDER_STATUSES = ["pending", "paid", "shipped", "failed", "cancelled", "refunded"];
const OrderEditor = ({ order, password, onDone }: { order: any; password: string; onDone: () => void }) => {
  const [f, setF] = useState({
    customer_first_name: order.customer_first_name ?? "",
    customer_last_name: order.customer_last_name ?? "",
    customer_email: order.customer_email ?? "",
    customer_phone: order.customer_phone ?? "",
    shipping_address: order.shipping_address ?? "",
    shipping_postal_code: order.shipping_postal_code ?? "",
    shipping_city: order.shipping_city ?? "",
    status: order.status ?? "pending",
    tracking_number: order.tracking_number ?? "",
  });
  const [saving, setSaving] = useState(false);
  const upd = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  const save = async () => {
    setSaving(true);
    try {
      await adminCall(password, "update_order", { orderId: order.id, patch: f });
      onDone();
    } finally { setSaving(false); }
  };
  const field = (k: keyof typeof f, label: string) => (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <Input value={f[k]} onChange={(e) => upd(k, e.target.value)} className="bg-gray-900 border-gray-700 text-white" />
    </div>
  );

  return (
    <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-5 space-y-3">
      <h3 className="font-bold text-emerald-400">Muokkaa tilausta {order.order_number}</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {field("customer_first_name", "Etunimi")}
        {field("customer_last_name", "Sukunimi")}
        {field("customer_email", "Sähköposti")}
        {field("customer_phone", "Puhelin")}
        {field("shipping_address", "Osoite")}
        <div className="grid grid-cols-2 gap-3">
          {field("shipping_postal_code", "Postinumero")}
          {field("shipping_city", "Kaupunki")}
        </div>
        {field("tracking_number", "Seurantanumero")}
        <div>
          <label className="text-xs text-gray-400">Tila</label>
          <select value={f.status} onChange={(e) => upd("status", e.target.value)}
            className="w-full h-10 bg-gray-900 border border-gray-700 rounded-md text-white px-3 text-sm">
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={save} disabled={saving} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
          {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />} Tallenna
        </Button>
        <Button onClick={onDone} className="bg-white/10 hover:bg-white/20 text-white border border-white/20">Peruuta</Button>
      </div>
    </div>
  );
};

// ════════════════════════════ VARASTO ════════════════════════════
const InventoryTab = ({ password }: { password: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    adminCall(password, "list_products").then((d) => {
      setProducts(d.products ?? []); setVariants(d.variants ?? []); setLoading(false);
    });
  }, [password]);
  useEffect(() => load(), [load]);

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
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {vs.map((v) => <VariantRow key={v.id} v={v} password={password} />)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const VariantRow = ({ v, password }: { v: any; password: string }) => {
  const [stock, setStock] = useState<number>(v.stock ?? 0);
  const [soldOut, setSoldOut] = useState<boolean>(!!v.sold_out);
  const [incoming, setIncoming] = useState<string>(v.incoming_note ?? "");
  const [tick, setTick] = useState(false);

  const save = async (patch: Record<string, unknown>) => {
    await adminCall(password, "update_variant", { variantId: v.id, ...patch });
    setTick(true);
    setTimeout(() => setTick(false), 1200);
  };
  const setS = (n: number) => { const val = Math.max(0, n); setStock(val); save({ stock: val }); };
  const stepBtn = "w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0";

  return (
    <div className={`rounded-lg p-3 space-y-2 border ${soldOut ? "bg-red-500/5 border-red-500/20" : "bg-black/30 border-white/5"}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{v.color} · {v.weight}</span>
        {tick && <span className="text-emerald-400 text-xs">tallennettu ✓</span>}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 w-14 shrink-0">Varasto</span>
        <button type="button" onClick={() => setS(stock - 1)} className={stepBtn} aria-label="Vähennä"><Minus className="w-4 h-4" /></button>
        <Input type="number" min={0} value={stock}
          onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)}
          onBlur={() => save({ stock })}
          className="bg-gray-900 border-gray-700 text-white w-16 h-8 text-sm text-center" />
        <button type="button" onClick={() => setS(stock + 1)} className={stepBtn} aria-label="Lisää"><Plus className="w-4 h-4" /></button>
      </div>

      <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
        <input type="checkbox" checked={soldOut}
          onChange={(e) => { setSoldOut(e.target.checked); save({ sold_out: e.target.checked }); }}
          className="w-4 h-4 accent-red-500" />
        Loppuunmyyty
      </label>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 w-14 shrink-0">Tulossa</span>
        <Input value={incoming} onChange={(e) => setIncoming(e.target.value)} onBlur={() => save({ incoming_note: incoming })}
          placeholder="esim. Tulossa vk 24"
          className="bg-gray-900 border-gray-700 text-white h-8 text-sm flex-1" />
      </div>
    </div>
  );
};

// ════════════════════════════ BLOGI ════════════════════════════
const emptyPost = {
  slug: "", title: "", description: "", content: "", category: "Markkina-analyysi",
  keywords: "", reading_time: 5, author: "Lucky Discs",
  hero_image: "/images/brand/blog-golf-course-green.webp", hero_alt: "", published: false,
};

const BlogTab = ({ password }: { password: string }) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);
  const heroFileRef = useRef<HTMLInputElement>(null);
  const contentFileRef = useRef<HTMLInputElement>(null);

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

  const onHeroFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(password, file);
      setEditing((s: any) => ({ ...s, hero_image: url }));
    } catch (err) { alert("Kuvan lataus epäonnistui: " + (err as Error).message); }
    finally { setUploading(false); if (heroFileRef.current) heroFileRef.current.value = ""; }
  };
  const onContentFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(password, file);
      setEditing((s: any) => ({ ...s, content: (s.content ?? "") + `\n\n![${s.hero_alt || "Kuva"}](${url})\n\n` }));
    } catch (err) { alert("Kuvan lataus epäonnistui: " + (err as Error).message); }
    finally { setUploading(false); if (contentFileRef.current) contentFileRef.current.value = ""; }
  };

  if (loading) return <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />;

  if (editing) {
    return (
      <div className="max-w-3xl space-y-3">
        <h3 className="text-lg font-bold mb-2">{editing._isNew ? "Uusi artikkeli" : "Muokkaa"}</h3>
        {[
          ["slug", "Slug (URL)"], ["title", "Otsikko"], ["description", "Kuvaus"],
          ["category", "Kategoria"], ["keywords", "Avainsanat"], ["hero_alt", "Hero alt-teksti"],
        ].map(([k, label]) => (
          <div key={k}>
            <label className="text-xs text-gray-400">{label}</label>
            <Input value={editing[k] ?? ""} onChange={(e) => setEditing({ ...editing, [k]: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white" />
          </div>
        ))}

        {/* Hero-kuva: URL + lataus */}
        <div>
          <label className="text-xs text-gray-400">Hero-kuva</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input value={editing.hero_image ?? ""} onChange={(e) => setEditing({ ...editing, hero_image: e.target.value })}
              placeholder="/images/brand/..." className="bg-gray-900 border-gray-700 text-white flex-1" />
            <input ref={heroFileRef} type="file" accept="image/*" hidden onChange={onHeroFile} />
            <Button type="button" disabled={uploading}
              onClick={() => heroFileRef.current?.click()}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
              {uploading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Upload className="w-4 h-4 mr-1" />} Lataa kuva
            </Button>
          </div>
          {editing.hero_image && (
            <img src={editing.hero_image} alt="" className="mt-2 h-28 rounded-lg object-cover border border-white/10" />
          )}
        </div>

        <div>
          <label className="text-xs text-gray-400">Lukuaika (min)</label>
          <Input type="number" value={editing.reading_time ?? 5}
            onChange={(e) => setEditing({ ...editing, reading_time: parseInt(e.target.value, 10) || 5 })}
            className="bg-gray-900 border-gray-700 text-white w-24" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-gray-400">Sisältö (markdown — ## otsikot, kappaleet tyhjällä rivillä)</label>
            <input ref={contentFileRef} type="file" accept="image/*" hidden onChange={onContentFile} />
            <button type="button" disabled={uploading} onClick={() => contentFileRef.current?.click()}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" /> Lataa kuva sisältöön
            </button>
          </div>
          <textarea value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })}
            rows={16} className="w-full bg-gray-900 border border-gray-700 rounded-md text-white p-3 text-sm font-mono" />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!editing.published}
            onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 accent-emerald-500" />
          Julkaistu
        </label>
        <div className="flex gap-2">
          <Button onClick={save} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
            <Save className="w-4 h-4 mr-1" /> Tallenna
          </Button>
          <Button onClick={() => setEditing(null)} className="bg-white/10 hover:bg-white/20 text-white border border-white/20">Peruuta</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button onClick={() => setEditing({ ...emptyPost, _isNew: true })} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
        <Plus className="w-4 h-4 mr-1" /> Uusi artikkeli
      </Button>
      {blogs.map((b) => (
        <div key={b.slug} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-medium truncate">{b.title}</div>
            <div className="text-xs text-gray-500">{b.slug} · {b.published ? `julkaistu ${b.published_at ?? ""}` : "luonnos"}</div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              onClick={() => toggle(b.slug, b.published)}>
              {b.published ? "Piilota" : "Julkaise"}
            </Button>
            <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20" onClick={() => setEditing(b)}>
              <Pencil className="w-4 h-4 mr-1" /> Muokkaa
            </Button>
            <Button size="sm" className="bg-red-500/15 hover:bg-red-500/30 text-red-300 border border-red-500/30" onClick={() => del(b.slug)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
