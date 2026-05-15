import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, DollarSign, Users, Building, Award, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";

const faqs = [
  {
    q: "How much is my business worth in Dubai?",
    a: "A Dubai business is typically valued at 3x–6x annual EBITDA for profitable service businesses, or 1x–3x annual revenue for early-stage companies. The exact value depends on industry sector, profitability, growth rate, customer concentration, assets, and current UAE market conditions. Most SMEs in Dubai are valued between AED 500,000 and AED 50 million. Technology and financial services businesses command the highest multiples (8x–15x EBITDA), while retail and construction businesses are at the lower end (3x–6x EBITDA).",
  },
  {
    q: "What is the average business valuation multiple in UAE?",
    a: "The average EBITDA multiple for UAE businesses in 2026 ranges from 3x to 8x across all sectors. Technology and SaaS businesses achieve 8x–15x EBITDA. Financial services businesses trade at 6x–12x EBITDA. Healthcare businesses achieve 6x–10x EBITDA. Professional services firms typically achieve 4x–8x EBITDA. Retail and F&B businesses tend to be valued at 3x–7x EBITDA. These multiples are higher than comparable businesses in many markets due to the UAE's favourable tax environment, strategic location, and strong M&A activity.",
  },
  {
    q: "How do I calculate my business value in Dubai?",
    a: "To calculate your business value in Dubai: Step 1 — Gather three years of audited financial statements. Step 2 — Calculate your normalised EBITDA (earnings before interest, tax, depreciation and amortisation), adjusting for one-off items and owner-specific costs. Step 3 — Identify your industry EBITDA multiple (3x–15x depending on sector). Step 4 — Multiply EBITDA by the appropriate multiple to get an indicative enterprise value. Step 5 — Cross-check using a revenue multiple for your sector. Step 6 — Deduct net debt to arrive at equity value. For an accurate, certified valuation, engage an independent valuation firm such as Assetica.",
  },
  {
    q: "What businesses are worth the most in Dubai?",
    a: "The highest-value businesses in Dubai by EBITDA multiple are: Technology and SaaS companies (8x–15x EBITDA), particularly those with recurring revenue and strong growth; Financial services and fintech businesses (6x–12x EBITDA); Healthcare and medical businesses (6x–10x EBITDA), especially private clinics and specialist healthcare groups; and Real estate and property management businesses (5x–10x EBITDA). These sectors command premium multiples due to their growth rates, scalability, and strong demand from regional and international acquirers.",
  },
  {
    q: "How long does a business valuation take in UAE?",
    a: "A standard independent business valuation in the UAE typically takes 2–3 weeks for SMEs from receipt of the required financial documentation. For mid-market businesses with more complex structures, allow 3–5 weeks. For large or multi-entity businesses, 5–8 weeks is typical. Expedited valuations can be delivered within 5–7 business days for time-sensitive transactions such as UAE Golden Visa applications or urgent M&A processes. Assetica delivers certified valuation reports within these timeframes.",
  },
  {
    q: "Do I need a certified valuation or can I estimate it myself?",
    a: "For most business purposes in Dubai, you need a certified independent valuation rather than a self-estimate. A certified valuation is required for: UAE Golden Visa applications (AED 2M threshold must be confirmed by a certified valuer); M&A transactions (buyers and investors require independent reports); shareholder disputes and court proceedings in DIFC, ADGM, or UAE courts; UAE corporate tax compliance and transfer pricing; bank financing applications; and formal sale processes. A self-estimate may be sufficient for internal planning but will not be accepted by authorities, courts, or institutional investors.",
  },
  {
    q: "What is the minimum business value for UAE Golden Visa?",
    a: "The minimum business value for the UAE Golden Visa investor category is AED 2,000,000 (approximately USD 545,000). This must be evidenced by an independently certified business valuation report accepted by the General Directorate of Residency and Foreigners Affairs (GDRFA) in Dubai, or the Federal Authority for Identity, Citizenship, Customs and Port Security (ICA) across the UAE. Assetica provides GDRFA-compliant certified valuation reports specifically for Golden Visa applications.",
  },
  {
    q: "Can I sell my business without a valuation in Dubai?",
    a: "While there is no legal requirement to obtain a formal valuation before selling a business in Dubai, selling without one is strongly inadvisable. Without an independent valuation, you risk significantly undervaluing your business in negotiations, accepting unfavourable deal terms, facing challenges in due diligence, or losing credibility with serious buyers. Most sophisticated buyers and their advisors will conduct their own valuation — if you have not commissioned one, you will be negotiating without a defensible number. An independent valuation from Assetica protects your position and maximises your sale price.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Value a Business in Dubai",
  "description": "Step-by-step guide to valuing a business in Dubai, UAE",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Gather Financial Statements",
      "text": "Collect 3 years of audited financials, management accounts, and current year projections.",
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Calculate EBITDA",
      "text": "Determine your normalised EBITDA by adjusting for one-off items and owner-specific costs.",
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Apply Industry Multiple",
      "text": "Apply the appropriate EBITDA multiple for your industry in the UAE market (typically 3x–8x for Dubai SMEs).",
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Cross-validate with Revenue Multiple",
      "text": "Cross-check using a revenue multiple appropriate for your sector.",
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Get a Certified Valuation Report",
      "text": "For legal, regulatory, or transaction purposes, obtain an independent certified valuation from Assetica.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://assetica.net/" },
    { "@type": "ListItem", "position": 2, "name": "How Much is My Business Worth in Dubai?", "item": "https://assetica.net/how-much-is-my-business-worth-dubai" },
  ],
};

