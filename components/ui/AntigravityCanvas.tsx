"use client";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  targetX: number;
  targetY: number;
  angle: number;
  targetAngle: number;
  size: number;
  color: string;
  baseColor: string;
  vx: number;
  vy: number;
}

export const AntigravityCanvas: React.FC<{ className?: string }> = ({
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
      radius: 240,
      isHovering: false,
    };

    let particles: Particle[] = [];
    const spacing = 34;

    const getBaseColor = (x: number, y: number, w: number, h: number) => {
      const nx = x / Math.max(w, 1);
      const ny = y / Math.max(h, 1);
      const ratio = (1 - nx + ny) / 2;

      if (ratio < 0.35) {
        return `hsl(215, 60%, 55%)`;
      } else if (ratio < 0.7) {
        return `hsl(265, 55%, 55%)`;
      } else {
        return `hsl(340, 65%, 50%)`;
      }
    };

    const getBracketPoints = (
      centerX: number,
      centerY: number,
      w: number,
      h: number,
      density: number
    ) => {
      const pts: { x: number; y: number }[] = [];
      const halfW = w / 2;
      const halfH = h / 2;

      // Left Bracket {
      for (let i = 0; i < density; i++) {
        const t = (i / (density - 1)) * 2 - 1;
        const y = centerY + t * halfH;
        const curve = Math.sin((t + 1) * Math.PI) * 30;
        const x = centerX - halfW - curve;
        pts.push({ x, y });
      }

      // Right Bracket }
      for (let i = 0; i < density; i++) {
        const t = (i / (density - 1)) * 2 - 1;
        const y = centerY + t * halfH;
        const curve = Math.sin((t + 1) * Math.PI) * 30;
        const x = centerX + halfW + curve;
        pts.push({ x, y });
      }

      return pts;
    };

    const init = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      particles = [];
      const cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2;
          const y = j * spacing + spacing / 2;
          const baseColor = getBaseColor(x, y, width, height);

          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            targetX: x,
            targetY: y,
            angle: Math.PI / 4,
            targetAngle: Math.PI / 4,
            size: 5.5,
            color: baseColor,
            baseColor,
            vx: 0,
            vy: 0,
          });
        }
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
      mouse.isHovering = rect.top <= window.innerHeight && rect.bottom >= 0;
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
        mouse.isHovering = rect.top <= window.innerHeight && rect.bottom >= 0;
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

      const centerX = width / 2;
      const centerY = height / 2;
      const bracketW = Math.min(width * 0.6, 480);
      const bracketH = 240;

      const bracketPts = getBracketPoints(centerX, centerY, bracketW, bracketH, 28);

      // Render radial glow at mouse
      if (mouse.isHovering && mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.3
        );
        glowGradient.addColorStop(0, "rgba(59, 130, 246, 0.16)");
        glowGradient.addColorStop(0.5, "rgba(203, 172, 249, 0.06)");
        glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouse.x - p.baseX;
        const dy = mouse.y - p.baseY;
        const distFromMouse = Math.sqrt(dx * dx + dy * dy);

        let activeScale = 1;
        let activeAlpha = 0.22;
        let drawColor = p.baseColor;

        const isHoveredNear =
          mouse.isHovering &&
          mouse.x > 0 &&
          mouse.x < width &&
          mouse.y > 0 &&
          mouse.y < height &&
          distFromMouse < mouse.radius;

        let closestBracketPt: { x: number; y: number } | null = null;
        let minBracketDist = Infinity;

        if (isHoveredNear) {
          for (let bp = 0; bp < bracketPts.length; bp++) {
            const bdx = p.baseX - bracketPts[bp].x;
            const bdy = p.baseY - bracketPts[bp].y;
            const bdist = Math.sqrt(bdx * bdx + bdy * bdy);
            if (bdist < minBracketDist) {
              minBracketDist = bdist;
              closestBracketPt = bracketPts[bp];
            }
          }
        }

        if (isHoveredNear && closestBracketPt && minBracketDist < 85) {
          p.targetX = closestBracketPt.x;
          p.targetY = closestBracketPt.y;
          p.targetAngle = Math.atan2(
            closestBracketPt.y - centerY,
            closestBracketPt.x - centerX
          );
          drawColor = "#3B82F6";
          activeScale = 1.5;
          activeAlpha = 0.9;
        } else if (isHoveredNear) {
          const angleToMouse = Math.atan2(p.baseY - mouse.y, p.baseX - mouse.x);
          const force = (1 - distFromMouse / mouse.radius) * 18;

          p.targetX = p.baseX + Math.cos(angleToMouse) * force;
          p.targetY = p.baseY + Math.sin(angleToMouse) * force;
          p.targetAngle = angleToMouse;

          activeScale = 1.2;
          activeAlpha = 0.45;
          drawColor = "#60A5FA";
        } else {
          p.targetX = p.baseX;
          p.targetY = p.baseY;
          p.targetAngle = Math.PI / 4;
        }

        p.vx += (p.targetX - p.x) * 0.08;
        p.vy += (p.targetY - p.y) * 0.08;

        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        const diffAngle = p.targetAngle - p.angle;
        p.angle += Math.atan2(Math.sin(diffAngle), Math.cos(diffAngle)) * 0.12;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = activeAlpha;

        const pWidth = p.size * activeScale;
        const pHeight = 2.4 * activeScale;

        ctx.fillStyle = drawColor;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-pWidth / 2, -pHeight / 2, pWidth, pHeight, 1.5);
        } else {
          ctx.rect(-pWidth / 2, -pHeight / 2, pWidth, pHeight);
        }
        ctx.fill();

        ctx.restore();
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
      className={`absolute inset-0 pointer-events-none z-0 ${className || ""}`}
    />
  );
};

export default AntigravityCanvas;
