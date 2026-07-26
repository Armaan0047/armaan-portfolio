'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ThemeToggle from './ThemeToggle';
import { EntranceTextRoll } from '@/components/ui/entrance-text-roll';

export default function Navbar({ isLoaded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoText, setLogoText] = useState('');
  const navRef = useRef(null);

  // Continuous Typewriter Effect for Logo
  useEffect(() => {
    const phrases = ["SOFTWARE DEVELOPER", "COMPUTER ENGINEER", "MOHD. ARMAAN TAK"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        setLogoText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setLogoText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      timer = setTimeout(type, typeSpeed);
    };

    const delayTimer = setTimeout(type, 1500);
    
    return () => {
      clearTimeout(delayTimer);
      clearTimeout(timer);
    };
  }, []);

  useGSAP(() => {
    if (!isLoaded) return;
    
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5 
    });
  }, { dependencies: [isLoaded] });

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }

        const sections = ['home', 'about', 'skills', 'projects', 'experience', 'certificates', 'education', 'contact'];
        let currentSection = 'home';
        
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
              currentSection = sectionId;
            }
          }
        }
        setActiveSection(currentSection);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full px-6 md:px-12 flex justify-between items-center z-50 transition-[background-color,border-color,padding,backdrop-filter,box-shadow] duration-300 text-black dark:text-white ${!isLoaded ? 'opacity-0' : ''} ${
          scrolled 
            ? 'py-4 bg-white/70 dark:bg-black/70 backdrop-blur-lg border-b border-black dark:border-white/10 shadow-md' 
            : 'py-5 bg-white dark:bg-black border-b border-transparent shadow-none'
        }`}
      >
        {/* Logo */}
        <div className="text-xl md:text-2xl font-bold tracking-wider font-mono">
          <a href="#" className="flex items-center text-black dark:text-white hover:text-black dark:hover:text-[#00ff66] transition-colors">
            <span className="text-[#00ff66] mr-2">{"<"}</span>
            {logoText}
            <span className="animate-pulse ml-1 font-black text-[#00ff66]">_</span>
            <span className="text-[#00ff66] ml-2">{"/>"}</span>
          </a>
        </div>
        
        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none font-inter">
          {navLinks.map((link, index) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId || (activeSection === 'home' && sectionId === '');
            return (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={`nav-link group relative text-sm font-semibold uppercase tracking-widest hover:text-black dark:hover:text-[#00ff66] transition-colors pb-1 ${
                    isActive ? 'text-black dark:text-[#00ff66]' : 'text-black/60 dark:text-white/60'
                  }`}
                >
                  <EntranceTextRoll delay={1.2 + index * 0.1} isLoaded={isLoaded}>{link.name}</EntranceTextRoll>
                  <span className={`absolute bottom-0 left-1/2 h-[2px] bg-black dark:bg-[#00ff66] -translate-x-1/2 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              </li>
            );
          })}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            className="text-black dark:text-white hover:text-black dark:hover:text-[#00ff66] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[70px] bg-white/95 dark:bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-start pt-10 md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 list-none font-inter w-full px-6">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId || (activeSection === 'home' && sectionId === '');
                return (
                  <li key={link.name} className="w-full text-center">
                    <a 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block w-full py-2 text-xl font-bold tracking-widest uppercase hover:text-black dark:hover:text-[#00ff66] border-b border-black/10 dark:border-white/10 ${
                        isActive ? 'text-black dark:text-[#00ff66]' : 'text-black/60 dark:text-white/60'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
