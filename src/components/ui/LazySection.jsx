"use client";
import React, { useRef, useState, useEffect } from 'react';

/**
 * LazySection — Only mounts children when the wrapper is near the viewport.
 * Once mounted, children stay mounted to avoid pop-in on scroll-back.
 * 
 * @param {string} height - Placeholder height before content loads (e.g. "600px")
 * @param {string} rootMargin - How far ahead to start loading (default "300px")
 */
export default function LazySection({ children, height = "400px", rootMargin = "300px", className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once visible, never unmount
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight: isVisible ? undefined : height }}>
      {isVisible ? children : null}
    </div>
  );
}
