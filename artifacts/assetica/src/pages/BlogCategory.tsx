import { useParams, Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "./Blog";

const categoryMap: Record<string, string> = {
  "business-valuation": "Business Valuation",
  "strategic-advisory": "Strategic Advisory",
  "business-sale": "Business Sale",
  "risk-management": "Risk Management",
  "pitch-deck": "Pitch Deck",
  "financial-valuation": "Financial Valuation",
};

const categoryDescriptions: Record<string, string> = {
  "business-valuation": "Expert articles on business valuation methodologies, DCF analysis, and company valuation in Dubai and the UAE.",
  "strategic-advisory": "Insights on strategic value advisory, risk management, and long-term business value creation.",
  "business-sale": "Guides on selling a business in the UAE, timing your exit, and maximising sale value.",
  "risk-management": "Articles on identifying, quantifying, and mitigating business valuation risks.",
  "pitch-deck": "Expert guides on creating investor-ready pitch decks for UAE and Gulf investors.",
  "financial-valuation": "Deep dives into financial valuation techniques, EBITDA multiples, and value drivers for UAE businesses.",
};

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();
  const displayName = categoryMap[category || ""] || category || "";
  const filtered = blogPosts.filter(p => p.category.toLowerCase() === displayName.toLowerCase());

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${displayName} Articles | Assetica Blog`,
    "url": `https://assetica.net/blog/category/${category}`,
    "itemListElement": filtered.map((post, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://assetica.net/blog/${post.slug}`,
      "name": post.title
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://assetica.net" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://assetica.net/blog" },
      { "@type": "ListItem", "position": 3, "name": displayName, "item": `https://assetica.net/blog/category/${category}` }
    ]
  };

  return (
    <>
    <SEOHead
      title={`${displayName} Articles | Assetica Business Valuation Blog`}
      description={categoryDescriptions[category || ""] || `Expert articles on ${displayName} from Assetica's valuation specialists in Dubai, UAE.`}
      canonical={`/blog/category/${category}`}
      schema={[categorySchema, breadcrumbSchema]}
    />
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <Navbar />
      <div className="pt-28 pb-6 px-4 md:px-8 max-w-7xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#4BD1A0" }}>Blog Category</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl" style={{ color: "#012241" }}>{displayName}</h1>
        <p className="text-slate-500 text-sm mt-2">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">No articles in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.06} className="h-full">
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#4BD1A0]/30 transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3"><span className="bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{post.category}</span></div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                      <h3 className="font-display font-bold text-sm leading-snug mb-3 group-hover:text-[#4BD1A0] transition-colors flex-1" style={{ color: "#012241" }}>{post.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-4">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "#4BD1A0" }}>Read More <ArrowUpRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
    </>
  );
};

export default BlogCategory;
