import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Assetica" className="h-9 w-auto" />
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path ? "text-[#4BD1A0]" : "text-[#012241] hover:text-[#4BD1A0]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+971529798302"
            className="flex items-center gap-2 text-sm font-semibold text-[#012241] hover:text-[#4BD1A0] transition-colors"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4BD1A0" }}>
              <Phone className="w-3.5 h-3.5 text-white" />
            </div>
            +971 52 979 8302
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#012241" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#4BD1A0")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#012241")}
          >
            Get in Touch
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-[#012241] p-1"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium py-1 ${location.pathname === link.path ? "text-[#4BD1A0]" : "text-[#012241]"}`}
                >
                  {link.name}
                </Link>
              ))}
              <a href="tel:+971529798302" className="flex items-center gap-2 text-sm font-semibold text-[#012241]">
                <Phone className="w-4 h-4" /> +971 52 979 8302
              </a>
              <Link
                to="/contact"
                className="inline-flex justify-center items-center gap-2 text-white px-5 py-3 rounded-full text-sm font-semibold mt-1"
                style={{ backgroundColor: "#012241" }}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
