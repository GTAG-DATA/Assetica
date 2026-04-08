import { useState, useEffect } from "react";
import { LogOut, Users, FileText, Plus, Edit2, Trash2, Eye, EyeOff, Save, X, ChevronLeft, Layout, ExternalLink, Copy, Check, Globe, Tag, ChevronDown, ChevronUp, Search } from "lucide-react";

const WORKER = "https://assetica-contact-worker.rsrinivasan163.workers.dev";

function api(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("admin_token");
  return fetch(`${WORKER}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
}

// ── Login ─────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("info@assetica.net");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await fetch(`${WORKER}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) { localStorage.setItem("admin_token", data.token); onLogin(); }
    else { setError("Invalid credentials"); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f8fafc" }}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "#012241" }}>
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h1 className="text-xl font-bold" style={{ color: "#012241" }}>Admin Panel</h1>
          <p className="text-slate-500 text-sm mt-1">Assetica Dashboard</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:border-green-400" />
          </div>
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type={show ? "text" : "password"} required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:border-green-400 pr-10" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-8 text-slate-400">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-colors"
            style={{ background: "#012241" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Contacts Table ─────────────────────────────────────────────
function Contacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/api/admin/contacts").then(r => r.json()).then(data => { setContacts(data); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-20 text-slate-400">Loading...</div>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4" style={{ color: "#012241" }}>Contact Submissions <span className="text-sm font-normal text-slate-400">({contacts.length})</span></h2>
      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full text-sm">
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              {["Name", "Email", "Phone", "Service", "Message", "Date"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => (
              <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-4 py-3 font-medium text-slate-700">{c.first_name} {c.last_name}</td>
                <td className="px-4 py-3 text-slate-600">{c.email}</td>
                <td className="px-4 py-3 text-slate-500">{c.phone || "-"}</td>
                <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs" style={{ background: "rgba(75,209,160,0.12)", color: "#059669" }}>{c.service || "-"}</span></td>
                <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{c.message || "-"}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {contacts.length === 0 && <p className="text-center py-10 text-slate-400">No submissions yet</p>}
      </div>
    </div>
  );
}

// ── Blog Editor ────────────────────────────────────────────────
const emptyPost = { slug: "", title: "", excerpt: "", content: "", category: "", image: "", read_time: "3 min read", published: 1 };

function BlogEditor({ post, onSave, onCancel }: { post: any; onSave: () => void; onCancel: () => void }) {
  const [form, setForm] = useState({ ...emptyPost, ...post });
  const [saving, setSaving] = useState(false);
  const isNew = !post.id;

  const save = async () => {
    setSaving(true);
    if (isNew) {
      await api("/api/admin/blogs", { method: "POST", body: JSON.stringify(form) });
    } else {
      await api(`/api/admin/blogs/${post.id}`, { method: "PUT", body: JSON.stringify(form) });
    }
    setSaving(false);
    onSave();
  };

  const field = (label: string, key: string, type = "text", full = false) => (
    <div className={full ? "col-span-2" : ""}>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} type={type}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:border-green-400" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600"><ChevronLeft size={20} /></button>
        <h2 className="text-lg font-bold" style={{ color: "#012241" }}>{isNew ? "New Blog Post" : "Edit Blog Post"}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {field("Title", "title", "text", true)}
        {field("Slug (URL)", "slug")}
        {field("Category", "category")}
        {field("Read Time", "read_time")}
        {field("Image URL", "image", "text", true)}
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Excerpt</label>
          <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:border-green-400 resize-none" />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Content (HTML)</label>
          <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={12}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:border-green-400 resize-y font-mono" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: "#012241" }}>
          <Save size={15} /> {saving ? "Saving..." : "Save Post"}
        </button>
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input type="checkbox" checked={form.published === 1} onChange={e => setForm({ ...form, published: e.target.checked ? 1 : 0 })} />
          Published
        </label>
        <button onClick={onCancel} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 border border-slate-200">
          <X size={15} /> Cancel
        </button>
      </div>
    </div>
  );
}

// ── Blog List ──────────────────────────────────────────────────
function Blogs() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);

  const load = () => {
    setLoading(true);
    api("/api/admin/blogs").then(r => r.json()).then(data => { setPosts(data); setLoading(false); });
  };

  useEffect(load, []);

  const del = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    await api(`/api/admin/blogs/${id}`, { method: "DELETE" });
    load();
  };

  if (editing !== null) return <BlogEditor post={editing} onSave={() => { setEditing(null); load(); }} onCancel={() => setEditing(null)} />;
  if (loading) return <div className="text-center py-20 text-slate-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold" style={{ color: "#012241" }}>Blog Posts <span className="text-sm font-normal text-slate-400">({posts.length})</span></h2>
        <button onClick={() => setEditing(emptyPost)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
          style={{ background: "#4BD1A0", color: "#012241" }}>
          <Plus size={15} /> New Post
        </button>
      </div>
      <div className="space-y-3">
        {posts.map(p => (
          <div key={p.id} className="flex items-center gap-4 bg-white border border-slate-100 rounded-xl px-4 py-3">
            {p.image && <img src={p.image} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 truncate">{p.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{p.category} · {p.read_time} · {new Date(p.created_at).toLocaleDateString()}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.published ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"}`}>
              {p.published ? "Published" : "Draft"}
            </span>
            <div className="flex gap-2">
              <button onClick={() => setEditing(p)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><Edit2 size={15} /></button>
              <button onClick={() => del(p.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-400"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-center py-10 text-slate-400">No posts yet</p>}
      </div>
    </div>
  );
}

// ── Landing Pages ──────────────────────────────────────────────
const BASE_URL = "https://assetica.net";

const LANDING_PAGES = [
  {
    category: "Core Pages",
    pages: [
      {
        title: "Home", path: "/", schemas: ["Organization", "WebSite", "ProfessionalService"], status: "live",
        metaTitle: "Business Valuation Services in Dubai, UAE & UK | Assetica",
        metaDesc: "Assetica, independent business valuation firm in Dubai & UK. Expert valuations for M&A, due diligence, tax, financial modelling and strategic advisory across UAE, GCC & Europe.",
        keyword: "business valuation Dubai UAE",
      },
      {
        title: "About Us", path: "/about", schemas: ["Organization"], status: "live",
        metaTitle: "About Assetica | 30+ Years of Business Valuation Expertise in Dubai",
        metaDesc: "Assetica brings 30+ years of valuation expertise across Dubai, GCC, UK & Europe. Trusted by 500+ businesses for M&A, due diligence and strategic advisory.",
        keyword: "Assetica business valuation firm Dubai",
      },
      {
        title: "Services", path: "/services", schemas: ["ProfessionalService", "ItemList"], status: "live",
        metaTitle: "Business Valuation Services in Dubai & UAE | Assetica",
        metaDesc: "Expert business valuation, due diligence, financial modelling, tax valuation and strategic advisory in Dubai, UAE, GCC, UK & Europe. Free consultation.",
        keyword: "business valuation services Dubai UAE",
      },
      {
        title: "Industries", path: "/industries", schemas: ["ItemList"], status: "live",
        metaTitle: "Industries We Serve | Business Valuation Across Dubai & UAE | Assetica",
        metaDesc: "Assetica provides expert business valuation across Banking, Real Estate, Manufacturing, Shipping, Legal and Government sectors in Dubai, UAE, GCC & UK.",
        keyword: "business valuation industries Dubai",
      },
      {
        title: "Contact", path: "/contact", schemas: ["Organization"], status: "live",
        metaTitle: "Contact Assetica | Business Valuation Enquiries, Dubai & UK",
        metaDesc: "Get in touch with Assetica's valuation experts in Dubai & London. Free initial consultation for business valuation, M&A advisory and due diligence.",
        keyword: "contact business valuation Dubai",
      },
      {
        title: "Blog", path: "/blog", schemas: ["Blog"], status: "live",
        metaTitle: "Business Valuation Blog | Expert Insights from Assetica Dubai",
        metaDesc: "Expert insights on business valuation, M&A, due diligence and financial advisory from Assetica's team in Dubai, UAE & UK.",
        keyword: "business valuation blog Dubai",
      },
      {
        title: "Privacy Policy", path: "/privacy-policy", schemas: [], status: "live",
        metaTitle: "Privacy Policy | Assetica",
        metaDesc: "Assetica's privacy policy detailing how we collect, use and protect your personal data across our business valuation services.",
        keyword: "Not set",
      },
    ],
  },
  {
    category: "Service Pages",
    pages: [
      {
        title: "Business Valuation", path: "/services/business-valuation", schemas: ["Service", "FAQPage"], status: "live",
        metaTitle: "Business Valuation Services in Dubai & UAE | Assetica",
        metaDesc: "Assetica delivers independent, credible business valuations for companies across the UAE, UK, GCC, and internationally for M&A, capital raising, disputes and regulatory needs.",
        keyword: "business valuation Dubai",
      },
      {
        title: "Due Diligence", path: "/services/due-diligence", schemas: ["Service", "FAQPage"], status: "live",
        metaTitle: "Due Diligence Services in Dubai & UAE | Assetica",
        metaDesc: "Thorough research and analysis to reveal your business's strengths, weaknesses, and growth potential. Assetica minimises risk and maximises investment confidence.",
        keyword: "due diligence services Dubai UAE",
      },
      {
        title: "Business Structuring", path: "/services/business-structuring", schemas: ["Service"], status: "live",
        metaTitle: "Business Structuring Services in Dubai & UAE | Assetica",
        metaDesc: "Assetica assesses legal, financial, and operational aspects to optimise your corporate structure for valuation, investment, and growth in UAE & GCC.",
        keyword: "business structuring Dubai UAE",
      },
      {
        title: "Building Pitch Deck", path: "/services/building-pitch-deck", schemas: ["Service"], status: "live",
        metaTitle: "Pitch Deck Services in Dubai & UAE | Assetica",
        metaDesc: "We craft compelling investor presentations highlighting your company's value proposition, financials, and growth prospects. Designed to captivate investors from slide one.",
        keyword: "pitch deck services Dubai",
      },
      {
        title: "Financial Modelling", path: "/services/financial-modelling", schemas: ["Service"], status: "live",
        metaTitle: "Financial Modelling Services in Dubai & UAE | Assetica",
        metaDesc: "Advanced financial models projecting future performance using financial metrics, market trends and industry benchmarks to guide strategic decision-making in UAE & UK.",
        keyword: "financial modelling services Dubai",
      },
      {
        title: "Buyer Seller Negotiation", path: "/services/buyer-seller-negotiation", schemas: ["Service"], status: "live",
        metaTitle: "Buyer & Seller Negotiation Advisory in Dubai & UAE | Assetica",
        metaDesc: "Assetica facilitates successful M&A negotiations as skilled intermediaries, ensuring favourable outcomes and protecting your interests throughout the deal process.",
        keyword: "buyer seller negotiation advisory Dubai",
      },
      {
        title: "Tax Valuation", path: "/services/tax-valuation", schemas: ["Service"], status: "live",
        metaTitle: "Tax Valuation Services in Dubai & UAE | Assetica",
        metaDesc: "Tax-compliant valuations assessing tax impacts with optimised strategies. Fully compliant with UAE, UK and international tax regulations for businesses and investors.",
        keyword: "tax valuation services Dubai UAE",
      },
      {
        title: "Strategic Value Advisory", path: "/services/strategic-value-advisory", schemas: ["Service"], status: "live",
        metaTitle: "Strategic Value Advisory in Dubai & UAE | Assetica",
        metaDesc: "Beyond valuation: a roadmap for sustainable value creation. Assetica offers insights to enhance your company's overall value and ensure long-term growth.",
        keyword: "strategic value advisory Dubai",
      },
      {
        title: "Business Planning", path: "/services/business-planning", schemas: ["Service"], status: "live",
        metaTitle: "Business Planning Services in Dubai & UAE | Assetica",
        metaDesc: "Comprehensive business plans with advanced financial models that attract investment and drive sustainable growth in competitive UAE and GCC markets.",
        keyword: "business planning services Dubai UAE",
      },
    ],
  },
  {
    category: "Landing Pages",
    pages: [
      {
        title: "Golden Visa Valuation", path: "/golden-visa-valuation", schemas: ["Service", "FAQPage", "HowTo", "BreadcrumbList"], status: "live",
        metaTitle: "Golden Visa Business Valuation UAE | GDRFA-Compliant | Assetica",
        metaDesc: "Certified business valuation for UAE Golden Visa applications. GDRFA-accepted reports in 5–7 days for business owners and investors. AED 2M+ threshold confirmed.",
        keyword: "golden visa business valuation UAE",
      },
      {
        title: "Family Office Valuation", path: "/family-office-valuation", schemas: ["Service", "FAQPage", "BreadcrumbList"], status: "live",
        metaTitle: "Family Office Valuation Services | DIFC & ADGM | Assetica",
        metaDesc: "Independent valuation services for family offices across DIFC, ADGM and the GCC. Portfolio, succession, real estate and private equity valuations for HNI and UHNWI families.",
        keyword: "family office valuation DIFC ADGM",
      },
      {
        title: "HNI/UHNWI Valuation", path: "/hni-uhnwi-valuation", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "HNI UHNWI valuation Dubai",
      },
      {
        title: "Estate Planning Valuation", path: "/estate-planning-valuation", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "estate planning valuation UAE",
      },
      {
        title: "Private Equity Valuation", path: "/private-equity-valuation", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "private equity valuation Dubai",
      },
      {
        title: "M&A Valuation Services", path: "/mergers-acquisitions-valuation", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "mergers acquisitions valuation Dubai",
      },
      {
        title: "Succession Planning", path: "/succession-planning-valuation", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "succession planning valuation UAE",
      },
      {
        title: "Startup Valuation Dubai", path: "/startup-valuation", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "startup valuation Dubai",
      },
      {
        title: "Private Wealth Advisory", path: "/private-wealth-advisory", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "private wealth advisory Dubai",
      },
    ],
  },
  {
    category: "Geo Pages",
    pages: [
      {
        title: "Business Valuation UK", path: "/uk", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "business valuation UK London",
      },
      {
        title: "Business Valuation India", path: "/india", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "business valuation India",
      },
      {
        title: "Business Valuation Singapore", path: "/singapore", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "business valuation Singapore",
      },
      {
        title: "Business Valuation Turkey", path: "/turkey", schemas: [], status: "planned",
        metaTitle: "Not set", metaDesc: "Not set", keyword: "business valuation Turkey",
      },
    ],
  },
];

const SCHEMA_COLORS: Record<string, string> = {
  Organization: "#3b82f6",
  WebSite: "#8b5cf6",
  ProfessionalService: "#0891b2",
  Service: "#0891b2",
  FAQPage: "#d97706",
  HowTo: "#16a34a",
  ItemList: "#7c3aed",
  BreadcrumbList: "#64748b",
  Blog: "#ec4899",
  BlogPosting: "#ec4899",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} title="Copy URL"
      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
      {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
    </button>
  );
}

function PageCard({ page, index, total }: { page: any; index: number; total: number }) {
  const [expanded, setExpanded] = useState(false);
  const titleLen = page.metaTitle !== "Not set" ? page.metaTitle.length : null;
  const descLen = page.metaDesc !== "Not set" ? page.metaDesc.length : null;
  const titleOk = titleLen !== null && titleLen >= 50 && titleLen <= 65;
  const descOk = descLen !== null && descLen >= 120 && descLen <= 155;

  return (
    <div className={`${index < total - 1 ? "border-b border-slate-100" : ""}`}>
      {/* Main row */}
      <div
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}
        onClick={() => setExpanded(e => !e)}>
        {/* Status dot */}
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${page.status === "live" ? "bg-green-400" : "bg-slate-300"}`} />

        {/* Title + path */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 text-sm">{page.title}</p>
          <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">{page.path}</p>
        </div>

        {/* Schema badges, hidden on small */}
        <div className="hidden lg:flex items-center gap-1.5 flex-wrap max-w-[220px]">
          {page.schemas.map((s: string) => (
            <span key={s} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white"
              style={{ background: SCHEMA_COLORS[s] || "#64748b" }}>
              <Tag size={9} />{s}
            </span>
          ))}
          {page.schemas.length === 0 && <span className="text-xs text-slate-300 italic">No schema</span>}
        </div>

        {/* Status badge */}
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
          page.status === "live" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-500"
        }`}>
          {page.status === "live" ? "Live" : "Planned"}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
          <CopyButton text={`${BASE_URL}${page.path}`} />
          {page.status === "live" ? (
            <a href={`${BASE_URL}${page.path}`} target="_blank" rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" title="View live page">
              <ExternalLink size={13} />
            </a>
          ) : (
            <button
              className="p-1.5 rounded-lg bg-amber-50 text-amber-400 hover:bg-amber-100 transition-colors"
              title="Create this page"
              onClick={() => alert(`Page "${page.title}" is planned. Ask Claude to create it!`)}>
              <Plus size={13} />
            </button>
          )}
        </div>

        {/* Expand toggle */}
        <button className="p-1 text-slate-300 hover:text-slate-500 flex-shrink-0">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expanded SEO detail panel */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 bg-slate-50 border-t border-slate-100">
          <div className="grid grid-cols-1 gap-3">
            {/* Meta Title */}
            <div className="bg-white rounded-xl border border-slate-100 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Meta Title</span>
                {titleLen !== null && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${titleOk ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                    {titleLen} chars {titleOk ? "✓" : titleLen < 50 ? "too short" : "too long"}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-700 leading-snug">{page.metaTitle}</p>
            </div>

            {/* Meta Description */}
            <div className="bg-white rounded-xl border border-slate-100 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Meta Description</span>
                {descLen !== null && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${descOk ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                    {descLen} chars {descOk ? "✓" : descLen < 120 ? "too short" : "too long"}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 leading-snug">{page.metaDesc}</p>
            </div>

            {/* Focus Keyword */}
            <div className="bg-white rounded-xl border border-slate-100 p-3 flex items-center gap-3">
              <Search size={14} className="text-slate-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">Focus Keyword</p>
                <p className="text-sm font-semibold" style={{ color: "#012241" }}>{page.keyword}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LandingPages() {
  const [filter, setFilter] = useState<"all" | "live" | "planned">("all");
  const [search, setSearch] = useState("");

  const allPages = LANDING_PAGES.flatMap(g => g.pages);
  const liveCount = allPages.filter(p => p.status === "live").length;
  const plannedCount = allPages.filter(p => p.status === "planned").length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold" style={{ color: "#012241" }}>Landing Pages</h2>
          <p className="text-xs text-slate-400 mt-0.5">{liveCount} live · {plannedCount} planned · {allPages.length} total</p>
        </div>
        <a href={BASE_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
          <Globe size={14} /> Visit Site
        </a>
      </div>

      {/* Filters + Search */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex rounded-xl border border-slate-200 overflow-hidden text-xs font-semibold">
          {(["all", "live", "planned"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 capitalize transition-colors ${filter === f ? "text-white" : "text-slate-500 hover:bg-slate-50"}`}
              style={filter === f ? { background: "#012241" } : {}}>
              {f}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pages..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:border-green-400" />
        </div>
        <p className="text-xs text-slate-400 hidden sm:block">Click any row to expand SEO details</p>
      </div>

      {/* Page Groups */}
      <div className="space-y-6">
        {LANDING_PAGES.map(group => {
          const filtered = group.pages.filter(p =>
            (filter === "all" || p.status === filter) &&
            (search === "" || p.title.toLowerCase().includes(search.toLowerCase()) ||
              p.path.includes(search.toLowerCase()) ||
              p.keyword.toLowerCase().includes(search.toLowerCase()))
          );
          if (filtered.length === 0) return null;
          return (
            <div key={group.category}>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">{group.category}</h3>
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                {filtered.map((page, i) => (
                  <PageCard key={page.path} page={page} index={i} total={filtered.length} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Admin ─────────────────────────────────────────────────
export default function Admin() {
  const [auth, setAuth] = useState(!!localStorage.getItem("admin_token"));
  const [tab, setTab] = useState<"contacts" | "blogs" | "pages">("contacts");

  const logout = () => { localStorage.removeItem("admin_token"); setAuth(false); };

  if (!auth) return <Login onLogin={() => setAuth(true)} />;

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-56 bg-white border-r border-slate-100 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#012241" }}>
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-slate-800">Assetica</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <button onClick={() => setTab("contacts")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === "contacts" ? "text-white" : "text-slate-500 hover:bg-slate-50"}`}
            style={tab === "contacts" ? { background: "#012241" } : {}}>
            <Users size={16} /> Contacts
          </button>
          <button onClick={() => setTab("blogs")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === "blogs" ? "text-white" : "text-slate-500 hover:bg-slate-50"}`}
            style={tab === "blogs" ? { background: "#012241" } : {}}>
            <FileText size={16} /> Blog Posts
          </button>
          <button onClick={() => setTab("pages")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === "pages" ? "text-white" : "text-slate-500 hover:bg-slate-50"}`}
            style={tab === "pages" ? { background: "#012241" } : {}}>
            <Layout size={16} /> Landing Pages
          </button>
        </nav>
        <div className="p-3 border-t border-slate-100">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="ml-56 p-8">
        {tab === "contacts" ? <Contacts /> : tab === "blogs" ? <Blogs /> : <LandingPages />}
      </div>
    </div>
  );
}
