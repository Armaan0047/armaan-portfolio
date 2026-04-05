import { memo, useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  link?: string;
}

const WorkImage = ({ image, alt, link }: Props) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = linkRef.current;
    if (!element || !window.matchMedia("(pointer: fine)").matches) return;

    let rafId = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetGlowX = 50;
    let targetGlowY = 50;
    let currentGlowX = 50;
    let currentGlowY = 50;

    const animate = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.12;
      currentRotateY += (targetRotateY - currentRotateY) * 0.12;
      currentGlowX += (targetGlowX - currentGlowX) * 0.12;
      currentGlowY += (targetGlowY - currentGlowY) * 0.12;

      element.style.setProperty("--tilt-rotate-x", `${currentRotateX}deg`);
      element.style.setProperty("--tilt-rotate-y", `${currentRotateY}deg`);
      element.style.setProperty("--tilt-glow-x", `${currentGlowX}%`);
      element.style.setProperty("--tilt-glow-y", `${currentGlowY}%`);

      rafId = requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      targetRotateY = (x - 0.5) * 10;
      targetRotateX = (0.5 - y) * 10;
      targetGlowX = x * 100;
      targetGlowY = y * 100;
    };

    const onPointerLeave = () => {
      targetRotateX = 0;
      targetRotateY = 0;
      targetGlowX = 50;
      targetGlowY = 50;
    };

    rafId = requestAnimationFrame(animate);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={link}
        target="_blank"
        rel="noreferrer"
        data-cursor="disable"
        ref={linkRef}
      >
        {/* 🔗 Link icon */}
        {link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}

        {/* 🖼 Image */}
        <img src={image} alt={alt} />
      </a>
    </div>
  );
};

export default memo(WorkImage);
