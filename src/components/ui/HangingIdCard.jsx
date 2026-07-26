"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

// ─── Physics constants ────────────────────────────────────────────────────────
const SPRING_K = 0;          // No spring! A real pendulum relies only on gravity
const DAMPING  = 0.9;        // Light air resistance so it swings naturally
const GRAVITY  = 3000;       // Gravity scalar for satisfying snappy momentum
const MASS     = 1;

// ─── SVG Thick Lanyard / Ribbon ──────────────────────────────────────────────────────
const Lanyard = ({ length, color }) => {
  return (
    <svg 
      width="30" 
      height={length} 
      viewBox={`0 0 30 ${length}`} 
      style={{ display: "block", margin: "0 auto", overflow: "visible" }}
    >
      <circle cx="15" cy="0" r="5" fill={color} />
      <path d={`M 13 0 L 10 ${length}`} stroke={color} strokeWidth="6" opacity="0.9" />
      <path d={`M 17 0 L 20 ${length}`} stroke={color} strokeWidth="6" opacity="0.9" />
      <rect x="10" y={length - 6} width="10" height="8" rx="2" fill="#94a3b8" />
      <circle cx="15" cy={length + 2} r="3" fill="#e2e8f0" />
    </svg>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const HangingIdCard = ({
  children,
  ropeLength  = 130, 
  ropeColor   = "#27272a",
  className,
  name        = "Institution",
  role        = "Degree",
  badgeId     = "Year",
  accentColor = "#00ff66",
  imageText   = "🎓"
}) => {
  const physRef      = useRef({ angle: 0, vel: 0 });
  const rafRef       = useRef(null);
  const prevTimeRef  = useRef(null);
  const prevAngleRef = useRef(0);
  const isDraggingRef= useRef(false);

  const [angle, setAngle] = useState(0);
  const [isDragState, setIsDragState] = useState(false);
  const dragStartX   = useRef(0);
  const dragAngle0   = useRef(0);

  // ── Physics loop ────────────────────────────────────────────────────────────
  const tick = useCallback((now) => {
    if (prevTimeRef.current === null) { prevTimeRef.current = now; }
    const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05);
    prevTimeRef.current = now;

    const s = physRef.current;
    if (!isDraggingRef.current) {
      const L = ropeLength + 100; 
      const torque =
        -(GRAVITY / L)    * Math.sin(s.angle) -
        (DAMPING  / MASS) * s.vel             -
        (SPRING_K / MASS) * s.angle;

      s.vel   += torque * dt;
      s.angle += s.vel  * dt;

      setAngle(s.angle);

      if (Math.abs(s.angle) > 0.001 || Math.abs(s.vel) > 0.001) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        s.angle = 0; s.vel = 0;
        setAngle(0);
      }
    } else {
      if (dt > 0) {
        s.vel = (s.angle - prevAngleRef.current) / dt;
      }
      prevAngleRef.current = s.angle;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [ropeLength]);

  const startPhysics = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // ── Pointer events ──────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    setIsDragState(true);
    dragStartX.current   = e.clientX;
    dragAngle0.current   = physRef.current.angle;
    prevAngleRef.current = physRef.current.angle;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onPointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    const L = ropeLength + 100; 
    const newAngle = dragAngle0.current - dx / L;
    const clamped  = Math.max(-1.4, Math.min(1.4, newAngle));
    physRef.current.angle = clamped;
    setAngle(clamped);
  }, [ropeLength]);

  const onPointerUp = useCallback((e) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDraggingRef.current = false;
    setIsDragState(false);
  }, []);

  const onCardClick = useCallback(() => {
    if (Math.abs(physRef.current.vel) < 0.1 && Math.abs(physRef.current.angle) < 0.05) {
      physRef.current.vel = 4.0;
      startPhysics();
    }
  }, [startPhysics]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const cardRotateDeg = angle * (180 / Math.PI);

  return (
    <div
      className={cn("flex flex-col items-center select-none", className)}
      style={{ touchAction: "none" }}
    >
      <div
        className="w-3 h-3 rounded-full shadow-md z-10 relative"
        style={{ background: accentColor }}
      />
      <div 
        className="flex flex-col items-center cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onCardClick}
        style={{
          transform: `rotate(${cardRotateDeg}deg)`,
          transformOrigin: "top center",
          willChange: "transform",
          marginTop: "-6px"
        }}
      >
        <div style={{ pointerEvents: "none" }}>
          <Lanyard length={ropeLength} color={ropeColor} />
        </div>
        <div 
          className="relative w-56 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl pointer-events-none mt-[-2px]"
          style={{ boxShadow: `0 20px 40px -10px ${accentColor}40` }}
        >
          {children ?? (
            <div className="flex flex-col h-full relative">
              <BorderBeam size={120} duration={4} delay={0} borderWidth={2} colorFrom={accentColor} colorTo="#ffffff" className="z-0 opacity-40 dark:opacity-100" />
              
              <div
                className="px-4 py-8 flex flex-col items-center gap-1 relative z-10"
                style={{ background: `linear-gradient(180deg, ${accentColor}20 0%, transparent 100%)` }}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div 
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-md shadow-xl border border-black/5 dark:border-white/10 z-10 text-3xl mb-3"
                  style={{ boxShadow: `0 0 20px ${accentColor}40` }}
                >
                  {imageText}
                </div>
                <p className="text-[12px] font-black tracking-[0.15em] text-center text-zinc-900 dark:text-white uppercase z-10 drop-shadow-md">
                  {name}
                </p>
              </div>
              
              <div className="px-5 pb-6 flex flex-col items-center gap-2 flex-1 relative z-10">
                <p className="text-sm font-black text-center leading-tight uppercase font-montserrat" style={{ color: accentColor }}>
                  {role}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold text-center">
                  {badgeId}
                </p>
                
                <div className="my-3 w-full border-t border-dashed border-zinc-300 dark:border-zinc-800" />
                
                <div className="flex gap-[2px] items-end h-8 px-1 opacity-30">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-black dark:bg-white rounded-[1px]"
                      style={{
                        width: i % 3 === 0 ? "3px" : "1.5px",
                        height: `${(50 + Math.sin(i * 1.3) * 35).toFixed(2)}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="mt-8 text-[11px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest select-none pointer-events-none">
        Drag or click card
      </p>
    </div>
  );
};
