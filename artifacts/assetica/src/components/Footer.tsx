import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import logoIcon from "@/assets/logo-icon.png";

const insights = [
  { name: "Buying a Running Business", slug: "navigating-business-valuation-buying-running-business" },
  { name: "Risk Management & Value Advisory", slug: "navigating-business-risks-strategic-value-advisory" },
  { name: "Optimal Timing to Sell a Business", slug: "selling-a-business-optimal-timing" },
  { name: "Mitigating Valuation Risks", slug: "mitigating-risks-business-valuation" },
  { name: "How to Create a Pitch Deck", slug: "how-to-create-a-pitch-deck" },
  { name: "Precise Financial Valuations", slug: "maximize-business-potential-financial-valuations" },
];

const services = [
  { name: "Due Diligence", slug: "due-diligence" },
  { name: "Business Structuring", slug: "business-structuring" },
  { name: "Building Pitch Deck", slug: "building-pitch-deck" },
  { name: "Financial Modelling", slug: "financial-modelling" },
  { name: "Buyer & Seller Negotiation", slug: "buyer-seller-negotiation" },
  { name: "Tax Valuation", slug: "tax-valuation" },
  { name: "Strategic Value Advisory", slug: "strategic-value-advisory" },
  { name: "Business Planning", slug: "business-planning" },
];

const Footer = () => (
  <footer style={{ backgroundColor: "#012241", color: "#e2e8f0" }}>
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

        <div>
          <div className="flex items-center gap-2 mb-5">
            <img src={logoIcon} alt="Assetica" className="h-9 w-auto" />
            <span className="font-bold text-xl tracking-widest text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>ASSETICA</span>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(226,232,240,0.65)" }}>
            Assetica is a leading independent valuation firm serving clients across the UAE, UK, and globally. We deliver precise, defensible valuations for businesses and assets.
          </p>
          <div className="flex items-center gap-3 mb-6">
            {[
              { href: "https://www.linkedin.com/company/asseticallc", icon: Linkedin, label: "LinkedIn", isReactIcon: false },
              { href: "https://www.instagram.com/assetica_net/", icon: FaInstagram, label: "Instagram", isReactIcon: true },
              { href: "https://x.com/Assetica_net", icon: FaXTwitter, label: "X", isReactIcon: true },
              { href: "https://www.facebook.com/profile.php?id=61561152382508", icon: Facebook, label: "Facebook", isReactIcon: false },
            ].map(({ href, icon: Icon, label, isReactIcon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ backgroundColor: "rgba(75,209,160,0.15)", color: "#4BD1A0" }}
              >
                {isReactIcon ? <Icon size={14} /> : <Icon className="w-3.5 h-3.5" />}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 text-sm" style={{ color: "rgba(226,232,240,0.65)" }}>
            <a href="tel:+971521551198" className="flex items-center gap-2 hover:text-[#4BD1A0] transition-colors">
              <Phone className="w-4 h-4 text-[#4BD1A0]" /> +971 52 155 1198
            </a>
            <a href="mailto:info@assetica.net" className="flex items-center gap-2 hover:text-[#4BD1A0] transition-colors">
              <Mail className="w-4 h-4 text-[#4BD1A0]" /> info@assetica.net
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#4BD1A0] shrink-0 mt-0.5" />
              <span>Dubai, UAE &amp; London, UK</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold mb-5 text-[#4BD1A0]">Our Services</h3>
          <div className="grid grid-cols-1 gap-2.5">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="text-sm transition-colors hover:text-[#4BD1A0]"
                style={{ color: "rgba(226,232,240,0.65)" }}
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold mb-5 text-[#4BD1A0]">Insights</h3>
          <div className="grid grid-cols-1 gap-2.5">
            {insights.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="text-sm transition-colors hover:text-[#4BD1A0]"
                style={{ color: "rgba(226,232,240,0.65)" }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold mb-5 text-[#4BD1A0]">Quick Links</h3>
          <div className="flex flex-col gap-2.5 mb-8">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Blog", path: "/blog" },
              { name: "Contact Us", path: "/contact" },
              { name: "Privacy Policy", path: "/privacy-policy" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm transition-colors hover:text-[#4BD1A0]"
                style={{ color: "rgba(226,232,240,0.65)" }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(75,209,160,0.1)", border: "1px solid rgba(75,209,160,0.2)" }}>
            <p className="text-sm font-semibold text-[#4BD1A0] mb-1">Free Consultation</p>
            <p className="text-xs mb-3" style={{ color: "rgba(226,232,240,0.6)" }}>
              Schedule a free consultation with our valuation experts today.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[#012241] text-xs font-bold px-4 py-2 rounded-full"
              style={{ backgroundColor: "#4BD1A0" }}
            >
              Book a Consultation
            </Link>
          </div>
        </div>

      </div>

      <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(226,232,240,0.1)" }}>
        <p className="text-xs text-center md:text-left" style={{ color: "rgba(226,232,240,0.4)" }}>
          © {new Date().getFullYear()} Assetica. All rights reserved. Business Valuation Services in Dubai &amp; Global.
        </p>
        <div className="flex gap-6 text-xs" style={{ color: "rgba(226,232,240,0.4)" }}>
          <Link to="/privacy-policy" className="hover:text-[#4BD1A0] transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
