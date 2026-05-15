import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Remove SSG pre-render content and static head tags once React/Helmet mounts
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    // Remove the visually-hidden prerender block
    const el = document.getElementById('seo-prerender');
    if (el) el.remove();

    // Remove static canonical injected by SSG (Helmet manages its own with data-rh)
    document.querySelectorAll('link[rel="canonical"]:not([data-rh])').forEach(n => n.remove());
  });
});
