import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle, Target, Users, Award, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";

const heroImg = "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1800&q=80";
const teamImg = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80";
const officeImg = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80";

const reasons = [
  { icon: Target, title: "Comprehensive Valuation Solutions", desc: "Discover Assetica's business valuation services around the world, offering independent valuations for businesses and assets. Ensure compliance and make confident decisions." },
  { icon: Users, title: "Expertise Across Industries", desc: "Our seasoned professionals bring decades of cross-industry expertise to every engagement, from SMEs to Fortune 500 companies across the UAE, UK, and globally." },
  { icon: Award, title: "Regulatory Compliance", desc: "All our valuations adhere to UAE, UK, and international regulatory standards. Our reports are accepted by banks, courts, and regulatory authorities worldwide." },
  { icon: Lightbulb, title: "Strategic Value Advisory", desc: "We don't just value your business, we help you understand and enhance it. Our strategic insights guide long-term growth and value maximisation." },
];

const aboutFaqs = [
  {
    q: "How long has Assetica been providing business valuation services?",
    a: "Assetica's team brings over 30 years of combined experience at the highest levels of business valuation in the UAE, UK, and globally. Our seasoned professionals have worked across every major industry and asset class.",
  },
  {
    q: "Where is Assetica headquartered?",
    a: "Assetica is headquartered in Dubai, UAE with operations in London, UK. We serve clients globally, with particular depth of coverage across the Middle East, Europe, and Southeast Asia.",
  },
  {
    q: "What makes Assetica different from other valuation firms?",
    a: "Assetica combines deep technical expertise with a genuinely client-focused approach. We are dedicated to securing the optimal price or valuation by co-creating strategies tailored to each client's specific circumstances. Our transparent reporting, personalised consultation, and commitment to accuracy set us apart.",
  },
  {
    q: "Does Assetica provide valuations for intangible assets?",
    a: "Yes. Assetica has specialised expertise in valuing intangible assets including intellectual property, brand equity, customer relationships, software, and other non-physical assets. These are often critical components of overall business value.",
  },
  {
    q: "What types of clients does Assetica serve?",
    a: "Assetica serves a wide range of clients including private business owners, investors, venture capital and private equity firms, multinational corporations, financial institutions, legal professionals, and government entities across the UAE, UK, and globally.",
  },
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Assetica",
  "url": "https://assetica.net/about",
  "description": "Assetica brings 30+ years of valuation expertise across Dubai, GCC, UK & Europe. Trusted by 500+ businesses for M&A, due diligence and strategic advisory.",
  "publisher": {
    "@type": "Organization",
    "name": "Assetica",
    "url": "https://assetica.net",
    "logo": "https://assetica.net/logo.png",
    "foundingLocation": "Dubai, UAE",
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": "10-50" },
    "areaServed": ["AE", "GB", "SA", "KW", "BH", "QA", "OM", "EU"]
  }
};

const aboutFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": aboutFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }))
};

const billAndersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bill Anderson",
  "jobTitle": "Senior Valuation Advisor",
  "description": "RICS Associate with 30+ years of experience in business valuation across Dubai, UAE and the UK. Specialises in M&A valuations, Golden Visa certifications, DCF modelling, and DIFC/ADGM regulatory frameworks.",
  "worksFor": {
    "@type": "Organization",
    "name": "Assetica",
    "url": "https://assetica.net"
  },
  "url": "https://assetica.net/about",
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Professional Certification",
    "name": "RICS Associate"
  }
};

