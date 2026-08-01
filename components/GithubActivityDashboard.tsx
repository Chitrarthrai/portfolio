"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCodeBranch, FaStar, FaProjectDiagram } from "react-icons/fa";

/**
 * GithubActivityDashboard — Real-time GitHub Contribution Matrix & Code Metrics Bento
 */
export const GithubActivityDashboard = () => {
  // Generate 52 weeks x 7 days grid simulation with realistic contribution density
  const generateContributionDays = () => {
    const days = [];
    for (let i = 0; i < 180; i++) {
      // Density levels 0-4
      const level = Math.random() > 0.4 ? Math.floor(Math.random() * 4) + 1 : 0;
      days.push(level);
    }
    return days;
  };

  const contributionDays = generateContributionDays();

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-purple/30 border-purple/40";
      case 2:
        return "bg-purple/60 border-purple/70";
      case 3:
        return "bg-purple border-purple shadow-[0_0_8px_rgba(203,172,249,0.5)]";
      case 4:
        return "bg-emerald-400 border-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]";
      default:
        return "bg-white/[0.04] border-white/[0.06]";
    }
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-margin-desktop relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          <div className="scanline-bg" />
          <div className="card-content">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FaGithub className="text-purple text-xl" />
                  <h3
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    Engineering Commit Activity
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#BEC1DD",
                  }}
                >
                  Continuous delivery pipeline across open-source and enterprise repositories.
                </p>
              </div>

              {/* Live GitHub Badge */}
              <a
                href="https://github.com/Chitrarthrai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass-surface border border-purple/30 text-xs font-mono font-bold text-purple hover:scale-105 transition-all"
              >
                <span>github.com/Chitrarthrai</span>
                <span>↗</span>
              </a>
            </div>

            {/* Metrics KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-[10px] font-mono text-purple uppercase font-bold tracking-wider">
                  SHIPPED COMMITS
                </span>
                <p className="text-2xl font-extrabold text-white mt-1 font-manrope">1,420+</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  PULL REQUESTS
                </span>
                <p className="text-2xl font-extrabold text-white mt-1 font-manrope">380+</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                  MICROSERVICES
                </span>
                <p className="text-2xl font-extrabold text-white mt-1 font-manrope">40+</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider">
                  PROD UPTIME
                </span>
                <p className="text-2xl font-extrabold text-white mt-1 font-manrope">99.9%</p>
              </div>
            </div>

            {/* Matrix Heatmap */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-white-200/60 mb-2">
                <span>Recent 180 Days Contribution Matrix</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded bg-white/[0.04] border border-white/[0.06]" />
                  <span className="w-2.5 h-2.5 rounded bg-purple/30" />
                  <span className="w-2.5 h-2.5 rounded bg-purple" />
                  <span className="w-2.5 h-2.5 rounded bg-emerald-400" />
                  <span>More</span>
                </div>
              </div>

              <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto no-scrollbar py-1">
                {contributionDays.map((level, idx) => {
                  const row = idx % 7; // 0 (top) to 6 (bottom)
                  const col = Math.floor(idx / 7);
                  // Invert row index so bottom row (row 6) fills first, top row (row 0) falls last
                  const fillDelay = col * 0.012 + (6 - row) * 0.04;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ y: -70, opacity: 0, scale: 0.4 }}
                      whileInView={{ y: 0, opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 18,
                        delay: fillDelay,
                      }}
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] border transition-all duration-200 hover:scale-150 z-10 ${getLevelColor(level)}`}
                      title={`Day ${idx + 1}: ${level * 3} contributions`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
