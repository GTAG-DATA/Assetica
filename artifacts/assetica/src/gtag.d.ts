// Type declaration for Google Analytics gtag global function
interface Window {
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
}
