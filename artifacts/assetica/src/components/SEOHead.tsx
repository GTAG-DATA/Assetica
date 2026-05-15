import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object | object[];
  noIndex?: boolean;
}

const BASE_URL = "https://assetica.net";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;
const SITE_NAME = "Assetica";

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  schema,
}: SEOHeadProps) {
  const fullTitle = title.includes("Assetica") ? title : `${title} | Assetica`;
  // Always trailing slash — Cloudflare Pages 308-redirects non-trailing-slash URLs
  const canonicalUrl = canonical
    ? `${BASE_URL}${canonical === "/" ? "/" : canonical + "/"}`
    : BASE_URL + "/";

  const schemas = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  return (
    <>
      {/*
        <link rel="canonical"> uses React 19 native hoisting — more reliable
        than react-helmet-async v3 for link tags in React 19.
        <title> and <meta> use Helmet which correctly REPLACES the SSG-injected
        tags during hydration (React 19 native <title> was adding a duplicate).
      */}
      <link rel="canonical" href={canonicalUrl} />

      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD Structured Data */}
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(s)}
          </script>
        ))}
      </Helmet>
    </>
  );
}
