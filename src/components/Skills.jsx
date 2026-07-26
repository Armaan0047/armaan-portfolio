'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Code2, Server, Database, Terminal, Play } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import MiniCarRace from '@/components/ui/MiniCarRace';
import SectionHeader from '@/components/ui/SectionHeader';



// Mac OS Dock Item Component
const DockItem = ({ logo, mouseX, index }) => {
  const ref = useRef(null);
  
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleSync = useTransform(distance, [-120, 0, 120], [1, 1.8, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <div 
      style={{ 
        animation: 'wave-bob 3s ease-in-out infinite',
        animationDelay: `-${index * 0.15}s`
      }}
      className="group-hover/marquee:[animation-play-state:paused]"
    >
      <motion.div 
        ref={ref}
        style={{ scale }} 
        className="flex flex-col items-center gap-2 min-w-[72px] group cursor-pointer origin-bottom z-10 relative"
      >
        {logo.textOnly ? (
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-colors shadow-lg">
            <span className="text-lg font-bold font-mono text-black dark:text-white">{logo.name.charAt(0)}</span>
          </div>
        ) : (
          <img 
            src={logo.src} 
            alt={logo.name} 
            className={`w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md ${logo.invert ? 'dark:invert' : ''}`}
          />
        )}
        <motion.span 
          className="absolute -bottom-8 text-[10px] md:text-xs font-bold font-mono text-black dark:text-white whitespace-nowrap bg-white/90 dark:bg-black/90 px-2 py-0.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {logo.name}
        </motion.span>
      </motion.div>
    </div>
  );
};

import { allMarqueeLogos, skillCategories } from "@/lib/data";

export default function Skills() {
  const terminalRef = useRef(null);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedCode, setDisplayedCode] = useState('');
  
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileLog, setCompileLog] = useState([]);
  const mouseX = useMotionValue(Infinity);

  // Cursor trail state
  const poolSize = 15;
  const imagePool = useRef([]);
  const trailIndex = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Auto-cycle through files every 20 seconds
  useEffect(() => {
    const cycleTimer = setTimeout(() => {
      setActiveFileIndex((prevIndex) => (prevIndex + 1) % skillCategories.length);
      setIsTyping(true);
    }, 20000);

    return () => clearTimeout(cycleTimer);
  }, [activeFileIndex, skillCategories.length]);

  const activeCode = skillCategories[activeFileIndex].code;

  const handleRunCode = () => {
    if (isCompiling || isTyping) return;
    setIsCompiling(true);
    setCompileLog([]);

    const logs = [
      "Initializing Antigravity bundler...",
      "Resolving module dependencies...",
      "Optimizing AST and minifying...",
      "Generating static chunks...",
      "✓ Compiled successfully in 1337ms!"
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      setCompileLog(prev => [...prev, logs[logIndex]]);
      logIndex++;
      if (logIndex >= logs.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsCompiling(false);
        }, 2000); 
      }
    }, 250);

    // Terminal shake effect
    gsap.fromTo(terminalRef.current, 
      { x: -6 }, 
      { x: 6, duration: 0.05, yoyo: true, repeat: 7, ease: "linear", onComplete: () => gsap.set(terminalRef.current, {x: 0}) }
    );
  };

  const sectionRef = useRef(null);

  // Trigger entrance animation and typing
  useGSAP(() => {
    if (!terminalRef.current || !sectionRef.current) return;

    // Typing trigger
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => setIsTyping(true),
      once: true
    });

    // Terminal slide-up animation (animating the child, triggering on the static parent)
    gsap.fromTo(terminalRef.current,
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: sectionRef });

  // Typewriter effect
  useEffect(() => {
    if (!isTyping) return;
    
    setDisplayedCode('');
    let i = 0;
    const charsPerTick = 3; // Print multiple characters per tick for ultra-fast typing
    
    const interval = setInterval(() => {
      if (i < activeCode.length) {
        setDisplayedCode(activeCode.substring(0, i + charsPerTick));
        i += charsPerTick;
      } else {
        clearInterval(interval);
        setIsTyping(false); // Enable the 'Run Code' button once typing finishes
      }
    }, 5); 
    
    return () => clearInterval(interval);
  }, [activeCode, isTyping]);

  // Cursor Trail Handler
  const handleMouseMove = (e) => {
    if (!terminalRef.current) return;
    
    // Throttle spawning by distance
    const dist = Math.hypot(e.clientX - lastMousePos.current.x, e.clientY - lastMousePos.current.y);
    if (dist < 40) return; // Only spawn every 40 pixels
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    
    const rect = terminalRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const el = imagePool.current[trailIndex.current];
    if (el) {
      // Pick random logo from active category
      const activeLogos = skillCategories[activeFileIndex].logos;
      if (activeLogos && activeLogos.length > 0) {
        const logoSrc = activeLogos[Math.floor(Math.random() * activeLogos.length)];
        el.src = logoSrc;
        
        // Invert black logos in dark terminal (only truly black SVGs)
        if (logoSrc.includes('nextjs') || logoSrc.includes('express') || logoSrc.includes('openai') || logoSrc.includes('googlegemini') || logoSrc.includes('github/github-original')) {
          el.style.filter = "invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.2))";
        } else {
          el.style.filter = "drop-shadow(0 0 10px rgba(255,255,255,0.2))";
        }
        
        // Animate with GSAP
        gsap.killTweensOf(el);
        gsap.fromTo(el, 
          { x: x - 40, y: y - 40, opacity: 1, scale: 1, rotation: Math.random() * 60 - 30 },
          { 
            y: y - 160 - Math.random() * 80,
            x: x - 40 + (Math.random() * 80 - 40),
            opacity: 0, 
            scale: 0.4, 
            rotation: Math.random() * 180 - 90,
            duration: 2.2 + Math.random() * 1.0,
            ease: "power2.out" 
          }
        );
      }
    }
    
    trailIndex.current = (trailIndex.current + 1) % poolSize;
  };

  // Tokenize and render code for syntax highlighting
  const renderCode = (code) => {
    return code.split(/(\n|\s+|[{}[\]=,:]|"[^"]*"?)/g).filter(Boolean).map((token, i) => {
      if (token === "export" || token === "const") return <span key={i} className="text-pink-400">{token}</span>;
      if (token === "TechStack") return <span key={i} className="text-emerald-300">{token}</span>;
      if (token === "frontend" || token === "backend" || token === "tools" || token === "ai") return <span key={i} className="text-yellow-200">{token}</span>;
      if (token === "description" || token === "skills") return <span key={i} className="text-blue-300">{token}</span>;
      if (token.startsWith('"')) return <span key={i} className="text-orange-300">{token}</span>;
      if (/^[{}()[\]=,:]$/.test(token)) return <span key={i} className="text-white/60">{token}</span>;
      return <span key={i} className="text-zinc-300">{token}</span>;
    });
  };

  return (
    <section id="skills" className="pt-8 pb-20 md:pt-12 md:pb-28 w-full transition-colors duration-500 border-t border-black/10 dark:border-white/10 relative overflow-hidden">
      {/* Full width like navbar */}
      <div className="w-full px-6 md:px-12 relative z-[1]">
        
        {/* Section Header */}
        <SectionHeader title="MY TECH STACK" />

        {/* Cyber Terminal UI */}
        <div ref={sectionRef} className="w-full">
          <div 
            ref={terminalRef}
          onMouseMove={handleMouseMove}
          className="w-full mx-auto rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-2xl transition-all duration-300 relative"
        >
          {/* Cursor Trail Object Pool */}
          {Array.from({ length: poolSize }).map((_, i) => (
            <img 
              key={i}
              ref={el => imagePool.current[i] = el}
              className="absolute w-20 h-20 pointer-events-none opacity-0 z-50 object-contain"
              alt=""
            />
          ))}

          {/* Terminal Header */}
          <div className="flex items-center px-4 py-3 bg-[#0a0a0a] border-b border-zinc-800 select-none">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
            </div>
            <div className="flex-1 text-center text-xs font-mono text-zinc-400 hidden md:block">
              armaan-portfolio — Visual Studio Code
            </div>
            <div className="flex justify-end w-20 md:w-auto">
              <button 
                onClick={handleRunCode}
                disabled={isCompiling || isTyping}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-all ${
                  isCompiling || isTyping 
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                    : "bg-[#00ff66]/10 text-[#00ff66] hover:bg-[#00ff66]/20 hover:scale-105 shadow-[0_0_10px_rgba(0,255,102,0.1)] hover:shadow-[0_0_15px_rgba(0,255,102,0.3)]"
                }`}
              >
                <Play size={12} fill="currentColor" /> {isCompiling ? "Running..." : "Run Code"}
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row h-auto md:h-[450px]">
            {/* Sidebar (Desktop) / Top Tabs (Mobile) */}
            <div className="md:w-56 bg-[#0a0a0a] border-r border-zinc-800 flex md:flex-col overflow-x-auto md:overflow-visible select-none">
              <div className="px-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wider hidden md:block mt-2">
                Explorer
              </div>
              <div className="flex md:flex-col w-full">
                {skillCategories.map((file, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (activeFileIndex !== idx) {
                        setActiveFileIndex(idx);
                        setIsTyping(true);
                      }
                    }}
                    className={`flex items-center gap-3 px-4 py-3 md:py-2 text-sm font-mono whitespace-nowrap transition-colors outline-none ${
                      activeFileIndex === idx 
                        ? "bg-black text-white md:border-l-2 md:border-[#00ff66] border-b-2 md:border-b-0 border-[#00ff66]" 
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 md:border-l-2 md:border-transparent border-b-2 md:border-b-0 border-transparent"
                    }`}
                  >
                    {file.icon}
                    {file.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Editor Pane */}
            <div 
              className="flex-1 p-4 md:p-6 overflow-y-auto font-mono text-sm md:text-base leading-relaxed relative selection:bg-blue-500/30 bg-black bg-right-bottom bg-no-repeat"
              style={{ 
                backgroundImage: `url('/assets/images/wallhaven-lyz7wp.png')`,
                backgroundSize: '45%'
              }}
            >
               <div className="flex relative z-10">
                 {/* Line Numbers */}
                 <div className="flex flex-col text-right pr-4 md:pr-6 select-none text-zinc-400 border-r border-zinc-700 mr-4 md:mr-6">
                   {activeCode.split('\n').map((_, i) => (
                     <span key={i} className="leading-relaxed">{i + 1}</span>
                   ))}
                 </div>
                 
                 {/* Typed Code / Compiling Overlay */}
                 <div className="flex-1 overflow-x-auto text-zinc-100 relative min-h-[200px]">
                   {isCompiling ? (
                     <div className="absolute inset-0 z-20 flex flex-col font-mono text-sm leading-relaxed">
                       {compileLog.map((log, idx) => (
                         <div key={idx} className={idx === compileLog.length - 1 ? "text-[#00ff66] font-bold mt-2 text-shadow-glow" : "text-zinc-300"}>
                           <span className="text-pink-400 mr-2">&gt;</span>{log}
                         </div>
                       ))}
                       {compileLog.length < 5 && <span className="animate-pulse font-bold text-[#00ff66] mt-1">_</span>}
                     </div>
                   ) : (
                     <pre className="whitespace-pre-wrap break-words leading-relaxed font-semibold">
                       {renderCode(displayedCode)}
                       {isTyping && <span className="animate-pulse font-bold text-[#00ff66]">_</span>}
                     </pre>
                   )}
                 </div>
               </div>
            </div>
          </div>
        </div>
        </div>

        {/* Infinite Logo Marquee with Labels */}
        <style>{`
          @keyframes wave-bob {
            0%, 100% { transform: translateY(30px); }
            50% { transform: translateY(-30px); }
          }
        `}</style>
        <div className="mt-16 w-full overflow-hidden relative border-y border-black/10 dark:border-white/10 py-10 bg-black/[0.02] dark:bg-white/[0.02]">
          {/* Fading gradients on edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
          
          {/* CSS Animation Marquee */}
          <div 
            className="flex w-max items-center gap-14 pr-14 animate-logo-marquee hover:[animation-play-state:paused] h-32 items-end pb-8 group/marquee"
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
          >
            {/* Render 2 sets for seamless loop */}
            {[...allMarqueeLogos, ...allMarqueeLogos].map((logo, i) => (
              <DockItem key={`logo-${i}`} logo={logo} mouseX={mouseX} index={i} />
            ))}
          </div>

          {/* Custom CSS Mini Cars Racing on the bottom border */}
          <div className="absolute bottom-0 left-0 w-full h-8 z-50 pointer-events-none flex items-end">
            <MiniCarRace />
          </div>
        </div>

      </div>
    </section>
  );
}
