"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaTimes, FaExternalLinkAlt, FaAndroid, FaGlobe } from "react-icons/fa";
import { projects } from "@/data";

type Project = typeof projects[0];

const caseStudyData: Record<number, {
  problem: string;
  solution: string;
  impact: string[];
  architecture: string;
}> = {
  1: {
    problem: "Managing personal finances across banking SMS alerts, multiple apps, and manual notes was fragmented and time-consuming. No single app combined real-time sync, AI understanding, and automated SMS parsing.",
    solution: "Built FinanceTask — a cross-platform React Native + React.js app with Supabase WebSocket real-time sync, Gemini AI for zero-shot Named Entity Recognition on raw notes, and a Kotlin Native Module for background SMS scraping that auto-parses banking alerts into expense logs.",
    impact: ["< 100ms real-time sync latency across iOS/Android/Web", "95% AI entity recognition accuracy on raw financial notes", "Automated expense logging from SMS banking alerts — zero manual entry", "Kanban + KPI dashboard with dynamic daily spending limit adjustments"],
    architecture: "React Native (mobile) + React.js (web) → Supabase PostgreSQL + WebSockets → Gemini API → Kotlin Native SMS Module → Recharts KPI Dashboard",
  },
  2: {
    problem: "FedEx invoice teams spent hours manually processing thousands of documents per day. The existing pipeline had no OCR automation and required full human review for each invoice.",
    solution: "Built an automated document analysis pipeline using Tesseract OCR + OpenCV for image pre-processing, with multi-threaded batch processing and OpenAI API integration for structured data extraction from unstructured invoice text.",
    impact: ["90% reduction in invoice processing time", "Multi-threaded batch processing handles 1000+ documents concurrently", "Structured JSON output ready for ERP system ingestion", "Zero manual data entry required for standard invoice formats"],
    architecture: "Python → OpenCV (image pre-processing) → Tesseract OCR → OpenAI API (structured extraction) → JSON output pipeline",
  },
  3: {
    problem: "Reliance Retail field operations required a high-performance mobile camera app for 12MP sensor arrays. The existing solution had high frame processing latency and failed VAPT security audits.",
    solution: "Designed a Kotlin Native Module with C++ ONNX Runtime integration for edge-based real-time image sharpening. Implemented SSL certificate pinning, ProGuard obfuscation, and AES-256/RSA encryption to pass VAPT. Built sub-pixel precision touch mapping with Reanimated v3.",
    impact: ["40% reduction in frame processing latency", "VAPT compliant — passed Reliance security audit", "12MP sensor array support with real-time image sharpening", "Automated CI/CD pipeline for Reliance DevOps deployment"],
    architecture: "React Native + Reanimated → Kotlin Native Module → C++ ONNX Runtime → Azure CI/CD → VAPT hardened",
  },
  4: {
    problem: "Reliance's digital shelf analytics generated massive volumes of anomaly data in Azure Blob Storage, but the existing dashboard had poor query performance and no real-time KPI tracking for 2M+ records.",
    solution: "Built Disha dashboard with MongoDB Aggregation Pipelines optimized for 2M+ payroll/analytics records, Azure Blob Storage real-time ingestion, and dynamic Recharts KPI visualizations tracking operational metrics.",
    impact: ["60% improvement in query latency for 2M+ record datasets", "Real-time Azure Blob Storage data ingestion pipeline", "35% improvement in operational visibility for Reliance teams", "Scalable architecture supporting concurrent analytics sessions"],
    architecture: "React + Next.js → Node.js REST API → MongoDB Aggregation Pipelines → Azure Blob Storage → Recharts",
  },
  5: {
    problem: "Quick commerce prices vary wildly across Blinkit, Zepto, Swiggy Instamart, etc. Users had no way to compare prices in real-time without switching between 7 different apps.",
    solution: "Built CheckIt — a cross-platform Expo app with fuzzy search across 7 quick commerce platforms, local SQLite caching for offline access, and real-time Firebase sync for price updates.",
    impact: ["7 quick commerce platforms unified in one interface", "Fuzzy search with sub-50ms local SQLite query response", "Offline-first architecture with Firebase sync on reconnect", "Cross-platform iOS + Android from a single codebase"],
    architecture: "React Native + Expo → SQLite (local cache) → Firebase (real-time sync) → Fuzzy search algorithm → 7 platform APIs",
  },
  6: {
    problem: "DevOps teams using LLM agents needed a way for AI to perform Kubernetes/Argo CD operations without unsafe string-based shell commands. Existing tools had no structured, type-safe interface for LLM tooling.",
    solution: "Built an open-source MCP (Model Context Protocol) server exposing Argo CD operations via structured JSON-RPC schemas. LLM agents can now perform zero-shot cluster operations with full type safety and predictable outputs.",
    impact: ["Zero-shot Kubernetes operations via LLM agents — no shell access needed", "Structured JSON-RPC schema prevents malformed cluster commands", "Open-source — community adoption and contributions", "Compatible with Claude, GPT-4, and Gemini via MCP protocol"],
    architecture: "TypeScript + Express.js → MCP Protocol → JSON-RPC schema → Argo CD REST API → Kubernetes cluster",
  },
  7: {
    problem: "Modern team collaboration is fragmented across disparate apps: video conferencing (Google Meet/Zoom), fast multimedia messaging (Telegram), persistent channels (Slack/Teams), and AI meeting notes exist in siloed platforms with high context switching costs.",
    solution: "Architecting ChatX — an all-in-one industrial-grade communication suite combining WebRTC SFU video conferencing, Supabase Realtime messaging, Telegram-grade media features (circular video notes, audio waveform players, auto-delete TTL channels, interactive spoilers), and Gemini AI meeting intelligence.",
    impact: [
      "Currently under active development across Next.js (Web) and React Native / Expo (Mobile)",
      "WebRTC SFU streaming architecture with live stages and screen sharing",
      "Sub-100ms real-time messaging, presence indicators, and Supabase RLS security guard",
      "Telegram-grade suite: circular video notes, waveform audio player, and auto-delete TTL channels",
    ],
    architecture: "Next.js + React Native → WebRTC SFU → Supabase PostgreSQL & Realtime → Zustand & TanStack Query → Gemini AI Meeting Intelligence",
  },
};

