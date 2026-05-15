import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => (
  <>
    <SEOHead
      title="Privacy Policy | Assetica"
      description="Assetica's privacy policy detailing how we collect, use and protect your personal data across our business valuation services."
      canonical="/privacy-policy"
      noIndex={true}
    />
  <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
    <Navbar />
    <div className="pt-[72px] px-4 md:px-8">
      <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(200px, 30vh, 300px)", backgroundColor: "#012241" }}>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-display font-bold text-white text-3xl md:text-4xl">Privacy Policy</h1>
          <p className="text-white/70 mt-2 text-sm">Last updated: January 2025</p>
        </div>
      </div>
    </div>
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <AnimatedSection>
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
          {[
            { title: "Information We Collect", body: "We collect information you provide directly to us when you submit forms, contact us via email or phone, or request our services. This includes your name, email address, phone number, and details about your business or valuation requirements." },
            { title: "How We Use Your Information", body: "We use the information we collect to provide, maintain, and improve our valuation services; communicate with you about your enquiries and projects; send service-related communications; comply with legal obligations; and improve our website and marketing efforts." },
            { title: "Information Sharing", body: "We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality obligations." },
            { title: "Data Security", body: "We implement appropriate technical and organisational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure." },
            { title: "Cookies", body: "We use cookies on our website to see how you interact with it. By accepting cookies, you agree to our use of such cookies. You can choose to decline cookies, though this may affect your experience of our website." },
            { title: "Your Rights", body: "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your information. To exercise these rights, please contact us at info@assetica.net." },
            { title: "Contact Us", body: "If you have questions about this Privacy Policy or our privacy practices, please contact us at: info@assetica.net | +971 52 979 8302 | Dubai, UAE & London, UK." },
          ].map(s => (
            <div key={s.title} className="mb-8 last:mb-0">
              <h2 className="font-display font-bold text-lg mb-3" style={{ color: "#012241" }}>{s.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
    <Footer />
  </div>
  </>
);

export default PrivacyPolicy;
