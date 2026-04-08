import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle, ChevronRight, Star, Users, Award, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import CounterStat from "@/components/CounterStat";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";
import { FeatureHighlightCard } from "@/components/ui/feature-highlight-card";

const heroImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80";
const officeImg = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80";
const meetingImg = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80";
const dueDiligenceImg = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80";
const pitchImg = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80";
const taxImg = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80";
const cityDubaiImg = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80";

const serviceCards = [
  { title: "Due Diligence", desc: "In-depth analysis that minimises risk and maximises investment confidence.", image: dueDiligenceImg, slug: "due-diligence" },
  { title: "Financial Modelling", desc: "Precise valuations using financial metrics, market data, and industry benchmarks.", image: taxImg, slug: "financial-modelling" },
  { title: "Building Pitch Deck", desc: "Investor-ready presentations that compel and convert.", image: pitchImg, slug: "building-pitch-deck" },
  { title: "Strategic Value Advisory", desc: "Actionable insights to enhance value and drive sustainable growth.", image: officeImg, slug: "strategic-value-advisory" },
];

const whyChoose = [
  { icon: CheckCircle, title: "Comprehensive Valuation Services", desc: "End-to-end business valuation services covering every aspect of your company's financial landscape." },
  { icon: Users, title: "Expertise Across Industries", desc: "Our seasoned professionals bring decades of cross-industry experience to deliver accurate valuations." },
  { icon: TrendingUp, title: "Advanced Analytical Tools", desc: "We leverage cutting-edge financial modelling and data analytics for precise valuations." },
  { icon: Award, title: "Regulatory Compliance", desc: "All valuations are conducted in full compliance with UAE, UK and international standards." },
  { icon: Star, title: "Personalised Consultation", desc: "Every client receives a dedicated valuation specialist and tailored service approach." },
  { icon: CheckCircle, title: "Timely & Transparent Reporting", desc: "Clear, actionable reports delivered on time, so you can make decisions with confidence." },
];

const homepageFaqs = [
  {
    q: "What business valuation services does Assetica offer in Dubai?",
    a: "Assetica offers a comprehensive range of business valuation services in Dubai including due diligence, business structuring, pitch deck development, financial modelling, buyer and seller negotiation, tax valuation, strategic value advisory, and business planning. We serve clients across the UAE, UK, and globally.",
  },
  {
    q: "Why should I choose Assetica for business valuation in Dubai?",
    a: "Assetica brings over 30 years of combined experience at the highest level of business valuation. Our team of seasoned professionals provides precise valuations that reflect the true potential of your business. We are dedicated to securing the optimal price or valuation through a client-focused, transparent approach.",
  },
  {
    q: "How does Assetica conduct a business valuation?",
    a: "Our business valuation process involves a comprehensive approach, analysing your financial statements, historical performance data, industry trends, current market conditions, competitive landscape, and other key factors to deliver a thorough and accurate assessment of your company's worth.",
  },
  {
    q: "What industries does Assetica cover for valuation services?",
    a: "Assetica serves clients across all major industries including technology, manufacturing, real estate, financial services, retail, healthcare, logistics, and professional services. Our cross-industry expertise ensures accurate, market-relevant valuations regardless of your sector.",
  },
  {
    q: "Does Assetica provide valuations for mergers and acquisitions?",
    a: "Yes. Our buyer and seller negotiation service and financial modelling expertise make Assetica an ideal partner for M&A transactions. We facilitate successful negotiations during mergers, acquisitions, or sales, ensuring favourable outcomes for all parties.",
  },
  {
    q: "How do I get started with Assetica's valuation services?",
    a: "Getting started is straightforward: contact us via phone at +971 52 155 1198, email info@assetica.net, or fill in our contact form. We offer free initial consultations and most quote requests receive a response within one business day.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Assetica",
  "url": "https://assetica.net",
  "logo": "https://assetica.net/logo.png",
  "description": "Independent business valuation firm in Dubai, UAE & UK offering M&A advisory, due diligence, financial modelling and strategic advisory services.",
  "telephone": "+971521551198",
  "email": "info@assetica.net",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "sameAs": ["https://www.linkedin.com/company/assetica"]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Assetica",
  "url": "https://assetica.net",
  "telephone": "+971521551198",
  "email": "info@assetica.net",
  "priceRange": "£££",
  "description": "Assetica provides independent business valuation, due diligence, financial modelling and M&A advisory services in Dubai, UAE, UK and Europe.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "areaServed": ["AE", "GB", "SA", "KW", "BH", "QA", "OM", "EU"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Business Valuation Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Valuation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Due Diligence" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Financial Modelling" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tax Valuation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Strategic Advisory" } }
    ]
  }
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Assetica",
  "url": "https://assetica.net"
};

const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": homepageFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }))
};

