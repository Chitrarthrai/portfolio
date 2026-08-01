"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data";

const cliLines = [
  { prompt: "chitrarth --info", delay: 500 },
  { output: "Chitrarth Rai · Software Engineer @ Neophyte AI · React Native & MERN Full-Stack Specialist", delay: 800 },
  { prompt: "chitrarth --stack", delay: 200 },
  { output: "React Native | TypeScript | Node.js | MongoDB | Kotlin | C++ | Azure | Next.js", delay: 800 },
  { prompt: "chitrarth --reliance", delay: 200 },
  { output: "Building enterprise mobile & web apps for Reliance Retail · 40+ microservices shipped", delay: 800 },
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-margin-desktop h-20 transition-all duration-300"
        style={{
          background: "rgba(24, 30, 54, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
        }}
      >
        {/* Brand + status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(18px, 2.5vw, 28px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#e2cdff",
            }}
          >
            Chitrarth Rai
          </span>
          {/* Availability badge */}
          <div
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full glass-surface ml-1 sm:ml-2"
            style={{ border: "1px solid rgba(203,172,249,0.2)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#34D399" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#34D399" }} />
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "10px",
                fontWeight: 700,
                color: "#BEC1DD",
                letterSpacing: "0.05em",
              }}
            >
              <span className="hidden sm:inline">Available for Senior Roles</span>
              <span className="sm:hidden">Available</span>
            </span>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "PROJECTS", href: "#projects" },
            { label: "STACK", href: "#experience" },
            { label: "EXPERIENCE", href: "#experience" },
            { label: "CONTACT", href: "#contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:opacity-100 opacity-60"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#e2cdff",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Action: Command Palette, Equalizer Badge, Desktop Resume & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Audio Waveform Equalizer Badge */}
          <div
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg glass-surface border border-emerald-500/20 text-emerald-400"
            title="UI Web Audio Feedback Enabled"
          >
            <div className="flex items-end gap-[2px] h-3">
              <span className="eq-bar" />
              <span className="eq-bar" />
              <span className="eq-bar" />
              <span className="eq-bar" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-wider ml-1 hidden lg:inline">AUDIO ON</span>
          </div>

          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-surface border border-purple/30 text-xs font-mono font-bold text-purple hover:scale-105 transition-all"
            title="Open Command Palette (Cmd+K / Ctrl+K)"
          >
            <span>⌘K</span>
            <span className="hidden lg:inline text-[10px] text-white-200/70">SEARCH</span>
          </button>

          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block glass-surface px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#e2cdff",
              border: "1px solid rgba(203,172,249,0.3)",
            }}
          >
            RESUME
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-surface border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            <span className="text-xl">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-40 md:hidden flex flex-col p-6 space-y-6 animate-fade-in-up"
          style={{
            background: "rgba(11, 18, 41, 0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex flex-col space-y-4 pt-4">
            {[
              { label: "PROJECTS", href: "#projects" },
              { label: "STACK & EXPERIENCE", href: "#experience" },
              { label: "CONTACT", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl border border-white/5 bg-white/[0.02] text-lg font-bold text-white flex justify-between items-center"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                <span>{link.label}</span>
                <span className="text-purple text-sm">→</span>
              </a>
            ))}
          </div>

          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="primary-btn py-4 rounded-xl text-center font-bold text-white shadow-lg mt-auto"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Download Resume ↗
          </a>
        </div>
      )}
    </>
  );
};

