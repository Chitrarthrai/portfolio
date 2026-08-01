"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import dynamic from "next/dynamic";
import { navItems } from "@/data";

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
        {/* 1. Hero */}
        <Hero />

        {/* 2. Engineering Impact (Metrics Bento) */}
        <MetricsShowcase />

        {/* 3. App Showcase */}
        <AppShowcase />

        {/* 4. GitHub Live Activity Dashboard */}
        <GithubActivityDashboard />

        {/* 5. Experience + Technical Arsenal (merged) */}
        <ExperienceStack />

        {/* 6. About / Tech Bento Grid */}
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-24">
          <Grid />
        </div>

        {/* 7. Projects */}
        <RecentProjects />

        {/* 8. Education */}
        <Education />

        {/* 9. Initiate Contact Hub */}
        <ContactSection />

        {/* 10. Footer */}
        <Footer />
      </div>
    </main>
  );
}
