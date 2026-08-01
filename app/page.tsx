"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import dynamic from "next/dynamic";
import RecentProjects from "@/components/RecentProjects";
import ExperienceStack from "@/components/ExperienceStack";
import Education from "@/components/Education";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MetricsShowcase from "@/components/MetricsShowcase";
import AppShowcase from "@/components/AppShowcase";
import KineticGlowCursor from "@/components/KineticGlowCursor";
import { AntigravityCanvas } from "@/components/ui/AntigravityCanvas";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { GithubActivityDashboard } from "@/components/GithubActivityDashboard";
import { navItems } from "@/data";

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
