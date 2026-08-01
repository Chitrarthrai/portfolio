"use client";
import React from "react";
import { personalInfo, socialMedia } from "@/data";

const socialLabels: Record<string, string> = {
  "/git.svg": "GITHUB",
  "/link.svg": "LINKEDIN",
};

const Footer = () => {
  return (
    <footer
      id="contact"
      className="w-full relative z-10 mt-10"
      style={{
        backgroundColor: "#000212",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand column */}
          <div>
            <h3
              className="mb-3"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#cbacf9",
              }}
            >
              SYSTEM_ARCHITECT
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#BEC1DD",
                maxWidth: "280px",
              }}
            >
              {personalInfo.profileSummary.slice(0, 120)}...
            </p>
          </div>

          {/* Links column */}
          <div className="flex flex-col gap-3">
            <h4
              className="mb-2"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "rgba(190,193,221,0.5)",
              }}
            >
              NAVIGATION
            </h4>
            {[
              { label: "PROJECTS", href: "#projects" },
              { label: "EXPERIENCE", href: "#experience" },
              { label: "EDUCATION", href: "#education" },
              { label: "CONTACT", href: `mailto:${personalInfo.email}` },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-all duration-200 hover:translate-y-[-2px] hover:opacity-100 opacity-60"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#e2cdff",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-3">
            <h4
              className="mb-2"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "rgba(190,193,221,0.5)",
              }}
            >
              CONNECT
            </h4>
            {/* Social links */}
            {socialMedia.map((s) => (
              <a
                key={s.id}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200 hover:translate-y-[-2px] hover:opacity-100 opacity-60"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#e2cdff",
                }}
              >
                {socialLabels[s.img] || "LINK"} ↗
              </a>
            ))}
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:translate-y-[-2px] hover:opacity-100 opacity-60"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#e2cdff",
              }}
            >
              RESUME ↗
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="transition-all duration-200 hover:translate-y-[-2px] hover:opacity-100 opacity-60"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#34D399",
              }}
            >
              EMAIL ↗
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "24px" }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#cbacf9",
            }}
          >
            SYSTEM_ARCHITECT
          </span>

          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "11px",
              color: "rgba(190,193,221,0.4)",
            }}
          >
            © 2025 CHITRARTH RAI. ALL RIGHTS RESERVED.
          </span>

          <div className="flex gap-6">
            {["GITHUB", "LINKEDIN", "SOURCE_CODE"].map((label) => {
              const hrefs: Record<string, string> = {
                GITHUB: personalInfo.github,
                LINKEDIN: personalInfo.linkedin,
                SOURCE_CODE: personalInfo.github,
              };
              return (
                <a
                  key={label}
                  href={hrefs[label]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:translate-y-[-2px]"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "rgba(190,193,221,0.5)",
                  }}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
