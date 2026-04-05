import { PropsWithChildren, useEffect, useRef } from "react";
import { useLoading } from "../context/LoadingProvider";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const { isLoading } = useLoading();
  const landingRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isLoading || !subtitleRef.current) return;

    const subtitle = subtitleRef.current;
    const fullText = subtitle.dataset.text || subtitle.textContent || "";
    let index = 0;
    let direction = 1;
    let rafId = 0;
    let startDelay = 0;
    let lastTick = 0;
    let holdUntil = 0;

    subtitle.textContent = "";

    const tick = (time: number) => {
      if (!lastTick) lastTick = time;

      if (time < holdUntil) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const frameDelay = direction === 1 ? 85 : 45;

      if (time - lastTick >= frameDelay) {
        index += direction;
        index = Math.max(0, Math.min(index, fullText.length));
        subtitle.textContent = fullText.slice(0, index);
        lastTick = time;

        if (index === fullText.length) {
          direction = -1;
          holdUntil = time + 1400;
        } else if (index === 0) {
          direction = 1;
          holdUntil = time + 320;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    startDelay = window.setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, 1700);

    return () => {
      window.clearTimeout(startDelay);
      cancelAnimationFrame(rafId);
      subtitle.textContent = fullText;
    };
  }, [isLoading]);

  useEffect(() => {
    const landing = landingRef.current;
    const intro = introRef.current;
    const info = infoRef.current;

    if (!landing || !intro || !info) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const character = document.querySelector(".character-model") as
      | HTMLElement
      | null;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const setOffsets = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      intro.style.setProperty("--intro-offset-x", `${currentX * -0.9}px`);
      intro.style.setProperty("--intro-offset-y", `${currentY * -0.65}px`);
      info.style.setProperty("--info-offset-x", `${currentX * 1.05}px`);
      info.style.setProperty("--info-offset-y", `${currentY * 0.7}px`);

      if (character) {
        character.style.setProperty("--character-offset-x", `${currentX * 0.55}px`);
        character.style.setProperty("--character-offset-y", `${currentY * 0.4}px`);
      }

      rafId = requestAnimationFrame(setOffsets);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = landing.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      targetX = x * 30;
      targetY = y * 24;
    };

    const resetOffsets = () => {
      targetX = 0;
      targetY = 0;
    };

    rafId = requestAnimationFrame(setOffsets);
    landing.addEventListener("mousemove", onMouseMove);
    landing.addEventListener("mouseleave", resetOffsets);
    window.addEventListener("blur", resetOffsets);

    return () => {
      cancelAnimationFrame(rafId);
      landing.removeEventListener("mousemove", onMouseMove);
      landing.removeEventListener("mouseleave", resetOffsets);
      window.removeEventListener("blur", resetOffsets);
    };
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv" ref={landingRef}>
        <div className="landing-container">
          <div className="landing-intro" ref={introRef}>
            <h2>Hello! I'm</h2>
            <h1 data-glow="MOHD ARMAAN TAK">
              MOHD
              <br />
              <span>ARMAAN TAK</span>
            </h1>
          </div>
          <div className="landing-info" ref={infoRef}>
            <h3 ref={subtitleRef} data-text="Futuristic Developer &">
              Futuristic Developer &
            </h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Cybersecurity</div>
              <div className="landing-h2-2">Enthusiast</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Enthusiast</div>
              <div className="landing-h2-info-1">Cybersecurity</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