const About = () => (
  <>
    <SEOHead
      title="About Assetica | 30+ Years of Business Valuation Expertise in Dubai"
      description="Assetica brings 30+ years of valuation expertise across Dubai, GCC, UK & Europe. Trusted by 500+ businesses for M&A, due diligence and strategic advisory."
      canonical="/about"
      schema={[aboutPageSchema, aboutFaqSchema, billAndersonSchema]}
    />
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
    <Navbar />

    <div className="pt-[72px] px-4 md:px-8">
      <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(280px, 45vh, 420px)" }}>
        <img src={heroImg} alt="About Assetica, Business Valuation Dubai" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#012241]/50 via-[#012241]/60 to-[#012241]/80" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>About Us</p>
          <h1 className="font-display font-bold text-white text-3xl md:text-5xl max-w-3xl leading-tight">
            Trusted Business Valuation Experts in Dubai &amp; Global
          </h1>
          <p className="text-white/70 mt-4 text-sm md:text-base max-w-2xl leading-relaxed">
            Over 30 years of combined experience delivering precise, independent valuations that drive confident business decisions.
          </p>
        </div>
      </div>
    </div>

    {/* Mission & Story */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
      <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start mb-16">
        <AnimatedSection>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Our Story</p>
          <div className="w-8 h-0.5 bg-[#4BD1A0]" />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <p className="text-slate-800 text-xl md:text-2xl leading-relaxed font-medium max-w-3xl mb-6">
            Assetica was established to fill a critical need in the UAE and UK markets: a <span style={{ color: "#4BD1A0" }} className="font-semibold">genuinely independent, technically rigorous</span> business valuation firm that puts clients first.
          </p>
          <p className="text-slate-500 text-base leading-relaxed">
            Starting with a focus on business valuation in Dubai, we have grown to serve clients across the UAE, UK, and 15+ countries worldwide, delivering world-class valuation services that empower better financial decisions across every industry.
          </p>
        </AnimatedSection>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <AnimatedSection direction="left">
          <div className="relative rounded-2xl overflow-hidden h-80 md:h-96">
            <img src={teamImg} alt="Assetica team, business valuation experts" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#012241]/60 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="text-[#012241] text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: "#4BD1A0" }}>Our Expert Team</span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="right" delay={0.15}>
          <div className="rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between" style={{ backgroundColor: "#012241" }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>Our Mission</p>
              <h2 className="font-display font-bold text-white text-xl md:text-2xl leading-snug mb-5">
                To be the most trusted business valuation partner for companies across the UAE, UK, and globally.
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                We provide comprehensive valuation services, from due diligence and financial modelling to pitch deck development and strategic advisory, all under one roof, all to the highest professional standards.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                { val: "30+", label: "Years experience" },
                { val: "500+", label: "Valuations done" },
                { val: "UAE & UK", label: "Headquarters" },
                { val: "15+", label: "Countries served" },
              ].map(({ val, label }) => (
                <div key={label} className="bg-white/10 rounded-xl px-4 py-3">
                  <p className="font-display font-bold text-white text-lg">{val}</p>
                  <p className="text-white/50 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>

    {/* Why Choose Us */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
      <AnimatedSection className="mb-10">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Why Choose Assetica</p>
        <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "#012241" }}>Comprehensive Valuation Solutions for Your Business</h2>
      </AnimatedSection>
      <div className="grid md:grid-cols-2 gap-4">
        {reasons.map((r, i) => (
          <AnimatedSection key={r.title} delay={i * 0.08}>
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#4BD1A0]/30 transition-all duration-300 h-full">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(75,209,160,0.12)" }}>
                <r.icon className="w-5 h-5" style={{ color: "#4BD1A0" }} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-3" style={{ color: "#012241" }}>{r.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>

    {/* Trusted Banner */}
    <div className="px-4 md:px-8 pb-8">
      <AnimatedSection>
        <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: "#012241" }}>
          <img src={officeImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
          <div className="relative px-8 md:px-16 py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>Trusted Globally</p>
            <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-4">Trusted by Global Businesses</h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
              From startups to multinational corporations, businesses across the UAE, UK, and 15+ countries rely on Assetica for precise, independent valuations that drive confident decisions.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/40 text-xs mb-8">
              {["IFRS Compliant", "UAE Standards", "UK Standards", "RICS Aligned", "ISO Certified Methodology"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" style={{ color: "#4BD1A0" }} /> {t}
                </span>
              ))}
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[#012241] px-8 py-3.5 rounded-full font-bold text-sm transition-colors"
              style={{ backgroundColor: "#4BD1A0" }}
            >
              Get in Touch <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>

    {/* Team section */}
    <AnimatedSection className="max-w-5xl mx-auto px-4 md:px-8 py-14">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#4BD1A0" }}>Our Team</span>
        <h2 className="font-display font-bold text-2xl md:text-3xl mt-2" style={{ color: "#012241" }}>The Experts Behind Your Valuation</h2>
      </div>
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4" style={{ background: "#012241" }}>
            BA
          </div>
          <h3 className="font-display font-bold text-lg" style={{ color: "#012241" }}>Bill Anderson</h3>
          <p className="text-sm font-medium mt-0.5" style={{ color: "#4BD1A0" }}>Senior Valuation Advisor</p>
          <p className="text-xs text-slate-400 mt-0.5 mb-4">RICS Associate | Dubai, UAE</p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Bill leads Assetica's valuation engagements across the UAE and UK, specialising in M&amp;A valuations, Golden Visa certifications, and family office advisory. He brings deep expertise in DCF modelling, market comparables analysis, and regulatory compliance across DIFC, ADGM, and international frameworks.
          </p>
        </div>
      </div>
    </AnimatedSection>

    <FaqSection
      faqs={aboutFaqs}
      title="About Assetica, FAQs"
      subtitle="Common questions about who we are and how we work."
    />

    <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
      <AnimatedSection>
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: "#012241" }}>Want to Learn the Valuation Process?</h2>
            <p className="text-slate-500 text-sm">Schedule your consultation with our experts today.</p>
          </div>
          <ContactForm />
        </div>
      </AnimatedSection>
    </div>

    <Footer />
  </div>
  </>
);

export default About;
