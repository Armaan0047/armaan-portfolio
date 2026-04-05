import { memo, useEffect, useRef } from "react";
import "./styles/MatrixRain.css";

const glyphs = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let animationFrame = 0;
    let columns = new Float32Array();
    let frame = 0;
    let running = true;

    const setup = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = Math.min(window.devicePixelRatio, 1.5);

      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.font = "12px Geist, monospace";

      const count = Math.ceil(width / 22);
      columns = new Float32Array(count);

      for (let index = 0; index < count; index++) {
        columns[index] = Math.random() * -height;
      }
    };

    const draw = () => {
      if (!running) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      context.fillStyle = "rgba(5, 8, 16, 0.08)";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "rgba(94, 234, 212, 0.13)";

      frame += 1;

      if (frame % 2 === 0) {
        for (let index = 0; index < columns.length; index++) {
          const x = index * 22;
          const y = columns[index];
          const glyph = glyphs.charAt(
            Math.floor(Math.random() * glyphs.length)
          );

          context.fillText(glyph, x, y);
          columns[index] = y > height + Math.random() * 160 ? -24 : y + 11;
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      setup();
    };

    const handleVisibility = () => {
      running = !document.hidden;

      if (running) {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(draw);
      }
    };

    setup();
    animationFrame = requestAnimationFrame(draw);

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas className="matrix-rain" ref={canvasRef} aria-hidden="true" />;
};

export default memo(MatrixRain);
