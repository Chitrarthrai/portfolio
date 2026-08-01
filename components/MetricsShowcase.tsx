"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { metrics } from "@/data";

/**
 * MetricsShowcase — Stitch "Engineering Impact" screen
 * 2×2 glassmorphism bento grid with roll-up number animations,
 * scanline overlays, and mouse-follow radial spotlight.
 */
const MetricsShowcase = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  };

  const badgeIcon: Record<string, string> = {
    verified: "✓",
    speed: "⚡",
    database: "🗄",
    bolt: "⚡",
  };

  return (
    <section
      id="metrics"
      className="w-full py-24 px-4 sm:px-6 md:px-margin-desktop relative z-10"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col items-start max-w-4xl mb-16">
          <div
            className="flex items-center gap-2 px-3 py-1 mb-6 rounded-full"
            style={{
              border: "1px solid rgba(203,172,249,0.3)",
              background: "rgba(203,172,249,0.1)",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#34D399" }} />
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#34D399",
              }}
            >
              VERIFIED PERFORMANCE BENCHMARKS
            </span>
          </div>

          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#FFFFFF",
            }}
          >
            Engineering{" "}
            <span className="text-gradient-stitch">Impact</span>
          </h2>

          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "#BEC1DD",
            }}
          >
            Quantifiable metrics demonstrating scalable architecture, optimized
            throughput, and robust systems engineering across the full stack.
          </p>
        </div>

        {/* 2×2 bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card rounded-xl p-8 md:p-10 min-h-[280px] flex flex-col justify-between cursor-default"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            >
              {/* Overlays */}
              <div className="radial-spotlight" />
              <div className="scanline-bg" />

              {/* Header row */}
              <div className="card-content flex justify-between items-start">
                {/* Label pill */}
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: metric.color,
                    border: `1px solid ${metric.color}33`,
                  }}
                >
                  {metric.label}
                </span>

                {/* Badge */}
                <div
                  className="flex items-center gap-1.5 px-2 py-1 rounded"
                  style={{
                    background: "rgba(52,211,153,0.1)",
                    border: "1px solid rgba(52,211,153,0.2)",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#34D399" }}>
                    {badgeIcon[metric.icon] || "✓"}
                  </span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#34D399",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {metric.badge}
                  </span>
                </div>
              </div>

              {/* Bottom number + label */}
              <div className="card-content mt-auto">
                {/* Big number */}
                <div className="flex items-baseline gap-1 mb-2">
                  {metric.id === 4 && (
                    <span
                      className="mr-0.5"
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "clamp(24px, 3vw, 36px)",
                        fontWeight: 600,
                        color: metric.color,
                      }}
                    >
                      &lt;
                    </span>
                  )}
                  <div className="metric-value-container">
                    <span
                      className="metric-value"
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "clamp(36px, 5vw, 56px)",
                        fontWeight: 800,
                        lineHeight: 1,
                        color: "#FFFFFF",
                        // @ts-ignore
                        "--delay": metric.delay,
                      } as React.CSSProperties}
                    >
                      {metric.id === 4 ? "100" : metric.value}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "clamp(20px, 3vw, 32px)",
                      fontWeight: 600,
                      color: metric.color,
                    }}
                  >
                    {metric.unit}
                  </span>
                </div>

                {/* Suffix */}
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#C1C2D3",
                  }}
                >
                  {metric.suffix}
                </h3>

                {/* Description */}
                <p
                  className="mb-4 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "#BEC1DD",
                  }}
                >
                  {metric.description}
                </p>

                {/* Tech tags */}
                {metric.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {metric.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: "4px",
                          color: "#BEC1DD",
                          background: "#141a32",
                          border: "1px solid rgba(74,69,79,0.5)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsShowcase;
