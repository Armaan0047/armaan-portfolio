"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sun, Cloud, MessageSquare, Briefcase, Zap } from "lucide-react";

// --- Default Orbits ---
const defaultOrbits = [
  {
    id: 1,
    radiusFactor: 0.15,
    speed: 7,
    icon: <Zap className="text-yellow-400" />,
    iconSize: 20,
    orbitColor: "rgba(255, 193, 7, 0.4)",
    orbitThickness: 1.5,
  },
  {
    id: 2,
    radiusFactor: 0.35,
    speed: 12,
    icon: <MessageSquare className="text-sky-500" />,
    iconSize: 24,
    orbitThickness: 1.5,
  },
];

export const BeamCircle = ({
  size = 300,
  orbits: customOrbits,
  centerIcon,
}) => {
  const orbitsData = useMemo(() => customOrbits || defaultOrbits, [customOrbits]);
  const halfSize = size / 2;

  // --- Define linear easing manually ---
  const linearEase = (t) => t;

  const rotationTransition = (duration) => ({
    repeat: Infinity,
    duration,
    ease: linearEase,
  });

  // --- Center Sun Icon with Orange Solar Particles ---
  const CenterIcon = useMemo(
    () => {
      // Deterministic random values to prevent SSR hydration mismatch
      const randoms = [0.12, 0.45, 0.88, 0.23, 0.67, 0.91, 0.34, 0.76, 0.19, 0.55, 0.99, 0.04, 0.82, 0.38, 0.61];

      // Create random solar flare particles
      const particles = Array.from({ length: 15 }).map((_, i) => {
        const rand = randoms[i];
        const angle = (i * 24) * (Math.PI / 180);
        // Particles travel outward beyond the sun's surface
        const distance = halfSize * 0.25 + rand * (halfSize * 0.15);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const size = rand * 4 + 2;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FF6200]"
            style={{
              width: size,
              height: size,
              left: '50%',
              top: '50%',
              marginLeft: -size / 2,
              marginTop: -size / 2,
              boxShadow: '0 0 10px 3px rgba(255, 98, 0, 0.8)'
            }}
            animate={{
              x: [0, x * 1.2, x],
              y: [0, y * 1.2, y],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5 + rand * 2,
              ease: "easeOut",
              delay: randoms[(i + 5) % 15] * 2
            }}
          />
        );
      });

      return (
        <div className="relative grid place-content-center">
          {/* Orange Particles Layer */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-10 grid place-content-center"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          >
            {particles}
          </motion.div>

          {/* Core Sun */}
          <motion.div
            className="rounded-full grid place-content-center z-20 relative"
            style={{ 
              width: halfSize * 0.28, 
              height: halfSize * 0.28,
              background: 'radial-gradient(circle, #FFD700 0%, #FF8C00 40%, #FF6200 70%, #FF4500 100%)',
              boxShadow: '0 0 30px 10px rgba(255, 140, 0, 0.5), 0 0 60px 20px rgba(255, 100, 0, 0.3), 0 0 100px 40px rgba(255, 69, 0, 0.15)',
            }}
            animate={{ 
              rotate: 360,
              boxShadow: [
                '0 0 30px 10px rgba(255, 140, 0, 0.5), 0 0 60px 20px rgba(255, 100, 0, 0.3), 0 0 100px 40px rgba(255, 69, 0, 0.15)',
                '0 0 40px 15px rgba(255, 140, 0, 0.6), 0 0 80px 30px rgba(255, 100, 0, 0.4), 0 0 120px 50px rgba(255, 69, 0, 0.2)',
                '0 0 30px 10px rgba(255, 140, 0, 0.5), 0 0 60px 20px rgba(255, 100, 0, 0.3), 0 0 100px 40px rgba(255, 69, 0, 0.15)',
              ]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 20, ease: "linear" },
              boxShadow: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
          >
            {centerIcon ? (
              centerIcon
            ) : (
              <Sun className="text-yellow-100 drop-shadow-lg" size={halfSize * 0.13} strokeWidth={2.5} />
            )}
          </motion.div>
        </div>
      );
    },
    [halfSize, centerIcon]
  );

  return (
    <div className="flex justify-center items-center p-4 bg-transparent">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Render all orbit ring lines first (bottom layer) */}
        {orbitsData.map((orbit) => {
          const orbitDiameter = size * orbit.radiusFactor;
          const orbitRadius = orbitDiameter / 2;
          return (
            <div
              key={`ring-${orbit.id}`}
              className={`absolute rounded-full border border-dashed pointer-events-none ${
                orbit.orbitColor ? "" : "border-black/30 dark:border-white/20"
              }`}
              style={{
                width: orbitDiameter,
                height: orbitDiameter,
                top: halfSize - orbitRadius,
                left: halfSize - orbitRadius,
                borderColor: orbit.orbitColor || undefined,
                borderWidth: orbit.orbitThickness || 1,
              }}
            />
          );
        })}

        {/* Central Icon */}
        <div className="absolute inset-0 grid place-content-center z-10 pointer-events-none">{CenterIcon}</div>

        {/* Render all orbiting icons (top layer, each in its own isolated container) */}
        {orbitsData.map((orbit) => {
          const orbitDiameter = size * orbit.radiusFactor;
          const orbitRadius = orbitDiameter / 2;
          // The icon wrapper is only as big as the icon + padding for easy clicking
          const hitAreaSize = orbit.iconSize + 16;

          return (
            <motion.div
              key={`icon-${orbit.id}`}
              className="absolute pointer-events-none"
              style={{
                width: 0,
                height: 0,
                top: halfSize,
                left: halfSize,
                zIndex: 30 + orbit.id,
              }}
              animate={{ rotate: 360 }}
              transition={rotationTransition(orbit.speed)}
            >
              {/* Icon positioned at the orbit radius */}
              <div
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  width: hitAreaSize,
                  height: hitAreaSize,
                  top: -hitAreaSize / 2,
                  left: orbitRadius - hitAreaSize / 2,
                }}
              >
                <motion.a
                  href={orbit.href || '#'}
                  target={orbit.href ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group w-full h-full rounded-full border-2 shadow-md flex items-center justify-center bg-white dark:bg-black cursor-pointer relative"
                  style={{ 
                    width: orbit.iconSize, 
                    height: orbit.iconSize, 
                    margin: '8px auto', 
                    display: 'flex',
                    borderColor: orbit.iconColor || '#000',
                    boxShadow: orbit.iconColor ? `0 0 8px ${orbit.iconColor}40` : undefined,
                  }}
                  animate={{ rotate: -360 }}
                  transition={rotationTransition(orbit.speed)}
                  whileHover={{ scale: 1.6 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (orbit.href) {
                      const target = orbit.href.startsWith('mailto') || orbit.href.startsWith('tel') ? '_self' : '_blank';
                      window.open(orbit.href, target);
                    }
                  }}
                >
                  {React.cloneElement(orbit.icon, {
                    size: orbit.iconSize * 0.55,
                    className: `${orbit.icon.props.className || ''} pointer-events-none`,
                  })}

                  {/* Hover Tooltip */}
                  {orbit.name && (
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/80 text-white dark:bg-white/90 dark:text-black text-[8px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
                      {orbit.name}
                    </span>
                  )}
                </motion.a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