const valuationFactors = [
  {
    icon: DollarSign,
    title: "Annual Revenue & EBITDA",
    desc: "The most fundamental driver of value. Normalised EBITDA — adjusted for owner costs and one-off items — is the primary earnings base to which multiples are applied.",
  },
  {
    icon: TrendingUp,
    title: "Growth Rate (YoY)",
    desc: "Businesses growing revenue at 20%+ year-on-year command a significant multiple premium over flat or declining businesses in the same sector.",
  },
  {
    icon: Users,
    title: "Customer Concentration",
    desc: "High reliance on one or two customers (>40% of revenue) reduces value and multiple. Diversified customer bases with recurring contracts are rewarded.",
  },
  {
    icon: Building,
    title: "Industry & Market Position",
    desc: "Market leadership, defensible competitive advantages, and operation in high-growth sectors (tech, healthcare, fintech) drive above-average multiples.",
  },
  {
    icon: Award,
    title: "Assets & Intellectual Property",
    desc: "Tangible assets, proprietary technology, patents, brand value, and exclusive licences add to enterprise value beyond earnings-based calculations.",
  },
  {
    icon: CheckCircle,
    title: "UAE Regulatory Standing",
    desc: "Clean trade licence, VAT compliance, corporate tax position, visa and labour compliance, and any DIFC/ADGM regulatory status all affect buyer confidence and value.",
  },
];

const industryMultiples = [
  { industry: "Technology & SaaS", ebitda: "8x – 15x", revenue: "3x – 8x" },
  { industry: "Financial Services", ebitda: "6x – 12x", revenue: "2x – 5x" },
  { industry: "Healthcare & Medical", ebitda: "6x – 10x", revenue: "1.5x – 4x" },
  { industry: "Real Estate & Property", ebitda: "5x – 10x", revenue: "1x – 3x" },
  { industry: "Manufacturing", ebitda: "4x – 8x", revenue: "0.5x – 2x" },
  { industry: "Retail & E-commerce", ebitda: "3x – 7x", revenue: "0.3x – 1.5x" },
  { industry: "Professional Services", ebitda: "4x – 8x", revenue: "1x – 3x" },
  { industry: "F&B & Hospitality", ebitda: "3x – 6x", revenue: "0.5x – 1.5x" },
  { industry: "Logistics & Transport", ebitda: "4x – 7x", revenue: "0.5x – 1.5x" },
  { industry: "Construction", ebitda: "3x – 6x", revenue: "0.3x – 1x" },
];

