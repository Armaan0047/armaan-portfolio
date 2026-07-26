'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';
import StarField from '@/components/ui/StarField';

// Lazy load Spline so it doesn't crash the browser on initial page load
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-zinc-400 text-sm animate-pulse">Loading 3D...</div>
    </div>
  ),
});

export default function Hero({ isLoaded }) {
  const container = useRef(null);
  const splineWrapper = useRef(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [heroInView, setHeroInView] = useState(true);

  // Unmount Spline when the hero section is scrolled out of view to free GPU memory
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    if (!isLoaded) return;
    
    const tl = gsap.timeline();

    // 1. Initial Page Entrance (Text fades in)
    tl.fromTo(".hero-wrapper", 
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    );

    tl.fromTo(".hero-text-line", 
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      },
      "-=0.5" 
    );

    // No scroll zoom animation on the robot as requested
  }, { scope: container, dependencies: [isLoaded] });

  return (
    <section 
      id="home" 
      ref={container}
      className="relative h-screen w-full overflow-hidden flex items-start justify-center pt-20 md:pt-24 bg-white dark:bg-[#020202] transition-colors duration-500"
    >
      {/* Animated Space Background (lightweight canvas) */}
      <StarField starCount={120} />

      {/* Spline 3D Robot (Only loaded AFTER preloader finishes to prevent crashing) */}
      <div 
        ref={splineWrapper}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto"
      >
        {isLoaded && heroInView && (
          <Spline 
            scene="https://prod.spline.design/DccWfnDiU9Lqdvj5/scene.splinecode" 
            onLoad={() => setSplineLoaded(true)}
          />
        )}
        {/* Cover the "Built with Spline" watermark */}
        <div className="absolute bottom-0 right-0 w-[250px] h-[60px] bg-white dark:bg-[#020202] z-[9999] pointer-events-none transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[60px] bg-white dark:bg-[#020202] z-[9999] pointer-events-none transition-colors duration-500" />
      </div>

      {/* Massive Watermark Text (Positioned behind the robot) */}
      <div className="hero-wrapper opacity-0 absolute inset-0 z-0 flex flex-col items-center justify-center text-center pointer-events-none overflow-hidden">
        <h1 
          className="text-[4rem] md:text-[10rem] lg:text-[14rem] leading-[0.75] tracking-tighter flex flex-col items-center opacity-60 dark:opacity-20 select-none" 
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 900 }}
        >
          <span className="relative block">
            <span className="hero-text-line block text-transparent [-webkit-text-stroke:3px_#000000] md:[-webkit-text-stroke:4px_#000000] dark:[-webkit-text-stroke:3px_#ffffff] md:dark:[-webkit-text-stroke:4px_#ffffff] transition-colors duration-500">
              WELCOME
            </span>
          </span>
          <span className="relative block">
            <span className="hero-text-line block text-transparent [-webkit-text-stroke:3px_#000000] md:[-webkit-text-stroke:4px_#000000] dark:[-webkit-text-stroke:3px_#ffffff] md:dark:[-webkit-text-stroke:4px_#ffffff] transition-colors duration-500">
              TO <span className="inline-block ml-[1em] md:ml-[1.5em]">MY</span>
            </span>
          </span>
          <span className="relative block">
            <span className="hero-text-line block text-transparent [-webkit-text-stroke:3px_#00ff66] md:[-webkit-text-stroke:4px_#00ff66] transition-colors duration-500">
              PORTFOLIO
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
