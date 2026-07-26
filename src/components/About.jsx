'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import ShinyText from '@/components/ui/lightwind-ui/shiny-text';
import { BorderBeam } from '@/components/ui/border-beam';
import { GlowingCard } from '@/components/ui/glowing-card';
import { TextRoll } from '@/components/ui/text-roll';
import { GraduationCap, Code2, Cpu, MapPin, Eye, Download } from 'lucide-react';
import { ConfettiButton } from '@/components/ui/confetti-button';
import MiniCarRace from '@/components/ui/MiniCarRace';
import SectionHeader from '@/components/ui/SectionHeader';

export default function About() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const gridRef = useRef(null);

  const stats = [
    { label: "Status", value: "Computer Engineering Student", lightColor: "#b38600", darkColor: "#ffcc00", Icon: GraduationCap },
    { label: "Role", value: "Software Developer", lightColor: "#009933", darkColor: "#00ff66", Icon: Code2 },
    { label: "Focus", value: "Web & AI Development", lightColor: "#990099", darkColor: "#ff00ff", Icon: Cpu },
    { label: "Location", value: "Jaipur, Rajasthan", lightColor: "#008888", darkColor: "#00ffff", Icon: MapPin }
  ];

  const subheadingWords = "Transforming innovative ideas into clean, scalable digital products.".split(" ");

  useGSAP(() => {
    // 1. ScrollTrigger Entrance Animation for Section Elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 30%",
        toggleActions: "restart reverse restart reverse",
      }
    });

    // Animate Title (From Bottom)
    tl.fromTo(".about-title", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Animate Image Card Entrance (From Left)
    tl.fromTo(".about-image-card", 
      { x: -150, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" }, 
      "-=0.6"
    );

    // Animate Text Elements (From Right)
    tl.fromTo(".about-para", 
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }, 
      "-=0.6"
    )
    .fromTo(".about-stat-card", 
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }, 
      "-=0.4"
    );

    // 2. 3D Interactive Mouse Tilt and Glare for the Profile Photo
    const card = imageRef.current;
    if (!card) return;

    const glare = card.querySelector(".card-glare");

    const onMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = -(y - centerY) / (rect.height / 24);
      const rotateY = (x - centerX) / (rect.width / 24);
      
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        ease: "power3.out",
        duration: 0.5,
        overwrite: "auto"
      });

      if (glare) {
        gsap.to(glare, {
          opacity: 1,
          background: `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)`,
          duration: 0.3,
          overwrite: "auto"
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "elastic.out(1.2, 0.6)",
        duration: 1.2,
        overwrite: "auto"
      });

      if (glare) {
        gsap.to(glare, {
          opacity: 0,
          duration: 0.5,
          overwrite: "auto"
        });
      }
    };

    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    const handleSectionMouseMove = (e) => {
      if (!gridRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(gridRef.current, {
        x: x * 50,
        y: y * 50,
        duration: 1.5,
        ease: "power3.out",
        overwrite: "auto"
      });
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleSectionMouseMove);
    }

    return () => {
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleSectionMouseMove);
      }
    };
  }, { scope: containerRef });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="pt-6 pb-20 md:pt-10 md:pb-28 w-full text-black dark:text-white bg-white dark:bg-[#020202] transition-colors duration-500 border-t border-black/10 dark:border-white/10 overflow-hidden relative"
    >
      {/* Grid Background Layer (Interactive Parallax) */}
      <div ref={gridRef} className="absolute -inset-[100px] pointer-events-none opacity-10 dark:opacity-[0.05] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="w-full px-6 md:px-12 relative z-10">
        
        <div className="about-title">
          <SectionHeader title="ABOUT ME" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: 3D Interactive Card */}
          <div 
            className="lg:col-span-4 flex flex-col items-center lg:items-start xl:items-center gap-6 about-image-container"
            style={{ perspective: "1000px" }}
          >
            <div 
              ref={imageRef}
              className="about-image-card relative w-full max-w-[340px] aspect-[4/5] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 cursor-pointer select-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img 
                src="/assets/images/armaan-profile.jpeg" 
                alt="Mohd. Armaan Tak" 
                className="w-full h-full object-cover pointer-events-none"
              />
              
              {/* Glassmorphic Name Tag */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-white/50 dark:bg-black/50 backdrop-blur-md border-t border-black/10 dark:border-white/10 flex items-center justify-center pointer-events-none">
                <span 
                  className="text-lg md:text-xl font-black text-transparent font-montserrat tracking-widest uppercase text-center [-webkit-text-stroke:1px_black] dark:[-webkit-text-stroke:1px_white]"
                >
                  Mohd. Armaan Tak
                </span>
              </div>

              {/* Glossy Glare Overlay */}
              <div className="card-glare absolute inset-0 pointer-events-none opacity-0 z-20" />
              
              {/* Animated Border Beam */}
              <BorderBeam size={150} duration={3} delay={0} borderWidth={3} colorFrom="#00ff66" colorTo="#00ffff" className="z-30" />
            </div>

            {/* Resume Action Buttons */}
            <div className="flex gap-3 w-full max-w-[340px] justify-center mt-2 about-resume-buttons">
              <a 
                href="/resume/Mohd_Armaan_Tak_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 gap-1.5 px-3 py-2.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-xs md:text-sm font-semibold transition-transform active:scale-95 border border-black/20 dark:border-white/30 whitespace-nowrap cursor-pointer"
              >
                <Eye size={16} />
                View Resume
              </a>
              <ConfettiButton 
                href="/resume/Mohd_Armaan_Tak_Resume.pdf" 
                download="Mohd_Armaan_Tak_Resume.pdf"
                className="flex items-center justify-center flex-1 gap-1.5 px-3 py-2.5 rounded-full bg-black dark:bg-[#00ff66] hover:bg-zinc-800 dark:hover:bg-[#00cc52] text-white dark:text-black text-xs md:text-sm font-semibold transition-transform active:scale-95 whitespace-nowrap cursor-pointer shadow-md"
              >
                <Download size={16} />
                Download Resume
              </ConfettiButton>
            </div>
          </div>

          {/* Right Column: Bio Paragraph & Stats */}
          <div className="lg:col-span-8 flex flex-col justify-center about-text-container">
            <motion.h3 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04, delayChildren: 0.2 }
                }
              }}
              className="text-2xl lg:text-3xl xl:text-[34px] font-black font-montserrat tracking-tight mb-6 text-transparent [-webkit-text-stroke:1px_black] dark:[-webkit-text-stroke:1px_#00ff66] about-subheading leading-snug"
            >
              {subheadingWords.map((word, i) => (
                <React.Fragment key={i}>
                  <span className="inline-block overflow-hidden align-bottom mr-[0.3em] pb-[0.1em]">
                    <motion.span 
                      variants={{
                        hidden: { y: "120%", rotateX: -20, opacity: 0 },
                        visible: { y: "0%", rotateX: 0, opacity: 1, transition: { type: "spring", damping: 15, stiffness: 120 } }
                      }}
                      className="inline-block origin-bottom"
                    >
                      {word}
                    </motion.span>
                  </span>
                </React.Fragment>
              ))}
            </motion.h3>
            
            <div className="space-y-4 font-inter leading-relaxed text-sm md:text-base">
              <span className="relative overflow-hidden block">
                <p className="about-para block text-zinc-700 dark:text-zinc-300">
                  <ShinyText 
                    intensity={1} 
                    speed={2}
                    shineWidth={60}
                    baseColor="var(--shiny-base)" 
                    shineColor="var(--shiny-shine)" 
                    className="about-shiny-text text-black/70 dark:text-white/70"
                  >
                    Hello! I'm Mohd. Armaan Tak, a Computer Engineering student and passionate Software Developer based in Jaipur, India.
                  </ShinyText>
                </p>
              </span>
              <span className="relative overflow-hidden block">
                <p className="about-para block text-zinc-700 dark:text-zinc-300">
                  <ShinyText 
                    intensity={1} 
                    speed={2}
                    shineWidth={60}
                    baseColor="var(--shiny-base)" 
                    shineColor="var(--shiny-shine)" 
                    className="about-shiny-text text-black/70 dark:text-white/70"
                  >
                    I enjoy transforming innovative ideas into practical digital products by building modern web applications, AI-powered solutions, and scalable software systems.
                  </ShinyText>
                </p>
              </span>
              <span className="relative overflow-hidden block">
                <p className="about-para block text-zinc-700 dark:text-zinc-300">
                  <ShinyText 
                    intensity={1} 
                    speed={2}
                    shineWidth={60}
                    baseColor="var(--shiny-base)" 
                    shineColor="var(--shiny-shine)" 
                    className="about-shiny-text text-black/70 dark:text-white/70"
                  >
                    My interests lie in full-stack development, artificial intelligence, automation, and creating intuitive user experiences that solve real-world problems.
                  </ShinyText>
                </p>
              </span>
              <span className="relative overflow-hidden block">
                <p className="about-para block text-zinc-700 dark:text-zinc-300">
                  <ShinyText 
                    intensity={1} 
                    speed={2}
                    shineWidth={60}
                    baseColor="var(--shiny-base)" 
                    shineColor="var(--shiny-shine)" 
                    className="about-shiny-text text-black/70 dark:text-white/70"
                  >
                    From developing AI assistants and healthcare CRM platforms to building automation tools and interactive web experiences, I constantly challenge myself to learn new technologies and create software that is clean, scalable, and impactful.
                  </ShinyText>
                </p>
              </span>
              <span className="relative overflow-hidden block">
                <p className="about-para block text-zinc-700 dark:text-zinc-300">
                  <ShinyText 
                    intensity={1} 
                    speed={2}
                    shineWidth={60}
                    baseColor="var(--shiny-base)" 
                    shineColor="var(--shiny-shine)" 
                    className="about-shiny-text text-black/70 dark:text-white/70"
                  >
                    I'm always exploring better ways to build efficient applications while continuously improving my technical skills and problem-solving abilities.
                  </ShinyText>
                </p>
              </span>
            </div>

            {/* Quick Stats Grid */}
            <div className="relative grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-black/10 dark:border-white/10">
              
              <div className="absolute top-[-30px] left-0 w-full h-[30px] overflow-hidden pointer-events-none z-50">
                <div className="absolute bottom-[-1px] left-0 w-full h-0 flex items-end">
                  <MiniCarRace />
                </div>
              </div>

              {stats.map((stat, idx) => (
                <GlowingCard 
                  key={idx} 
                  className="about-stat-card p-4 flex flex-col justify-between h-full relative overflow-hidden group"
                  glowColorLight={stat.darkColor}
                  glowColorDark={stat.darkColor}
                >
                  <motion.div initial="initial" whileHover="hovered" className="w-full h-full flex flex-col justify-between z-10">
                    <div className="absolute top-0 right-0 opacity-20 transition-transform group-hover:scale-110 duration-500 pointer-events-none" style={{ color: stat.darkColor }}>
                      <stat.Icon size={48} strokeWidth={1} />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <stat.Icon size={16} style={{ color: stat.darkColor }} />
                      <span className="block text-xs font-mono text-black/60 dark:text-white/60 uppercase tracking-wider font-bold">
                        {stat.label}
                      </span>
                    </div>
                    {stat.link ? (
                      <a 
                        href={stat.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1 text-sm md:text-base font-semibold font-montserrat hover:text-[#00ff66] transition-colors underline decoration-white/20 underline-offset-4 hover:decoration-[#00ff66] cursor-pointer"
                      >
                        <TextRoll className="inline-block">{stat.value}</TextRoll>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M7 17l9.2-9.2M17 16.8V7H7.2"/></svg>
                      </a>
                    ) : (
                      <span className="block text-sm md:text-base font-semibold font-montserrat text-black dark:text-white">
                        <TextRoll className="inline-block">{stat.value}</TextRoll>
                      </span>
                    )}
                  </motion.div>
                </GlowingCard>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
