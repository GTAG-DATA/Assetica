/**
 * Post-build SSG script — generates per-route index.html files with:
 *   • Correct title, description, canonical, OG/Twitter meta tags
 *   • JSON-LD structured data baked into static HTML (visible to crawlers
 *     and audit tools without JavaScript execution)
 *
 * Usage: node scripts/generate-seo-html.mjs
 * Called automatically via `npm run build:ssg`
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const BASE_URL = 'https://assetica.net';
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

// ─── Helpers ────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function truncateDesc(text, maxLen = 155) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s\S+$/, '') + '\u2026';
}

// ─── Sitewide schemas (injected on every page) ──────────────────────────────

const sitewideSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Assetica',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      'Independent business valuation firm in Dubai, UAE & UK offering M&A advisory, due diligence, financial modelling and strategic advisory services.',
    telephone: '+971521551198',
    email: 'info@assetica.net',
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    sameAs: ['https://www.linkedin.com/company/assetica'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Assetica',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/services?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
];

// ─── Per-page schema builders ────────────────────────────────────────────────

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, item }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item,
    })),
  };
}

function serviceSchema(name, description, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Organization', name: 'Assetica', url: BASE_URL },
    areaServed: ['AE', 'GB', 'SA', 'EU'],
    url,
    dateModified: new Date().toISOString().split('T')[0],
  };
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function howToSchema(name, description, steps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map(({ name: stepName, text }, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: stepName,
      text,
    })),
  };
}

function itemListSchema(name, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map(({ name: itemName, url: itemUrl }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: itemName,
      url: itemUrl,
    })),
  };
}

function blogPostingSchema({ title, excerpt, slug, datePublished }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    url: `${BASE_URL}/blog/${slug}`,
    datePublished,
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Person', name: 'Bill Anderson', jobTitle: 'Senior Valuation Advisor', worksFor: { '@type': 'Organization', name: 'Assetica', url: BASE_URL } },
    publisher: {
      '@type': 'Organization',
      name: 'Assetica',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${slug}` },
  };
}

// ─── Build HTML block ────────────────────────────────────────────────────────

function buildSeoBlock({ title, description, canonical, noIndex = false, schemas = [], ogType = 'website' }) {
  const fullTitle = title.includes('Assetica') ? title : `${title} | Assetica`;
  const canonicalUrl = canonical === '/' ? `${BASE_URL}/` : `${BASE_URL}${canonical}`;
  const robots = noIndex ? 'noindex, nofollow' : 'index, follow';
  const safeTitle = escapeHtml(fullTitle);
  const safeDesc = escapeHtml(description);

  // Merge sitewide + per-page schemas (skip sitewide on noIndex pages)
  const allSchemas = noIndex ? schemas : [...sitewideSchemas, ...schemas];
  const schemaScripts = allSchemas
    .map((s) => `    <script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n');

  return `<!-- SEO_START -->
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Assetica" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />
${schemaScripts}
    <!-- SEO_END -->`;
}

const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

function buildPreRenderBlock(html) {
  if (!html) return '';
  return `\n    <div id="seo-prerender" aria-hidden="true" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0">${html}</div>`;
}

function generateHtml(page, preRenderHtml = '') {
  const seoBlock = buildSeoBlock(page);
  let html = baseHtml.replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/m, seoBlock);
  if (preRenderHtml) {
    const preRenderBlock = buildPreRenderBlock(preRenderHtml);
    html = html.replace('<div id="root"></div>', preRenderBlock + '\n    <div id="root"></div>');
  }
  return html;
}

function writeRoute(routePath, page, preRenderHtml = '') {
  const html = generateHtml(page, preRenderHtml);
  const outputDir =
    routePath === '/' ? distDir : join(distDir, routePath.replace(/^\//, ''));
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'index.html'), html, 'utf-8');
  console.log(`  ✓  ${routePath}`);
}

// ─── Route Definitions ───────────────────────────────────────────────────────

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Assetica',
  url: BASE_URL,
  telephone: '+971521551198',
  email: 'info@assetica.net',
  priceRange: '£££',
  description:
    'Assetica provides independent business valuation, due diligence, financial modelling and M&A advisory services in Dubai, UAE, UK and Europe.',
  address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
  areaServed: ['AE', 'GB', 'SA', 'KW', 'BH', 'QA', 'OM', 'EU'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Business Valuation Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Valuation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Due Diligence' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Financial Modelling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tax Valuation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Strategic Advisory' } },
    ],
  },
};

const staticRoutes = [
  {
    path: '/',
    title: 'Independent Business Valuation Firm | Dubai, UAE & UK | Assetica',
    description:
      'Assetica, independent business valuation firm in Dubai & UK. Expert valuations for M&A, due diligence, tax, financial modelling and strategic advisory across UAE, GCC & Europe.',
    canonical: '/',
    schemas: [
      localBusinessSchema,
      breadcrumb([{ name: 'Home', item: `${BASE_URL}/` }]),
    ],
  },
  {
    path: '/about',
    title: 'About Assetica | 30+ Years of Business Valuation Expertise in Dubai',
    description:
      'Assetica brings 30+ years of valuation expertise across Dubai, GCC, UK & Europe. Trusted by 500+ businesses for M&A, due diligence and strategic advisory.',
    canonical: '/about',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Assetica',
        url: `${BASE_URL}/about`,
        description:
          'Assetica brings 30+ years of valuation expertise across Dubai, GCC, UK & Europe.',
        about: { '@type': 'Organization', name: 'Assetica', url: BASE_URL },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Bill Anderson',
        jobTitle: 'Senior Valuation Advisor',
        description: 'RICS Associate with expertise in M&A valuations, Golden Visa certification, family office advisory, and DCF modelling across the UAE, GCC, and UK.',
        worksFor: { '@type': 'Organization', name: 'Assetica', url: BASE_URL },
        address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
        url: `${BASE_URL}/about`,
      },
      breadcrumb([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'About', item: `${BASE_URL}/about` },
      ]),
    ],
  },
  {
    path: '/services',
    title: 'Business Valuation & Advisory Services Dubai | Assetica',
    description:
      'Expert business valuation, due diligence, financial modelling, tax valuation and strategic advisory in Dubai, UAE, GCC, UK & Europe. Free consultation.',
    canonical: '/services',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Assetica Business Valuation Services',
        url: `${BASE_URL}/services`,
        itemListElement: [
          'Business Valuation',
          'Due Diligence',
          'Business Structuring',
          'Pitch Deck',
          'Financial Modelling',
          'Buyer & Seller Negotiation',
          'Tax Valuation',
          'Strategic Value Advisory',
          'Business Planning',
        ].map((name, i) => ({ '@type': 'ListItem', position: i + 1, name })),
      },
      breadcrumb([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
      ]),
    ],
  },
  {
    path: '/industries',
    title: 'Industries We Serve | Business Valuation Across Dubai & UAE | Assetica',
    description:
      'Assetica provides expert business valuation across Banking, Real Estate, Manufacturing, Shipping, Legal and Government sectors in Dubai, UAE, GCC & UK.',
    canonical: '/industries',
    schemas: [
      itemListSchema('Industries We Serve', [
        { name: 'Banking & Financial Services Valuation', url: `${BASE_URL}/industries` },
        { name: 'Real Estate & Property Valuation', url: `${BASE_URL}/industries` },
        { name: 'Manufacturing & Industrial Valuation', url: `${BASE_URL}/industries` },
        { name: 'Shipping & Logistics Valuation', url: `${BASE_URL}/industries` },
        { name: 'Legal & Professional Services Valuation', url: `${BASE_URL}/industries` },
        { name: 'Government & Public Sector Valuation', url: `${BASE_URL}/industries` },
        { name: 'Technology & SaaS Valuation', url: `${BASE_URL}/industries` },
        { name: 'Healthcare & Pharma Valuation', url: `${BASE_URL}/industries` },
      ]),
      breadcrumb([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Industries', item: `${BASE_URL}/industries` },
      ]),
    ],
  },
  {
    path: '/contact',
    title: 'Contact Assetica | Business Valuation Enquiries, Dubai & UK',
    description:
      "Get in touch with Assetica's valuation experts in Dubai & London. Free initial consultation for business valuation, M&A advisory and due diligence.",
    canonical: '/contact',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Assetica',
        url: `${BASE_URL}/contact`,
        description:
          "Get in touch with Assetica's valuation experts in Dubai & London.",
        mainEntity: {
          '@type': 'ProfessionalService',
          name: 'Assetica',
          telephone: '+971521551198',
          email: 'info@assetica.net',
          address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
        },
      },
      breadcrumb([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Contact', item: `${BASE_URL}/contact` },
      ]),
    ],
  },
  {
    path: '/blog',
    title: 'Business Valuation Blog | Expert Insights from Assetica Dubai',
    description:
      "Expert insights on business valuation, M&A, due diligence and financial advisory from Assetica's team in Dubai, UAE & UK.",
    canonical: '/blog',
    schemas: [
      breadcrumb([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Blog', item: `${BASE_URL}/blog` },
      ]),
    ],
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Assetica',
    description:
      "Assetica's privacy policy detailing how we collect, use and protect your personal data across our business valuation services.",
    canonical: '/privacy-policy',
    noIndex: true,
    schemas: [],
  },
  {
    path: '/admin',
    title: 'Admin | Assetica',
    description: 'Assetica internal admin panel.',
    canonical: '/admin',
    noIndex: true,
    schemas: [],
  },
  {
    path: '/golden-visa-valuation',
    title: 'Golden Visa Business Valuation UAE | GDRFA-Compliant | Assetica',
    description:
      'Certified business valuation for UAE Golden Visa applications. GDRFA-accepted reports in 5–7 days for business owners and investors. AED 2M+ threshold confirmed. Free consultation.',
    canonical: '/golden-visa-valuation',
    schemas: [
      serviceSchema(
        'Golden Visa Business Valuation UAE',
        'Certified business valuation for UAE Golden Visa applications. GDRFA-accepted independent reports in 5–7 days for business owners and investors.',
        `${BASE_URL}/golden-visa-valuation`
      ),
      faqSchema([
        { q: 'What is the minimum business valuation for UAE Golden Visa?', a: 'The UAE Golden Visa for business owners requires a minimum business valuation of AED 2 million (approximately USD 545,000). Assetica provides GDRFA-accepted certified valuation reports confirming this threshold.' },
        { q: 'How long does a Golden Visa valuation report take?', a: 'Assetica typically delivers certified Golden Visa valuation reports within 5–7 business days, depending on the complexity of the business and availability of financial records.' },
        { q: 'Which authority accepts the business valuation for UAE Golden Visa?', a: 'The General Directorate of Residency and Foreigners Affairs (GDRFA) in Dubai, and the Federal Authority for Identity and Citizenship (ICA) for other emirates, accept certified business valuation reports for Golden Visa applications.' },
        { q: 'What documents are needed for a Golden Visa business valuation?', a: 'Typically required: 3 years of audited financial statements, trade license, MOA/AOA, shareholder registry, asset register, and any existing valuations. Assetica will guide you through the full document checklist.' },
        { q: 'Can a startup qualify for UAE Golden Visa through business valuation?', a: 'Yes, early-stage businesses can qualify if their independently certified valuation meets or exceeds AED 2 million. Assetica uses internationally recognised methodologies including DCF and market comparables appropriate for startups.' },
        { q: "Does Assetica's valuation report satisfy GDRFA requirements?", a: "Yes. Assetica is an independent certified valuation firm. Our reports follow IFRS and RICS-aligned standards and are structured to satisfy GDRFA and ICA documentation requirements for Golden Visa applications." },
        { q: 'What valuation methods does Assetica use for Golden Visa reports?', a: 'We use Income Approach (DCF), Market Approach (comparable transactions), and Asset-Based Approach depending on the business type. The most appropriate method, or the best combination, is selected to maximise defensibility before authorities.' },
        { q: 'Can I get a Golden Visa valuation for a holding company or investment vehicle?', a: 'Yes. Assetica provides valuations for holding companies, SPVs, investment vehicles, and family-owned businesses for Golden Visa purposes. Each structure is assessed on its specific assets, investments, and income profile.' },
      ]),
      howToSchema(
        'How to Get a Business Valuation for UAE Golden Visa',
        'Step-by-step process to obtain a certified business valuation for UAE Golden Visa application through Assetica.',
        [
          { name: 'Initial Consultation', text: 'Contact Assetica for a free consultation. Discuss your business type, ownership structure, and Golden Visa timeline to confirm eligibility and scope.' },
          { name: 'Document Submission', text: 'Provide financial statements, trade license, MOA, asset register and shareholder information. Assetica will supply a detailed document checklist.' },
          { name: 'Valuation Analysis', text: 'Our analysts apply DCF, market, and asset-based approaches to determine the independent certified value of your business against the AED 2M threshold.' },
          { name: 'Certified Report Delivery', text: 'Receive a GDRFA-compliant certified valuation report within 5–7 business days, ready for submission with your Golden Visa application.' },
        ]
      ),
      breadcrumb([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Golden Visa Business Valuation', item: `${BASE_URL}/golden-visa-valuation` },
      ]),
    ],
  },
  {
    path: '/family-office-valuation',
    title: 'Family Office Valuation Services | DIFC & ADGM | Assetica',
    description:
      'Independent valuation services for family offices across DIFC, ADGM and the GCC. Portfolio valuation, succession planning, real estate, private equity and estate valuations for HNI and UHNWI families.',
    canonical: '/family-office-valuation',
    schemas: [
      serviceSchema(
        'Family Office Valuation Services UAE',
        'Independent valuation services for family offices across DIFC, ADGM and GCC. Portfolio, succession, real estate and private equity valuations for HNI and UHNWI families.',
        `${BASE_URL}/family-office-valuation`
      ),
      faqSchema([
        { q: 'What is a family office valuation?', a: 'A family office valuation is an independent, comprehensive assessment of all assets held by a family office, including private equity stakes, real estate, business interests, investment portfolios and intangible assets. It provides a single net worth picture essential for wealth governance, succession planning and regulatory compliance.' },
        { q: 'Why do family offices in DIFC and ADGM need independent valuations?', a: 'DIFC and ADGM regulations require family offices to maintain accurate records of asset values for governance, reporting and compliance purposes. Independent valuations also support investment committee decisions, beneficiary distributions and inter-generational wealth transfers.' },
        { q: 'How often should a family office update its valuations?', a: 'Best practice is annual valuation updates for governance and reporting, with interim updates triggered by major transactions, market dislocations, succession events or regulatory reviews. Assetica offers retainer-based relationships for ongoing valuation support.' },
        { q: 'Can Assetica value both listed and unlisted assets for a family office?', a: 'Yes. Assetica provides valuations for unlisted private companies, private equity funds, real estate portfolios, operating businesses and illiquid assets alongside guidance on publicly traded holdings. We cover the full spectrum of family office asset classes.' },
        { q: 'What is the difference between a family office valuation and a business valuation?', a: 'A business valuation focuses on a single operating company. A family office valuation is broader: it consolidates multiple asset classes including businesses, real estate, private equity, bonds and alternative investments into a unified net asset value framework for wealth governance.' },
        { q: 'Does Assetica handle cross-border family office mandates?', a: 'Yes. Assetica has experience with family offices holding assets across UAE, UK, Saudi Arabia, India, Singapore and Europe. We coordinate multi-jurisdiction valuations and apply locally accepted standards (RICS, IFRS, IVS) in each market.' },
        { q: 'How does Assetica support succession planning for family offices?', a: 'We provide asset valuations that form the foundation of succession plans, helping families understand current wealth distribution, plan equitable beneficiary allocations, structure trusts and holding companies, and satisfy DIFC Wills Service requirements.' },
        { q: 'How long does a family office valuation engagement take?', a: 'Scope varies by complexity. A focused mandate (single business or asset class) typically takes 2–4 weeks. A comprehensive multi-asset family office valuation may take 4–10 weeks, including document collection, analysis and report issuance.' },
      ]),
      breadcrumb([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Family Office Valuation', item: `${BASE_URL}/family-office-valuation` },
      ]),
    ],
  },
];

// Service detail routes with per-service schemas
const serviceRoutes = [
  {
    slug: 'business-valuation',
    title: 'Business Valuation Dubai UAE | Expert Independent Reports | Assetica',
    intro:
      'Assetica delivers independent, credible business valuations for companies across the UAE, UK, GCC, and internationally. Whether you are raising capital, planning an exit, resolving a shareholder dispute, or meeting a regulatory requirement, our valuations provide the rigour and defensibility your situation demands.',
  },
  {
    slug: 'due-diligence',
    title: 'Due Diligence Services in Dubai & UAE | Assetica',
    intro:
      "Our thorough research and analysis reveal your business's strengths, weaknesses, and growth potential. Assetica's due diligence service minimises risk and maximises investment confidence in every transaction.",
  },
  {
    slug: 'business-structuring',
    title: 'Business Structuring Services in Dubai & UAE | Assetica',
    intro:
      'We establish a strong valuation foundation by assessing the legal, financial, and operational aspects of your business. Our business structuring service ensures your corporate structure is optimised for valuation, investment, and growth.',
  },
  {
    slug: 'building-pitch-deck',
    title: 'Pitch Deck Services in Dubai & UAE | Assetica',
    intro:
      "We craft compelling presentations that highlight your company's value proposition, financials, and growth prospects. Our pitch decks are designed to captivate investors and stakeholders from the first slide.",
  },
  {
    slug: 'financial-modelling',
    title: 'Financial Modelling Services in Dubai & UAE | Assetica',
    intro:
      "Our precise valuation uses financial metrics, market trends, and industry benchmarks to determine your company's worth. Advanced financial models that project future performance and guide strategic decision-making.",
  },
  {
    slug: 'buyer-seller-negotiation',
    title: 'Buyer & Seller Negotiation Advisory in Dubai & UAE | Assetica',
    intro:
      'We facilitate successful negotiations during mergers, acquisitions, or sales, ensuring favourable outcomes for all parties. Our experienced team acts as skilled intermediaries protecting your interests throughout the deal process.',
  },
  {
    slug: 'tax-valuation',
    title: 'Tax Valuation Services in Dubai & UAE | Assetica',
    intro:
      "We assess tax impacts and develop optimised strategies to enhance your company's financial health. Our tax valuations are fully compliant with UAE, UK, and international tax regulations.",
  },
  {
    slug: 'strategic-value-advisory',
    title: 'Strategic Value Advisory in Dubai & UAE | Assetica',
    intro:
      "We offer insights to enhance your company's overall value and ensure long-term growth. Our strategic value advisory service goes beyond valuation to provide a roadmap for sustainable value creation.",
  },
  {
    slug: 'business-planning',
    title: 'Business Planning Services in Dubai & UAE | Assetica',
    intro:
      'Our advanced financial models project future performance and guide strategic decision-making. Comprehensive business plans that attract investment and drive sustainable growth in competitive markets.',
  },
];

// Blog post routes with BlogPosting schema
const blogRoutes = [
  {
    slug: 'navigating-business-valuation-buying-running-business',
    title: 'Navigating the World of Business Valuation: A Step-by-Step Guide to Buying a Running Business',
    excerpt:
      'Acquiring a running business can be a strategic move to enhance your investment portfolio, diversify income streams, or venture into a new sector.',
    datePublished: '2024-10-04',
  },
  {
    slug: 'navigating-business-risks-strategic-value-advisory',
    title: 'Navigating Business Risks: Effective Risk Management through Strategic Value Advisory',
    excerpt:
      "In today's rapidly evolving business landscape, navigating risks effectively is crucial for maintaining a competitive edge and achieving sustainable growth.",
    datePublished: '2024-09-27',
  },
  {
    slug: 'selling-a-business-optimal-timing',
    title: "Selling a Business? Here's How to Determine the Optimal Timing",
    excerpt:
      'Selling a business at the right time is essential for maximising success and profitability. Entrepreneurs must consider market conditions, financial performance, and sale preparation strategies.',
    datePublished: '2024-09-20',
  },
  {
    slug: 'mitigating-risks-business-valuation',
    title: 'Safeguard Your Company: Mitigating Risks in Business Valuation',
    excerpt:
      "Protect your business from valuation-related risks with Assetica's expertise. Understanding common pitfalls can save you significant time and money.",
    datePublished: '2024-08-08',
  },
  {
    slug: 'how-to-create-a-pitch-deck',
    title: 'How to Create a Pitch Deck: A Step-by-Step Guide',
    excerpt:
      'Assetica crafts pitch decks that captivate and highlight your value, financials, and growth prospects for maximum investor appeal.',
    datePublished: '2024-07-31',
  },
  {
    slug: 'maximize-business-potential-financial-valuations',
    title: 'Maximise Your Business Potential with Precise Financial Valuations',
    excerpt:
      "In the competitive business world, understanding your company's true value is crucial, whether you're seeking investment, planning a merger, or making strategic decisions.",
    datePublished: '2024-07-17',
  },
];

// ─── Pre-render content blocks for AI crawlers ──────────────────────────────

const h = (tag, style, text) => `<${tag} style="${style}">${text}</${tag}>`;
const hs = (text) => h('h1', 'font-size:1.6rem;font-weight:700;color:#012241;margin:0 0 16px', text);
const def = (text) => `<p style="border-left:4px solid #4BD1A0;padding:12px 16px;background:#f0fdf8;border-radius:0 8px 8px 0;margin:0 0 16px;font-size:0.9rem;line-height:1.7"><strong>Definition:</strong> ${text}</p>`;
const intro = (text) => `<p style="font-size:0.9rem;line-height:1.7;margin:0 0 16px;color:#334155">${text}</p>`;
const faqBlock = (faqs) => faqs.map(({q, a}) =>
  `<div style="margin-bottom:14px"><p style="font-weight:600;font-size:0.875rem;color:#012241;margin:0 0 4px">${q}</p><p style="font-size:0.85rem;line-height:1.65;color:#475569;margin:0">${a}</p></div>`
).join('');
const h2 = (text) => h('h2', 'font-size:1.2rem;font-weight:700;color:#012241;margin:20px 0 8px', text);

// AI SEO helpers — extractable blocks for AI citation
const authorAttr = () => `<p style="font-size:0.8rem;color:#64748b;margin:0 0 16px;padding:8px 12px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0">By <strong>Bill Anderson</strong>, Senior Valuation Advisor &amp; RICS Associate &mdash; Assetica, Dubai, UAE</p>`;
const directAnswer = (text) => `<div style="border-left:4px solid #4BD1A0;padding:12px 16px;background:#f0fdf8;border-radius:0 8px 8px 0;margin:0 0 16px"><strong style="color:#012241;font-size:0.85rem">Direct Answer:</strong> <span style="font-size:0.9rem;color:#334155;line-height:1.7">${text}</span></div>`;
const dataTable = (caption, headers, rows) => {
  const thead = `<tr style="background:#012241;color:#fff">${headers.map(h => `<th style="padding:8px 12px;text-align:left;font-size:0.8rem;font-weight:600">${h}</th>`).join('')}</tr>`;
  const tbody = rows.map((row, i) => `<tr style="background:${i % 2 === 0 ? '#fff' : '#f8fafc'}">${row.map(c => `<td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;font-size:0.8rem;color:#334155">${c}</td>`).join('')}</tr>`).join('');
  return `<div style="margin:16px 0"><p style="font-size:0.8rem;font-weight:600;color:#012241;margin:0 0 6px">${caption}</p><div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">${thead}${tbody}</table></div></div>`;
};

const servicePreRenderData = {
  'business-valuation': {
    h1: 'Business Valuation Dubai & UAE | Expert Independent Reports',
    definition: 'Business valuation in the UAE is the process of determining the economic worth of a company using internationally recognised methodologies including Discounted Cash Flow (DCF) analysis, market comparables, and the net asset value approach. In Dubai and across the GCC, independent business valuations are required for M&A transactions, shareholder disputes, DIFC and ADGM court proceedings, UAE Golden Visa applications, bank financing, corporate restructuring, and strategic exit planning.',
    introText: 'Assetica delivers independent, credible business valuations for companies across the UAE, UK, GCC, and internationally. Whether you are raising capital, planning an exit, resolving a shareholder dispute, or meeting a regulatory requirement, our valuations provide the rigour and defensibility your situation demands.',
    ebitdaTable: {
      caption: 'UAE EBITDA Multiples by Sector (Assetica Market Reference, 2026)',
      headers: ['Sector', 'EV/EBITDA Multiple Range', 'Key Value Driver'],
      rows: [
        ['Technology / SaaS', '8x – 15x', 'Recurring revenue, growth rate'],
        ['Healthcare & Pharma', '6x – 10x', 'Regulatory licences, patient base'],
        ['Real Estate Services', '5x – 9x', 'AUM, contract pipeline'],
        ['Professional Services', '4x – 8x', 'Client retention, team depth'],
        ['Manufacturing & Industrial', '4x – 7x', 'Asset quality, export contracts'],
        ['Retail & F&B', '3x – 5x', 'Location, brand, lease terms'],
        ['Trading & Distribution', '3x – 6x', 'Exclusive agreements, volume'],
      ],
    },
    methodsTable: {
      caption: 'Business Valuation Methods — When Each Applies',
      headers: ['Method', 'Best For', 'Output'],
      rows: [
        ['Discounted Cash Flow (DCF)', 'Profitable businesses with predictable cash flows', 'Intrinsic value range'],
        ['Market Comparables (EV/EBITDA)', 'Established businesses with sector peers', 'Market-derived multiple'],
        ['Precedent Transactions', 'M&A deal pricing reference', 'Transaction benchmark'],
        ['Net Asset Value (NAV)', 'Asset-heavy or holding companies', 'Balance sheet value'],
      ],
    },
    faqs: [
      { q: 'What is business valuation and why does my company need it?', a: 'Business valuation is the process of determining the economic value of your company. It is required in a wide range of situations including fundraising and investor negotiations, business sales or acquisitions, shareholder exits, estate and tax planning, regulatory compliance, dispute resolution, and strategic decision-making. An independent valuation from Assetica gives you a credible, defensible figure that you can rely on in negotiations and formal processes.' },
      { q: 'What methods does Assetica use to value a business?', a: 'Assetica applies the most appropriate valuation methodology, or a combination of methods, based on your industry, business stage, and the purpose of the valuation. The primary methods are: Discounted Cash Flow (DCF) analysis, market comparables benchmarking against similar listed companies or recent transactions, and asset-based approaches used where net assets are the primary value driver.' },
      { q: 'How much does a business valuation cost in Dubai?', a: 'The cost of a business valuation depends on the size and complexity of the business, the purpose of the valuation, and the level of documentation required. Assetica offers competitive, transparent pricing for SME and mid-market valuations across the UAE. Contact us for a tailored quotation after an initial consultation.' },
      { q: 'How long does a business valuation take?', a: 'For most SMEs and mid-market businesses in the UAE, Assetica can deliver an initial valuation report within 2 to 3 weeks from receipt of the required financial information. For larger or more complex businesses, allow 4 to 6 weeks. Expedited timelines are available for time-sensitive transactions.' },
    ]
  },
  'due-diligence': {
    h1: 'Due Diligence Services in Dubai & UAE',
    definition: 'Due diligence is the structured process of independently investigating a business before completing an acquisition, investment, or merger. In the UAE, professional due diligence covers financial records, legal contracts, regulatory compliance under UAE law, operational risks, and contingent liabilities. It is conducted by buyers, investors, and lenders to verify the accuracy of information provided and surface material risks before any transaction is finalised.',
    introText: 'Thorough research and analysis reveal your business strengths, weaknesses, and growth potential. Assetica minimises risk and maximises investment confidence in every transaction.',
    faqs: [
      { q: 'What does due diligence involve in a business acquisition in Dubai?', a: 'Due diligence in Dubai involves a comprehensive review of the target business\'s financial statements, legal contracts, regulatory compliance under UAE law, operational processes, customer and supplier relationships, and potential liabilities. Assetica\'s due diligence process is designed to surface all material risks before any transaction is finalised.' },
      { q: 'How long does a due diligence process take?', a: 'Typically 2 to 4 weeks depending on the size and complexity of the business. For smaller SMEs in the UAE, we can often complete a focused review within 10 business days. For larger businesses with international operations, allow 4 to 6 weeks.' },
      { q: 'Can due diligence uncover hidden liabilities in a UAE business?', a: 'Yes. Our team identifies contingent liabilities, undisclosed debts, regulatory breaches, pending litigation, tax exposures, and other risks that may not be visible from a surface-level review. This protects buyers and investors from costly post-transaction surprises.' },
    ]
  },
  'business-structuring': {
    h1: 'Business Structuring Services in Dubai & UAE',
    definition: 'Business structuring in the UAE is the strategic arrangement of corporate entities, ownership frameworks, governance mechanisms, and financial flows to optimise a company for investment, tax efficiency, and long-term value. Choosing the right structure, whether mainland, free zone, DIFC, or ADGM, directly affects your company\'s valuation multiple, regulatory obligations, and attractiveness to investors and buyers.',
    introText: 'We establish a strong valuation foundation by assessing the legal, financial, and operational aspects of your business. Our business structuring service ensures your corporate structure is optimised for valuation, investment, and growth.',
    faqs: [
      { q: 'Why does business structure affect company valuation?', a: 'Corporate structure directly impacts tax efficiency, investor attractiveness, risk allocation, governance quality, and ease of investment or exit. An optimally structured business in the UAE typically commands a higher valuation multiple than a comparable business with a complex or inefficient structure.' },
      { q: 'Should a Dubai business set up a DIFC or ADGM holding structure for investment purposes?', a: 'DIFC and ADGM are internationally recognised common-law financial free zones that are highly attractive to institutional and foreign investors. A holding structure in DIFC or ADGM can significantly enhance your business\'s investment attractiveness and provide access to robust legal frameworks.' },
    ]
  },
  'building-pitch-deck': {
    h1: 'Pitch Deck Services in Dubai & UAE',
    definition: 'A pitch deck is a concise visual presentation, typically 12 to 15 slides, used to communicate a company\'s business model, market opportunity, financial performance, and funding requirements to investors. In the UAE, where family offices, sovereign wealth funds, and institutional investors evaluate hundreds of opportunities each year, a professionally prepared, data-driven pitch deck is essential for securing meetings and closing investment rounds.',
    introText: 'We craft compelling presentations that highlight your company\'s value proposition, financials, and growth prospects. Our pitch decks are designed to captivate investors and stakeholders from the first slide.',
    faqs: [
      { q: 'What should a pitch deck include for UAE investors?', a: 'A pitch deck for UAE and Gulf investors should include a compelling executive summary, a clear problem and solution, the size of your market opportunity in the region, your business model and revenue streams, historical financial performance, 3 to 5 year financial projections, your competitive positioning, your team\'s credentials, and your funding ask with a clear use of funds.' },
      { q: 'How does Assetica integrate business valuation into the pitch deck?', a: 'Assetica uniquely combines pitch deck development with financial modelling expertise to produce a defensible valuation that forms the basis of your funding ask, giving investors the confidence to commit at the valuation you are seeking.' },
    ]
  },
  'financial-modelling': {
    h1: 'Financial Modelling Services in Dubai & UAE',
    definition: 'Financial modelling in business valuation is the construction of a quantitative representation of a company\'s financial performance and projected future cash flows. In the UAE, financial models are used to support M&A transactions, bank financing applications, investor presentations, internal strategic planning, and regulatory compliance. A rigorous financial model applies independently verified market data and clearly documented assumptions to produce a defensible valuation range.',
    introText: 'Our precise valuation uses financial metrics, market trends, and industry benchmarks to determine your company\'s worth. Advanced financial models that project future performance and guide strategic decision-making.',
    ebitdaTable: {
      caption: 'UAE EV/EBITDA Multiples by Sector — Financial Modelling Reference (Assetica, 2026)',
      headers: ['Sector', 'Typical EBITDA Multiple', 'Notes'],
      rows: [
        ['Technology / SaaS', '8x – 15x', 'Higher for ARR-based models'],
        ['Healthcare', '6x – 10x', 'Licence and patient base premium'],
        ['Professional Services', '4x – 8x', 'Key-person risk discount applies'],
        ['Manufacturing', '4x – 7x', 'Asset replacement cycle adjustment'],
        ['Retail / F&B', '3x – 5x', 'Location and lease sensitivity'],
        ['Trading', '3x – 6x', 'Exclusivity and margin quality'],
      ],
    },
    faqs: [
      { q: 'What valuation method does Assetica use for financial modelling?', a: 'We apply the most appropriate methodology, or a combination, based on your industry, business stage, and the purpose of the valuation. For most businesses, we use Discounted Cash Flow (DCF) analysis, market comparables (EV/EBITDA, P/E multiples), and precedent transaction analysis.' },
      { q: 'Can financial modelling help with securing bank finance in the UAE?', a: 'Yes. UAE banks require detailed financial projections and cash flow models as part of their credit assessment process. Assetica builds financial models specifically designed to satisfy the requirements of UAE and international lenders, demonstrating debt serviceability, liquidity, and covenant compliance under multiple scenarios.' },
    ]
  },
  'buyer-seller-negotiation': {
    h1: 'Buyer & Seller Negotiation Advisory in Dubai & UAE',
    definition: 'Buyer and seller negotiation advisory in the UAE covers the full range of financial and strategic support required to structure, negotiate, and close a business sale or acquisition. The most common reason deals fail in the region is a valuation gap between buyer and seller. Independent negotiation advisory provides both parties with the credible financial analysis needed to bridge that gap and agree on terms that reflect the true value of the business.',
    introText: 'We facilitate successful negotiations during mergers, acquisitions, or sales, ensuring favourable outcomes for all parties. Our experienced team acts as skilled intermediaries protecting your interests throughout the deal process.',
    faqs: [
      { q: 'What is the most common reason deals fail in the UAE and how can Assetica help?', a: 'The most common reason deals fail is a valuation gap. Assetica addresses this by providing an independent, defensible valuation that both parties can use as a credible starting point. We also help structure creative deal mechanics such as earn-outs, deferred consideration, or equity rollovers to bridge valuation gaps.' },
      { q: 'How long does a business sale negotiation typically take in the UAE?', a: 'From initial offer to signed SPA, UAE business sales typically take 3 to 6 months. The timeline depends on the complexity of the business, the number of parties involved, the extent of due diligence required, and how quickly valuation gaps can be resolved.' },
    ]
  },
  'tax-valuation': {
    h1: 'Tax Valuation Services in Dubai & UAE',
    definition: 'Tax valuation in the UAE is the preparation of an independently certified assessment of a business, asset, or interest specifically for tax compliance purposes. Since the introduction of UAE corporate tax at 9% in June 2023, formal tax valuations are required for transfer pricing between related parties, business reorganisations, employee share option schemes, and recognition of goodwill and intangible assets.',
    introText: 'We assess tax impacts and develop optimised strategies to enhance your company\'s financial health. Our tax valuations are fully compliant with UAE, UK, and international tax regulations.',
    faqs: [
      { q: 'What is a tax valuation and why is it needed in the UAE?', a: 'A tax valuation is an independently prepared assessment of the value of a business, asset, or interest for a specific tax purpose. In the UAE, following the introduction of corporate tax in 2023, tax valuations are increasingly required for transfer pricing compliance, business reorganisations, employee share schemes, and transactions between related parties.' },
      { q: 'Does Assetica prepare transfer pricing valuations for UAE businesses?', a: 'Yes. Assetica prepares transfer pricing valuations and documentation that comply with the OECD Transfer Pricing Guidelines and UAE FTA requirements, protecting businesses from transfer pricing adjustments and penalties.' },
      { q: 'How does UAE corporate tax affect business valuation requirements?', a: 'The introduction of UAE corporate tax at 9% from June 2023 has created new valuation obligations for businesses, particularly around related-party transactions, group restructurings, and the recognition of goodwill and intangible assets.' },
    ]
  },
  'strategic-value-advisory': {
    h1: 'Strategic Value Advisory in Dubai & UAE',
    definition: 'Strategic value advisory is a service that combines business valuation expertise with strategic planning to identify, quantify, and close the gap between a company\'s current value and its maximum achievable potential. Unlike standard management consulting, every recommendation is assessed for its measurable impact on the company\'s valuation multiple. In Dubai and the UAE, this service is typically engaged two to three years before a planned sale, IPO, or major fundraising event.',
    introText: 'We offer insights to enhance your company\'s overall value and ensure long-term growth. Our strategic value advisory service goes beyond valuation to provide a roadmap for sustainable value creation.',
    faqs: [
      { q: 'What is strategic value advisory and how does it help businesses in Dubai?', a: 'Strategic value advisory helps you understand why your business is valued as it is, what factors are suppressing your value, and what specific actions you can take to increase it. For businesses in Dubai planning to raise capital, attract investors, or pursue an exit, this service provides a clear, financially grounded roadmap to achieving a higher valuation.' },
      { q: 'How long before a planned exit should I engage strategic value advisory?', a: 'Ideally 2 to 3 years before a planned sale or fundraising event. This gives sufficient time to implement value-enhancing initiatives, demonstrate their impact in your financial results, and build a credible track record that supports a higher valuation.' },
    ]
  },
  'business-planning': {
    h1: 'Business Planning Services in Dubai & UAE',
    definition: 'A professional business plan in the UAE is a structured document that combines market research, operational planning, and detailed financial projections to present a credible roadmap for business growth. Banks, development finance institutions such as the Mohammed Bin Rashid Fund and Khalifa Fund, and institutional investors require a well-prepared business plan as part of their assessment and approval process.',
    introText: 'Our advanced financial models project future performance and guide strategic decision-making. Comprehensive business plans that attract investment and drive sustainable growth in competitive markets.',
    faqs: [
      { q: 'Why do I need a professional business plan when applying for finance in the UAE?', a: 'UAE banks, development finance institutions, and private investors all require a well-structured, professionally prepared business plan as part of their assessment process. A credible business plan with robust financial projections significantly increases your chances of securing finance on favourable terms.' },
      { q: 'Can Assetica prepare a business plan for applying to the Mohammed Bin Rashid Fund or Khalifa Fund?', a: 'Yes. Assetica regularly prepares business plans tailored for UAE government-backed funding programmes including the Mohammed Bin Rashid Fund for SMEs, the Khalifa Fund for Enterprise Development, the Dubai SME Fund, and Sharjah Entrepreneurship Centre. Our plans are structured to address each programme\'s specific financial, operational, and sector criteria.' },
    ]
  },
};

const allServices = [
  { name: 'Business Valuation', slug: 'business-valuation' },
  { name: 'Due Diligence', slug: 'due-diligence' },
  { name: 'Business Structuring', slug: 'business-structuring' },
  { name: 'Pitch Deck', slug: 'building-pitch-deck' },
  { name: 'Financial Modelling', slug: 'financial-modelling' },
  { name: 'Buyer &amp; Seller Negotiation', slug: 'buyer-seller-negotiation' },
  { name: 'Tax Valuation', slug: 'tax-valuation' },
  { name: 'Strategic Value Advisory', slug: 'strategic-value-advisory' },
  { name: 'Business Planning', slug: 'business-planning' },
];

function buildServicePreRender(slug) {
  const d = servicePreRenderData[slug];
  if (!d) return '';
  const related = allServices.filter(s => s.slug !== slug);
  const relatedLinks = '<div style="margin-top:20px">' + h2('Related Services') + '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">' + related.map(s => `<a href="${BASE_URL}/services/${s.slug}" style="font-size:0.8rem;padding:5px 12px;border:1px solid #e2e8f0;border-radius:20px;color:#012241;text-decoration:none;background:#f8fafc">${s.name}</a>`).join('') + '</div></div>';
  let content = hs(d.h1) + authorAttr() + def(d.definition) + intro(d.introText);
  if (d.ebitdaTable) {
    content += h2('UAE Market EBITDA Multiples') + dataTable(d.ebitdaTable.caption, d.ebitdaTable.headers, d.ebitdaTable.rows);
  }
  if (d.methodsTable) {
    content += h2('Valuation Methods Compared') + dataTable(d.methodsTable.caption, d.methodsTable.headers, d.methodsTable.rows);
  }
  content += '<div style="margin-top:20px">' + faqBlock(d.faqs) + '</div>' + relatedLinks;
  return content;
}

const blogPreRenderData = {
  'navigating-business-valuation-buying-running-business': {
    sections: [
      { heading: 'Why Buy a Running Business?', body: 'Acquiring an established business in the UAE offers immediate cash flow, an existing customer base, and a proven operating model. Unlike starting from scratch, you inherit trained staff, supplier relationships, and brand recognition. For investors targeting Dubai\'s growing mid-market, it is often the fastest route to meaningful revenue.' },
      { heading: 'How to Value a Business You Are Buying in Dubai', body: 'Business valuations for acquisitions in the UAE typically use three primary methods: Discounted Cash Flow (DCF) analysis projects future earnings and discounts them to present value. Market comparables benchmark your target against similar businesses sold in the UAE and GCC. Asset-based valuation assesses net tangible assets, relevant where property or equipment is the primary value driver. For most SME acquisitions in Dubai, a combination of DCF and market comparables provides the most defensible price.' },
      { heading: 'Due Diligence Checklist for Buyers in the UAE', body: 'Before completing any acquisition in Dubai, buyers should verify: three to five years of audited financial statements; trade licence validity and transferability; all lease and supplier contracts; employee contracts and gratuity obligations; pending litigation or regulatory issues; tax compliance under UAE corporate tax; and confirmation that all licences and permits can be transferred to new ownership.' },
    ],
    faqs: [
      { q: 'How do I verify the financial statements of a business I am buying in Dubai?', a: 'Request three to five years of audited financial statements. Cross-reference revenue with bank statements, VAT returns, and point-of-sale records. Assetica\'s due diligence process independently verifies all financial claims before you commit to a price.' },
      { q: 'Can a business licence be transferred to a new owner in the UAE?', a: 'Yes, in most cases UAE trade licences can be transferred to a new owner. The process involves DED or the relevant free zone authority, and may require regulatory approvals depending on the business activity. Assetica advises on licence transferability as part of acquisition due diligence.' },
      { q: 'What is a fair EBITDA multiple for buying a business in Dubai?', a: 'UAE EBITDA multiples typically range from 3x to 7x depending on the sector, growth rate, customer concentration, and quality of earnings. Retail and F&B businesses trade at the lower end. Professional services and technology businesses with recurring revenue can achieve 5x to 8x or higher.' },
    ]
  },
  'navigating-business-risks-strategic-value-advisory': {
    sections: [
      { heading: 'Key Business Risks Facing UAE Companies', body: 'Businesses operating in Dubai and the UAE face a distinct risk landscape: regulatory change including evolving corporate tax obligations, free zone rule updates, and licensing requirements; customer concentration risk where a small number of clients represent a large share of revenue; currency exposure for businesses with cross-border operations; and succession risk in family-owned businesses where ownership transition is unplanned.' },
      { heading: 'How Strategic Value Advisory Manages Risk', body: 'Strategic value advisory maps each identified risk against its potential impact on your company\'s valuation multiple. Risks that suppress value, such as undocumented processes, key-person dependency, or weak governance, are prioritised and addressed with specific, measurable action plans. The result is a business that is more resilient, more attractive to investors, and commands a higher valuation at exit.' },
    ],
    faqs: [
      { q: 'What are the most common value-suppressing risks for UAE businesses?', a: 'The most common risks we identify are: over-reliance on the founder or a single key person; high customer concentration with one or two clients representing more than 40% of revenue; undocumented processes that make the business difficult to scale or hand over; weak financial controls and reporting; and structural issues such as assets held in the wrong entity.' },
      { q: 'How does strategic value advisory differ from standard management consulting?', a: 'Standard management consulting focuses on operational improvement. Strategic value advisory specifically measures every recommendation against its impact on your company\'s valuation. Every initiative is selected because it demonstrably increases the multiple that a buyer or investor would apply to your earnings.' },
    ]
  },
  'selling-a-business-optimal-timing': {
    sections: [
      { heading: 'The Right Time to Sell a Business in Dubai', body: 'The optimal time to sell a business in Dubai is when three conditions align: your business is performing at or near its earnings peak; market conditions are favourable with active buyers and competitive multiples; and you have had two to three years to prepare the business for sale by addressing value gaps and building a clean track record.' },
      { heading: 'Market Conditions in Dubai and the UAE That Affect Timing', body: 'Dubai\'s M&A market is driven by regional consolidation activity, international buyer appetite, sovereign wealth fund deployment, and the availability of acquisition finance. In periods of strong economic growth and high oil revenues, EBITDA multiples in the UAE tend to be 10 to 20 per cent higher than in periods of market uncertainty. Timing your exit to coincide with a strong market cycle can add significant value to your final sale price.' },
    ],
    faqs: [
      { q: 'How long does it take to sell a business in the UAE?', a: 'From the decision to sell to completion, most UAE business sales take six to eighteen months. Preparation and business readiness typically take three to six months. Finding a buyer, negotiating, completing due diligence, and finalising legal documentation takes a further three to twelve months depending on complexity.' },
      { q: 'Should I tell my employees I am selling the business?', a: 'Generally, it is advisable to keep a sale confidential until key terms are agreed. Premature disclosure can unsettle staff, alert competitors, and affect customer relationships. Assetica manages sale processes with strict confidentiality protocols throughout.' },
    ]
  },
  'mitigating-risks-business-valuation': {
    sections: [
      { heading: 'Common Risks That Reduce Business Valuation', body: 'The most significant valuation risks for UAE businesses include: earnings volatility without clear explanation; customer or supplier concentration above 30 to 40 per cent; undocumented contracts and verbal agreements; unresolved litigation or regulatory issues; related-party transactions without arm\'s-length terms; and a business model that is highly dependent on the founder\'s personal relationships.' },
      { heading: 'How Assetica Mitigates Valuation Risk', body: 'Assetica\'s pre-sale valuation process identifies every material risk before a buyer\'s due diligence team does. We quantify the valuation impact of each risk and recommend specific actions to mitigate them. This approach protects your asking price in negotiations and reduces the likelihood of post-due-diligence price reductions.' },
    ],
    faqs: [
      { q: 'What is earnings normalisation and why does it matter for valuation?', a: 'Earnings normalisation adjusts your reported profits to remove one-off, non-recurring, or owner-specific items. For example, if you pay yourself above-market rent on a property you own personally, or include personal expenses through the business, these are normalised out to show the true sustainable earnings. Buyers pay multiples on normalised EBITDA, so accurate normalisation directly affects your valuation.' },
      { q: 'Can related-party transactions reduce my business valuation?', a: 'Yes. Transactions between your business and related parties that are not on arm\'s-length terms are a significant due diligence red flag. Buyers and investors discount businesses with unexplained or unfavourable related-party dealings. Assetica identifies and helps you address these before approaching the market.' },
    ]
  },
  'how-to-create-a-pitch-deck': {
    sections: [
      { heading: 'What Should a Pitch Deck Include?', body: 'A pitch deck that works for UAE and Gulf investors should contain: a clear problem statement and your solution; market size in the UAE and target region; your business model and revenue streams; financial performance to date with key metrics; three to five year financial projections with assumptions; your competitive advantage; team credentials and relevant experience; your funding ask with a clear use of funds breakdown; and a defensible valuation supported by financial modelling.' },
      { heading: 'What Dubai and Gulf Investors Look for in a Pitch Deck', body: 'Family offices, venture capital, and institutional investors in Dubai look beyond the story to the numbers. They expect detailed financial models with clearly documented assumptions, a realistic valuation grounded in comparable transactions, and a founder team that demonstrates deep understanding of the regional market. Decks that include UAE-specific market data, localised financial projections, and evidence of regulatory compliance consistently outperform generic pitches.' },
    ],
    faqs: [
      { q: 'How many slides should a pitch deck have?', a: 'For most funding rounds in the UAE, 12 to 15 slides is optimal. This gives sufficient depth to cover your business model, market, financials, and team without losing investor attention. A separate detailed financial model and data room should be available for investors who progress to the next stage.' },
      { q: 'How does Assetica combine pitch deck development with business valuation?', a: 'Assetica uniquely integrates financial modelling and independent valuation into the pitch deck development process. This means your funding ask is supported by a defensible, independently derived valuation rather than a number picked to suit your fundraising target. Investors respond significantly better to valuations that are grounded in methodology.' },
    ]
  },
  'maximize-business-potential-financial-valuations': {
    sections: [
      { heading: 'Understanding What Drives Your Business Value', body: 'Business value is primarily driven by four factors: the quality and predictability of your earnings (recurring revenue scores highest); growth rate relative to comparable businesses in your sector; risk profile, including customer concentration, key-person dependency, and market position; and the quality of your management team and financial controls. Improving any one of these levers can meaningfully increase the multiple a buyer or investor applies to your business.' },
      { heading: 'Valuation Methodologies for UAE Businesses', body: 'The three principal methodologies used for UAE business valuations are: Discounted Cash Flow (DCF), which projects future free cash flows and discounts them to present value using a risk-adjusted rate; Market Comparables, which benchmarks your business against similar listed companies or recent transactions using EV/EBITDA or revenue multiples; and Asset-Based Valuation, relevant for businesses where tangible assets are the primary value driver. For most growth businesses in Dubai, DCF and market comparables are used together to produce a defensible valuation range.' },
    ],
    faqs: [
      { q: 'What EV/EBITDA multiple can I expect for my business in the UAE?', a: 'UAE EBITDA multiples vary significantly by sector. Technology and SaaS businesses with recurring revenue typically achieve 6x to 12x. Professional services firms achieve 4x to 7x. Retail and F&B businesses achieve 3x to 5x. These ranges are affected by growth rate, management depth, and customer concentration.' },
      { q: 'How can I increase my business valuation before a sale or fundraise?', a: 'The most impactful actions are: build recurring revenue and reduce customer concentration; document all processes to reduce key-person risk; improve financial controls and reporting quality; resolve any outstanding litigation or regulatory issues; and engage a strategic value advisor two to three years before your target exit date to implement a structured value creation plan.' },
    ]
  },
};

function buildBlogPreRender(slug, post) {
  const d = blogPreRenderData[slug];
  const authorLine = `<p style="font-size:0.8rem;color:#64748b;margin:0 0 12px">By <strong>Bill Anderson</strong>, Senior Valuation Advisor &amp; RICS Associate, Assetica &mdash; ${post.datePublished}</p>`;
  let content = hs(post.title) + authorLine + directAnswer(post.excerpt) + intro(post.excerpt);
  if (d) {
    for (const section of d.sections) {
      content += h2(section.heading) + intro(section.body);
    }
    if (d.faqs && d.faqs.length) {
      content += h2('Frequently Asked Questions') + '<div style="margin-top:12px">' + faqBlock(d.faqs) + '</div>';
    }
  }
  return content;
}

// ─── Generate ────────────────────────────────────────────────────────────────

console.log('\n🔧  Generating per-route SEO HTML with JSON-LD schemas…\n');

// Pre-render content for key static pages
const staticPreRender = {
  '/': hs('Independent Business Valuation Firm in Dubai, UAE &amp; UK') + authorAttr() + def('Assetica is an independent business valuation firm in Dubai and the UK, providing expert valuations for M&amp;A transactions, due diligence, tax compliance, financial modelling, and strategic advisory services across the UAE, GCC, and Europe.') + intro('Trusted by business owners, investors, and legal counsel across 15+ countries for certified, independent valuations accepted by UAE regulatory authorities, DIFC courts, and international investors.') + h2('UAE Business Valuation — Key Facts') + dataTable('UAE Business Valuation Market Reference (Assetica, 2026)', ['Metric', 'Figure', 'Source / Notes'], [['UAE corporate tax rate', '9%', 'UAE FTA, effective June 2023'], ['Golden Visa minimum business value', 'AED 2,000,000', 'GDRFA / ICA requirement'], ['Typical UAE SME valuation timeline', '2–4 weeks', 'Assetica operational benchmark'], ['UAE EBITDA multiples — SME range', '3x – 8x', 'Sector-dependent; Assetica 2026'], ['DIFC registered entities', '6,500+', 'DIFC Annual Report 2024'], ['UAE SMEs as % of businesses', '94%', 'UAE Ministry of Economy']]) + h2('Our Services') + intro('Assetica provides: <a href="https://assetica.net/services/business-valuation" style="color:#012241">Business Valuation</a>, <a href="https://assetica.net/services/due-diligence" style="color:#012241">Due Diligence</a>, <a href="https://assetica.net/services/financial-modelling" style="color:#012241">Financial Modelling</a>, <a href="https://assetica.net/services/tax-valuation" style="color:#012241">Tax Valuation</a>, <a href="https://assetica.net/services/strategic-value-advisory" style="color:#012241">Strategic Value Advisory</a>, <a href="https://assetica.net/services/business-structuring" style="color:#012241">Business Structuring</a>, <a href="https://assetica.net/services/building-pitch-deck" style="color:#012241">Pitch Deck</a>, <a href="https://assetica.net/services/buyer-seller-negotiation" style="color:#012241">Buyer &amp; Seller Negotiation</a>, and <a href="https://assetica.net/services/business-planning" style="color:#012241">Business Planning</a>.') + h2('Specialist Valuation Services') + intro('We also provide <a href="https://assetica.net/golden-visa-valuation" style="color:#012241">Golden Visa Business Valuation</a> for UAE residency applications (GDRFA-accepted, AED 2M+ threshold) and <a href="https://assetica.net/family-office-valuation" style="color:#012241">Family Office Valuation</a> for HNI and UHNWI families across DIFC and ADGM.') + h2('Why Assetica') + intro('Independent and credentialled: our valuations are prepared by RICS-associated advisors and accepted by UAE regulators, DIFC courts, banks, and international institutional investors. We serve clients in the UAE, GCC, UK, and Europe across 15+ countries.'),
  '/about': hs('About Assetica | Business Valuation Experts in Dubai') + intro('Assetica brings 30+ years of valuation expertise across Dubai, GCC, UK and Europe. Trusted by 500+ businesses for M&amp;A, due diligence, and strategic advisory. Our team of credentialled valuators provides independent, certified valuations accepted by regulators, courts, and institutional investors.') + h2('Our Expertise') + intro('We specialise in business valuation for M&amp;A transactions, shareholder disputes, UAE Golden Visa applications, family office portfolio reviews, financial modelling, and strategic advisory. Our valuations are accepted by UAE regulatory authorities, DIFC and ADGM courts, banks, and institutional investors across 15+ countries.') + h2('Credentials &amp; Standards') + intro('Assetica\'s valuations are prepared in accordance with RICS (Royal Institution of Chartered Surveyors) standards, IFRS, and International Valuation Standards (IVS). Reports are structured to satisfy GDRFA, ICA, FTA, DIFC, and ADGM requirements.') + h2('Our Team') + `<div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:16px"><div style="width:48px;height:48px;border-radius:50%;background:#012241;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem;flex-shrink:0">BA</div><div><p style="font-weight:700;font-size:1rem;color:#012241;margin:0 0 2px">Bill Anderson</p><p style="font-size:0.85rem;color:#4BD1A0;margin:0 0 4px">Senior Valuation Advisor | RICS Associate</p><p style="font-size:0.85rem;color:#64748b;margin:0">Dubai, UAE</p><p style="font-size:0.875rem;line-height:1.65;color:#334155;margin:8px 0 0">Bill brings extensive expertise in M&amp;A valuations, Golden Visa certification, family office advisory, and DCF modelling across the UAE, GCC, and UK. As an RICS Associate, he provides independently certified valuations accepted by GDRFA, DIFC courts, and international institutional investors.</p></div></div>`,
  '/services': hs('Business Valuation &amp; Advisory Services in Dubai') + intro('Assetica provides independent, credentialled business valuation and advisory services for companies across Dubai, UAE, GCC, UK and Europe. All services are delivered by RICS-associated advisors and accepted by UAE regulators, DIFC and ADGM courts, banks, and institutional investors.') + h2('Valuation Services') + intro('<a href="https://assetica.net/services/business-valuation" style="color:#012241;font-weight:600">Business Valuation</a> — Independent certified valuations for M&amp;A, shareholder exits, regulatory compliance, and strategic planning. <a href="https://assetica.net/services/tax-valuation" style="color:#012241;font-weight:600">Tax Valuation</a> — Transfer pricing, corporate tax compliance, and business reorganisation valuations. <a href="https://assetica.net/services/financial-modelling" style="color:#012241;font-weight:600">Financial Modelling</a> — DCF models, scenario analysis, and bank-ready financial projections.') + h2('Transaction Advisory') + intro('<a href="https://assetica.net/services/due-diligence" style="color:#012241;font-weight:600">Due Diligence</a> — Pre-acquisition financial, legal, and operational risk assessment. <a href="https://assetica.net/services/buyer-seller-negotiation" style="color:#012241;font-weight:600">Buyer &amp; Seller Negotiation</a> — Independent advisory bridging valuation gaps in business sales and acquisitions.') + h2('Strategic &amp; Growth Advisory') + intro('<a href="https://assetica.net/services/strategic-value-advisory" style="color:#012241;font-weight:600">Strategic Value Advisory</a> — Value gap analysis and value creation roadmap for businesses planning a future exit or fundraise. <a href="https://assetica.net/services/business-planning" style="color:#012241;font-weight:600">Business Planning</a> — Bankable business plans and financial projections for UAE government funding programmes. <a href="https://assetica.net/services/business-structuring" style="color:#012241;font-weight:600">Business Structuring</a> — Corporate structure optimisation for investment attractiveness and valuation uplift. <a href="https://assetica.net/services/building-pitch-deck" style="color:#012241;font-weight:600">Pitch Deck</a> — Investor-grade pitch decks backed by independent financial modelling.'),
  '/industries': hs('Industries We Serve') + intro('Assetica provides specialist business valuation, due diligence, and strategic advisory across eight key sectors in Dubai, UAE, GCC, and UK. Our sector-experienced advisors understand the specific valuation drivers, regulatory requirements, and market dynamics in each industry.') + h2('Banking &amp; Financial Services') + intro('Business valuations for banks, fintech companies, investment firms, and financial services businesses in the UAE. Valuations for regulatory compliance, DIFC and ADGM licensing, M&amp;A, and shareholder transactions.') + h2('Real Estate &amp; Property') + intro('Independent valuations for real estate holding companies, property development businesses, REITs, and investment vehicles. RICS-aligned methodology, accepted by UAE banks, DIFC courts, and international investors.') + h2('Manufacturing &amp; Industrial') + intro('Valuations for manufacturing businesses, industrial companies, and asset-heavy operations across the UAE and GCC. Asset-based and earnings-based approaches calibrated for capital-intensive sectors.') + h2('Technology &amp; SaaS') + intro('Specialist valuations for technology businesses, SaaS companies, and digital platforms in Dubai and across the region. Revenue multiple and DCF methodologies appropriate for high-growth, pre-profit technology companies.') + h2('Shipping &amp; Logistics') + intro('Business valuations for shipping, freight, logistics, and supply chain companies operating in the UAE, covering fleet assets, contracts, and operational earnings.') + h2('Healthcare &amp; Pharma') + intro('Independent valuations for private hospitals, clinics, pharmacies, and healthcare groups across the UAE. Valuations for acquisitions, licensing, joint ventures, and regulatory compliance.') + h2('Legal &amp; Professional Services') + intro('Valuations for law firms, consultancies, accounting practices, and professional service businesses. Goodwill, client relationship, and earnings-based approaches for partnership buyouts and M&amp;A.') + h2('Government &amp; Public Sector') + intro('Independent valuations supporting government-linked M&amp;A, privatisation, PPP transactions, and public sector asset monetisation across the UAE and GCC.'),
  '/contact': hs('Contact Assetica') + intro('Get in touch with Assetica\'s valuation experts in Dubai &amp; London. Free initial consultation for all new clients.') + h2('Get in Touch') + intro('Call or WhatsApp: <strong>+971 52 155 1198</strong> (Mon–Fri, 9am–6pm GST). Email: <strong>info@assetica.net</strong>. We respond to all enquiries within one business day.') + h2('Our Offices') + intro('Assetica operates from Dubai, UAE and London, UK. Many valuation services can be conducted remotely. For UAE-based engagements, our advisors can visit your location in Dubai or across the Emirates.') + h2('Free Initial Consultation') + intro('We offer a free initial consultation for all new clients. During this call, we will assess your requirements, confirm the scope of work, and provide a transparent fee quotation. No obligation.'),
  '/golden-visa-valuation': hs('Golden Visa Business Valuation UAE | GDRFA-Compliant') + def('A UAE Golden Visa business valuation is a certified, independent assessment of a business owner\'s company value prepared specifically for UAE Golden Visa applications. The minimum qualifying threshold is AED 2 million. Reports must be prepared by an independent valuation firm and accepted by the General Directorate of Residency and Foreigners Affairs (GDRFA).') + intro('Certified business valuation for UAE Golden Visa applications. GDRFA-accepted reports delivered in 5 to 7 business days. AED 2M+ threshold confirmed. Free consultation.') + '<div style="margin-top:20px">' + faqBlock([
    { q: 'What is the minimum business valuation for UAE Golden Visa?', a: 'The UAE Golden Visa for business owners requires a minimum business valuation of AED 2 million (approximately USD 545,000). Assetica provides GDRFA-accepted certified valuation reports confirming this threshold.' },
    { q: 'How long does a Golden Visa valuation report take?', a: 'Assetica typically delivers certified Golden Visa valuation reports within 5 to 7 business days, depending on the complexity of the business and availability of financial records.' },
    { q: 'Which authority accepts the business valuation for UAE Golden Visa?', a: 'The General Directorate of Residency and Foreigners Affairs (GDRFA) in Dubai, and the Federal Authority for Identity and Citizenship (ICA) for other emirates, accept certified business valuation reports for Golden Visa applications.' },
    { q: 'What valuation methods does Assetica use for Golden Visa reports?', a: 'We use Income Approach (DCF), Market Approach (comparable transactions), and Asset-Based Approach depending on the business type. The most appropriate method is selected to maximise defensibility before authorities.' },
    { q: 'What is the difference between property valuation and business valuation for UAE Golden Visa?', a: 'Property valuation for UAE Golden Visa applies to real estate investors and is handled by RERA-approved property valuers through the Dubai Land Department. Business valuation for UAE Golden Visa applies to business owners and is conducted by independent certified valuation firms like Assetica. If you own a business rather than (or in addition to) property, you need a certified business valuation — not a property valuation — to satisfy the AED 2 million threshold for the Golden Visa.' },
  ]) + '</div>',
  '/family-office-valuation': hs('Family Office Valuation Services | DIFC &amp; ADGM') + def('A family office valuation is an independent, comprehensive assessment of all assets held by a family office, including private equity stakes, real estate, business interests, investment portfolios and intangible assets. It provides a single net worth picture essential for wealth governance, succession planning and regulatory compliance.') + intro('Independent valuation services for family offices across DIFC, ADGM and the GCC. Portfolio valuation, succession planning, real estate, private equity and estate valuations for HNI and UHNWI families.') + h2('What Assetica Values for Family Offices') + intro('We provide independent valuations for: operating businesses and trading companies; private equity and venture capital fund interests; real estate portfolios and SPVs; fixed income and alternative investment holdings; intangible assets including brands, intellectual property, and goodwill; and inter-generational transfer transactions requiring arm\'s-length certified values for DIFC Wills Service and estate planning.') + h2('Why DIFC and ADGM Family Offices Choose Assetica') + intro('Our valuations are prepared under RICS, IFRS, and IVS standards — the frameworks required by DIFC and ADGM regulatory authorities. We have experience with multi-jurisdiction mandates spanning UAE, UK, Saudi Arabia, India, Singapore, and Europe, and provide reports in the format required by investment committees, trustees, and regulators.') + '<div style="margin-top:20px">' + faqBlock([
    { q: 'Why do family offices in DIFC and ADGM need independent valuations?', a: 'DIFC and ADGM regulations require family offices to maintain accurate records of asset values for governance, reporting and compliance purposes. Independent valuations also support investment committee decisions, beneficiary distributions and inter-generational wealth transfers.' },
    { q: 'How often should a family office update its valuations?', a: 'Best practice is annual valuation updates for governance and reporting, with interim updates triggered by major transactions, market dislocations, succession events or regulatory reviews. Assetica offers retainer-based relationships for ongoing valuation support.' },
    { q: 'Does Assetica handle cross-border family office mandates?', a: 'Yes. Assetica has experience with family offices holding assets across UAE, UK, Saudi Arabia, India, Singapore and Europe. We coordinate multi-jurisdiction valuations and apply locally accepted standards (RICS, IFRS, IVS) in each market.' },
  ]) + '</div>',
  '/blog': hs('Assetica Business Valuation Blog') + intro('Expert insights on business valuation, M&amp;A, due diligence and financial advisory from Assetica\'s team in Dubai, UAE &amp; UK. Written by Bill Anderson, Senior Valuation Advisor and RICS Associate.') + h2('Latest Articles') + `<ul style="list-style:none;padding:0;margin:0"><li style="margin-bottom:10px"><a href="https://assetica.net/blog/navigating-business-valuation-buying-running-business" style="color:#012241;font-weight:600;font-size:0.9rem">Navigating the World of Business Valuation: A Step-by-Step Guide to Buying a Running Business</a></li><li style="margin-bottom:10px"><a href="https://assetica.net/blog/navigating-business-risks-strategic-value-advisory" style="color:#012241;font-weight:600;font-size:0.9rem">Navigating Business Risks: Effective Risk Management through Strategic Value Advisory</a></li><li style="margin-bottom:10px"><a href="https://assetica.net/blog/selling-a-business-optimal-timing" style="color:#012241;font-weight:600;font-size:0.9rem">Selling a Business? Here's How to Determine the Optimal Timing</a></li><li style="margin-bottom:10px"><a href="https://assetica.net/blog/mitigating-risks-business-valuation" style="color:#012241;font-weight:600;font-size:0.9rem">Safeguard Your Company: Mitigating Risks in Business Valuation</a></li><li style="margin-bottom:10px"><a href="https://assetica.net/blog/how-to-create-a-pitch-deck" style="color:#012241;font-weight:600;font-size:0.9rem">How to Create a Pitch Deck: A Step-by-Step Guide</a></li><li style="margin-bottom:10px"><a href="https://assetica.net/blog/maximize-business-potential-financial-valuations" style="color:#012241;font-weight:600;font-size:0.9rem">Maximise Your Business Potential with Precise Financial Valuations</a></li></ul>`,
};

for (const route of staticRoutes) {
  writeRoute(route.path, route, staticPreRender[route.path] || '');
}

for (const svc of serviceRoutes) {
  const svcFaqs = servicePreRenderData[svc.slug]?.faqs || [];
  writeRoute(`/services/${svc.slug}`, {
    title: svc.title,
    description: truncateDesc(svc.intro),
    canonical: `/services/${svc.slug}`,
    schemas: [
      serviceSchema(svc.title.replace(' | Assetica', ''), truncateDesc(svc.intro), `${BASE_URL}/services/${svc.slug}`),
      ...(svcFaqs.length ? [faqSchema(svcFaqs)] : []),
      breadcrumb([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Services', item: `${BASE_URL}/services` },
        { name: svc.title.replace(' Services in Dubai & UAE | Assetica', '').replace(' in Dubai & UAE | Assetica', '').replace(' | Assetica', ''), item: `${BASE_URL}/services/${svc.slug}` },
      ]),
    ],
  }, buildServicePreRender(svc.slug));
}

for (const post of blogRoutes) {
  writeRoute(`/blog/${post.slug}`, {
    title: `${post.title} | Assetica`,
    description: truncateDesc(post.excerpt),
    canonical: `/blog/${post.slug}`,
    ogType: 'article',
    schemas: [
      blogPostingSchema(post),
      breadcrumb([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Blog', item: `${BASE_URL}/blog` },
        { name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
      ]),
    ],
  }, buildBlogPreRender(post.slug, post));
}

// ─── Blog category pages ─────────────────────────────────────────────────────

const blogCategories = [
  {
    slug: 'business-valuation',
    label: 'Business Valuation',
    description: 'Business valuation articles and guides from Assetica — expert insights for Dubai and UAE business owners, investors, and M&A professionals.',
    posts: blogRoutes.filter(p => {
      const found = [
        { slug: 'navigating-business-valuation-buying-running-business', category: 'Business Valuation' },
        { slug: 'mitigating-risks-business-valuation', category: 'Business Valuation' },
        { slug: 'maximize-business-potential-financial-valuations', category: 'Financial Valuation' },
      ]; return found.map(f => f.slug).includes(p.slug);
    }),
  },
  {
    slug: 'strategic-advisory',
    label: 'Strategic Advisory',
    description: 'Strategic advisory and value creation articles from Assetica — practical insights for business owners planning growth, exits, or fundraising in Dubai and the UAE.',
    posts: blogRoutes.filter(p => ['navigating-business-risks-strategic-value-advisory'].includes(p.slug)),
  },
  {
    slug: 'business-sale',
    label: 'Business Sale',
    description: 'Guides on selling a business in Dubai and the UAE — timing, preparation, valuation, and negotiation insights from Assetica\'s senior advisors.',
    posts: blogRoutes.filter(p => ['selling-a-business-optimal-timing'].includes(p.slug)),
  },
  {
    slug: 'risk-management',
    label: 'Risk Management',
    description: 'Risk management in business valuation and M&A — expert articles from Assetica covering valuation risk, due diligence, and deal protection in the UAE.',
    posts: blogRoutes.filter(p => ['mitigating-risks-business-valuation'].includes(p.slug)),
  },
  {
    slug: 'pitch-deck',
    label: 'Pitch Deck',
    description: 'Pitch deck guides and investor presentation insights from Assetica — how to structure, design and present your business to Dubai and UAE investors.',
    posts: blogRoutes.filter(p => ['how-to-create-a-pitch-deck'].includes(p.slug)),
  },
  {
    slug: 'financial-valuation',
    label: 'Financial Valuation',
    description: 'Financial valuation insights from Assetica — methodologies, EBITDA multiples, and value drivers for Dubai and UAE businesses.',
    posts: blogRoutes.filter(p => ['maximize-business-potential-financial-valuations'].includes(p.slug)),
  },
];

for (const cat of blogCategories) {
  const postLinks = cat.posts.map(p =>
    `<li style="margin-bottom:10px"><a href="${BASE_URL}/blog/${p.slug}" style="color:#012241;font-weight:600;font-size:0.9rem">${p.title}</a></li>`
  ).join('');
  const preRender = hs(`${cat.label} Articles | Assetica Blog`) +
    intro(cat.description) +
    h2('Articles') +
    `<ul style="list-style:none;padding:0;margin:0">${postLinks}</ul>`;

  writeRoute(`/blog/category/${cat.slug}`, {
    title: `${cat.label} Articles | Business Valuation Blog | Assetica`,
    description: truncateDesc(cat.description),
    canonical: `/blog/category/${cat.slug}`,
    schemas: [
      itemListSchema(`${cat.label} Articles`, cat.posts.map(p => ({ name: p.title, url: `${BASE_URL}/blog/${p.slug}` }))),
      breadcrumb([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Blog', item: `${BASE_URL}/blog` },
        { name: cat.label, item: `${BASE_URL}/blog/category/${cat.slug}` },
      ]),
    ],
  }, preRender);
}

const total = staticRoutes.length + serviceRoutes.length + blogRoutes.length + blogCategories.length;
console.log(`\n✅  SEO HTML generation complete — ${total} routes processed.\n`);
