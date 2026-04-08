import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, TrendingUp, Shield, Users, Globe, Building2, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";

const heroImg = "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1800&q=80";
const wealthImg = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80";
const officeImg = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80";

const valuationTypes = [
  {
    icon: Building2,
    title: "Operating Business Valuation",
    desc: "Independent valuation of wholly-owned or majority-held portfolio companies. Used for estate planning, succession, partial disposals and reporting to principals.",
  },
  {
    icon: BarChart3,
    title: "Investment Portfolio Valuation",
    desc: "Mark-to-market and fair value assessments of private equity holdings, co-investments, club deals and unlisted securities within the family office portfolio.",
  },
  {
    icon: Globe,
    title: "Cross-Border Asset Valuation",
    desc: "Multi-jurisdiction valuations for family offices with assets across UAE, UK, GCC, Europe and Asia. Consistent methodology across borders for consolidated reporting.",
  },
  {
    icon: Shield,
    title: "Succession & Estate Valuation",
    desc: "Defensible valuations for generational wealth transfer, trust structures, family charters and estate planning purposes. Prepared to withstand regulatory and legal scrutiny.",
  },
  {
    icon: TrendingUp,
    title: "Growth & Exit Valuation",
    desc: "Strategic valuations ahead of partial or full business disposals. Used by family offices to establish pricing expectations and negotiate with institutional buyers.",
  },
  {
    icon: Users,
    title: "DIFC & ADGM Structure Valuation",
    desc: "Specialist valuations for businesses and investment vehicles held within DIFC or ADGM structures, formatted for compliance with DFSA and FSRA requirements.",
  },
];

const whyPoints = [
  { num: "01", title: "Confidentiality by design", desc: "All engagements are handled under strict NDA. No information is shared with third parties. Your family's financial affairs remain entirely private." },
  { num: "02", title: "Principal-level relationship", desc: "You deal directly with senior valuers, not junior associates. Assetica's principals lead every family office engagement personally." },
  { num: "03", title: "Multi-jurisdiction expertise", desc: "UAE, UK, GCC and European regulatory frameworks handled by a single team, with no need to coordinate between multiple advisors across borders." },
  { num: "04", title: "Defensible to any authority", desc: "Our reports are prepared to withstand challenge from UAE FTA, HMRC, DFSA and international tax and legal authorities." },
];

const faqs = [
  {
    q: "What business valuation services does Assetica offer for family offices in Dubai?",
    a: "Assetica provides family offices in Dubai and across the UAE with a full range of business valuation services including operating company valuations, investment portfolio valuations, cross-border asset valuations, succession and estate planning valuations, and valuations for businesses held within DIFC or ADGM structures. Every engagement is handled with strict confidentiality and delivered by senior valuers with direct principal access.",
  },
  {
    q: "Why do family offices need independent business valuations?",
    a: "Family offices require independent business valuations for multiple purposes: estate planning and generational wealth transfer, compliance with UAE corporate tax and transfer pricing regulations, reporting to family principals on portfolio fair value, strategic exit planning, partial disposals to co-investors or institutional buyers, and trust and foundation structuring. An independent valuation from a credible third party protects the family's interests and provides a defensible figure for any regulatory or legal challenge.",
  },
  {
    q: "Can Assetica value a business held within a DIFC or ADGM structure?",
    a: "Yes. Assetica has specialist expertise in valuing businesses and investment vehicles held within DIFC (Dubai International Financial Centre) and ADGM (Abu Dhabi Global Market) structures. Our valuations are formatted to comply with DFSA and FSRA requirements and are accepted by these regulatory authorities. We regularly work with single and multi-family offices domiciled in both financial free zones.",
  },
  {
    q: "How does Assetica handle cross-border family office valuations?",
    a: "Many UAE family offices hold business interests across multiple jurisdictions: Dubai, London, Riyadh, Geneva and Singapore are common combinations. Assetica provides a single-team, multi-jurisdiction valuation service that applies consistent methodology across all asset locations while ensuring compliance with the specific regulatory requirements of each territory. This eliminates the need for a family office to coordinate between separate advisors in each country.",
  },
  {
    q: "What valuation methodology does Assetica use for private business holdings?",
    a: "The appropriate methodology depends on the nature of the business and the purpose of the valuation. For most operating businesses, we apply a combination of Discounted Cash Flow (DCF) analysis, market comparables (EV/EBITDA multiples), and precedent transaction analysis. For early-stage or pre-revenue businesses, we use market-based and asset-based approaches. For investment portfolio valuations, we apply IPEV (International Private Equity and Venture Capital) guidelines. Every report documents the methodology clearly and provides a cross-checked valuation range.",
  },
  {
    q: "How does Assetica protect the confidentiality of family office clients?",
    a: "Confidentiality is the cornerstone of Assetica's family office service. All engagements begin with a comprehensive NDA. Client information is handled exclusively by the lead valuer and senior team members, never by junior staff or outsourced parties. We do not disclose client identities, portfolio details or valuation outcomes to any third party under any circumstances. Our principals operate on a relationship-first basis, where the privacy and discretion expected by UHNWI and family office clients is built into every aspect of our service.",
  },
  {
    q: "Does Assetica provide valuations for succession planning and generational wealth transfer?",
    a: "Yes, succession planning and generational wealth transfer are among the most common valuation requirements for family offices that Assetica serves in the UAE. We prepare independent, defensible valuations for use in family charters, trust structures, family holding company reorganisations, and estate planning frameworks. Our valuations are accepted by UAE legal authorities, international trust companies, and tax advisors in the UK and GCC.",
  },
  {
    q: "Can a family office use Assetica's valuations for UAE corporate tax compliance?",
    a: "Yes. Following the introduction of UAE corporate tax at 9% from June 2023, family offices with business interests in the UAE face new valuation requirements for related-party transactions, group restructurings, and transfer pricing compliance. Assetica prepares tax-compliant valuations that satisfy the requirements of the UAE Federal Tax Authority (FTA), including transfer pricing documentation and intra-group transaction valuations for family office structures.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Family Office Business Valuation Dubai",
  "description": "Independent business and portfolio valuations for family offices in Dubai, DIFC and across the UAE. Confidential, principal-level service for UHNWI and multi-generational wealth structures.",
  "provider": { "@type": "Organization", "name": "Assetica", "url": "https://assetica.net" },
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "Country", "name": "United Arab Emirates" },
    { "@type": "Place", "name": "DIFC" },
    { "@type": "Place", "name": "ADGM" },
  ],
  "url": "https://assetica.net/family-office-valuation",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://assetica.net" },
    { "@type": "ListItem", "position": 2, "name": "Family Office Valuation Dubai", "item": "https://assetica.net/family-office-valuation" },
  ],
};

