"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * KineticGlowCursor — Liquid Magnetic & Glow Tracking Cursor
 * Features:
 * - Liquid aspect ratio distortion based on mouse movement velocity
 * - Magnetic pull attraction toward interactive elements (buttons, links, glass cards)
 * - Refractive outer glass ring on hover
 */
export default function KineticGlowCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for liquid motion
  const cursorX = useSpring(mouseX, { damping: 24, stiffness: 280 });
  const cursorY = useSpring(mouseY, { damping: 24, stiffness: 280 });

  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  useEffect(() => {
    let prevX = 0;
    let prevY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate velocity for liquid stretch effect
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      prevX = e.clientX;
      prevY = e.clientY;

      // Stretch distortion
      const stretch = Math.min(speed * 0.015, 0.45);
      setScaleX(1 + stretch);
      setScaleY(1 - stretch * 0.5);

      // Check magnetic proximity to interactive elements
      const target = (e.target as HTMLElement)?.closest(
        "button, a, .glass-card, .magnetic-target"
      );

      if (target) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnetic attraction interpolation
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const dist = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (dist < 120) {
          mouseX.set(centerX + distanceX * 0.25);
          mouseY.set(centerY + distanceY * 0.25);
          setIsHovered(true);
          setTargetRect(rect);
          return;
        }
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsHovered(false);
      setTargetRect(null);
    };

    const handleMouseLeave = () => {
      mouseX.set(-100);
      mouseY.set(-100);
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Primary Liquid Radial Glow Blob */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9990] rounded-full mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? "280px" : "200px",
          height: isHovered ? "280px" : "200px",
          background: isHovered
            ? "radial-gradient(circle, rgba(203,172,249,0.3) 0%, rgba(96,165,250,0.15) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(203,172,249,0.2) 0%, rgba(52,211,153,0.1) 50%, transparent 70%)",
          scaleX,
          scaleY,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      />

      {/* Refractive Glass Ring (Triggers on magnetic hover) */}
      {isHovered && targetRect && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed pointer-events-none z-[9991] rounded-xl border border-purple/40 shadow-[0_0_20px_rgba(203,172,249,0.25)]"
          style={{
            left: targetRect.left - 4,
            top: targetRect.top - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
            borderRadius: getComputedStyle(document.body).borderRadius || "16px",
          }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        />
      )}
    </>
  );
}
