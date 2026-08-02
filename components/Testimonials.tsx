"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "Chitrarth's work on the Neo Disha camera pipeline was exceptional. He independently designed the Kotlin Native Module integration with ONNX Runtime, which cut our frame processing latency by 40% — a huge win for our Reliance deployment.",
    name: "Neophyte AI Team Lead",
    role: "Engineering Lead",
    company: "Neophyte AI",
    initials: "NA",
    color: "#cbacf9",
  },
  {
    id: 2,
    text: "One of the most technically sharp engineers I've worked alongside. Chitrarth can go from designing a MongoDB aggregation pipeline to shipping a polished React Native UI in the same sprint — and the code quality is always production-grade.",
    name: "Senior Engineer",
    role: "Full-Stack Engineer",
    company: "Neophyte AI / Reliance Retail",
    initials: "SE",
    color: "#60a5fa",
  },
  {
    id: 3,
    text: "His VAPT security work on our apps was thorough and professional — SSL certificate pinning, ProGuard obfuscation, and AES-256 encryption all implemented cleanly. Rare to find someone who can handle both performance and security at this level.",
    name: "Product Manager",
    role: "Product Manager",
    company: "Reliance Retail",
    initials: "PM",
    color: "#34D399",
  },
  {
    id: 4,
    text: "The Argo MCP Server he open-sourced is a genuinely useful tool for teams running Kubernetes with LLM agents. Clean API design, solid JSON-RPC schema — exactly what you want from an open-source contributor.",
    name: "Open Source Contributor",
    role: "DevOps Engineer",
    company: "GitHub Community",
    initials: "OC",
    color: "#FBBF24",
  },
];

// Duplicate array for seamless infinite marquee
const doubled = [...testimonials, ...testimonials];

const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
  <div
    className="glass-card-sheen flex-shrink-0 w-80 sm:w-96 p-6 rounded-2xl mx-3"
    style={{
      background: "linear-gradient(135deg, rgba(16,19,46,0.85) 0%, rgba(6,9,31,0.92) 100%)",
      border: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(16px)",
    }}
  >
    {/* Quote mark */}
    <div style={{ fontSize: "32px", lineHeight: 1, color: t.color, opacity: 0.4, marginBottom: "12px", fontFamily: "Georgia, serif" }}>&ldquo;</div>

    <p
      className="mb-5 leading-relaxed"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        color: "rgba(255,255,255,0.72)",
        lineHeight: 1.7,
      }}
    >
      {t.text}
    </p>

    <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: `${t.color}22`,
          border: `1px solid ${t.color}44`,
        }}
      >
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 800, color: t.color }}>
          {t.initials}
        </span>
      </div>

      <div>
        <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>
          {t.name}
        </div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
          {t.role} · {t.company}
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => (
  <section
    className="w-full py-20 overflow-hidden relative"
    style={{ backgroundColor: "#000319" }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 mb-12 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "clamp(28px, 4vw, 52px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "#FFFFFF",
          marginBottom: "12px",
        }}
      >
        What people{" "}
        <span className="shimmer-text">say</span>
      </motion.h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#BEC1DD" }}>
        Feedback from colleagues and collaborators
      </p>
    </div>

    {/* Infinite marquee — pure CSS animation, zero JS per frame */}
    <div className="relative">
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #000319 0%, transparent 100%)" }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #000319 0%, transparent 100%)" }}
      />

      <div className="flex marquee-track" style={{ width: "max-content" }}>
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
