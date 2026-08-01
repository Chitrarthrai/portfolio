import React from 'react'

interface MagicButtonProps {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
  variant?: 'primary' | 'ghost';
}

/**
 * MagicButton — Stitch Obsidian Kinetic style
 * variant="primary" → purple-to-blue gradient with shimmer animation
 * variant="ghost"   → glassmorphism surface button
 */
const MagicButton = ({
  title, icon, position, handleClick, otherClasses, variant = 'primary'
}: MagicButtonProps) => {
  if (variant === 'ghost') {
    return (
      <button
        className={`glass-surface inline-flex items-center justify-center gap-2 px-7 rounded-lg h-12 transition-all duration-300 active:scale-95 ${otherClasses}`}
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          color: "#BEC1DD",
          border: "1px solid rgba(255,255,255,0.1)",
          minWidth: "160px",
        }}
        onClick={handleClick}
      >
        {position === 'left' && icon}
        {title}
        {position === 'right' && icon}
      </button>
    );
  }

  return (
    <button
      className={`primary-btn inline-flex items-center justify-center gap-2 px-7 rounded-lg h-12 font-bold text-white active:scale-95 ${otherClasses}`}
      style={{
        fontFamily: "Manrope, sans-serif",
        fontSize: "14px",
        fontWeight: 700,
        minWidth: "160px",
      }}
      onClick={handleClick}
    >
      {position === 'left' && icon}
      {title}
      {position === 'right' && icon}
    </button>
  )
}

export default MagicButton