export default function FamilyOfficeValuation() {
  return (
    <>
      <SEOHead
        title="Family Office Business Valuation Dubai | DIFC & UHNWI | Assetica"
        description="Confidential business and portfolio valuations for family offices in Dubai, DIFC & ADGM. Independent, principal-level service for UHNWI wealth structures. Cross-border expertise across UAE, UK & GCC."
        canonical="/family-office-valuation"
        schema={[serviceSchema, faqSchema, breadcrumbSchema]}
      />

      <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
        <Navbar />

        {/* Hero: split layout, no full-bleed */}
        <div className="pt-[72px]">
          <div className="grid lg:grid-cols-2 min-h-[580px]">

            {/* Left: dark content panel */}
            <div className="flex flex-col justify-center px-8 md:px-14 py-16" style={{ backgroundColor: "#012241" }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-8 w-fit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4BD1A0]" />
                <span className="text-white/70 text-xs font-medium tracking-wide uppercase">Private Wealth · Family Office · UHNWI</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
              >
                Family Office<br />
                <span style={{ color: "#4BD1A0" }}>Valuation Services</span><br />
                Dubai & UAE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 }}
                className="text-white/70 text-base leading-relaxed mb-10 max-w-lg"
              >
                Discreet, independent valuations for single and multi-family offices across Dubai, DIFC, ADGM and the wider GCC. Principal-level relationships. Absolute confidentiality. Cross-border expertise.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Link to="/contact" className="inline-flex items-center gap-2 bg-[#4BD1A0] text-[#012241] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors">
                  Request Private Consultation <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Trust signals */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
                {[
                  { val: "100%", label: "Confidential" },
                  { val: "DIFC", label: "& ADGM Ready" },
                  { val: "30+", label: "Years Experience" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display font-bold text-white text-xl">{s.val}</p>
                    <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image with floating card */}
            <div className="relative hidden lg:block">
              <img src={heroImg} alt="Family office boardroom Dubai" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#012241]/20" />

              {/* Floating context card */}
              <div className="absolute bottom-8 right-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <p className="text-[#012241] font-display font-bold text-sm mb-3">Typical family office mandates</p>
                <div className="space-y-2">
                  {[
                    "Succession & generational wealth transfer",
                    "UAE corporate tax compliance valuations",
                    "DIFC / ADGM portfolio reporting",
                    "Pre-sale & partial disposal valuations",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#4BD1A0" }} />
                      <span className="text-slate-600 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Intro statement ── */}
        <AnimatedSection>
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="grid md:grid-cols-[180px_1fr] gap-8 items-start">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">The Challenge</p>
                <div className="w-8 h-0.5 bg-[#4BD1A0]" />
              </div>
              <div>
                <p className="text-slate-800 text-xl md:text-2xl leading-relaxed font-medium">
                  Family offices manage complex, multi-generational wealth across multiple jurisdictions. Standard valuation firms lack the <span className="text-[#012241] font-semibold">discretion, breadth, and cross-border depth</span> that UHNWI principals require.
                </p>
                <p className="text-slate-500 text-base leading-relaxed mt-5">
                  Assetica works exclusively at the principal level, directly with family principals, trustees, and their legal counsel. We bring the same rigour applied to institutional transactions to every family office mandate, with the confidentiality and bespoke service that private wealth demands.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Valuation types grid ── */}
        <div className="py-12 md:py-16" style={{ backgroundColor: "#f8fafc" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="mb-10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Scope of Services</p>
                <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl max-w-xl">
                  Valuation services designed for family office complexity
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {valuationTypes.map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 0.07}>
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full group hover:border-[#4BD1A0]/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform" style={{ backgroundColor: "#012241" }}>
                      <item.icon className="w-5 h-5" style={{ color: "#4BD1A0" }} />
                    </div>
                    <h3 className="font-display font-bold text-[#012241] text-sm mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Why Assetica: numbered list with image */}
        <div className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <AnimatedSection>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Why Assetica</p>
                <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl leading-snug mb-10">
                  What family office principals expect, and what we deliver
                </h2>
                <div className="space-y-8">
                  {whyPoints.map((pt) => (
                    <div key={pt.num} className="flex gap-5">
                      <span className="font-display font-bold text-2xl shrink-0 leading-none mt-0.5" style={{ color: "#4BD1A0" }}>{pt.num}</span>
                      <div>
                        <h3 className="font-display font-bold text-[#012241] text-sm mb-1">{pt.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{pt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/5]">
                  <img src={wealthImg} alt="Senior advisor family office consultation Dubai" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#012241] rounded-2xl p-5 shadow-lg max-w-[220px]">
                  <p className="text-[#4BD1A0] text-xs font-semibold uppercase tracking-wide mb-1">Coverage</p>
                  <p className="text-white font-display font-bold text-sm leading-snug">UAE · UK · GCC · Europe · Asia</p>
                  <p className="text-white/50 text-xs mt-1">Single team, all jurisdictions</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ── DIFC / ADGM Highlight ── */}
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
            <div className="rounded-3xl p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center" style={{ backgroundColor: "#012241" }}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>DIFC & ADGM Specialist</p>
                <h2 className="font-display font-bold text-white text-xl md:text-2xl leading-snug mb-4 max-w-2xl">
                  Valuations accepted by DFSA and FSRA for family offices domiciled in Dubai's financial free zones
                </h2>
                <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                  DIFC and ADGM are the preferred domiciles for institutional and family office structures in the UAE. Assetica's valuation reports are prepared to the standards required by the Dubai Financial Services Authority (DFSA) and the Financial Services Regulatory Authority (FSRA), making them suitable for compliance, reporting and regulatory purposes within both free zones.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["DFSA Compliant Reports", "FSRA Accepted", "IPEV Guidelines", "Common Law Framework"].map((tag) => (
                    <span key={tag} className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full border border-white/15">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 hidden md:block">
                <div className="w-32 h-32 rounded-2xl overflow-hidden">
                  <img src={officeImg} alt="DIFC Dubai financial centre" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Related links ── */}
        <div className="pb-8 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Related Services</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "HNI & UHNWI Valuation", href: "/hni-uhnwi-valuation" },
                    { label: "Succession Planning Valuation", href: "/succession-planning-valuation" },
                    { label: "Tax Valuation", href: "/services/tax-valuation" },
                    { label: "Business Structuring", href: "/services/business-structuring" },
                    { label: "Strategic Value Advisory", href: "/services/strategic-value-advisory" },
                    { label: "Golden Visa Valuation", href: "/golden-visa-valuation" },
                  ].map((rel) => (
                    <Link key={rel.label} to={rel.href} className="inline-flex items-center gap-1.5 bg-white hover:bg-[#012241] hover:text-white border border-slate-200 text-slate-700 text-xs font-medium px-3.5 py-2 rounded-full transition-colors">
                      {rel.label} <ChevronRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="py-16 md:py-20" style={{ backgroundColor: "#f8fafc" }}>
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="text-center mb-10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">FAQs</p>
                <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl">
                  Family Office Valuation: Common Questions
                </h2>
              </div>
            </AnimatedSection>
            <FaqSection faqs={faqs} title="" subtitle="" />
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="py-16 md:py-20 px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <AnimatedSection>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Private Consultation</p>
              <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl mb-3">
                Speak directly with a senior valuer
              </h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto">
                All enquiries are treated with absolute confidentiality. We respond to family office mandates within one business day and schedule principal-level consultations at your convenience.
              </p>
            </AnimatedSection>
          </div>
          <ContactForm />
        </div>

        <Footer />
      </div>
    </>
  );
}
