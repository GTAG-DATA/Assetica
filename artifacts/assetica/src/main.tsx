import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Remove SSG pre-render content once React mounts
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const el = document.getElementById('seo-prerender');
    if (el) el.remove();
  });
});
