import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" });

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.target.style.borderColor = "#4BD1A0"; e.target.style.boxShadow = "0 0 0 2px rgba(75,209,160,0.2)"; };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; };
  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:outline-none transition";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://assetica-contact-worker.rsrinivasan163.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(75,209,160,0.12)" }}>
        <CheckCircle className="w-7 h-7" style={{ color: "#4BD1A0" }} />
      </div>
      <h3 className="font-display font-bold text-lg mb-2" style={{ color: "#012241" }}>Thanks for submitting!</h3>
      <p className="text-slate-500 text-sm max-w-sm">Our valuation experts will get back to you within 1 business day. For urgent enquiries, call us at <a href="tel:+971529798302" className="font-semibold" style={{ color: "#4BD1A0" }}>+971 52 979 8302</a>.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} method="post" className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-firstName" className="block text-xs font-semibold text-slate-600 mb-1.5">First Name *</label>
          <input id="cf-firstName" required value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="John" className={inputCls} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label htmlFor="cf-lastName" className="block text-xs font-semibold text-slate-600 mb-1.5">Last Name *</label>
          <input id="cf-lastName" required value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Smith" className={inputCls} onFocus={focus} onBlur={blur} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address *</label>
        <input id="cf-email" required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" className={inputCls} onFocus={focus} onBlur={blur} />
      </div>
      <div>
        <label htmlFor="cf-phone" className="block text-xs font-semibold text-slate-600 mb-1.5">Phone Number</label>
        <input id="cf-phone" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+971 52 979 8302" className={inputCls} onFocus={focus} onBlur={blur} />
      </div>
      <div>
        <label htmlFor="cf-service" className="block text-xs font-semibold text-slate-600 mb-1.5">Service Interested In</label>
        <select id="cf-service" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className={inputCls} onFocus={focus} onBlur={blur}>
          <option value="">Select a service...</option>
          <option>Business Valuation</option>
          <option>Due Diligence</option>
          <option>Business Structuring</option>
          <option>Building Pitch Deck</option>
          <option>Financial Modelling</option>
          <option>Buyer & Seller Negotiation</option>
          <option>Tax Valuation</option>
          <option>Strategic Value Advisory</option>
          <option>Business Planning</option>
          <option>General Enquiry</option>
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className="block text-xs font-semibold text-slate-600 mb-1.5">Message</label>
        <textarea id="cf-message" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your valuation needs..." className={inputCls + " resize-none"} onFocus={focus} onBlur={blur} />
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full font-bold text-sm text-white transition-colors flex items-center justify-center gap-2"
        style={{ backgroundColor: loading ? "#4BD1A0" : "#012241" }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = "#4BD1A0"; }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = "#012241"; }}
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
        ) : (
          "Submit Enquiry"
        )}
      </button>
    </form>
  );
};

export default ContactForm;
