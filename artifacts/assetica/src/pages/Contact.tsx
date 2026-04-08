import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";
import FaqSection from "@/components/FaqSection";

const heroImg = "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1800&q=80";

const contactFaqs = [
  {
    q: "How quickly will Assetica respond to my enquiry?",
    a: "We aim to respond to all enquiries within one business day. For urgent valuation requirements, please call us directly at +971 52 155 1198 and we will prioritise your request.",
  },
  {
    q: "Is there a charge for an initial consultation?",
    a: "No. Assetica offers free initial consultations for all new clients. During this consultation, we will assess your requirements and recommend the most appropriate valuation service.",
  },
  {
    q: "Can I get a valuation report done remotely?",
    a: "Yes. Many of our valuation services can be conducted remotely, especially desktop and indicative valuations. For more complex engagements, our team can visit your location in Dubai, the UAE, or UK.",
  },
  {
    q: "What information do I need to provide for a valuation?",
    a: "Typically, we require financial statements for the past 3 years, details of assets and liabilities, management accounts, any existing valuation reports, and a brief overview of your business operations. Our team will provide a specific document checklist after your initial consultation.",
  },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Assetica",
  "url": "https://assetica.net/contact",
  "description": "Get in touch with Assetica's valuation experts in Dubai & London. Free initial consultation for business valuation, M&A advisory and due diligence.",
  "mainEntity": {
    "@type": "Organization",
    "name": "Assetica",
    "telephone": "+971521551198",
    "email": "info@assetica.net",
    "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
    "openingHours": "Mo-Fr 09:00-18:00"
  }
};

const contactFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": contactFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }))
};

const Contact = () => (
  <>
    <SEOHead
      title="Contact Assetica | Business Valuation Enquiries, Dubai & UK"
      description="Get in touch with Assetica's valuation experts in Dubai & London. Free initial consultation for business valuation, M&A advisory and due diligence."
      canonical="/contact"
      schema={[contactPageSchema, contactFaqSchema]}
    />
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
    <Navbar />

    <div className="pt-[72px] px-4 md:px-8">
      <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(250px, 40vh, 380px)" }}>
        <img src={heroImg} alt="Contact Assetica, Business Valuation Dubai" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#012241]/50 via-[#012241]/60 to-[#012241]/80" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>Contact Us</p>
          <h1 className="font-display font-bold text-white text-3xl md:text-5xl max-w-2xl leading-tight">
            Get in Touch With Our Valuation Experts
          </h1>
          <p className="text-white/70 mt-4 text-sm max-w-lg leading-relaxed">
            Free initial consultation for all new clients. Reach our team in Dubai or London today.
          </p>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Contact Info */}
        <AnimatedSection direction="left">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Get in Touch</p>
              <div className="w-8 h-0.5 bg-[#4BD1A0] mb-6" />
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-4" style={{ color: "#012241" }}>
                Speak to Our Valuation Specialists
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Whether you need a quick indicative valuation or a comprehensive business assessment, our team is ready to help. Contact us today for a free initial consultation.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  label: "Phone / WhatsApp",
                  value: "+971 52 155 1198",
                  href: "tel:+971521551198",
                  sub: "Available Mon–Fri, 9am–6pm GST",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@assetica.net",
                  href: "mailto:info@assetica.net",
                  sub: "We reply within 1 business day",
                },
                {
                  icon: MapPin,
                  label: "Locations",
                  value: "Dubai, UAE  •  London, UK",
                  href: null,
                  sub: "Serving clients globally",
                },
                {
                  icon: Clock,
                  label: "Business Hours",
                  value: "Monday – Friday: 9:00 AM – 6:00 PM",
                  href: null,
                  sub: "GST (Gulf Standard Time)",
                },
              ].map(({ icon: Icon, label, value, href, sub }) => (
                <div key={label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(75,209,160,0.12)" }}>
                    <Icon className="w-5 h-5" style={{ color: "#4BD1A0" }} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="font-semibold text-sm hover:text-[#4BD1A0] transition-colors" style={{ color: "#012241" }}>{value}</a>
                    ) : (
                      <p className="font-semibold text-sm" style={{ color: "#012241" }}>{value}</p>
                    )}
                    <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection direction="right" delay={0.1}>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h2 className="font-display font-bold text-xl mb-1" style={{ color: "#012241" }}>Send Us a Message</h2>
            <p className="text-slate-500 text-sm mb-6">Fill in the form below and we'll get back to you shortly.</p>
            <ContactForm />
          </div>
        </AnimatedSection>
      </div>
    </div>

    <FaqSection
      faqs={contactFaqs}
      title="Contact FAQs"
      subtitle="Answers to common questions about working with Assetica."
    />

    <Footer />
  </div>
  </>
);

export default Contact;
