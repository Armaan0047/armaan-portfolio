import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My journey <span>&</span>
          <br /> experience
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* College */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BTech - First Year</h4>
                <h5>PIET Jaipur</h5>
              </div>
              <h3>2025 - Present</h3>
            </div>
            <p>
              Currently pursuing my degree with a strong focus on technology,
              cybersecurity, AI, and IoT while building a solid foundation in
              modern problem-solving and development.
            </p>
          </div>

          {/* Projects / Learning */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Project Development</h4>
                <h5>Smart Systems and IoT</h5>
              </div>
              <h3>2025 - Present</h3>
            </div>
            <p>
              Built projects like the Smart Pothole Detection System and IoT
              Automatic Pet Feeding System, combining hardware, automation, and
              real-world usability to solve everyday challenges.
            </p>
          </div>

          {/* Certifications */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Certifications & Achievements</h4>
                <h5>Continuous Learning</h5>
              </div>
              <h3>2025 - Present</h3>
            </div>
            <p>
              Completed Google Cloud Career Launchpad in Data Analytics, HP
              LIFE Certification, Advanced Software Engineering Simulation by
              Forage/Walmart, served as an IIT Kharagpur Kshitij Ambassador,
              and won 1st position in a Tech Escape Room competition.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;
