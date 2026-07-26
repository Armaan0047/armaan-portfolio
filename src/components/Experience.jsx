'use client';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import LazySection from '@/components/ui/LazySection';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sphere, Line, Stars, Torus } from '@react-three/drei';

import { EXPERIENCES } from "@/lib/data";

const HoloNode = ({ exp, isGlowing, isDarkMode, isActive, setActiveNode, setHoveredNode }) => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  
  useFrame((state, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.8;
      ring1Ref.current.rotation.y += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.5;
      ring2Ref.current.rotation.z += delta * 0.6;
    }
  });

  return (
    <group position={exp.position}>
      {/* The Core Sphere */}
      <Sphere 
        args={[isGlowing ? 0.35 : 0.25, 16, 16]}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredNode(exp.id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = '';
          setHoveredNode(null);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          setActiveNode(isActive ? null : exp.id);
        }}
      >
        <meshStandardMaterial 
          color={isGlowing ? "#ffffff" : "#00ff66"} 
          emissive={isGlowing ? "#ffffff" : "#00ff66"}
          emissiveIntensity={isGlowing ? 2 : 1.5}
          toneMapped={false}
        />
        <Html center style={{ pointerEvents: 'none' }}>
          <span className="text-black font-black text-sm tracking-widest select-none drop-shadow-md">{exp.shortName}</span>
        </Html>
      </Sphere>

      {/* Glowing Aura */}
      <Sphere args={[0.5, 16, 16]} raycast={() => null}>
        <meshBasicMaterial color="#00ff66" transparent opacity={isGlowing ? 0.2 : 0.1} />
      </Sphere>

      {/* Holographic Orbit Rings */}
      <Torus ref={ring1Ref} args={[isGlowing ? 0.6 : 0.45, 0.015, 16, 50]} raycast={() => null}>
        <meshBasicMaterial color={isGlowing ? "#ffffff" : "#00ff66"} transparent opacity={0.6} />
      </Torus>
      <Torus ref={ring2Ref} args={[isGlowing ? 0.75 : 0.6, 0.01, 16, 50]} raycast={() => null}>
        <meshBasicMaterial color={isGlowing ? "#ffffff" : "#00ff66"} transparent opacity={0.3} />
      </Torus>
    </group>
  );
};

