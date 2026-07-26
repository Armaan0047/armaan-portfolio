"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/components/hooks/use-mobile";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";

const ScrambleText = ({ text, active, index, isLong = false }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";
  const intervalRef = useRef(null);

  useEffect(() => {
    if (active === index) {
      let iteration = 0;
      clearInterval(intervalRef.current);
      
      const speed = isLong ? Math.max(1, text.length / 25) : 1/2; 
      
      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, i) => {
              if (letter === " " || letter === "\n") return letter;
              if (i < iteration) return text[i];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(intervalRef.current);
          setDisplayText(text); // Ensure precise ending
        }
        
        iteration += speed; 
      }, 50);
    } else {
      setDisplayText(text); 
    }
    
    return () => clearInterval(intervalRef.current);
  }, [active, index, text, isLong]);

  return <>{displayText}</>;
};

// Tech Stack Card Component (Tilt Removed)
const TiltCard = ({ children }) => {
  return (
    <div
      className="relative h-full w-full rounded-xl overflow-hidden bg-white dark:bg-black shadow-xl border border-black/10 dark:border-zinc-700/50 p-6 flex flex-col justify-center transition-shadow duration-300"
    >
      <div className="w-full h-full relative z-10">
        {children}
      </div>
      <BorderBeam size={150} duration={3} delay={0} borderWidth={3} colorFrom="#00ff66" colorTo="#00ffff" className="z-0" />
    </div>
  );
};

const MouseFollowBadge = ({ tag }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.4);
    y.set((clientY - (top + height / 2)) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, WebkitFontSmoothing: "antialiased" }}
      className="relative px-4 py-2 font-bold rounded-lg shadow-sm text-xs md:text-sm tracking-wide cursor-default inline-block active:scale-95 transition-colors border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white z-0 hover:z-10"
    >
      {tag}
    </motion.div>
  );
};

const ThreeDCarousel = ({
  items = [],
  autoRotate = true,
  rotateInterval = 6000,
  cardHeight = 650,
  isMobileSwipe = true,
}) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const isMobile = useIsMobile();
  const minSwipeDistance = 50;

  useEffect(() => {
    if (autoRotate && isInView && !isHovering) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % items.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, items.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % items.length);
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const getCardAnimationClass = (index) => {
    if (index === active) return "scale-100 opacity-100 z-20 pointer-events-auto";
    if (index === (active + 1) % items.length)
      return "translate-x-[40%] md:translate-x-[30%] scale-95 opacity-60 z-10 pointer-events-none";
    if (index === (active - 1 + items.length) % items.length)
      return "translate-x-[-40%] md:translate-x-[-30%] scale-95 opacity-60 z-10 pointer-events-none";
    return "scale-90 opacity-0 pointer-events-none";
  };

  if (!items.length) return null;

  return (
    <section
      id="ThreeDCarousel"
      className="bg-transparent min-w-full mx-auto flex flex-col items-center justify-center py-12"
    >


      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div
          className="relative overflow-hidden w-full perspective-1000"
          style={{ height: `${cardHeight}px` }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transform-style-3d">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`absolute top-0 w-full max-w-sm md:max-w-5xl transform transition-all duration-700 ease-out ${getCardAnimationClass(
                  index
                )}`}
              >
                <Card
                  className="overflow-hidden bg-white dark:bg-black w-full border border-black/10 dark:border-white/10 shadow-2xl flex flex-col"
                  style={{ height: `${cardHeight}px` }}
                >
                  {/* TOP ROW: Image & Tilt Card */}
                  <div className="flex flex-col md:flex-row w-full h-[45%] border-b border-black/10 dark:border-white/10">
                    
                    {/* LEFT SIDE: Project Image */}
                    <div className="w-full md:w-1/2 relative h-[50%] md:h-full bg-black overflow-hidden border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10">
                      <Image 
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-3xl font-black text-white font-montserrat mb-2">
                          <ScrambleText text={item.title} active={active} index={index} />
                        </h3>
                        <div className="w-12 h-1 bg-[#00ff66] mb-2" />
                        <p className="text-white/80 font-mono text-sm">
                          <ScrambleText text={item.brand} active={active} index={index} />
                        </p>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Tilt Card Tech Stack */}
                    <div className="w-full md:w-1/2 h-[50%] md:h-full p-4 md:p-6 flex items-center justify-center perspective-1000 bg-gray-50 dark:bg-zinc-950">
                      <TiltCard>
                        <h4 className="border-text text-xl md:text-2xl font-black mb-4 font-montserrat uppercase tracking-widest">
                          Tech Stack Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, idx) => {
                            return (
                              <MouseFollowBadge key={idx} tag={tag} />
                            );
                          })}
                        </div>
                      </TiltCard>
                    </div>
                  </div>

                  {/* BOTTOM ROW: Markdown UI Description */}
                  <div className="w-full h-[55%] bg-black flex flex-col overflow-hidden">
                    {/* Fake Window Header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-white/10 shadow-sm">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="ml-3 text-xs font-mono text-gray-400">readme.md</span>
                    </div>
                    
                    {/* Markdown Body */}
                    <div className="p-6 md:p-8 flex-grow overflow-y-auto custom-scrollbar font-mono text-sm md:text-base text-gray-300 leading-relaxed">
                      <p className="mb-4">
                        <span className="text-[#569cd6]">#</span> <span className="text-[#ce9178]"><ScrambleText text={item.title} active={active} index={index} /></span>
                      </p>
                      <p className="text-gray-400 whitespace-pre-line">
                        <ScrambleText text={item.description} active={active} index={index} isLong={true} />
                      </p>
                      
                      <div className="mt-8">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#00ff66] hover:text-white transition-colors"
                        >
                          <span className="font-bold">]</span> View Source <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {!isMobile && (
            <>
              <button
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-black dark:text-white hover:bg-[#00ff66] hover:text-black hover:border-transparent z-30 shadow-xl transition-all duration-300 hover:scale-110"
                onClick={() =>
                  setActive((prev) => (prev - 1 + items.length) % items.length)
                }
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-black dark:text-white hover:bg-[#00ff66] hover:text-black hover:border-transparent z-30 shadow-xl transition-all duration-300 hover:scale-110"
                onClick={() => setActive((prev) => (prev + 1) % items.length)}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="absolute -bottom-10 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all duration-500 ${
                  active === idx
                    ? "bg-[#00ff66] w-8 shadow-[0_0_10px_#00ff66]"
                    : "bg-black/20 dark:bg-white/20 w-2 hover:bg-black/40 dark:hover:bg-white/40"
                }`}
                onClick={() => setActive(idx)}
              />
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default ThreeDCarousel;
