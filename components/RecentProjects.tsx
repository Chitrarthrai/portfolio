"use client";
import { projects } from "@/data";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaGlobe, FaAndroid, FaExternalLinkAlt } from "react-icons/fa";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";

const categories = ["All", "Personal", "Reliance", "Open Source"];

const categoryStyle: Record<string, { color: string; bg: string; border: string }> = {
  Personal: { color: "#34D399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.25)" },
  Reliance: { color: "#a4c9ff", bg: "rgba(164,201,255,0.1)", border: "rgba(164,201,255,0.25)" },
  "Open Source": { color: "#FBBF24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.25)" },
};

const RecentProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="projects"
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
            Featured{" "}
            <span className="shimmer-text">Projects</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              lineHeight: 1.6,
              color: "#BEC1DD",
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Shipped production apps across mobile, web, and AI infrastructure.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2.5 mb-10 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="transition-all duration-300 px-5 py-2 rounded-full"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: isActive ? "#0b1229" : "#BEC1DD",
                  background: isActive ? "#cbacf9" : "transparent",
                  border: isActive
                    ? "1px solid #cbacf9"
                    : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {cat.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 [perspective:1200px]">
          {filteredProjects.map((project, idx) => {
            const catStyle = categoryStyle[project.category] || categoryStyle.Personal;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, rotateX: 18, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: idx * 0.06,
                }}
                whileHover={{ rotateX: -4, rotateY: 4, scale: 1.02, zIndex: 20 }}
                className="glass-card rounded-xl overflow-hidden flex flex-col transform-gpu transition-all cursor-pointer group"
                onMouseMove={handleMouseMove}
                onClick={() => setSelectedProject(project)}
              >
                {/* Spotlight overlay */}
                <div className="radial-spotlight" />

                {/* Project image */}
                <div
                  className="relative w-full h-40 overflow-hidden"
                  style={{ background: "rgba(10,13,36,0.8)" }}
                >
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover object-center opacity-70 group-hover:opacity-90 transition-opacity"
                  />
                  {/* Case study hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(0,3,25,0.6)", backdropFilter: "blur(4px)" }}
                  >
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "#cbacf9",
                      }}
                    >
                      ↗ Read Case Study
                    </span>
                  </div>
                  {/* Category badge overlay */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 rounded-full"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: catStyle.color,
                        background: catStyle.bg,
                        border: `1px solid ${catStyle.border}`,
                      }}
                    >
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                  {/* Status Badge: Under Development OR Live Web */}
                  {project.isUnderDevelopment ? (
                    <div className="absolute top-3 right-3 z-10">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide"
                        style={{
                          color: "#FBBF24",
                          background: "rgba(251,191,36,0.18)",
                          border: "1px solid rgba(251,191,36,0.45)",
                          backdropFilter: "blur(6px)",
                        }}
                        title="Under Active Development"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        UNDER DEVELOPMENT
                      </span>
                    </div>
                  ) : project.liveUrl ? (
                    <div className="absolute top-3 right-3 z-10">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide transition-transform hover:scale-105"
                        style={{
                          color: "#34D399",
                          background: "rgba(52,211,153,0.18)",
                          border: "1px solid rgba(52,211,153,0.4)",
                          backdropFilter: "blur(6px)",
                        }}
                        title="Live Production Web App"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE WEB ↗
                      </a>
                    </div>
                  ) : null}
                </div>

                {/* Card body */}
                <div className="card-content flex flex-col flex-1 p-6">
                  <h3
                    className="mb-2 line-clamp-1"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="mb-4 line-clamp-3 flex-1"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#BEC1DD",
                    }}
                  >
                    {project.des}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "4px",
                          color: "#BEC1DD",
                          background: "#141a32",
                          border: "1px solid rgba(74,69,79,0.4)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t gap-2" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    {/* Stack icons */}
                    <div className="flex items-center shrink-0">
                      {project.iconLists.slice(0, 4).map((icon, i) => (
                        <div
                          key={icon}
                          className="w-7 h-7 rounded-full border flex items-center justify-center"
                          style={{
                            background: "#0b1229",
                            borderColor: "rgba(255,255,255,0.15)",
                            transform: `translateX(-${i * 8}px)`,
                          }}
                        >
                          <Image src={icon} alt={icon} width={28} height={28} className="p-1.5 object-contain" />
                        </div>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      {project.isUnderDevelopment && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                          style={{
                            color: "#FBBF24",
                            background: "rgba(251,191,36,0.12)",
                            border: "1px solid rgba(251,191,36,0.3)",
                          }}
                        >
                          IN PROGRESS
                        </span>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded transition-all hover:scale-105"
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#34D399",
                            background: "rgba(52,211,153,0.12)",
                            border: "1px solid rgba(52,211,153,0.3)",
                          }}
                          title="Open Live Web Application"
                        >
                          <FaGlobe size={11} />
                          WEB ↗
                        </a>
                      )}
                      {project.appUrl && (
                        <a
                          href={project.appUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded transition-all hover:scale-105"
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#a4c9ff",
                            background: "rgba(164,201,255,0.12)",
                            border: "1px solid rgba(164,201,255,0.3)",
                          }}
                          title="Download Android Releases (APK)"
                        >
                          <FaAndroid size={11} />
                          APK ↗
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 transition-all duration-200 hover:translate-y-[-2px]"
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#cbacf9",
                          letterSpacing: "0.06em",
                        }}
                        title="View Source on GitHub"
                      >
                        <FaGithub size={13} />
                        GITHUB ↗
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Drawer */}
      <ProjectCaseStudy
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default RecentProjects;