const Index = () => (
  <>
    <SEOHead
      title="Business Valuation Services in Dubai, UAE & UK | Assetica"
      description="Assetica, independent business valuation firm in Dubai & UK. Expert valuations for M&A, due diligence, tax, financial modelling and strategic advisory across UAE, GCC & Europe."
      canonical="/"
      schema={[organizationSchema, localBusinessSchema, webSiteSchema, homepageFaqSchema]}
    />
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
    <Navbar />

    {/* Hero Card */}
    <div className="pt-[72px] px-4 md:px-8">
      <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(440px, 75vh, 700px)" }}>
        <img
          src={heroImg}
          alt="Expert Business Valuation Services in Dubai"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#012241]/60 via-[#012241]/65 to-[#012241]/80" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6 text-white/90 text-xs font-medium tracking-wide"
          >
            Leaders in Business Valuation, UAE &amp; UK
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-display font-bold text-white text-3xl md:text-5xl lg:text-6xl max-w-4xl leading-tight mb-5"
          >
            Expert{" "}
            <span style={{ color: "#4BD1A0" }}>Business Exit & Valuation</span>{" "}
            Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mb-8"
          >
            Reliable, accurate business valuation services trusted by companies across the UAE, UK, and globally. From due diligence to financial modelling, Assetica delivers comprehensive valuations that drive confident decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#4BD1A0] text-[#012241] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-lg"
            >
              Get in Touch <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/25 transition-colors"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-5 left-6 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[officeImg, meetingImg].map((src, i) => (
              <img key={i} src={src} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
            ))}
          </div>
          <span className="text-white/70 text-xs">30+ years combined experience</span>
        </div>
      </div>
    </div>

    {/* About Intro Row */}
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 grid md:grid-cols-[220px_1fr] gap-8 md:gap-16 items-start">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">About Assetica</p>
          <div className="w-8 h-0.5 bg-[#4BD1A0]" />
        </div>
        <div>
          <p className="text-slate-800 text-xl md:text-2xl leading-relaxed font-medium max-w-3xl">
            Assetica is a leader in the <span style={{ color: "#4BD1A0" }} className="font-semibold">UAE and UK</span> for comprehensive and professional company valuations. With over 30 years of expertise and a proven track record, we provide detailed valuation reports that help you make informed decisions about your business.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["UAE & UK Headquarters", "30+ Years Experience", "Global Coverage", "All Industries Covered"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "#4BD1A0" }} /> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* Bento Grid */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <AnimatedSection delay={0} className="md:col-span-1">
          <div className="rounded-2xl p-8 h-full min-h-[280px] flex flex-col justify-between" style={{ backgroundColor: "#012241" }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>Business Valuation</p>
              <h3 className="text-white font-display font-bold text-xl leading-snug">
                Independent valuations for businesses and assets, ensuring compliance and confident decisions.
              </h3>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#4BD1A0" }} />
              <span className="text-white/50 text-xs">UAE, UK &amp; Global Coverage</span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="md:col-span-1">
          <div className="relative rounded-2xl overflow-hidden min-h-[280px]">
            <img src={cityDubaiImg} alt="Dubai business district" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#012241]/50 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full">Dubai &amp; Global</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <p className="text-white font-semibold text-sm">Business Valuation in Dubai</p>
              <p className="text-white/70 text-xs mt-0.5">UAE, UK &amp; international markets</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="md:col-span-1">
          <div className="bg-white rounded-2xl p-8 h-full min-h-[280px] flex flex-col justify-between shadow-sm border border-slate-100">
            <div>
              <p className="font-display font-bold text-5xl" style={{ color: "#012241" }}>30<span style={{ color: "#4BD1A0" }}>+</span></p>
              <p className="text-slate-500 text-sm mt-1">Years of Combined Experience</p>
            </div>
            <div className="space-y-3 mt-6">
              {[
                "Business Valuation",
                "Financial Modelling",
                "Due Diligence",
              ].map((label) => (
                <div key={label}>
                  <div className="text-xs text-slate-500 mb-1">
                    <span>{label}</span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: "#4BD1A0" }} />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>

    {/* Stats Strip */}
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <p className="text-center text-sm text-slate-400 font-medium mb-10 uppercase tracking-widest">Trusted by businesses worldwide</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <div className="text-center"><CounterStat end={30} suffix="+" label="Years Experience" /></div>
          <div className="text-center"><CounterStat end={500} suffix="+" label="Valuations Completed" /></div>
          <div className="text-center"><CounterStat end={8} suffix="" label="Core Service Lines" /></div>
          <div className="text-center"><CounterStat end={15} suffix="+" label="Countries Served" /></div>
        </div>
      </div>
    </AnimatedSection>

    {/* Feature Highlight Card */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <FeatureHighlightCard
        imageSrc="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80"
        imageAlt="Business valuation analytics dashboard"
        title="Precision Valuation, Proven Results"
        description="Our expert team combines 30+ years of experience with cutting-edge financial modelling to deliver valuations that stand up in boardrooms, courts, and across borders. Trusted by 500+ businesses in Dubai, GCC, UK & Europe."
        buttonText="Book a Free Consultation"
        onButtonClick={() => window.location.href = '/contact'}
      />
    </div>

    {/* Why Choose Us */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
      <AnimatedSection className="text-center mb-12">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Why Choose Assetica</p>
        <h2 className="font-display font-bold text-2xl md:text-4xl mb-3" style={{ color: "#012241" }}>
          Why Choose Business{" "}
          <span style={{ color: "#4BD1A0" }}>Valuation Services</span>{" "}
          in Dubai?
        </h2>
        <p className="text-slate-500 text-base max-w-xl mx-auto">From initial consultations to comprehensive valuations, we ensure precision, clarity, and actionable insights.</p>
      </AnimatedSection>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {whyChoose.map((item, i) => (
          <AnimatedSection key={item.title} delay={i * 0.07}>
            <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#4BD1A0]/30 transition-all duration-300 h-full">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(75,209,160,0.12)" }}>
                <item.icon className="w-5 h-5" style={{ color: "#4BD1A0" }} />
              </div>
              <h3 className="font-display font-semibold text-base mb-2" style={{ color: "#012241" }}>{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>

    {/* Services Section */}
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
      <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
        <AnimatedSection direction="left" className="md:sticky md:top-28">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Our Services</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl leading-snug mb-4" style={{ color: "#012241" }}>
            Professional Business Valuation Services in Dubai
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Explore our specialised business valuation services designed to empower your financial decisions, from initial consultations to comprehensive valuations.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#012241" }}
          >
            View All Services <ArrowUpRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {serviceCards.map((svc, i) => (
            <AnimatedSection key={svc.slug} delay={i * 0.08}>
              <Link
                to={`/services/${svc.slug}`}
                className="group relative rounded-2xl overflow-hidden block"
                style={{ height: 320 }}
              >
                <img src={svc.image} alt={svc.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#012241]/90 via-[#012241]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-white font-bold text-base leading-snug mb-1">{svc.title}</p>
                      <p className="text-white/65 text-xs leading-relaxed">{svc.desc}</p>
                    </div>
                    <div className="shrink-0 bg-[#4BD1A0] rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>

    {/* About / CTA Banner */}
    <div className="px-4 md:px-8 pb-8">
      <AnimatedSection>
        <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: "#012241" }}>
          <img src={meetingImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center px-8 md:px-16 py-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>Get to Know Us</p>
              <h2 className="font-display font-bold text-white text-2xl md:text-3xl leading-snug mb-4">
                Your Trusted Business Valuer
              </h2>
              <p className="text-white/65 text-sm leading-relaxed">
                At Assetica, we excel in delivering top-tier valuation services through our unparalleled expertise, extensive experience, and client-focused approach. With over 30 years of experience at the highest level, our team provides precise valuations that reflect the true potential of your business.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                {[
                  { val: "30+", label: "Years experience" },
                  { val: "500+", label: "Valuations done" },
                  { val: "UAE & UK", label: "Headquarters" },
                  { val: "Global", label: "Client coverage" },
                ].map(({ val, label }) => (
                  <div key={label} className="bg-white/10 rounded-xl px-4 py-3">
                    <p className="font-display font-bold text-white text-lg">{val}</p>
                    <p className="text-white/50 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#012241] px-5 py-2.5 rounded-full text-sm font-bold transition-colors mt-2"
                style={{ backgroundColor: "#4BD1A0" }}
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>

    {/* Dubai Image Strip */}
    <div className="px-4 md:px-8 pb-8">
      <AnimatedSection>
        <div className="relative rounded-2xl overflow-hidden h-48 md:h-56">
          <img src={cityDubaiImg} alt="Dubai skyline, business valuation hub" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#012241]/55" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div>
              <p className="text-white/75 text-sm mb-2">Serving Businesses Across Dubai, UAE &amp; Globally</p>
              <h3 className="font-display font-bold text-white text-xl md:text-2xl">
                Unlock the Potential of Your Business
              </h3>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>

    <FaqSection
      faqs={homepageFaqs}
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about Assetica's business valuation services in Dubai and globally."
    />

    {/* Inline Contact Form */}
    <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
      <AnimatedSection>
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Get Started</p>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: "#012241" }}>
              Request a Free Valuation Consultation
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Please take a moment to fill out the form and one of our valuation experts will get back to you shortly.
            </p>
          </div>
          <ContactForm />
        </div>
      </AnimatedSection>
    </div>

    <Footer />
  </div>
  </>
);

export default Index;
