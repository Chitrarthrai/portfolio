"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import dynamic from "next/dynamic";
import { navItems } from "@/data";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Fast Page Load Optimization: Lazy load heavy components below the fold
const MetricsShowcase = dynamic(() => import("@/components/MetricsShowcase"), { ssr: true });
const AppShowcase = dynamic(() => import("@/components/AppShowcase"), { ssr: true });
const GithubActivityDashboard = dynamic(
  () => import("@/components/GithubActivityDashboard").then((m) => m.GithubActivityDashboard),
  { ssr: false }
);
const ExperienceStack = dynamic(() => import("@/components/ExperienceStack"), { ssr: true });
const RecentProjects = dynamic(() => import("@/components/RecentProjects"), { ssr: true });
const Education = dynamic(() => import("@/components/Education"), { ssr: true });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const KineticGlowCursor = dynamic(() => import("@/components/KineticGlowCursor"), { ssr: false });
const AntigravityCanvas = dynamic(
  () => import("@/components/ui/AntigravityCanvas").then((m) => m.AntigravityCanvas),
  { ssr: false }
);
const CommandPalette = dynamic(
  () => import("@/components/ui/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);
const AnimatedMeshGradient = dynamic(
  () => import("@/components/ui/AnimatedMeshGradient").then((m) => m.AnimatedMeshGradient),
  { ssr: false }
);

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const Grid = dynamic(() => import("@/components/Grid"), {
    ssr: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative flex flex-col justify-start items-center w-full min-h-screen" style={{ backgroundColor: "#000319" }}>
      {/* Stitch: fixed ambient background grid & interactive particle canvas */}
      <div className="bg-grid-stitch" aria-hidden="true" />

      {/* Animated gradient mesh — cinematic drifting colour orbs */}
      <AnimatedMeshGradient />

      <AntigravityCanvas className="fixed inset-0 opacity-40" />

      {/* Stitch: kinetic cursor glow */}
      <KineticGlowCursor />

      {/* Global Cmd+K Command Palette */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
      />

      {/* Floating nav (mobile bottom bar) */}
      <FloatingNav navItems={navItems} />

      {/* Page sections — Stitch narrative order */}
      <div className="w-full z-10 flex flex-col items-center">
        {/* 1. Hero — no reveal, always visible */}
        <Hero />

        {/* 2. Engineering Impact (Metrics Bento) */}
        <ScrollReveal preset="fade-up" delay={0.05} className="w-full">
          <MetricsShowcase />
        </ScrollReveal>

        {/* 3. App Showcase */}
        <ScrollReveal preset="blur-in" delay={0.05} className="w-full">
          <AppShowcase />
        </ScrollReveal>

        {/* 4. GitHub Live Activity Dashboard */}
        <ScrollReveal preset="fade-up" delay={0.05} className="w-full">
          <GithubActivityDashboard />
        </ScrollReveal>

        {/* 5. Experience + Technical Arsenal (merged) */}
        <ScrollReveal preset="fade-left" delay={0.05} className="w-full">
          <ExperienceStack />
        </ScrollReveal>

        {/* 6. About / Tech Bento Grid */}
        <ScrollReveal preset="zoom-in" delay={0.05} className="w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-24">
          <Grid />
        </ScrollReveal>

        {/* 7. Projects */}
        <ScrollReveal preset="fade-up" delay={0.05} className="w-full">
          <RecentProjects />
        </ScrollReveal>

        {/* 8. Education */}
        <ScrollReveal preset="fade-right" delay={0.05} className="w-full">
          <Education />
        </ScrollReveal>

        {/* 9. Initiate Contact Hub */}
        <ScrollReveal preset="blur-in" delay={0.05} className="w-full">
          <ContactSection />
        </ScrollReveal>

        {/* 10. Footer */}
        <ScrollReveal preset="fade-up" delay={0.05} className="w-full">
          <Footer />
        </ScrollReveal>
      </div>
    </main>
  );
}