const CLITerminal = () => {
  const [activeTab, setActiveTab] = useState("--info");
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tabs = ["--info", "--stack", "--reliance", "--contact"];

  const outputMap: Record<string, string> = {
    "--info": "Chitrarth Rai · Software Engineer @ Neophyte AI · React Native & MERN Full-Stack Specialist",
    "--stack": "React Native | TypeScript | Node.js | MongoDB | Kotlin | C++ | Azure | Next.js",
    "--reliance": "Building enterprise mobile & web apps for Reliance Retail · 40+ microservices shipped",
    "--contact": `Email: ${personalInfo.email} | GitHub: github.com/Chitrarthrai | LinkedIn: linkedin.com/in/chitrarth-rai-38a40917b`,
  };

  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // AudioContext fallback
    }
  };

  // Looping Typewriter + Backspace effect
  useEffect(() => {
    const fullText = outputMap[activeTab];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase: add one char at a time
      if (displayedText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 30);
      } else {
        // Finished typing: pause before backspacing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 3500);
      }
    } else {
      // Backspacing phase: erase one char at a time
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        }, 15);
      } else {
        // Finished erasing: restart typing
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, activeTab]);

  // When activeTab changes manually, reset typing state immediately
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setDisplayedText("");
    setIsDeleting(false);
    playClickSound();
  };

  return (
    <div
      className="glass-surface rounded-xl overflow-hidden w-full max-w-xl text-left"
      style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
    >
      {/* Terminal header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ background: "#2d344c", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: "#E11D48", opacity: 0.8 }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#FBBF24", opacity: 0.8 }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#34D399", opacity: 0.8 }} />
        <span
          className="ml-2 opacity-40"
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "#BEC1DD" }}
        >
          ~ zsh · chitrarth@portfolio
        </span>
        <span
          className="ml-auto px-2 py-0.5 rounded"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "10px",
            color: "#34D399",
            border: "1px solid rgba(52,211,153,0.3)",
            background: "rgba(52,211,153,0.1)",
          }}
        >
          CLI Mode
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4">
        {/* Command line */}
        <div className="flex items-center gap-2 mb-3">
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: "#34D399" }}>$</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: "#a4c9ff" }}>chitrarth</span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className="px-2.5 py-0.5 rounded transition-all duration-200 shrink-0"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "12px",
                  fontWeight: activeTab === tab ? 700 : 400,
                  color: activeTab === tab ? "#0b1229" : "#BEC1DD",
                  background: activeTab === tab ? "#cbacf9" : "transparent",
                  border: "1px solid",
                  borderColor: activeTab === tab ? "#cbacf9" : "rgba(255,255,255,0.1)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Output */}
        <div
          className="border-l-2 pl-3 ml-1 py-1 min-h-[50px] flex items-center"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p
            className="typing-cursor"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "12px",
              lineHeight: 1.7,
              color: "#BEC1DD",
            }}
          >
            &gt; {displayedText}
          </p>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col"
      style={{ backgroundColor: "#000319" }}
    >
      {/* Ambient grid overlay */}
      <div className="ambient-grid" aria-hidden="true" />

      {/* Nav */}
      <NavBar />

      {/* Main hero content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-margin-desktop flex flex-col items-center text-center pt-36 pb-24">

        {/* Tech pill badge */}
        <div
          className="glass-surface flex items-center gap-2 px-4 py-2 rounded-full mb-8 self-center"
          style={{ border: "1px solid rgba(214, 186, 255, 0.25)" }}
        >
          <span style={{ fontSize: "14px" }}>⌨️</span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#e2cdff",
            }}
          >
            REACT NATIVE &amp; MERN SPECIALIST
          </span>
        </div>

        {/* Main headline with Framer Motion Spring Stagger */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-6 leading-tight"
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#FFFFFF",
          }}
        >
          Building Scalable,{" "}
          <br className="hidden md:block" />
          <span className="text-gradient-stitch">
            Data-Driven Applications
          </span>
        </motion.h1>

        {/* Subtext */}
        <p
          className="max-w-2xl mb-10"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(16px, 2vw, 20px)",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "#BEC1DD",
          }}
        >
          Hi, I&apos;m{" "}
          <span style={{ color: "#cbacf9", fontWeight: 600 }}>Chitrarth</span>{" "}
          — a Software Engineer at Neophyte AI, building enterprise mobile &amp; web apps for Reliance.
        </p>

        {/* CLI Terminal */}
        <div className="w-full flex justify-center mb-10">
          <CLITerminal />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="#projects"
            className="primary-btn px-8 py-4 rounded-lg font-bold text-white active:scale-95"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              minWidth: "200px",
              textAlign: "center",
            }}
          >
            Explore App Showcase ↗
          </a>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-surface flex items-center gap-2 px-8 py-4 rounded-lg transition-all active:scale-95 justify-center"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "#BEC1DD",
              minWidth: "200px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span>⬇</span> Download Resume
          </a>
        </div>
      </main>
    </section>
  );
};

export default Hero;
