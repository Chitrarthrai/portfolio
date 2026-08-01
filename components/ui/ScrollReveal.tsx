"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

type RevealPreset = "fade-up" | "fade-left" | "fade-right" | "zoom-in" | "blur-in";

interface ScrollRevealProps {
  children: React.ReactNode;
  preset?: RevealPreset;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const presets: Record<RevealPreset, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 48, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(12px)", y: 24 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  preset = "fade-up",
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  className,
  once = true,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={presets[preset]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
