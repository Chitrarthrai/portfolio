"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AvailabilityBanner — dismissible slim banner above the navbar
 * Persists dismissal state in localStorage.
 */
export const AvailabilityBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("availability-banner-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem("availability-banner-dismissed", "1");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-3 px-4"
          style={{
            height: "36px",
            background: "linear-gradient(90deg, rgba(203,172,249,0.12) 0%, rgba(96,165,250,0.10) 50%, rgba(52,211,153,0.12) 100%)",
            borderBottom: "1px solid rgba(203,172,249,0.15)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Pulse dot */}
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: "#34D399" }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: "#34D399" }}
            />
          </span>

          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Open to new opportunities · React Native & Full-Stack Engineer
          </span>

          <a
            href="#contact"
            onClick={dismiss}
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#cbacf9",
              textDecoration: "none",
            }}
          >
            Let&apos;s talk →
          </a>

          {/* Dismiss */}
          <button
            onClick={dismiss}
            aria-label="Dismiss banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition-opacity"
            style={{ color: "#fff", fontSize: "14px", lineHeight: 1 }}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
