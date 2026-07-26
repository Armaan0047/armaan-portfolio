"use client";
import React, { useRef } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { HangingIdCard } from '@/components/ui/HangingIdCard';
import ParticlesBackground from '@/components/ui/ParticlesBackground';
import LazySection from '@/components/ui/LazySection';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const EDUCATION_DATA = [
  {
    id: 1,
    name: 'Poornima Institute of Eng.',
    role: 'Computer Engineering',
    badgeId: 'B.Tech • Exp. 2029',
    accentColor: '#00ff66',
    imageText: '🎓',
    ropeLength: 120
  },
  {
    id: 2,
    name: 'Senior Secondary',
    role: '12th Grade',
    badgeId: '75%',
    accentColor: '#3758f9',
    imageText: '🏫',
    ropeLength: 160
  },
  {
    id: 3,
    name: 'Secondary Education',
    role: '10th Grade',
    badgeId: '85%',
    accentColor: '#ff0055',
    imageText: '🎒',
    ropeLength: 140
  }
];

export default function Education() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll(".education-card");
    if (!cards || cards.length === 0) return;
    
    gsap.from(cards, {
      opacity: 0, 
      y: -60, 
      duration: 1.2, 
      ease: "elastic.out(1, 0.5)",
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="education" className="min-h-screen w-full flex flex-col pt-20 border-t border-black/10 dark:border-white/5 relative bg-white dark:bg-[#020202] transition-colors duration-500">
      
      {/* Particles Background — lazy loaded */}
      <LazySection height="100%" rootMargin="300px" className="absolute inset-0">
        <ParticlesBackground
          colors={['#00ff66', '#3758f9', '#ff0055']}
          size={3}
          countDesktop={80}
          countTablet={50}
          countMobile={30}
          zIndex={0}
          height="100%"
          containerId="education-particles"
        />
      </LazySection>
      
      <div className="w-full px-6 md:px-12 z-10 relative">
        <SectionHeader title="EDUCATION" />
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-0 pb-12 flex flex-col md:flex-row justify-center items-start gap-12 md:gap-20 lg:gap-32 xl:gap-40 -mt-12 md:-mt-16 relative z-10">
        {EDUCATION_DATA.map((edu) => (
          <div key={edu.id} className="education-card">
            <HangingIdCard
              name={edu.name}
              role={edu.role}
              badgeId={edu.badgeId}
              accentColor={edu.accentColor}
              imageText={edu.imageText}
              ropeLength={edu.ropeLength}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
