"use client";
import { useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColorLight?: string;
  glowColorDark?: string;
}

export const GlowingCard = ({ 
  children, 
  className, 
  glowColorLight = "#00b347", // Slightly darker default for light mode
  glowColorDark = "#00ff66"  // Brighter default for dark mode
}: GlowingCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      style={{
        "--glow-color-light": glowColorLight,
        "--glow-color-dark": glowColorDark,
      } as React.CSSProperties}
      className={cn(
        "relative rounded-xl border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 transition-colors glowing-card-wrapper",
        className
      )}
    >
      {/* The Glow Effect (Shows brightly on the 1px border gap) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0 rounded-xl"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, var(--glow-color, ${glowColorDark}), transparent 40%)`,
        }}
      />
      
      {/* Inner card background (Blocks the bright glow mostly, leaving the 1px border, but slight transparency allows an inner glow) */}
      <div className="absolute inset-[1px] rounded-[11px] bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md z-0 transition-colors" />
      
      {/* Content wrapper to ensure it sits above the background */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};
