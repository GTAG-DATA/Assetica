import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowUpRight, FileText, Shield, Clock, Award, Star, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";

const heroImg = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=80";
const docImg = "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=80";

const eligibilityCategories = [
  {
    icon: "🏢",
    title: "Company Owners",
    desc: "UAE mainland or free zone business owners with a company valued at AED 2M+ qualify for the investor visa pathway.",
  },
  {
    icon: "💼",
    title: "Investors",
    desc: "Investors in UAE real estate, funds, or public companies. A certified valuation letter is required by GDRFA.",
  },
  {
    icon: "🚀",
    title: "Entrepreneurs",
    desc: "Founders of approved startups or businesses accredited by a recognised UAE incubator or government entity.",
  },
  {
    icon: "🏦",
    title: "High-Value Depositors",
    desc: "Individuals maintaining a qualifying bank deposit or financial portfolio in UAE-regulated institutions.",
  },
];

const valuationIncludes = [
  "Certified independent business valuation report",
  "GDRFA / ICA-compatible valuation letter",
  "DCF and market comparables analysis",
  "Business registration and ownership documentation review",
  "Audited financial statement analysis (3 years)",
  "Arabic translation services available on request",
  "Valuation certification by qualified valuer",
  "Post-submission advisory and revision support",
];

const processSteps = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "We assess your business structure, ownership, and visa pathway to confirm valuation requirements.",
    time: "Same day",
  },
  {
    step: "02",
    title: "Document Collection",
    desc: "Trade licence, audited accounts, ownership structure, and financial statements are submitted securely.",
    time: "1–2 days",
  },
  {
    step: "03",
    title: "Valuation Analysis",
    desc: "Our certified valuers apply DCF, asset-based, and market comparable methodologies to reach a defensible value.",
    time: "3–5 days",
  },
  {
    step: "04",
    title: "Certified Report Delivery",
    desc: "You receive a signed, stamped valuation report and supporting letter formatted for GDRFA submission.",
    time: "5–7 days total",
  },
];

const trustStats = [
  { value: "500+", label: "Businesses Valued" },
  { value: "AED 2M+", label: "Minimum Qualifying Value" },
  { value: "5–7 Days", label: "Typical Turnaround" },
  { value: "100%", label: "GDRFA Acceptance Rate" },
];

