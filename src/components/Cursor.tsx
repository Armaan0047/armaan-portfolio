import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;

    if (!cursor || !trail) return;

    let animationFrame = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorPos = { x: target.x, y: target.y };
    const trailPos = { x: target.x, y: target.y };
    let mainScale = 1;
    let trailScale = 1;

    const render = () => {
      cursorPos.x += (target.x - cursorPos.x) * 0.24;
      cursorPos.y += (target.y - cursorPos.y) * 0.24;
      trailPos.x += (target.x - trailPos.x) * 0.12;
      trailPos.y += (target.y - trailPos.y) * 0.12;

      cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) scale(${mainScale})`;
      trail.style.transform = `translate3d(${trailPos.x}px, ${trailPos.y}px, 0) scale(${trailScale})`;
      animationFrame = requestAnimationFrame(render);
    };

    const activate = () => {
      cursor.classList.add("cursor-visible");
      trail.classList.add("cursor-visible");
    };

    const onMouseMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      activate();
    };

    const onMouseDown = () => {
      mainScale = 0.92;
      trailScale = 0.96;
    };

    const onMouseUp = () => {
      mainScale = 1;
      trailScale = 1;
    };

    const onMouseLeaveWindow = () => {
      cursor.classList.remove("cursor-visible");
      trail.classList.remove("cursor-visible");
    };

    const addHoverState = (event: Event) => {
      const element = event.currentTarget as HTMLElement;
      const mode = element.dataset.cursor;

      cursor.classList.add("cursor-hover");
      trail.classList.add("cursor-hover");

      if (mode === "icons") {
        cursor.classList.add("cursor-icon-hover");
        trail.classList.add("cursor-icon-hover");
      }
    };

    const removeHoverState = () => {
      cursor.classList.remove("cursor-hover", "cursor-icon-hover");
      trail.classList.remove("cursor-hover", "cursor-icon-hover");
    };

    const interactiveElements = Array.from(
      document.querySelectorAll("a, button, [data-cursor]")
    ) as HTMLElement[];

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", addHoverState);
      element.addEventListener("mouseleave", removeHoverState);
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", addHoverState);
        element.removeEventListener("mouseleave", removeHoverState);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-trail" ref={trailRef}></div>
      <div className="cursor-main" ref={cursorRef}></div>
    </>
  );
};

export default Cursor;
