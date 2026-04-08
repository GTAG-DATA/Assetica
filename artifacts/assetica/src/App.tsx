import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Industries from "@/pages/Industries";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import GoldenVisaValuation from "@/pages/GoldenVisaValuation";
import FamilyOfficeValuation from "@/pages/FamilyOfficeValuation";
import NotFound from "@/pages/NotFound";
import BlogCategory from "@/pages/BlogCategory";
import Admin from "@/pages/Admin";
import WhatsAppButton from "@/components/WhatsAppButton";

const queryClient = new QueryClient();

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function ConditionalWhatsApp() {
  const { pathname } = useLocation();
  if (pathname === "/admin") return null;
  return <WhatsAppButton />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/golden-visa-valuation" element={<GoldenVisaValuation />} />
          <Route path="/family-office-valuation" element={<FamilyOfficeValuation />} />
          <Route path="/blog/category/:category" element={<BlogCategory />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ConditionalWhatsApp />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
