'use client';
import React, { useRef, useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { GlowingCard } from '@/components/ui/glowing-card';
import { BorderBeam } from '@/components/ui/border-beam';
import { CERTIFICATES } from '@/lib/data';
import { Award, ExternalLink, Calendar, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Certificates() {
  const containerRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll('.certificate-card');
    if (!cards || cards.length === 0) return;

    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      id="certificates" 
      ref={containerRef} 
      className="pt-16 pb-24 md:pt-20 md:pb-28 w-full border-t border-black/10 dark:border-white/10 relative overflow-hidden bg-white dark:bg-[#020202] text-black dark:text-white transition-colors duration-500"
    >
      <div className="w-full px-6 md:px-12 relative z-10">
        <SectionHeader title="CERTIFICATES" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto mt-8">
          {CERTIFICATES.map((cert) => (
            <div key={cert.id} className="certificate-card h-full">
              <GlowingCard
                className="p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group border border-black/10 dark:border-white/10 rounded-2xl bg-zinc-50 dark:bg-zinc-950/80 transition-all duration-300 hover:scale-[1.02]"
                glowColorLight={cert.accentColor}
                glowColorDark={cert.accentColor}
              >
                <BorderBeam size={160} duration={4} delay={cert.id * 0.5} borderWidth={2} colorFrom={cert.accentColor} colorTo="#00ffff" className="z-10" />

                <div className="relative z-20 flex flex-col h-full justify-between gap-6">
                  {/* Top Row: Icon & Issuer */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white group-hover:text-[#00ff66] transition-colors">
                        <Award size={28} style={{ color: cert.accentColor }} />
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400">
                        <Calendar size={12} />
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold font-montserrat tracking-tight mb-2 text-black dark:text-white group-hover:text-[#00ff66] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm md:text-base font-semibold font-mono text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#00ff66]" />
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Middle: Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cert.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      ID: {cert.credentialId}
                    </span>
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black dark:bg-[#00ff66] text-white dark:text-black font-bold text-xs md:text-sm uppercase tracking-wider transition-all hover:scale-105 shadow-md cursor-pointer"
                    >
                      <FileText size={14} />
                      View Certificate
                    </a>
                  </div>
                </div>
              </GlowingCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
