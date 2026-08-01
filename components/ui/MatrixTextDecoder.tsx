"use client";
import React, { useState, useEffect } from "react";

interface MatrixTextDecoderProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/~[]{}";

export const MatrixTextDecoder: React.FC<MatrixTextDecoderProps> = ({
  text,
  className = "",
  style = {},
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);

  const startDecode = () => {
    if (isDecoding) return;
    setIsDecoding(true);
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsDecoding(false);
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, 30);
  };

  return (
    <span
      onMouseEnter={startDecode}
      className={`cursor-pointer transition-colors duration-200 ${className}`}
      style={style}
      title="Hover to trigger Matrix Code Decode"
    >
      {displayText}
    </span>
  );
};
