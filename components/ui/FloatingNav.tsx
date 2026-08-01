"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/utils/cn";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const prev = scrollYProgress.getPrevious() ?? 0;
    const direction = current - prev;
    if (scrollYProgress.get() < 0.05) {
      setVisible(true);
    } else {
      setVisible(direction < 0);
    }
  });

  return (
    <>
      {/* Desktop floating top nav — only show on scroll */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "hidden md:flex max-w-fit fixed top-4 inset-x-0 mx-auto z-[5000] rounded-full items-center justify-center gap-4 px-6 py-3",
            className
          )}
          style={{
            background: "rgba(24, 30, 54, 0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="transition-all duration-200 hover:opacity-100 opacity-60"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#e2cdff",
                textDecoration: "none",
              }}
            >
              {item.name.toUpperCase()}
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Mobile bottom nav bar */}
      <nav
        className="fixed bottom-0 inset-x-0 z-[5000] flex md:hidden justify-around items-center h-16 safe-area-inset-bottom"
        style={{
          background: "rgba(10, 13, 36, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className="flex flex-col items-center gap-1 py-2 px-3 transition-all duration-200 hover:opacity-100 opacity-50"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#e2cdff",
              textDecoration: "none",
            }}
          >
            <span style={{ fontSize: "16px" }}>
              {item.name === "Projects" ? "📦" :
               item.name === "Stack" ? "⚙️" :
               item.name === "Experience" ? "💼" :
               item.name === "Contact" ? "✉️" : "🔗"}
            </span>
            {item.name.toUpperCase()}
          </a>
        ))}
      </nav>
    </>
  );
};
