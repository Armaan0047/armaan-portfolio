'use client';
import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certificates from '@/components/Certificates';
import Education from '@/components/Education';
import Contact from '@/components/Contact';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useGSAP(() => {
    if (!isLoaded) return;

    const sections = ['skills', 'projects', 'experience', 'certificates', 'education', 'contact'];
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const heading = section.querySelector('h2');
      if (!heading) return;

      gsap.fromTo(heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      <main className={`relative ${!isLoaded ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar isLoaded={isLoaded} />
        <Hero isLoaded={isLoaded} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Education />
        <Contact />
      </main>
    </>
  );
}
