import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>

        <div className="contact-flex">
          {/* Connect */}
          <div className="contact-box">
            <h4>Connect</h4>

            <p>
              <a
                href="mailto:2025pietcrmohd035@poornima.org"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                Email - 2025pietcrmohd035@poornima.org
              </a>
            </p>

            <p>
              <a
                href="https://www.linkedin.com/in/mohd-armaan-tak-b5628a380/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn - Mohd Armaan Tak
              </a>
            </p>

            <p>
              <a
                href="https://github.com/Armaan0047"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                GitHub - Armaan0047
              </a>
            </p>

            <p>
              <a
                href="https://www.instagram.com/a.r.m.a.a.n07/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                Instagram - a.r.m.a.a.n07
              </a>
            </p>

            <h4>Education</h4>
            <p>BTech - First Year</p>
            <p>PIET Jaipur - 2025-Present</p>
          </div>

          {/* Social */}
          <div className="contact-box">
            <h4>Social</h4>

            <a
              href="https://github.com/Armaan0047"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>

            <a
              href="https://www.linkedin.com/in/mohd-armaan-tak-b5628a380/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>

            <a
              href="https://www.instagram.com/a.r.m.a.a.n07/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>

          {/* Footer */}
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Mohd Armaan Tak</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