const uaeFactors = [
  {
    title: "Trade Licence Type",
    desc: "Mainland licences typically command higher multiples than free zone licences due to broader operational scope and access to the local market. However, DIFC and ADGM companies are highly valued by international buyers for their common-law regulatory framework.",
  },
  {
    title: "UAE Corporate Tax Position",
    desc: "Since the introduction of 9% UAE corporate tax in June 2023, a business's tax structuring, qualifying income status, and free zone tax exemption position directly affects after-tax cash flows and therefore valuation.",
  },
  {
    title: "DIFC / ADGM Regulatory Standing",
    desc: "Businesses regulated by the Dubai Financial Services Authority (DFSA) or Financial Services Regulatory Authority (FSRA) command significant premiums from institutional and international buyers seeking regulated entities.",
  },
  {
    title: "Visa & Labour Compliance",
    desc: "Clean immigration and labour records, with properly structured employment contracts and end-of-service gratuity provisions, eliminate a significant area of buyer due diligence risk that would otherwise suppress price.",
  },
  {
    title: "Customer Base Composition",
    desc: "Businesses with a mix of local UAE and international customers are valued more highly than those wholly dependent on the local market, reflecting reduced geographic concentration risk and stronger growth potential.",
  },
  {
    title: "Real Estate Assets in UAE",
    desc: "Where the business owns UAE real estate — particularly in prime Dubai locations — this adds tangible asset value over and above the earnings-based valuation, and may qualify ownership for separate Golden Visa pathways.",
  },
];

