"use client";
import React, { useRef } from "react";
import ThreeDCarousel from "./ThreeDCarousel";
import SectionHeader from "@/components/ui/SectionHeader";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PROJECT_ITEMS } from "@/lib/data";

export default function Projects() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animates the title and carousel independently
    gsap.fromTo(".project-content", 
      { opacity: 0, y: 100 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse" // Reverses when scrolling back up so it triggers repeatedly
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" className="min-h-screen w-full flex items-center justify-center border-t border-black/10 dark:border-white/10 relative overflow-hidden bg-white dark:bg-[#020202] bg-[radial-gradient(#00000033_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] py-20 text-black dark:text-white transition-colors duration-500">      <div className="w-full px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="project-title project-content opacity-0 translate-y-[100px]">
          <SectionHeader title="PROJECTS" />
        </div>

        <div className="project-content opacity-0 translate-y-[100px]">
          <ThreeDCarousel
            items={PROJECT_ITEMS}
            autoRotate={false}
            cardHeight={700}
          />
        </div>
      </div>
    </section>
  );
}
