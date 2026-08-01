"use client";
import { useEffect } from "react";

/**
 * KineticGlowCursor — Stitch Obsidian Kinetic design system
 * Renders a fixed radial glow blob that follows the mouse cursor.
 * Purely decorative, pointer-events: none.
 */
export default function KineticGlowCursor() {
  useEffect(() => {
    const glow = document.getElementById("kinetic-glow");
    if (!glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      glow.style.opacity = "1";
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };

    const handleMouseLeave = () => {
      glow.style.opacity = "0";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      id="kinetic-glow"
      className="kinetic-glow opacity-0"
      aria-hidden="true"
    />
  );
}
