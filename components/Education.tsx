"use client";
import React from "react";
import { motion } from "framer-motion";
import { education } from "@/data";

const Education = () => {
  return (
    <section
      id="education"
      className="w-full py-20 px-4 sm:px-6 md:px-margin-desktop relative z-10"
      style={{ backgroundColor: "#000319" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#FFFFFF",
              marginBottom: "12px",
            }}
          >
            <span className="text-gradient-stitch">Education</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              lineHeight: 1.6,
              color: "#BEC1DD",
            }}
          >
            Academic foundations powering engineering excellence.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="glass-card rounded-xl p-6 relative"
              style={{
                borderTopColor: index === 0 ? "rgba(203,172,249,0.4)" : undefined,
                borderLeftColor: index === 0 ? "rgba(203,172,249,0.4)" : undefined,
              }}
            >
              {/* Icon + duration row */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: index === 0 ? "rgba(203,172,249,0.15)" : "rgba(255,255,255,0.05)",
                    border: index === 0 ? "1px solid rgba(203,172,249,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>🎓</span>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: index === 0 ? "#e2cdff" : "#BEC1DD",
                    background: index === 0 ? "rgba(226,205,255,0.1)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${index === 0 ? "rgba(226,205,255,0.25)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {edu.duration}
                </span>
              </div>

              <h3
                className="mb-1"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: index === 0 ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                }}
              >
                {edu.institution}
              </h3>
              <p
                className="mb-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.5,
                  color: "#C1C2D3",
                }}
              >
                {edu.degree}
              </p>
              <p
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "11px",
                  color: "rgba(190,193,221,0.6)",
                }}
              >
                📍 {edu.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