export default function BusinessWorthDubai() {
  return (
    <>
      <SEOHead
        title="How Much is My Business Worth in Dubai? | Free Valuation Guide | Assetica"
        description="Find out how much your business is worth in Dubai. Expert valuation guide covering EBITDA multiples, DCF methods and market values for UAE businesses in 2026."
        canonical="/how-much-is-my-business-worth-dubai"
        schema={[faqSchema, howToSchema, breadcrumbSchema]}
      />

      <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
        <Navbar />

        {/* ── Hero ── */}
        <div className="pt-[72px]" style={{ backgroundColor: "#012241" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 bg-[#4BD1A0]/20 border border-[#4BD1A0]/40 rounded-full px-4 py-1.5 mb-6 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-[#4BD1A0] animate-pulse" />
              <span className="text-[#4BD1A0] text-xs font-semibold tracking-wide uppercase">UAE Business Valuation Guide 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display font-bold text-white text-3xl md:text-5xl leading-tight mb-6 max-w-3xl"
            >
              How Much Is My Business{" "}
              <span style={{ color: "#4BD1A0" }}>Worth in Dubai?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
            >
              Get an accurate picture of your Dubai business value. Expert guide covering EBITDA multiples by industry, DCF methodology, UAE-specific factors, and step-by-step valuation approaches for 2026.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.45 }}
              className="flex flex-wrap gap-3"
            >
              <a href="#contact-form" className="inline-flex items-center gap-2 bg-[#4BD1A0] text-[#012241] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-lg">
                Get a Free Estimate <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#multiples-table" className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/25 transition-colors">
                View Multiples Table
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Direct Answer Block (AEO/AI Citation) ── */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ borderLeft: "5px solid #4BD1A0", backgroundColor: "#f0fdf8" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>
                Direct Answer
              </p>
              <p className="text-[#012241] text-base md:text-lg leading-relaxed font-medium">
                A Dubai business is typically worth <strong>3x–6x its annual EBITDA</strong> for service businesses, or <strong>1x–3x annual revenue</strong> for early-stage companies. The exact value depends on industry, profitability, growth rate, customer concentration, and current UAE market conditions. Most SMEs in Dubai are valued between <strong>AED 500,000 and AED 50 million</strong>.
              </p>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                Technology and SaaS businesses achieve the highest multiples (8x–15x EBITDA). Financial services follow at 6x–12x. Retail and construction businesses trade at the lower end (3x–6x). For a certified valuation specific to your business, contact Assetica.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Key Valuation Factors ── */}
        <div className="py-12 md:py-16" style={{ backgroundColor: "#f8fafc" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="text-center mb-10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">What Drives Value</p>
                <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl mb-3">
                  Key Factors That Determine Your Business Value
                </h2>
                <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                  These six factors are the primary drivers of business value for Dubai and UAE companies across all sectors.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {valuationFactors.map((factor, i) => (
                <AnimatedSection key={factor.title} delay={i * 0.07}>
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#4BD1A0" }}>
                      <factor.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-[#012241] text-base mb-2">{factor.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{factor.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* ── EBITDA Multiples Table ── */}
        <div id="multiples-table" className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="mb-8">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">2026 Market Data</p>
                <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl mb-3">
                  UAE Business Valuation Multiples by Industry 2026
                </h2>
                <p className="text-slate-500 text-sm max-w-2xl">
                  EBITDA and revenue multiples for UAE businesses by sector. Based on Assetica's market analysis of comparable transactions and listed company benchmarks in the UAE and GCC markets.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: "#012241" }}>
                      <th className="text-left px-5 py-4 text-white font-semibold text-sm font-display">Industry</th>
                      <th className="text-left px-5 py-4 text-white font-semibold text-sm font-display">EBITDA Multiple</th>
                      <th className="text-left px-5 py-4 text-white font-semibold text-sm font-display">Revenue Multiple</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryMultiples.map((row, i) => (
                      <tr
                        key={row.industry}
                        style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8fafc" }}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-5 py-4 font-medium text-[#012241] text-sm">{row.industry}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 bg-[#4BD1A0]/15 text-[#012241] font-semibold text-sm px-3 py-1 rounded-full">
                            {row.ebitda}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-600 text-sm font-medium">{row.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Source: Assetica market analysis, UAE M&A transaction data, and listed comparable benchmarks (2026). Multiples vary based on individual business quality, growth rate, and deal structure. These ranges are indicative — contact Assetica for a sector-specific assessment.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* ── 3 Valuation Methods ── */}
        <div className="py-12 md:py-16" style={{ backgroundColor: "#f8fafc" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="text-center mb-10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Methodology</p>
                <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl mb-3">
                  3 Valuation Methods Used in the UAE
                </h2>
                <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                  Certified valuers in Dubai apply one or more of these methods depending on the business type, sector, and purpose of the valuation.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  method: "01",
                  title: "Discounted Cash Flow (DCF)",
                  tag: "Profitable businesses",
                  desc: "Projects future free cash flows over a 5–10 year period and discounts them to present value using a risk-adjusted rate (WACC). In UAE context, this reflects the 9% corporate tax rate, local market risk premiums, and sector growth assumptions. Best for businesses with stable, predictable earnings and positive growth trajectories.",
                  when: "M&A, investor presentations, bank financing, strategic planning",
                },
                {
                  method: "02",
                  title: "Market Comparables (EV/EBITDA)",
                  tag: "Established businesses",
                  desc: "Benchmarks your business against similar companies that have been sold or are publicly listed in the UAE, GCC, and comparable emerging markets. Applies the industry EBITDA or revenue multiple to your normalised earnings. The most commonly used method for SME transactions in Dubai's M&A market.",
                  when: "Business sales, shareholder exits, Golden Visa, regulatory compliance",
                },
                {
                  method: "03",
                  title: "Asset-Based Valuation",
                  tag: "Asset-heavy businesses",
                  desc: "Values the business based on its net tangible and intangible assets, adjusted to fair market value. Relevant for holding companies, real estate businesses, manufacturing operations, and businesses with significant property or equipment. Often combined with an earnings method to capture both asset and income value.",
                  when: "Holding companies, manufacturing, real estate, liquidation scenarios",
                },
              ].map((card, i) => (
                <AnimatedSection key={card.method} delay={i * 0.09}>
                  <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-display font-bold text-[#4BD1A0] text-2xl leading-none">{card.method}</span>
                      <span className="inline-flex items-center bg-[#4BD1A0]/10 text-[#012241] text-xs font-semibold px-3 py-1 rounded-full">{card.tag}</span>
                    </div>
                    <h3 className="font-display font-bold text-[#012241] text-lg mb-3">{card.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{card.desc}</p>
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Typically used for</p>
                      <p className="text-slate-600 text-xs leading-relaxed">{card.when}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* ── Quick Estimate Section ── */}
        <AnimatedSection>
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Rough Guide</p>
              <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl mb-3">
                Quick Business Value Estimate
              </h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto">
                Use these formulas for a ballpark estimate. For a certified valuation accepted by UAE authorities, investors, or courts, contact Assetica.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  label: "Profitable Business",
                  formula: "EBITDA × Industry Multiple",
                  example: "AED 1M EBITDA × 5x = AED 5M enterprise value",
                  note: "Most common method. Use normalised EBITDA (remove one-offs and owner costs).",
                  color: "#4BD1A0",
                },
                {
                  label: "Revenue-Based Estimate",
                  formula: "Annual Revenue × 1x–3x",
                  example: "AED 5M revenue × 2x = AED 10M indicative value",
                  note: "Used for early-stage or pre-profit businesses where revenue is the primary metric.",
                  color: "#60a5fa",
                },
                {
                  label: "Asset-Heavy Business",
                  formula: "Net Asset Value + Goodwill",
                  example: "AED 8M net assets + AED 2M goodwill = AED 10M",
                  note: "Relevant for manufacturing, real estate businesses, and holding companies.",
                  color: "#a78bfa",
                },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4" style={{ backgroundColor: item.color + "20", borderBottom: `3px solid ${item.color}` }}>
                    <p className="font-display font-bold text-[#012241] text-sm">{item.label}</p>
                  </div>
                  <div className="p-6">
                    <p className="font-display font-bold text-[#012241] text-lg mb-2">{item.formula}</p>
                    <p className="text-sm font-medium text-slate-600 mb-3 leading-relaxed italic">{item.example}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ── UAE-Specific Factors ── */}
        <div className="py-12 md:py-16" style={{ backgroundColor: "#012241" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#4BD1A0" }}>UAE Context</p>
                <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-3">
                  What Affects Business Value in Dubai Specifically
                </h2>
                <p className="text-white/60 text-sm max-w-2xl">
                  Beyond universal valuation drivers, these UAE-specific factors directly impact what your business is worth to buyers and investors in the region.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {uaeFactors.map((factor, i) => (
                <AnimatedSection key={factor.title} delay={i * 0.07}>
                  <div className="rounded-2xl p-6 border border-white/10 bg-white/5 h-full">
                    <div className="flex items-start gap-3 mb-3">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#4BD1A0" }} />
                      <h3 className="font-display font-bold text-white text-sm">{factor.title}</h3>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed pl-7">{factor.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ Section ── */}
        <div className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="text-center mb-10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Common Questions</p>
                <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl">
                  Business Valuation Dubai: FAQs
                </h2>
              </div>
            </AnimatedSection>
            <FaqSection faqs={faqs} title="" subtitle="" />
          </div>
        </div>

        {/* ── CTA / Contact Form ── */}
        <div id="contact-form" className="py-12 md:py-16 px-6 md:px-10" style={{ backgroundColor: "#f8fafc" }}>
          <div className="max-w-4xl mx-auto text-center mb-10">
            <AnimatedSection>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Free Consultation</p>
              <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl mb-3">
                Get Your Free Business Valuation Estimate
              </h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto">
                Tell us about your business and we'll provide an indicative valuation range within one business day. No obligation. All enquiries treated with complete confidentiality.
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
