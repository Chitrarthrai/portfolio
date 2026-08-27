"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMobileAlt,
  FaCamera,
  FaRobot,
  FaSearch,
  FaCode,
  FaCheckCircle,
  FaShieldAlt,
  FaSlidersH,
  FaGlobe,
  FaAndroid,
  FaGithub,
} from "react-icons/fa";

const apps = [
  {
    id: "neodisha",
    title: "Neo Disha — Mobile Camera App",
    tagline: "High-Performance Camera Pipeline for Reliance Field Operations",
    badge: "Reliance Production Deployment",
    badgeColor: "badge-reliance",
    icon: FaCamera,
    metrics: [
      { label: "Frame Processing Latency", val: "-40%" },
      { label: "Sensor Support", val: "12MP Arrays" },
      { label: "Security Audit", val: "VAPT Compliant" },
    ],
    features: [
      "Custom Kotlin Native Module & C++ ONNX Runtime integration for real-time image sharpening",
      "Sub-pixel precision touch mapping and gesture-driven Reanimated UI",
      "SSL Certificate pinning, ProGuard obfuscation & AES-256 / RSA encryption",
      "Automated Reliance DevOps CI/CD build & test pipeline",
    ],
    tech: ["React Native", "Kotlin Native Module", "C++", "ONNX Runtime", "Reanimated"],
    codeSnippet: `// Kotlin Native Module: High-Performance Camera Frame Sharpener
package com.neophyte.neodisha.camera

import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import ai.onnxruntime.OrtEnvironment
import ai.onnxruntime.OrtSession

class CameraSharpenModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val ortEnv = OrtEnvironment.getEnvironment()
    private var ortSession: OrtSession? = null

    @ReactMethod
    fun processFrameBuffer(byteData: ByteArray, width: Int, height: Int, promise: Promise) {
        val sharpenedBuffer = NativeSharpenBridge.applyOnnxFilter(byteData, width, height)
        promise.resolve(sharpenedBuffer)
    }
}`,
  },
  {
    id: "financetask",
    title: "FinanceTask — AI Financial Tracker",
    tagline: "Cross-Platform Tracker with Zero-Shot Gemini AI & Offline SMS Scraping",
    badge: "Personal Project",
    badgeColor: "badge-personal",
    icon: FaRobot,
    metrics: [
      { label: "Sync Latency", val: "<100ms" },
      { label: "AI Entity Recognition", val: "95% Acc." },
      { label: "Alert Parsing", val: "Regex SMS" },
    ],
    features: [
      "Real-time state synchronization via Supabase WebSockets & PostgreSQL triggers across iOS/Android/Web",
      "Kanban productivity dashboard utilizing Gemini AI for zero-shot Named Entity Recognition on raw notes",
      "Kotlin Native Module for background SMS scraping parsing banking alerts into automated expense logs",
      "Interactive KPI dashboard using Recharts for dynamic daily spending limit adjustments",
    ],
    tech: ["React Native", "React.js", "TypeScript", "Supabase", "Gemini AI", "Kotlin"],
    liveUrl: "https://finance-task-ten.vercel.app/",
    appUrl: "https://github.com/Chitrarthrai/FinanceTask/releases",
    githubUrl: "https://github.com/Chitrarthrai/FinanceTask",
    codeSnippet: `// React Native + Supabase Realtime Sync Hook
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const useRealtimeFinances = (userId: string) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const channel = supabase
      .channel('finance_sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, 
        payload => { setTransactions(prev => [payload.new, ...prev]); })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  return { transactions };
};`,
  },
  {
    id: "checkit",
    title: "CheckIt — Price Aggregator App",
    tagline: "Real-Time Price Comparison across 7 Quick-Commerce Platforms",
    badge: "Personal Project",
    badgeColor: "badge-personal",
    icon: FaSearch,
    metrics: [
      { label: "Platforms Aggregated", val: "7 Major Apps" },
      { label: "Local Caching", val: "Expo SQLite" },
      { label: "Search Engine", val: "Fuzzy Match" },
    ],
    features: [
      "Aggregates and compares grocery & essential prices in real-time across 7 major quick-commerce platforms",
      "Client-side search optimization with debouncing & fuzzy matching for instant query responses",
      "Offline-first local caching using Expo SQLite to minimize API overhead",
      "Serverless Functions & Firebase Realtime Database integration for price delta alerts",
    ],
    tech: ["React Native", "Expo", "SQLite", "Firebase", "Fuzzy Search"],
    githubUrl: "https://github.com/Chitrarthrai/CheckIt",
    codeSnippet: `// Client-Side Fuzzy Search Optimization with Expo SQLite
import * as SQLite from 'expo-sqlite';
import Fuse from 'fuse.js';

const db = SQLite.openDatabase('checkit_cache.db');

export const queryFuzzyPrice = async (searchTerm: string) => {
  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM items_cache;', [], (_, { rows }) => {
        const fuse = new Fuse(rows._array, { keys: ['name', 'category'], threshold: 0.3 });
        resolve(fuse.search(searchTerm));
      });
    });
  });
};`,
  },
];

