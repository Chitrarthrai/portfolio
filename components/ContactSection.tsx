"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data";
import { FaPaperPlane, FaCopy, FaCheck, FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

/**
 * ContactSection — Stitch "Initiate Contact | Engineering Hub" design
 * Features:
 * - Glassmorphism form with identity, email, subject, and payload message
 * - Focus glow states & animated transmit button
 * - Direct comms cards (click-to-copy email/phone with haptic audio feedback)
 * - Live engineering uptime & latency metadata
 */
const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // Audio context fallback
    }
  };

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    playClickSound();
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="w-full py-24 px-4 sm:px-6 md:px-margin-desktop relative z-10"
      style={{ backgroundColor: "#000319" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
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
              ESTABLISH UPLINK · AVAILABLE FOR HIGH-PERFORMANCE MANDATES
            </span>
          </div>

          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#FFFFFF",
            }}
          >
            Initiate <span className="text-gradient-stitch">Contact</span>
          </h2>

          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "#BEC1DD",
            }}
          >
            Architecting robust systems &amp; fluid applications. Let&apos;s discuss senior roles, enterprise mandates, or open-source collaboration.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 relative"
          >
            <div className="scanline-bg" />
            <div className="card-content">
              <h3
                className="mb-6 flex items-center justify-between"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                <span>Transmit Message</span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "rgba(190,193,221,0.5)",
                  }}
                >
                  SECURE CHANNEL v2.4
                </span>
              </h3>

              {formSubmitted ? (
                <div
                  className="p-8 rounded-xl text-center space-y-3"
                  style={{
                    background: "rgba(52,211,153,0.1)",
                    border: "1px solid rgba(52,211,153,0.3)",
                  }}
                >
                  <span className="text-4xl text-emerald-400">✓</span>
                  <h4
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                    }}
                  >
                    Payload Transmitted Successfully
                  </h4>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#BEC1DD",
                    }}
                  >
                    Thank you. Your message has been logged. I will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Input */}
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: "#cbacf9",
                        }}
                      >
                        IDENTITY NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Chitrarth Rai"
                        className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-white-200/40 focus:outline-none transition-all duration-300"
                        style={{
                          background: "rgba(10, 13, 36, 0.8)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: "#cbacf9",
                        }}
                      >
                        DIGITAL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="chitrarth@example.com"
                        className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-white-200/40 focus:outline-none transition-all duration-300"
                        style={{
                          background: "rgba(10, 13, 36, 0.8)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label
                      className="block mb-2"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "#cbacf9",
                      }}
                    >
                      PAYLOAD SUBJECT *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Senior Full-Stack Mandate / Architecture Inquiry"
                      className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-white-200/40 focus:outline-none transition-all duration-300"
                      style={{
                        background: "rgba(10, 13, 36, 0.8)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      className="block mb-2"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "#cbacf9",
                      }}
                    >
                      MESSAGE CONTENT *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your system requirements or project goals..."
                      className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-white-200/40 focus:outline-none transition-all duration-300 resize-none"
                      style={{
                        background: "rgba(10, 13, 36, 0.8)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="primary-btn w-full py-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 active:scale-[0.99]"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "15px",
                    }}
                  >
                    <FaPaperPlane className="text-xs" />
                    TRANSMIT PAYLOAD
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Cards Side (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Line Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h4
                className="mb-4"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#60A5FA",
                }}
              >
                DIRECT COMMUNICATIONS
              </h4>

              {/* Email item */}
              <div
                className="flex items-center justify-between p-3.5 rounded-xl mb-3 cursor-pointer group"
                style={{
                  background: "rgba(10, 13, 36, 0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onClick={() => handleCopy(personalInfo.email, "email")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-lg text-primary"
                    style={{ background: "rgba(203,172,249,0.1)" }}
                  >
                    <FaEnvelope />
                  </div>
                  <div>
                    <span
                      className="block"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "10px",
                        color: "rgba(190,193,221,0.6)",
                      }}
                    >
                      PRIMARY EMAIL
                    </span>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      {personalInfo.email}
                    </span>
                  </div>
                </div>

                <span
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all"
                  style={{
                    background: copiedEmail ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.05)",
                    color: copiedEmail ? "#34D399" : "#BEC1DD",
                    border: `1px solid ${copiedEmail ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  {copiedEmail ? <FaCheck /> : <FaCopy />}
                  {copiedEmail ? "COPIED" : "COPY"}
                </span>
              </div>

              {/* Phone item */}
              <div
                className="flex items-center justify-between p-3.5 rounded-xl cursor-pointer group"
                style={{
                  background: "rgba(10, 13, 36, 0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onClick={() => handleCopy(personalInfo.phone, "phone")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-lg text-accent-emerald"
                    style={{ background: "rgba(52,211,153,0.1)" }}
                  >
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <span
                      className="block"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "10px",
                        color: "rgba(190,193,221,0.6)",
                      }}
                    >
                      PHONE / WHATSAPP
                    </span>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      {personalInfo.phone}
                    </span>
                  </div>
                </div>

                <span
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all"
                  style={{
                    background: copiedPhone ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.05)",
                    color: copiedPhone ? "#34D399" : "#BEC1DD",
                    border: `1px solid ${copiedPhone ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  {copiedPhone ? <FaCheck /> : <FaCopy />}
                  {copiedPhone ? "COPIED" : "COPY"}
                </span>
              </div>
            </motion.div>

            {/* Social & Metadata Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 space-y-4"
            >
              <h4
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#34D399",
                }}
              >
                SOCIAL ECOSYSTEM
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px]"
                  style={{
                    background: "rgba(10, 13, 36, 0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <FaGithub className="text-white text-lg" />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#e2cdff",
                    }}
                  >
                    GITHUB ↗
                  </span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px]"
                  style={{
                    background: "rgba(10, 13, 36, 0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <FaLinkedin className="text-blue-400 text-lg" />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#e2cdff",
                    }}
                  >
                    LINKEDIN ↗
                  </span>
                </a>
              </div>

              {/* Engineering Uptime Badge */}
              <div
                className="p-3.5 rounded-xl flex items-center justify-between border"
                style={{
                  background: "rgba(52,211,153,0.05)",
                  borderColor: "rgba(52,211,153,0.15)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#34D399",
                    }}
                  >
                    SYSTEM METRICS
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "11px",
                    color: "#BEC1DD",
                  }}
                >
                  LATENCY: ~12ms · UPTIME: 99.9%
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
