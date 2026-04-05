import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    const spans = social.querySelectorAll("span");

    spans.forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      // cleanup
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">

        {/* GitHub */}
        <span>
          <a
            href="https://github.com/Armaan0047"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </span>

        {/* LinkedIn */}
        <span>
          <a
            href="https://www.linkedin.com/in/mohd-armaan-tak-b5628a380/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>

        {/* Instagram */}
        <span>
          <a
            href="https://www.instagram.com/a.r.m.a.a.n07/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
        </span>

      </div>

      {/* Profile Button */}
      <a
        className="resume-button"
        href="https://www.linkedin.com/in/mohd-armaan-tak-b5628a380/"
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="PROFILE" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