const Constellation = ({ isDarkMode, activeNode, setActiveNode }) => {
  const groupRef = useRef();
  const timeRef = useRef(0);
  const [hoveredNode, setHoveredNode] = useState(null);

  useFrame((state, delta) => {
    if (groupRef.current && !activeNode) {
      timeRef.current += delta;
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.2) * 0.05;
    }
  });

  const bgNodes = useMemo(() => {
    return Array.from({ length: 30 }).map(() => [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15
    ]);
  }, []);

  return (
    <>
      <group ref={groupRef}>
      {bgNodes.map((pos, i) => (
        <Sphere key={`bg-${i}`} position={pos} args={[0.04, 8, 8]}>
          <meshBasicMaterial color={isDarkMode ? "#ffffff" : "#000000"} transparent opacity={isDarkMode ? 0.2 : 0.4} />
        </Sphere>
      ))}

      {bgNodes.map((pos, i) => {
        if (i % 4 !== 0) return null;
        const nextPos = bgNodes[(i + 1) % bgNodes.length];
        return (
          <Line key={`line-${i}`} points={[pos, nextPos]} color={isDarkMode ? "#ffffff" : "#000000"} lineWidth={0.5} transparent opacity={isDarkMode ? 0.1 : 0.3} />
        );
      })}

      {EXPERIENCES.map((exp) => {
        const isHovered = hoveredNode === exp.id;
        const isActive = activeNode === exp.id;
        const isGlowing = isHovered || isActive;
        
        return (
          <HoloNode 
            key={`exp-${exp.id}`} 
            exp={exp} 
            isGlowing={isGlowing} 
            isDarkMode={isDarkMode} 
            isActive={isActive}
            setActiveNode={setActiveNode} 
            setHoveredNode={setHoveredNode} 
          />
        );
      })}

      {EXPERIENCES.length > 1 && EXPERIENCES.map((exp, index) => {
        const nextExp = EXPERIENCES[(index + 1) % EXPERIENCES.length];
        if (EXPERIENCES.length === 2 && index === 1) return null;
        return (
          <Line key={`core-line-${exp.id}`} points={[exp.position, nextExp.position]} color="#00ff66" lineWidth={2} transparent opacity={0.6} />
        );
      })}
      
      {EXPERIENCES.map((exp, index) => (
        <Line key={`bg-line-${exp.id}`} points={[exp.position, bgNodes[index * 10 % bgNodes.length]]} color="#00ff66" lineWidth={1} transparent opacity={0.3} />
      ))}
    </group>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={!activeNode}
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

const TerminalModal = ({ activeExp, onClose }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [];
    
    timers.push(setTimeout(() => setStep(1), 400));
    timers.push(setTimeout(() => setStep(2), 800));
    timers.push(setTimeout(() => setStep(3), 1200));
    
    const detailsCount = activeExp.details.filter(d => typeof d !== 'string' || !d.startsWith('Skills:')).length;
    for (let i = 0; i < detailsCount; i++) {
      timers.push(setTimeout(() => setStep(4 + i), 1600 + (i * 400)));
    }

    timers.push(setTimeout(() => setStep(4 + detailsCount), 1600 + (detailsCount * 400) + 400));
    timers.push(setTimeout(() => setStep(5 + detailsCount), 1600 + (detailsCount * 400) + 800));

    return () => timers.forEach(clearTimeout);
  }, [activeExp]);

  const detailsList = activeExp.details.filter(d => typeof d !== 'string' || !d.startsWith('Skills:'));
  const skillsLines = activeExp.details.filter(d => typeof d === 'string' && d.startsWith('Skills:'));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 dark:bg-black/70 backdrop-blur-md transition-all duration-500"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl w-[95%] max-w-4xl relative cursor-default overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#0c0c0c] transition-colors duration-300"
      >
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-[#1e1e1e] border-b border-zinc-300 dark:border-zinc-800 select-none">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-black dark:bg-white flex items-center justify-center text-[10px] text-white dark:text-black font-mono font-bold">
              {'>_'}
            </div>
            <span className="text-xs font-mono text-black dark:text-zinc-300">Command Prompt - {activeExp.company}</span>
          </div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={onClose}
              className="text-black dark:text-zinc-400 hover:text-red-500 transition-colors text-lg leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 md:p-10 font-mono text-sm md:text-base text-zinc-700 dark:text-zinc-300 h-full max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="mb-6">
            <span className="text-green-600 dark:text-green-500">C:\\Users\\Armaan\\Experience&gt;</span> 
            {step >= 1 && <span className="text-black dark:text-white"> cat details.txt</span>}
            {step < 1 && <span className="inline-block w-2 h-4 bg-black dark:bg-zinc-300 ml-1 translate-y-1 animate-pulse"></span>}
          </div>
          
          {step >= 2 && (
            <pre className="text-green-600 dark:text-green-500 font-bold text-[8px] sm:text-[10px] md:text-xs leading-tight mb-6 whitespace-pre-wrap">
              {activeExp.asciiLogo}
            </pre>
          )}

          {step >= 3 && (
            <>
              <h3 className="text-xl md:text-3xl mb-2 font-bold text-black dark:text-white uppercase tracking-wider">{activeExp.role}</h3>
              <p className="text-lg md:text-xl font-bold mb-4 text-green-600 dark:text-green-400">{activeExp.company}</p>
              <p className="mb-6 text-zinc-500 dark:text-zinc-400">Date: {activeExp.date}</p>
            </>
          )}

          <ul className="space-y-4 text-zinc-700 dark:text-zinc-300 mb-8 list-none">
            {detailsList.map((detail, idx) => (
              step >= 4 + idx && (
                <li key={idx} className="flex items-start gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-green-600 dark:text-green-500 flex-shrink-0">{'>'}</span>
                  <span>{detail}</span>
                </li>
              )
            ))}
          </ul>

          {step >= 4 + detailsList.length && skillsLines.map((skillLine, idx) => {
            const skills = skillLine.replace('Skills:', '').split(',').map(s => s.trim());
            return (
              <div key={idx} className="mt-8">
                 <div className="mb-4">
                    <span className="text-green-600 dark:text-green-500">C:\\Users\\Armaan\\Experience&gt;</span> 
                    {step >= 5 + detailsList.length && <span className="text-black dark:text-white"> echo $SKILLS</span>}
                    {step < 5 + detailsList.length && <span className="inline-block w-2 h-4 bg-black dark:bg-zinc-300 ml-1 translate-y-1 animate-pulse"></span>}
                 </div>
                {step >= 5 + detailsList.length && (
                  <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="px-3 py-1 text-xs uppercase tracking-wider border border-green-600/30 dark:border-green-500/50 text-green-700 dark:text-green-400 bg-green-500/10 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          {step >= 5 + detailsList.length && (
            <div className="mt-8">
              <span className="text-green-600 dark:text-green-500">C:\\Users\\Armaan\\Experience&gt;</span> <span className="inline-block w-2 h-4 bg-black dark:bg-zinc-300 ml-1 translate-y-1 animate-pulse"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Experience() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeNode, setActiveNode] = useState(null);

  const activeExp = EXPERIENCES.find(e => e.id === activeNode);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeNode) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [activeNode]);

  return (
    <section id="experience" className="w-full relative overflow-hidden bg-white dark:bg-[#020202] min-h-screen flex flex-col pt-20 border-t border-black/10 dark:border-white/5 transition-colors duration-500">
      <div className="w-full px-6 md:px-12 absolute top-20 left-0 right-0 z-10 pointer-events-none">
        <SectionHeader title="EXPERIENCE" />
        <div className="mt-4 text-zinc-600 dark:text-zinc-400 font-mono text-sm max-w-md">
          <p className="text-green-600 dark:text-[#00ff66] font-bold uppercase tracking-widest mb-1">Interactive Network</p>
          <p>Drag to rotate the constellation. Click on the main nodes to view career details.</p>
        </div>
      </div>
      
      <LazySection height="800px" rootMargin="400px" className="w-full h-[600px] lg:h-[800px] cursor-grab active:cursor-grabbing z-0 relative">
        <Canvas camera={{ position: [0, 0, 11], fov: 50 }}>
          <color attach="background" args={[isDarkMode ? '#020202' : '#ffffff']} />
          <ambientLight intensity={0.5} />
          
          {isDarkMode && <Stars radius={50} depth={50} count={800} factor={3} saturation={0} fade speed={1} />}
          
          <Constellation isDarkMode={isDarkMode} activeNode={activeNode} setActiveNode={setActiveNode} />
        </Canvas>
      </LazySection>

      {activeExp && (
        <TerminalModal activeExp={activeExp} onClose={() => setActiveNode(null)} />
      )}
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#020202] to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
    </section>
  );
}
