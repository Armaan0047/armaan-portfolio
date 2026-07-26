'use client';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Preloader({ onComplete }) {
  const [hasStarted, setHasStarted] = useState(false);
  const container = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleStart = () => {
    setHasStarted(true);
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => console.log('Audio not ready'));
    }
  };

  useGSAP(() => {
    if (!hasStarted) return;
    
    const tl = gsap.timeline();

    // Vibrate the car to simulate engine revving
    gsap.to('.f1-car-inner', {
      y: 2,
      x: -1,
      duration: 0.05,
      yoyo: true,
      repeat: 30, // Rev for 1.5 seconds
      ease: "none"
    });

    // Pause for suspension build up
    tl.to({}, { duration: 1.5 });

    // CAR AND STAIRS MOVE TOGETHER
    // Car shoots to the right
    tl.to('.f1-car-container', {
      x: window.innerWidth + 600, 
      duration: 2.5, 
      ease: "power2.in", 
    }, "launch");

    // The Double Stairs Wipe!
    // Center stair moves exactly with the car, outer stairs lag behind forming the > shape
    tl.to('.stair-bar', {
      x: "100vw", 
      duration: 2.5, 
      ease: "power2.in",
      stagger: {
        amount: 1.0,
        from: "center"
      }
    }, "launch");

    // Audio fade out
    tl.to(audioRef.current, {
      volume: 0,
      duration: 1.0,
      onComplete: () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    }, "-=1.0");

    // End preloader container
    tl.to(container.current, {
      opacity: 0,
      duration: 0.1,
      onComplete: () => {
        document.body.style.overflow = 'auto'; // Restore scroll
        onComplete();
      }
    });

  }, { scope: container, dependencies: [hasStarted] });

  // Number of stair bars
  const STAIRS_COUNT = 11;

  return (
    <div ref={container} className="fixed inset-0 w-full h-screen z-[9999] overflow-hidden pointer-events-none">
      <audio ref={audioRef} src="/assets/audio/f1.mp3" preload="auto"></audio>
      
      {!hasStarted ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020202] z-50 pointer-events-auto">
          {/* Animated Button */}
          <div className="relative group mt-[-40px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff66] to-[#3758f9] rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <button 
              onClick={handleStart}
              className="relative px-12 py-5 text-xl md:text-2xl font-black text-white bg-black border border-white/10 rounded-lg cursor-pointer tracking-[0.4em] uppercase transition-all duration-300 hover:scale-105"
            >
              LET'S GO
            </button>
          </div>

          {/* Creative Desktop Hint */}
          <div className="absolute bottom-10 md:bottom-12 w-full max-w-3xl px-6 flex flex-col items-center gap-3">
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-2xl flex items-center justify-center text-center">
              <span className="text-[#00ff66] animate-pulse text-xl mr-3">●</span>
              <p className="text-xs md:text-base font-black text-white uppercase tracking-[0.15em] leading-relaxed">
                For the best immersive experience, please view on a desktop.
              </p>
            </div>
            <p className="text-[9px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest text-center mt-2">
              (If you are on mobile, switch to a desktop device for a better experience)
            </p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full z-50 flex flex-col">
          
          {/* Background is transparent here because the stair bars cover the screen initially */}
          
          {/* The Stair Bars - NO GREEN LINE */}
          <div className="absolute inset-0 flex flex-col w-full h-full z-10">
            {Array.from({ length: STAIRS_COUNT }).map((_, i) => (
              <div 
                key={i} 
                className="stair-bar flex-1 w-full bg-white"
                style={{
                  boxShadow: '-10px 0 20px rgba(0,0,0,0.15)' // lighter shadow for white background
                }}
              ></div>
            ))}
          </div>

          {/* F1 Car (Positioned off-screen on the left, completely hidden, ready to shoot right) */}
          <div className="f1-car-container absolute top-1/2 -translate-y-1/2 -left-[250px] sm:-left-[350px] md:-left-[450px] z-20">
            <img 
              src="/assets/images/f1.png" 
              alt="F1 Car" 
              className="f1-car-inner w-[200px] sm:w-[280px] md:w-[350px] filter drop-shadow-[-20px_10px_15px_rgba(0,0,0,0.9)]" 
            />
          </div>

        </div>
      )}
    </div>
  );
}