const AppShowcase = () => {
  const [activeAppId, setActiveAppId] = useState(apps[0].id);
  const [showCodeDrawer, setShowCodeDrawer] = useState(false);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100

  const activeApp = apps.find((a) => a.id === activeAppId) || apps[0];

  return (
    <section id="app-development" className="w-full py-20 px-4 sm:px-6 md:px-margin-desktop relative z-10" style={{ backgroundColor: "#000319" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ border: "1px solid rgba(203,172,249,0.3)", background: "rgba(203,172,249,0.08)" }}
          >
            <FaMobileAlt style={{ color: "#cbacf9" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#cbacf9" }}>
              APPLICATION ENGINEERING SPECIALIST
            </span>
          </div>
          <h2
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Engineered for{" "}
            <span className="text-gradient-stitch">Performance.</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "#BEC1DD",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            High-performance React Native &amp; Kotlin Native applications engineered
            for real-time responsiveness, security, and low latency.
          </p>
        </div>


        {/* App Selector Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap">
          {apps.map((app) => {
            const Icon = app.icon;
            const isActive = app.id === activeAppId;
            return (
              <button
                key={app.id}
                onClick={() => setActiveAppId(app.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-purple/20 border-purple text-white shadow-[0_0_20px_rgba(203,172,249,0.2)]"
                    : "border-white/[0.1] text-white-200 hover:border-purple/30 hover:text-white bg-[#10132E]/60"
                }`}
              >
                <Icon className={isActive ? "text-purple" : "text-white-200"} />
                {app.title.split("—")[0]}
              </button>
            );
          })}
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left: Smartphone Device Frame */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <motion.div
              key={activeApp.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-[320px] h-[520px] sm:h-[580px] device-frame p-4 flex flex-col justify-between"
            >
              {/* Camera Notch */}
              <div className="device-notch flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-black/80" />
              </div>

              {/* Header */}
              <div className="pt-5 sm:pt-6 pb-3 border-b border-white/[0.1] text-center z-20">
                <span className={activeApp.badgeColor}>{activeApp.badge}</span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-2">
                  {activeApp.title.split("—")[0]}
                </h4>
              </div>

              {/* Screen Body / Live Simulator */}
              {activeApp.id === "neodisha" ? (
                /* ONNX Image Sharpening Interactive Comparison Slider */
                <div className="my-auto z-20 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-purple px-1">
                    <span>Raw 12MP Camera</span>
                    <span>ONNX C++ Filter ({sliderPos}%)</span>
                  </div>
                  <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/[0.15] select-none">
                    {/* Raw Image Layer */}
                    <div
                      className="absolute inset-0 bg-cover bg-center filter contrast-75 brightness-90 grayscale"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80')",
                      }}
                    >
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-amber-400">
                        RAW INPUT
                      </span>
                    </div>

                    {/* Sharpened ONNX Image Layer */}
                    <div
                      className="absolute inset-y-0 right-0 bg-cover bg-center overflow-hidden border-l-2 border-purple shadow-2xl"
                      style={{
                        width: `${100 - sliderPos}%`,
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80')",
                        filter: "contrast(135%) brightness(110%) saturate(140%)",
                      }}
                    >
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-purple/80 text-[9px] font-mono text-slate-950 font-bold">
                        ONNX ENHANCED
                      </span>
                    </div>
                  </div>

                  {/* Interactive Slider Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <FaSlidersH className="text-purple text-xs" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPos}
                      onChange={(e) => setSliderPos(Number(e.target.value))}
                      className="w-full accent-purple cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                /* Simulated Metrics */
                <div className="my-auto space-y-3 z-20">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center">
                    <span className="text-[10px] sm:text-xs text-white-200">Engineering Focus</span>
                    <p className="text-xs sm:text-sm font-semibold text-purple mt-1">
                      {activeApp.tagline}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                    {activeApp.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-2 rounded-lg bg-purple/10 border border-purple/20"
                      >
                        <p className="text-xs sm:text-sm font-extrabold text-white">
                          {m.val}
                        </p>
                        <span className="text-[8px] sm:text-[9px] text-white-200 leading-tight block mt-0.5">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pb-2 pt-2 z-20 space-y-2">
                {(activeApp.liveUrl || activeApp.appUrl) && (
                  <div className="grid grid-cols-2 gap-2">
                    {activeApp.liveUrl && (
                      <a
                        href={activeApp.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1 transition-all hover:scale-102"
                        style={{
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          color: "#FFFFFF",
                          boxShadow: "0 0 16px rgba(16,185,129,0.3)",
                        }}
                      >
                        <FaGlobe size={11} /> Live Web ↗
                      </a>
                    )}
                    {activeApp.appUrl && (
                      <a
                        href={activeApp.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-2 rounded-xl text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1 transition-all hover:scale-102"
                        style={{
                          background: "rgba(164,201,255,0.15)",
                          border: "1px solid rgba(164,201,255,0.35)",
                          color: "#a4c9ff",
                        }}
                      >
                        <FaAndroid size={12} /> Mobile APK ↗
                      </a>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setShowCodeDrawer(!showCodeDrawer)}
                  className="w-full py-2.5 rounded-xl bg-purple text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg"
                >
                  <FaCode /> {showCodeDrawer ? "Hide Code" : "Inspect Native Code"}
                </button>
              </div>

              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple/10 via-transparent to-blue-500/10 pointer-events-none z-10" />
            </motion.div>

            {/* Verification Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 text-[10px] font-mono text-white-200/80">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <FaCheckCircle /> 60 FPS Stable
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple">
                <FaShieldAlt /> VAPT Audit Verified
              </span>
            </div>
          </div>

          {/* Right: Technical Features & Code Drawer */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              key={activeApp.id + "-details"}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl sm:rounded-3xl border border-white/[0.1] p-5 sm:p-8 bg-[#10132E]/80 backdrop-blur-xl w-full"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeApp.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {activeApp.liveUrl && (
                    <a
                      href={activeApp.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-transform hover:scale-105"
                      style={{
                        color: "#34D399",
                        background: "rgba(52,211,153,0.15)",
                        border: "1px solid rgba(52,211,153,0.35)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Web ↗
                    </a>
                  )}
                  {activeApp.appUrl && (
                    <a
                      href={activeApp.appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-transform hover:scale-105"
                      style={{
                        color: "#a4c9ff",
                        background: "rgba(164,201,255,0.15)",
                        border: "1px solid rgba(164,201,255,0.35)",
                      }}
                    >
                      <FaAndroid size={11} />
                      APK Releases ↗
                    </a>
                  )}
                  <span className={activeApp.badgeColor}>{activeApp.badge}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-purple font-medium mb-5 sm:mb-6">
                {activeApp.tagline}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {activeApp.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <FaCheckCircle className="text-emerald-400 mt-1 shrink-0 text-xs sm:text-sm" />
                    <p className="text-xs sm:text-sm text-white-200/90 leading-relaxed">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>

              {/* Interactive Topology Diagram Drawer */}
              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                    SYSTEM ARCHITECTURE TOPOLOGY
                  </span>
                  <span className="text-[10px] font-mono text-white-200/50">
                    REAL-TIME NODE FLOW
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center p-3 rounded-xl bg-black/50 border border-white/10 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-purple/10 border border-purple/30 text-purple flex flex-col items-center">
                    <span className="font-bold text-xs mb-1">React Native App</span>
                    <span className="text-[9px] text-white-200/70">Edge Frame Capture</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex flex-col items-center">
                    <span className="font-bold text-xs mb-1">Kotlin C++ ONNX</span>
                    <span className="text-[9px] text-white-200/70">-40% Frame Latency</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex flex-col items-center">
                    <span className="font-bold text-xs mb-1">MongoDB / Supabase</span>
                    <span className="text-[9px] text-white-200/70">&lt;100ms Sync Speed</span>
                  </div>
                </div>
              </div>

              {/* Code Drawer */}
              <AnimatePresence>
                {showCodeDrawer && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-6 pt-4 border-t border-purple/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] sm:text-xs font-mono text-purple">
                        Native Implementation Snippet
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white-200/50">
                        Syntactically Verified
                      </span>
                    </div>
                    <pre className="p-3 sm:p-4 rounded-xl bg-black/90 text-[10px] sm:text-xs font-mono text-emerald-300 overflow-x-auto border border-white/[0.1] leading-relaxed">
                      <code>{activeApp.codeSnippet}</code>
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
