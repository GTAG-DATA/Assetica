import { motion } from "framer-motion";

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/971529798302?text=Hello%20Assetica%2C%20I%20would%20like%20to%20enquire%20about%20your%20business%20valuation%20services."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Assetica on WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.4, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl"
    style={{ backgroundColor: "#25D366" }}
  >
    <svg viewBox="0 0 32 32" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.84 6.64L2.667 29.333l6.907-1.813A13.253 13.253 0 0016.004 29.333c7.36 0 13.329-5.973 13.329-13.333S23.364 2.667 16.004 2.667zm0 24c-2.08 0-4.107-.56-5.867-1.6l-.413-.24-4.107 1.08 1.093-4-.267-.427A10.613 10.613 0 015.334 16c0-5.88 4.787-10.667 10.667-10.667 5.88 0 10.666 4.787 10.666 10.667 0 5.88-4.773 10.667-10.663 10.667zm5.853-7.987c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.227-.16.186-.347.213-.64.053-.32-.16-1.333-.493-2.547-1.573-.947-.84-1.573-1.88-1.76-2.2-.187-.32-.013-.493.133-.64.147-.147.32-.347.48-.52.16-.173.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.253-.613-.52-.533-.72-.547-.187-.013-.4-.013-.613-.013s-.56.08-.853.4c-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.24 3.413 5.427 4.787.76.32 1.347.507 1.813.653.76.24 1.453.2 2 .12.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.267-.213-.587-.373z" />
    </svg>

    {/* Pulse ring */}
    <span
      className="absolute w-full h-full rounded-full animate-ping opacity-30"
      style={{ backgroundColor: "#25D366" }}
    />
  </motion.a>
);

export default WhatsAppButton;
