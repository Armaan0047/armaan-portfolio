"use client";
import React, { useRef, useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { BeamCircle } from '@/components/ui/BeamCircle';
import { Mail, Phone, ExternalLink, Send, Code } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/SocialIcons';
import { CometsBackground } from '@/components/ui/CometsBackground';
import LazySection from '@/components/ui/LazySection';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className, href, target, rel }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : rel}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

export default function Contact() {
  const socialOrbits = [
    {
      id: 1,
      name: "Instagram",
      radiusFactor: 0.25,
      speed: 14,
      icon: <InstagramIcon className="text-[#E1306C]" />,
      iconSize: 36,
      orbitThickness: 1,
      iconColor: '#E1306C',
      href: "https://www.instagram.com/armaantxk"
    },
    {
      id: 2,
      name: "Phone",
      radiusFactor: 0.40,
      speed: 18,
      icon: <Phone className="text-green-500" />,
      iconSize: 40,
      orbitThickness: 1.5,
      iconColor: '#22c55e',
      href: "tel:+916375803498"
    },
    {
      id: 3,
      name: "LinkedIn",
      radiusFactor: 0.55,
      speed: 22,
      icon: <LinkedinIcon className="text-[#0077b5]" />,
      iconSize: 44,
      orbitThickness: 2,
      iconColor: '#0077b5',
      href: "https://www.linkedin.com/in/mohd-armaan-tak-b5628a380/"
    },
    {
      id: 4,
      name: "GitHub",
      radiusFactor: 0.70,
      speed: 26,
      icon: <GithubIcon className="text-black dark:text-white" />,
      iconSize: 48,
      orbitThickness: 1,
      iconColor: '#888888',
      href: "https://github.com/Armaan0047"
    },
    {
      id: 5,
      name: "Email",
      radiusFactor: 0.85,
      speed: 30,
      icon: <Mail className="text-rose-500" />,
      iconSize: 52,
      orbitThickness: 2,
      iconColor: '#f43f5e',
      href: "mailto:takarmaan3@gmail.com"
    },
    {
      id: 6,
      name: "LeetCode",
      radiusFactor: 1.0,
      speed: 34,
      icon: <Code className="text-[#FFA116]" />,
      iconSize: 56,
      orbitThickness: 1.5,
      iconColor: '#FFA116',
      href: "https://leetcode.com/u/4i5WHxc8kP/"
    }
  ];

  return (
    <section id="contact" className="min-h-screen w-full flex flex-col pt-20 pb-20 border-t border-black/10 dark:border-white/5 relative overflow-hidden bg-white dark:bg-[#020202] transition-colors duration-500">
      
      <LazySection height="100%" rootMargin="300px" className="absolute inset-0">
        <CometsBackground />
      </LazySection>

      <div className="w-full px-6 md:px-12 z-10 relative">
        <SectionHeader title="CONTACT" />
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 pt-0 pb-12 -mt-8 lg:-mt-12 z-10 relative">
        
        {/* Left Side: Contact Info */}
        <div className="flex-1 flex flex-col justify-center max-w-xl text-center lg:text-left">
          <h3 className="text-4xl md:text-6xl font-black mb-6 uppercase border-text leading-tight">Let's Connect</h3>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
            I am always open to discussing new tech, creative ideas, or collaborative projects. 
            Whether you have a specific inquiry or simply want to expand your network, 
            feel free to reach out or connect with me through my <span className="text-[#00ff66] font-bold">Social Orbit!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
            <MagneticButton href="mailto:takarmaan3@gmail.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-black dark:bg-[#00ff66] text-white dark:text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 shadow-xl cursor-pointer">
              <Send size={20} />
              Say Hello
            </MagneticButton>
            <MagneticButton href="/resume/Mohd_Armaan_Tak_Resume.pdf" target="_blank" className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-black/20 dark:border-white/20 text-black dark:text-white font-bold uppercase tracking-widest rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
              <ExternalLink size={20} />
              Resume
            </MagneticButton>
          </div>
        </div>

        {/* Right Side: BeamCircle Social Animation */}
        <div className="flex-1 flex justify-center items-center w-full mt-10 lg:mt-0">
          <div className="scale-75 sm:scale-90 md:scale-100 xl:scale-110 origin-center transition-transform duration-500">
            <BeamCircle
              size={400}
              orbits={socialOrbits}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