interface ProjectCaseStudyProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ project, onClose }) => {
  const data = project ? caseStudyData[project.id] : null;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && data && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80]"
            style={{ background: "rgba(0,3,25,0.85)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[90] max-h-[90vh] overflow-y-auto rounded-t-3xl"
            style={{
              background: "linear-gradient(180deg, #0d1028 0%, #060918 100%)",
              border: "1px solid rgba(203,172,249,0.15)",
              borderBottom: "none",
              boxShadow: "0 -24px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
            </div>

            <div className="px-6 sm:px-10 pb-12 max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex items-start justify-between mb-8 pt-2">
                <div>
                  <div
                    className="mb-1"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "#cbacf9",
                    }}
                  >
                    CASE STUDY
                  </div>
                  <h2
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "clamp(22px, 4vw, 36px)",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors mt-1"
                  aria-label="Close case study"
                >
                  <FaTimes size={16} color="rgba(255,255,255,0.6)" />
                </button>
              </div>

              {/* Under Development Banner */}
              {project.isUnderDevelopment && (
                <div
                  className="flex flex-wrap items-center gap-3 p-3.5 mb-6 rounded-xl"
                  style={{
                    background: "rgba(251,191,36,0.06)",
                    border: "1px solid rgba(251,191,36,0.25)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#FBBF24",
                      letterSpacing: "0.08em",
                    }}
                  >
                    STATUS:
                  </span>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: "#FBBF24",
                      background: "rgba(251,191,36,0.15)",
                      border: "1px solid rgba(251,191,36,0.35)",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Under Active Development (Next.js Monorepo + React Native / Expo)
                  </span>
                </div>
              )}

              {/* Live Links / Deployment Banner */}
              {(project.liveUrl || project.appUrl) && (
                <div
                  className="flex flex-wrap items-center gap-3 p-3.5 mb-6 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#BEC1DD",
                      letterSpacing: "0.08em",
                    }}
                  >
                    LIVE ACCESS & BUILDS:
                  </span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        color: "#34D399",
                        background: "rgba(52,211,153,0.15)",
                        border: "1px solid rgba(52,211,153,0.35)",
                      }}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Web App: {project.liveUrl.replace("https://", "").replace(/\/$/, "")} ↗
                    </a>
                  )}
                  {project.appUrl && (
                    <a
                      href={project.appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        color: "#a4c9ff",
                        background: "rgba(164,201,255,0.15)",
                        border: "1px solid rgba(164,201,255,0.35)",
                      }}
                    >
                      <FaAndroid size={14} />
                      Android APK Releases ↗
                    </a>
                  )}
                </div>
              )}

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#cbacf9",
                      background: "rgba(203,172,249,0.1)",
                      border: "1px solid rgba(203,172,249,0.2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Three sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: "THE PROBLEM", text: data.problem, color: "#f87171" },
                  { label: "THE SOLUTION", text: data.solution, color: "#60a5fa" },
                  { label: "ARCHITECTURE", text: data.architecture, color: "#cbacf9" },
                ].map(({ label, text, color }) => (
                  <div
                    key={label}
                    className="rounded-xl p-5"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="mb-3"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color,
                      }}
                    >
                      {label}
                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.72)",
                      }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Impact metrics */}
              <div className="mb-8">
                <div
                  className="mb-4"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#34D399",
                  }}
                >
                  MEASURABLE IMPACT
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.impact.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl p-4"
                      style={{
                        background: "rgba(52,211,153,0.05)",
                        border: "1px solid rgba(52,211,153,0.12)",
                      }}
                    >
                      <span style={{ color: "#34D399", fontSize: "14px", marginTop: "1px", flexShrink: 0 }}>✓</span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.8)",
                          lineHeight: 1.5,
                        }}
                      >
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "#FFFFFF",
                      boxShadow: "0 0 24px rgba(16,185,129,0.35)",
                    }}
                  >
                    <FaGlobe size={16} /> Open Live Web App ↗
                  </a>
                )}
                {project.appUrl && (
                  <a
                    href={project.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      background: "rgba(164,201,255,0.12)",
                      border: "1px solid rgba(164,201,255,0.35)",
                      color: "#a4c9ff",
                      boxShadow: "0 0 20px rgba(164,201,255,0.15)",
                    }}
                  >
                    <FaAndroid size={17} /> Download Mobile App (APK) ↗
                  </a>
                )}
                {project.isUnderDevelopment && (
                  <div
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      background: "rgba(251,191,36,0.12)",
                      border: "1px solid rgba(251,191,36,0.3)",
                      color: "#FBBF24",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Under Active Development
                  </div>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl primary-btn text-white font-bold"
                  style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px" }}
                >
                  <FaGithub size={16} /> View on GitHub
                </a>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
