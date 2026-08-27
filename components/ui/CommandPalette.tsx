"use client";
import React, { useState, useEffect } from "react";
import { personalInfo, projects, skills } from "@/data";
import { FaSearch, FaTimes, FaTerminal, FaCode, FaEnvelope, FaFileDownload, FaVolumeUp, FaVolumeMute, FaGlobe, FaAndroid } from "react-icons/fa";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null; // Handled at parent level or toggled
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "nav-projects",
      title: "Jump to Featured Projects",
      category: "Navigation",
      icon: <FaCode className="text-purple" />,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-stack",
      title: "Jump to Technical Arsenal & Stack",
      category: "Navigation",
      icon: <FaTerminal className="text-emerald-400" />,
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-contact",
      title: "Initiate Contact / Transmit Payload",
      category: "Navigation",
      icon: <FaEnvelope className="text-blue-400" />,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "copy-email",
      title: `Copy Email (${personalInfo.email})`,
      category: "Action",
      icon: <FaEnvelope className="text-amber-400" />,
      action: () => {
        navigator.clipboard.writeText(personalInfo.email);
        alert("Email copied to clipboard!");
        onClose();
      },
    },
    {
      id: "open-financetask-web",
      title: "Launch FinanceTask Live Web App",
      category: "Live Projects",
      icon: <FaGlobe className="text-emerald-400" />,
      action: () => {
        window.open("https://finance-task-ten.vercel.app/", "_blank");
        onClose();
      },
    },
    {
      id: "download-financetask-apk",
      title: "Download FinanceTask Android App (APK)",
      category: "Live Projects",
      icon: <FaAndroid className="text-blue-400" />,
      action: () => {
        window.open("https://github.com/Chitrarthrai/FinanceTask/releases", "_blank");
        onClose();
      },
    },
    {
      id: "view-chatx-repo",
      title: "View ChatX Platform Repo (In Development)",
      category: "Projects",
      icon: <FaCode className="text-amber-400" />,
      action: () => {
        window.open("https://github.com/Chitrarthrai/ChatX", "_blank");
        onClose();
      },
    },
    {
      id: "download-resume",
      title: "Download Resume (PDF)",
      category: "Action",
      icon: <FaFileDownload className="text-purple" />,
      action: () => {
        window.open(personalInfo.resumeUrl, "_blank");
        onClose();
      },
    },
    {
      id: "toggle-sound",
      title: soundEnabled ? "Disable UI Sound Effects" : "Enable UI Sound Effects",
      category: "Preferences",
      icon: soundEnabled ? <FaVolumeUp className="text-emerald-400" /> : <FaVolumeMute className="text-red-400" />,
      action: () => {
        onToggleSound();
        onClose();
      },
    },
  ];

  // Add project search results
  const matchingProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.des.toLowerCase().includes(query.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="glass-card rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
        style={{ background: "rgba(10, 13, 36, 0.95)" }}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <FaSearch className="text-purple text-lg" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search tech stack (e.g. Kotlin, ONNX, Projects)..."
            className="w-full bg-transparent text-white placeholder:text-white-200/50 text-sm font-sans focus:outline-none"
          />
          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-white-200/60 bg-white/5 border border-white/10">
            ESC
          </span>
          <button onClick={onClose} className="text-white-200 hover:text-white">
            <FaTimes />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 no-scrollbar">
          {filteredActions.length > 0 && (
            <div className="px-3 py-1 text-[10px] font-mono font-bold text-purple tracking-widest uppercase">
              QUICK COMMANDS
            </div>
          )}
          {filteredActions.map((act, i) => (
            <div
              key={act.id}
              onClick={act.action}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-purple/15 transition-all text-sm group"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{act.icon}</span>
                <span className="font-medium text-white group-hover:text-purple transition-colors">
                  {act.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white-200/40 uppercase">
                {act.category}
              </span>
            </div>
          ))}

          {matchingProjects.length > 0 && (
            <>
              <div className="px-3 py-1 pt-3 text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase border-t border-white/5">
                MATCHING PROJECTS
              </div>
              {matchingProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                    onClose();
                  }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-emerald-500/10 transition-all text-sm group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                      {proj.category}
                    </span>
                    <span className="font-medium text-white group-hover:text-emerald-400">
                      {proj.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-white-200/50">
                    {proj.technologies.slice(0, 2).join(", ")}
                  </span>
                </div>
              ))}
            </>
          )}

          {filteredActions.length === 0 && matchingProjects.length === 0 && (
            <div className="p-8 text-center text-sm text-white-200/60 font-mono">
              No matching commands or projects found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white-200/50">
          <span>Navigate with ↵ Enter</span>
          <span>Chitrarth Rai OS v2.4</span>
        </div>
      </div>
    </div>
  );
};
