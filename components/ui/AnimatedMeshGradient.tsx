"use client";
import React, { useEffect, useRef } from "react";

/**
 * AnimatedMeshGradient — A cinematic animated radial gradient mesh
 * Renders 4 slow-drifting colour orbs layered over the page background.
 * Fully GPU-accelerated via CSS animations (no JS per-frame work).
 */
export const AnimatedMeshGradient: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Orb 1 — purple / violet, top-left drift */}
      <div
        className="mesh-orb"
        style={{
          width: "clamp(400px, 55vw, 900px)",
          height: "clamp(400px, 55vw, 900px)",
          background:
            "radial-gradient(circle at center, rgba(203,172,249,0.18) 0%, rgba(110,65,226,0.10) 45%, transparent 70%)",
          top: "-15%",
          left: "-10%",
          animationDuration: "18s",
          animationDelay: "0s",
        }}
      />

      {/* Orb 2 — blue, bottom-right drift */}
      <div
        className="mesh-orb"
        style={{
          width: "clamp(350px, 50vw, 800px)",
          height: "clamp(350px, 50vw, 800px)",
          background:
            "radial-gradient(circle at center, rgba(96,165,250,0.14) 0%, rgba(37,99,235,0.08) 45%, transparent 70%)",
          bottom: "0%",
          right: "-10%",
          animationDuration: "22s",
          animationDelay: "-6s",
          animationDirection: "reverse",
        }}
      />

      {/* Orb 3 — emerald accent, centre */}
      <div
        className="mesh-orb"
        style={{
          width: "clamp(200px, 30vw, 500px)",
          height: "clamp(200px, 30vw, 500px)",
          background:
            "radial-gradient(circle at center, rgba(52,211,153,0.10) 0%, rgba(16,185,129,0.05) 50%, transparent 70%)",
          top: "35%",
          left: "40%",
          animationDuration: "28s",
          animationDelay: "-12s",
        }}
      />

      {/* Orb 4 — indigo, top-right */}
      <div
        className="mesh-orb"
        style={{
          width: "clamp(300px, 38vw, 650px)",
          height: "clamp(300px, 38vw, 650px)",
          background:
            "radial-gradient(circle at center, rgba(129,140,248,0.12) 0%, rgba(79,70,229,0.06) 50%, transparent 70%)",
          top: "5%",
          right: "5%",
          animationDuration: "24s",
          animationDelay: "-3s",
          animationDirection: "alternate-reverse",
        }}
      />
    </div>
  );
};
