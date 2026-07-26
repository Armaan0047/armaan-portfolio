'use client';
import { useRef, useEffect, useCallback } from 'react';

export default function StarField({ starCount = 120 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 }); // Offscreen initially
  const isVisibleRef = useRef(true);

  const initStars = useCallback((width, height) => {
    // Reduce star count on mobile for better performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const effectiveCount = isMobile ? Math.floor(starCount / 2) : starCount;
    const stars = [];
    for (let i = 0; i < effectiveCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.5 + 0.5,
      });
    }
    starsRef.current = stars;
  }, [starCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
      initStars(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Track mouse globally across the window
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const isDark = () => document.documentElement.classList.contains('dark');

    const animate = () => {
      // Skip rendering when the section is not visible
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      
      // Clear the canvas efficiently
      ctx.clearRect(0, 0, w, h);

      const dark = isDark();
      const colorBase = dark ? '255, 255, 255' : '0, 0, 0';
      const lineColor = dark ? '0, 255, 102' : '0, 0, 0'; // Neon Green in dark mode, Black in light mode

      // Update positions
      starsRef.current.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen edges
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;
      });

      const mouseConnectDist = 180;
      const starConnectDist = 100;
      
      // Draw connections
      for (let i = 0; i < starsRef.current.length; i++) {
        const starA = starsRef.current[i];
        
        // 1. Connect star to mouse
        const dxMouse = starA.x - mouseRef.current.x;
        const dyMouse = starA.y - mouseRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < mouseConnectDist) {
          ctx.beginPath();
          // Opacity based on distance to mouse
          ctx.strokeStyle = `rgba(${lineColor}, ${(1 - distMouse / mouseConnectDist) * 0.8})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(starA.x, starA.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
          
          // Slight attraction: stars pull slightly towards the mouse
          starA.x -= dxMouse * 0.015;
          starA.y -= dyMouse * 0.015;
        }

        // 2. Connect star to other nearby stars
        for (let j = i + 1; j < starsRef.current.length; j++) {
          const starB = starsRef.current[j];
          const dx = starA.x - starB.x;
          const dy = starA.y - starB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < starConnectDist) {
            ctx.beginPath();
            // Subtle, thin lines between regular stars
            ctx.strokeStyle = `rgba(${colorBase}, ${(1 - dist / starConnectDist) * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(starA.x, starA.y);
            ctx.lineTo(starB.x, starB.y);
            ctx.stroke();
          }
        }
      }

      // Draw stars (particles)
      ctx.fillStyle = `rgba(${colorBase}, 0.6)`;
      starsRef.current.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Pause animation when the canvas is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [initStars]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      {/* Optimized Canvas Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
