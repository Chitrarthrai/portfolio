"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  {
    year: "2016–2018",
    label: "Class X",
    description: "Secondary School — Central Academy, Jodhpur",
    color: "#BEC1DD",
    icon: "🎓",
  },
  {
    year: "2018–2020",
    label: "Class XII",
    description: "Senior Secondary — Central Academy, Jodhpur",
    color: "#BEC1DD",
    icon: "📚",
  },
  {
    year: "2021",
    label: "IIIT Bhubaneswar",
    description: "B.Tech Electronics & Telecommunication — started",
    color: "#60a5fa",
    icon: "⚡",
  },
  {
    year: "2022–2024",
    label: "Deep Dive: Full-Stack",
    description: "Mastered React Native, MERN stack, TypeScript & System Design",
    color: "#cbacf9",
    icon: "🛠",
  },
  {
    year: "Feb 2025",
    label: "Neophyte AI",
    description: "Joined as Software Engineer — React Native & MERN specialist",
    color: "#34D399",
    icon: "🚀",
  },
  {
    year: "2025",
    label: "Reliance Retail",
    description: "Building enterprise mobile & web apps — 40+ microservices shipped",
    color: "#cbacf9",
    icon: "🏗",
  },
  {
    year: "Now",
    label: "Open to Opportunities",
    description: "Seeking senior/staff engineer roles in high-impact product teams",
    color: "#34D399",
    icon: "🌟",
  },
];

const TimelineNode = ({
  milestone,
  index,
}: {
  milestone: typeof milestones[0];
  index: number;
}) => {
  const isRight = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`flex w-full items-center gap-6 md:gap-10 ${isRight ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isRight ? "text-right" : "text-left"}`}>
        <div
          className="inline-block glass-card-sheen px-5 py-4 rounded-xl mb-2"
          style={{
            background: "linear-gradient(135deg, rgba(16,19,46,0.85) 0%, rgba(6,9,31,0.92) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: milestone.color,
              marginBottom: "4px",
            }}
          >
            {milestone.year}
          </div>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              fontWeight: 800,
              color: "#FFFFFF",
              marginBottom: "4px",
            }}
          >
            {milestone.icon} {milestone.label}
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "#BEC1DD",
              lineHeight: 1.5,
            }}
          >
            {milestone.description}
          </div>
        </div>
      </div>

      {/* Centre dot */}
      <div className="flex-shrink-0 flex flex-col items-center" style={{ width: "48px" }}>
        <motion.div
          whileInView={{ scale: [0, 1.2, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: milestone.color,
            backgroundColor: `${milestone.color}22`,
            boxShadow: `0 0 12px ${milestone.color}44`,
          }}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </motion.div>
  );
};

export const CareerTimeline = () => {
  return (
    <section
      className="w-full py-20 px-4 sm:px-6 md:px-16 relative"
      style={{ backgroundColor: "#000319" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "12px",
            }}
          >
            Career{" "}
            <span className="shimmer-text">Journey</span>
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#BEC1DD" }}>
            From Jodhpur to Reliance — the road so far
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical centre line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(203,172,249,0.3) 20%, rgba(96,165,250,0.3) 60%, rgba(52,211,153,0.3) 90%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {milestones.map((m, i) => (
              <TimelineNode key={m.label} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
