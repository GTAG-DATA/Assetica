import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "./Blog";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <Navbar />
      <div className="pt-32 text-center">
        <h1 className="font-display font-bold text-2xl" style={{ color: "#012241" }}>Post not found</h1>
        <Link to="/blog" className="text-[#4BD1A0] mt-4 inline-block">← Back to Blog</Link>
      </div>
      <Footer />
    </div>
  );

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "url": `https://assetica.net/blog/${post.slug}`,
    "datePublished": post.date,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": "Bill Anderson",
      "jobTitle": "Senior Valuation Advisor",
      "worksFor": { "@type": "Organization", "name": "Assetica", "url": "https://assetica.net" }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Assetica",
      "url": "https://assetica.net",
      "logo": "https://assetica.net/logo.png"
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://assetica.net/blog/${post.slug}` }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://assetica.net" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://assetica.net/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://assetica.net/blog/${post.slug}` }
    ]
  };

  return (
    <>
    <SEOHead
      title={post.title}
      description={post.excerpt}
      canonical={`/blog/${post.slug}`}
      ogType="article"
      ogImage={post.image}
      schema={[blogPostingSchema, breadcrumbSchema]}
    />
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <Navbar />
      <div className="pt-[72px] px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(280px, 45vh, 420px)" }}>
          <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#012241]/45 via-[#012241]/55 to-[#012241]/80" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <span className="text-xs font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full border" style={{ color: "#4BD1A0", borderColor: "#4BD1A0" }}>{post.category}</span>
            <h1 className="font-display font-bold text-white text-2xl md:text-4xl max-w-3xl leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 mt-4 text-white/60 text-xs">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#4BD1A0] transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <AnimatedSection>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
            <div
              className="prose prose-slate max-w-none"
              style={{ fontFamily: "var(--font-body)" }}
              dangerouslySetInnerHTML={{ __html: post.content
                .replace(/<h2>/g, '<h2 style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:1.25rem;color:#012241;margin-top:2rem;margin-bottom:0.75rem;">')
                .replace(/<p>/g, '<p style="color:#64748b;line-height:1.75;margin-bottom:1rem;font-size:0.9375rem;">')
              }}
            />
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: "#012241" }}>
                BA
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#012241" }}>Bill Anderson</p>
                <p className="text-xs text-slate-400">Senior Valuation Advisor | RICS Associate, Assetica</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mt-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl mb-1" style={{ color: "#012241" }}>Need a Business Valuation in Dubai?</h2>
              <p className="text-slate-500 text-sm">Our experts are ready to help. Get a free initial consultation today.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 text-white px-6 py-2.5 rounded-full font-semibold text-sm" style={{ backgroundColor: "#012241" }}>
                Get in Touch <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a href="tel:+971529798302" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full border" style={{ color: "#4BD1A0", borderColor: "#4BD1A0" }}>
                +971 52 979 8302
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
        <AnimatedSection>
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl mb-1" style={{ color: "#012241" }}>Contact Our Valuation Experts</h2>
              <p className="text-slate-500 text-sm">Free initial consultation for all new enquiries.</p>
            </div>
            <ContactForm />
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </div>
    </>
  );
};

export default BlogPost;
