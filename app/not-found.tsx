"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "#000319", fontFamily: "JetBrains Mono, monospace" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(203,172,249,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-lg w-full">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(16,19,46,0.95) 0%, rgba(6,9,31,0.98) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
          }}
        >
          {/* Terminal header bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: "#1e2438", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: "#E11D48", opacity: 0.85 }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#FBBF24", opacity: 0.85 }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#34D399", opacity: 0.85 }} />
            <span className="ml-3 text-xs opacity-40" style={{ color: "#BEC1DD" }}>
              ~ zsh · chitrarth@portfolio
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 sm:p-8 space-y-4">
            <div>
              <span style={{ color: "#cbacf9" }}>$ </span>
              <span style={{ color: "#BEC1DD" }}>navigate --path /this-page</span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div style={{ color: "#f87171", fontSize: "12px" }}>
                ERROR 404: Route not found
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", marginTop: "4px" }}>
                Exit code: 1 · Signal: ENOENT
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-2"
            >
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
                The page you were looking for doesn&apos;t exist.
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginTop: "4px" }}>
                Try heading back to the home directory.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="pt-2"
            >
              <span style={{ color: "#cbacf9" }}>$ </span>
              <span style={{ color: "#BEC1DD" }}>cd ~</span>
              <span className="animate-pulse" style={{ color: "#cbacf9" }}>▌</span>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl primary-btn text-white font-bold transition-all hover:scale-105 active:scale-95"
                style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px" }}
              >
                ← Back to Home
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-6"
          style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}
        >
          chitrarthrai.vercel.app · 404 Not Found
        </motion.p>
      </div>
    </main>
  );
}
