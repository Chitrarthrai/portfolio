"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, workExperience } from "@/data";
import { MatrixTextDecoder } from "./ui/MatrixTextDecoder";

/**
 * ExperienceStack — Stitch "Experience & Stack" screen
 * Merges Skills + Experience into a single unified section with:
 *  - Technical Arsenal: 3-column glass-card skill grid
 *  - Trajectory: glassmorphism work timeline
 */
const ExperienceStack = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const skillColumns = [
    {
      title: "LANGUAGES & FRAMEWORKS",
      items: skills.languagesFrameworks,
      color: "text-[#cbacf9]",
    },
    {
      title: "DATABASES & INFRA",
      items: skills.databasesInfrastructure,
      color: "text-[#60A5FA]",
    },
    {
      title: "TOOLS & PRACTICES",
      items: skills.toolsPractices,
      color: "text-[#34D399]",
    },
  ];

  const projectIcons: Record<string, string> = {
    "Neo Disha (Mobile)": "📷",
    "NeoQCR (Web & Android)": "📊",
    "Disha (Web Dashboard)": "🖥️",
    "HRMS Platform": "👥",
    "Interactive UI & Components": "🎨",
  };

  return (
    <section
      id="experience"
      className="w-full py-20 px-4 sm:px-6 md:px-margin-desktop relative z-10"
    >
      {/* ---- Technical Arsenal ---- */}
      <div className="max-w-7xl mx-auto mb-24">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-3xl">⌨️</span>
          <h2
            className="font-display-hero-mobile md:font-headline-section"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            <MatrixTextDecoder text="Technical Arsenal" className="text-gradient-stitch" />
          </h2>
        </div>

        {/* 3-column skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillColumns.map((col, colIdx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: colIdx * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <h3
                className={`${col.color} mb-6 tracking-widest opacity-90 border-b border-white/[0.08] pb-3`}
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                {col.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {col.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.08, rotateZ: 1, translateY: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="hover-glow cursor-default transition-all duration-200 flex items-center gap-1.5"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "12px",
                      fontWeight: 500,
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "9999px",
                      padding: "6px 14px",
                      color: "#dce1ff",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple/60" />
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---- Trajectory (Work Timeline) ---- */}
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-3xl">💼</span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            Trajectory
          </h2>
        </div>

        {/* Timeline */}
        <div className="stitch-timeline-line pl-12 md:pl-16 relative">
          {workExperience.map((job) => (
            <div key={job.id} className="mb-16 relative">
              {/* Glowing dot */}
              <div
                className="absolute -left-[30px] md:-left-[34px] top-2 w-4 h-4 rounded-full z-10"
                style={{
                  background: "#e2cdff",
                  boxShadow: "0 0 15px rgba(226,205,255,0.8)",
                }}
              />

              {/* Job header */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
                <h3
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  {job.company}
                </h3>
                <span
                  className="bg-primary-fixed/10 px-3 py-1 rounded"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#e2cdff",
                    border: "1px solid rgba(226,205,255,0.2)",
                  }}
                >
                  {job.duration}
                </span>
              </div>

              <p
                className="mb-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#C1C2D3",
                }}
              >
                {job.role} · {job.location}
              </p>

              {/* Project sub-cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                {job.highlights.map((hl, idx) => (
                  <motion.div
                    key={hl.subProject}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="glass-card rounded-lg p-5 group cursor-pointer"
                    onMouseEnter={() => setActiveProject(idx)}
                    onMouseLeave={() => setActiveProject(null)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{projectIcons[hl.subProject] || "🔧"}</span>
                      <span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "#BEC1DD", fontSize: "18px" }}
                      >
                        ↗
                      </span>
                    </div>
                    <h4
                      className="mb-2"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      {hl.subProject}
                    </h4>
                    <p
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: 1.6,
                        color: "#BEC1DD",
                      }}
                    >
                      {hl.details}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceStack;
