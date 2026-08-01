"use client";
import React, { useEffect, useRef } from "react";

interface Square {
  x: number;
  y: number;
  width: number;
  height: number;
  baseColor: string;
  glowColor: string;
  currentGlow: number;
  targetGlow: number;
  scale: number;
  targetScale: number;
}

export const HoverSquareGrid: React.FC<{ className?: string }> = ({
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 200,
      isHovering: false,
    };

    let squares: Square[] = [];
    const gap = 6;

    // Color gradient across matrix (Indigo -> Violet -> Royal Blue)
    const getSquareColors = (x: number, y: number, w: number, h: number) => {
      const nx = x / Math.max(w, 1);
      const ny = y / Math.max(h, 1);
      const ratio = (1 - nx + ny) / 2;

      let baseHue = 240;
      let glowHue = 260;

      if (ratio < 0.35) {
        baseHue = 225; // Deep Royal Blue
        glowHue = 210; // Cyan Blue
      } else if (ratio < 0.7) {
        baseHue = 260; // Violet
        glowHue = 270; // Bright Purple
      } else {
        baseHue = 280; // Purple Magenta
        glowHue = 310; // Neon Pink
      }

      return {
        baseColor: `hsla(${baseHue}, 45%, 12%, 0.45)`,
        glowColor: `hsl(${glowHue}, 85%, 72%)`,
      };
    };

    const init = () => {
      // Always stretch to full viewport window width to eliminate any side gaps
      width = document.documentElement.clientWidth || window.innerWidth;
      const parent = canvas.parentElement;
      height = parent?.clientHeight || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.position = "fixed";
      canvas.style.left = "0";
      canvas.style.top = "0";

      ctx.scale(dpr, dpr);

      squares = [];
      const baseSize = 52;
      let currX = gap;

      // Generate dynamic grid with varying column widths and row heights
      while (currX < width + baseSize) {
        // Pseudo-random dynamic width per column
        const colWidth =
          baseSize + ((Math.sin(currX * 0.05) + 1) * 0.5) * 24;

        let currY = gap;
        while (currY < height + baseSize) {
          // Pseudo-random dynamic height per row/cell
          const rowHeight =
            baseSize + ((Math.cos((currX + currY) * 0.04) + 1) * 0.5) * 20;

          const { baseColor, glowColor } = getSquareColors(
            currX,
            currY,
            width,
            height
          );

          squares.push({
            x: currX,
            y: currY,
            width: colWidth,
            height: rowHeight,
            baseColor,
            glowColor,
            currentGlow: 0,
            targetGlow: 0,
            scale: 1,
            targetScale: 1,
          });

          currY += rowHeight + gap;
        }

        currX += colWidth + gap;
      }
    };

    init();

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.isHovering = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
        mouse.isHovering = true;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove);

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // Render dynamic square boxes
      for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];

        const sqCenterX = sq.x + sq.width / 2;
        const sqCenterY = sq.y + sq.height / 2;

        const dx = mouse.x - sqCenterX;
        const dy = mouse.y - sqCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.isHovering && mouse.x > 0 && dist < mouse.radius) {
          const intensity = Math.pow(1 - dist / mouse.radius, 1.8);
          sq.targetGlow = Math.min(intensity, 1);
          sq.targetScale = 1 + intensity * 0.08; // Dynamic slight expansion on hover
        } else {
          sq.targetGlow = 0;
          sq.targetScale = 1;
        }

        // Smooth glow and scale interpolation
        sq.currentGlow += (sq.targetGlow - sq.currentGlow) * 0.12;
        sq.scale += (sq.targetScale - sq.scale) * 0.12;

        ctx.save();
        ctx.translate(sqCenterX, sqCenterY);
        ctx.scale(sq.scale, sq.scale);
        ctx.translate(-sqCenterX, -sqCenterY);

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(sq.x, sq.y, sq.width, sq.height, 10);
        } else {
          ctx.rect(sq.x, sq.y, sq.width, sq.height);
        }

        // Base gradient background fill
        ctx.fillStyle = sq.baseColor;
        ctx.fill();

        // Light hover glow fill
        if (sq.currentGlow > 0.01) {
          ctx.fillStyle = `rgba(203, 172, 249, ${sq.currentGlow * 0.2})`;
          ctx.fill();

          ctx.lineWidth = 1 + sq.currentGlow * 0.8;
          ctx.strokeStyle = `rgba(203, 172, 249, ${sq.currentGlow * 0.5})`;
          ctx.stroke();
        } else {
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
          ctx.stroke();
        }

        ctx.restore();
      }

      // Draw subtle mouse ambient spotlight over the grid
      if (mouse.isHovering && mouse.x > 0) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.3
        );
        glow.addColorStop(0, "rgba(203, 172, 249, 0.12)");
        glow.addColorStop(0.5, "rgba(96, 165, 250, 0.04)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className || ""}`}
    />
  );
};

export default HoverSquareGrid;
