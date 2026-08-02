"use client";
import { useScroll, useSpring, motion } from "framer-motion";

/**
 * ScrollProgressBar — a 2px gradient line at the top of the viewport
 * that fills left-to-right as the user scrolls the page.
 * Driven by Framer Motion useScroll + useSpring for buttery smoothness.
 */
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 9999,
        background: "linear-gradient(90deg, #cbacf9 0%, #60a5fa 50%, #34D399 100%)",
        boxShadow: "0 0 8px rgba(203,172,249,0.6)",
      }}
    />
  );
};