const faqs = [
  {
    q: "Do I need a business valuation for the UAE Golden Visa?",
    a: "Yes. If you are applying for the UAE Golden Visa under the investor or business owner category, the General Directorate of Residency and Foreigners Affairs (GDRFA) and the Federal Authority for Identity, Citizenship, Customs and Port Security (ICA) require an independent, certified business valuation confirming your company's value meets the AED 2 million threshold. Assetica provides Golden Visa-compliant valuations accepted by UAE authorities.",
  },
  {
    q: "What is the minimum business value required for the UAE Golden Visa?",
    a: "The UAE Golden Visa investor category requires a minimum business or investment value of AED 2 million (approximately USD 545,000). This must be evidenced by an independent valuation report from a certified valuation firm. Assetica confirms whether your business qualifies and provides the necessary certified documentation.",
  },
  {
    q: "How long does a Golden Visa business valuation take?",
    a: "Assetica typically delivers a certified Golden Visa business valuation report within 5 to 7 business days from receipt of the required financial information and documentation. Expedited 2–3 business day turnaround is available for urgent visa applications.",
  },
  {
    q: "Which UAE authority accepts Assetica's Golden Visa valuation report?",
    a: "Our valuation reports are prepared to the format and standards required by the General Directorate of Residency and Foreigners Affairs (GDRFA) in Dubai and the Federal Authority for Identity, Citizenship, Customs and Port Security (ICA) across the UAE. We have a 100% acceptance rate with these authorities for properly submitted valuations.",
  },
  {
    q: "Can Assetica value a free zone company for the Golden Visa?",
    a: "Yes. Assetica provides Golden Visa valuations for businesses registered in all major UAE free zones including DIFC, ADGM, JAFZA, Dubai Multi Commodities Centre (DMCC), Abu Dhabi Free Zones, and all other recognised UAE free zone authorities. Both free zone and mainland company valuations are accepted for Golden Visa purposes.",
  },
  {
    q: "What documents do I need to provide for a Golden Visa valuation?",
    a: "You will typically need to provide: your UAE trade licence, Memorandum of Association (MOA), audited financial statements for the past 2–3 years (or management accounts for newer businesses), bank statements, and proof of ownership. Our team will provide a tailored document checklist after your initial consultation.",
  },
  {
    q: "Can I get a Golden Visa if my business is less than 2 years old?",
    a: "Yes. For businesses under 2 years old, Assetica uses forward-looking valuation methodologies that assess the business's current market value based on available financial information, business plan, market comparables, and growth prospects. We regularly value early-stage businesses that meet the Golden Visa investment threshold.",
  },
  {
    q: "Does Assetica help with Golden Visa valuations for non-Dubai UAE businesses?",
    a: "Yes. Assetica provides Golden Visa business valuations for companies registered across all UAE emirates including Abu Dhabi, Sharjah, Ras Al Khaimah, Ajman, Fujairah, and Umm Al Quwain, as well as all UAE free zones.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Golden Visa Business Valuation UAE",
  "description": "Independent, certified business valuation reports for UAE Golden Visa applications. GDRFA-compliant valuations delivered in 5–7 days for business owners, investors and entrepreneurs.",
  "provider": { "@type": "Organization", "name": "Assetica", "url": "https://assetica.net" },
  "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
  "url": "https://assetica.net/golden-visa-valuation",
  "serviceType": "Business Valuation",
  "offers": {
    "@type": "Offer",
    "name": "Golden Visa Valuation Report",
    "description": "Certified business valuation report for UAE Golden Visa investor category. Accepted by GDRFA and ICA.",
  },
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get a Business Valuation for UAE Golden Visa",
  "description": "Step-by-step process for obtaining a certified business valuation for the UAE Golden Visa investor category.",
  "step": processSteps.map((s) => ({
    "@type": "HowToStep",
    "name": s.title,
    "text": s.desc,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://assetica.net" },
    { "@type": "ListItem", "position": 2, "name": "Golden Visa Business Valuation UAE", "item": "https://assetica.net/golden-visa-valuation" },
  ],
};

export default function GoldenVisaValuation() {
  return (
    <>
      <SEOHead
        title="Golden Visa Business Valuation UAE | GDRFA-Compliant | Assetica"
        description="Certified business valuation for UAE Golden Visa applications. GDRFA-accepted reports in 5–7 days for business owners and investors. AED 2M+ threshold confirmed. Free consultation."
        canonical="/golden-visa-valuation"
        schema={[serviceSchema, faqSchema, howToSchema, breadcrumbSchema]}
      />

      <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
        <Navbar />

        {/* ── Hero ── */}
        <div className="pt-[72px] px-4 md:px-8">
          <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(420px, 68vh, 640px)" }}>
            <img src={heroImg} alt="Dubai skyline, UAE Golden Visa business valuation" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#012241]/80 via-[#012241]/70 to-[#012241]/50" />

            <div className="relative h-full flex flex-col justify-center px-6 md:px-14 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 bg-[#4BD1A0]/20 border border-[#4BD1A0]/40 rounded-full px-4 py-1.5 mb-6 w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-[#4BD1A0] animate-pulse" />
                <span className="text-[#4BD1A0] text-xs font-semibold tracking-wide uppercase">UAE Golden Visa: Investor Category</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-display font-bold text-white text-3xl md:text-5xl leading-tight mb-5"
              >
                Golden Visa{" "}
                <span style={{ color: "#4BD1A0" }}>Business Valuation</span>{" "}
                UAE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3 }}
                className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
              >
                GDRFA-accepted, independently certified valuation reports for UAE Golden Visa applications. Delivered in 5–7 business days. Trusted by 500+ business owners across the UAE.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.45 }}
                className="flex flex-wrap gap-3"
              >
                <Link to="/contact" className="inline-flex items-center gap-2 bg-[#4BD1A0] text-[#012241] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-lg">
                  Get Your Valuation <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a href="#process" className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/25 transition-colors">
                  How It Works
                </a>
              </motion.div>
            </div>

            {/* Floating stats bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 px-6 md:px-14 py-4">
              <div className="flex flex-wrap gap-6 md:gap-10">
                {trustStats.map((s) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-white text-lg md:text-xl">{s.value}</span>
                    <span className="text-white/60 text-xs">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── What is the UAE Golden Visa? (AEO section) ── */}
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 grid md:grid-cols-[1fr_400px] gap-10 md:gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">What is the UAE Golden Visa?</p>
              <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl leading-snug mb-5">
                A 10-year UAE residency visa for investors, entrepreneurs and business owners
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                The UAE Golden Visa is a long-term residency scheme granting 5 or 10 year renewable residency to qualifying investors, business owners, skilled professionals and entrepreneurs. For the <strong className="text-slate-700">business owner and investor category</strong>, the General Directorate of Residency and Foreigners Affairs (GDRFA) requires an independent, certified valuation confirming the business value meets the <strong className="text-slate-700">AED 2,000,000 threshold</strong>.
              </p>
              <p className="text-slate-500 leading-relaxed mb-6">
                Unlike standard residency visas, the Golden Visa is not tied to an employer and provides long-term security for you and your family. Assetica prepares the certified valuation reports required to support your application, in the exact format expected by UAE authorities.
              </p>
              <div className="flex flex-wrap gap-2">
                {["10-Year Renewable Residency", "Family Sponsorship", "No Employer Tie", "UAE-Wide Coverage"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "#4BD1A0" }} /> {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={docImg} alt="Business valuation documents for UAE Golden Visa" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#012241] rounded-2xl px-5 py-4 shadow-lg">
                <p className="text-[#4BD1A0] text-xs font-semibold uppercase tracking-wide mb-1">Minimum Threshold</p>
                <p className="text-white font-display font-bold text-2xl">AED 2,000,000</p>
                <p className="text-white/60 text-xs mt-0.5">Business value required</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Who Qualifies ── */}
        <div className="py-12 md:py-16" style={{ backgroundColor: "#f8fafc" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="text-center mb-10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Eligibility</p>
                <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl">Who Needs a Golden Visa Valuation?</h2>
              </div>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eligibilityCategories.map((cat, i) => (
                <AnimatedSection key={cat.title} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
                    <div className="text-3xl mb-4">{cat.icon}</div>
                    <h3 className="font-display font-bold text-[#012241] text-base mb-2">{cat.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* ── Process Steps ── */}
        <div id="process" className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Our Process</p>
                <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl max-w-lg">
                  From consultation to certified report in as little as 5 days
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-4 gap-0 relative">
              {/* connecting line */}
              <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {processSteps.map((step, i) => (
                <AnimatedSection key={step.step} delay={i * 0.1}>
                  <div className="relative text-center px-4">
                    <div className="w-16 h-16 rounded-full border-2 border-slate-200 bg-white flex flex-col items-center justify-center mx-auto mb-5 shadow-sm relative z-10">
                      <span className="text-[#4BD1A0] font-display font-bold text-xs">{step.step}</span>
                    </div>
                    <h3 className="font-display font-bold text-[#012241] text-sm mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">{step.desc}</p>
                    <span className="inline-flex items-center gap-1 bg-[#4BD1A0]/10 text-[#012241] text-xs font-medium px-2.5 py-1 rounded-full">
                      <Clock className="w-3 h-3" style={{ color: "#4BD1A0" }} /> {step.time}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* ── What's Included ── */}
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-20">
            <div className="rounded-3xl overflow-hidden" style={{ backgroundColor: "#012241" }}>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>Complete Service</p>
                  <h2 className="font-display font-bold text-white text-2xl md:text-3xl leading-snug mb-6">
                    Everything included in your Golden Visa valuation report
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-8">
                    Our Golden Visa valuation service is fully end-to-end. Every report is signed and stamped by a certified valuer and formatted to GDRFA and ICA requirements.
                  </p>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-[#4BD1A0] text-[#012241] px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-colors">
                    Start Your Application <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l border-white/10">
                  <ul className="space-y-3">
                    {valuationIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#4BD1A0" }} />
                        <span className="text-white/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Why Assetica ── */}
        <div className="py-12 md:py-16" style={{ backgroundColor: "#f8fafc" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Shield, title: "GDRFA Accepted", desc: "Every report is prepared to the exact format and standard required by the General Directorate of Residency and Foreigners Affairs." },
                  { icon: Award, title: "Certified Valuers", desc: "Reports signed by professionally qualified valuers with recognised credentials. Defensible to any UAE authority." },
                  { icon: FileText, title: "Full Documentation", desc: "We handle the full valuation report, supporting letter, and all documentation needed for a complete, submission-ready package." },
                ].map((item, i) => (
                  <AnimatedSection key={item.title} delay={i * 0.08}>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#4BD1A0" }}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-display font-bold text-[#012241] text-base mb-2">{item.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            {/* Related services row */}
            <AnimatedSection>
              <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Related Services</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Business Valuation", href: "/services/business-valuation" },
                    { label: "Tax Valuation", href: "/services/tax-valuation" },
                    { label: "Business Structuring", href: "/services/business-structuring" },
                    { label: "Family Office Valuation", href: "/family-office-valuation" },
                    { label: "UHNWI Advisory", href: "/hni-uhnwi-valuation" },
                  ].map((rel) => (
                    <Link key={rel.label} to={rel.href} className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-[#012241] hover:text-white border border-slate-200 text-slate-700 text-xs font-medium px-3.5 py-2 rounded-full transition-colors">
                      {rel.label} <ChevronRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <AnimatedSection>
              <div className="text-center mb-10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Common Questions</p>
                <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl">
                  UAE Golden Visa Valuation: FAQs
                </h2>
              </div>
            </AnimatedSection>
            <FaqSection faqs={faqs} title="" subtitle="" />
          </div>
        </div>

        {/* ── CTA / Contact Form ── */}
        <div className="py-12 md:py-16 px-6 md:px-10" style={{ backgroundColor: "#f8fafc" }}>
          <div className="max-w-4xl mx-auto text-center mb-10">
            <AnimatedSection>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Get Started Today</p>
              <h2 className="font-display font-bold text-[#012241] text-2xl md:text-3xl mb-3">
                Get your Golden Visa valuation in 5–7 days
              </h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto">
                Book a free consultation and we'll confirm your eligibility, outline the documentation required, and provide a fixed-price quote, all within one business day.
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
