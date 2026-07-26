# Mohd. Armaan Tak — Portfolio

> A modern, interactive, and high-performance developer portfolio built with Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Three.js, GSAP, and Lenis smooth scrolling.

[![Live Demo](https://img.shields.io/badge/Live_Demo-armaan--portfolio.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://armaan-portfolio.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Live Demo

🌐 **Website:** [https://armaan-portfolio.vercel.app](https://armaan-portfolio.vercel.app)

---

## ✨ Features

- ⚡ **Next.js 16 App Router & Turbopack:** Blazing-fast server-side rendering, static site generation, and optimized bundling.
- 🎨 **Modern Cyber-Dark Design:** Dark theme aesthetic featuring glowing cards, glassmorphism, border beams, and smooth micro-interactions.
- 🤖 **Interactive 3D Spline Robot:** Custom 3D Spline scene integrated smoothly into the Hero section.
- ✨ **Three.js Particle Constellations:** Dynamic, interactive canvas background animations.
- 📜 **GSAP & Lenis Smooth Scroll:** Hardware-accelerated fluid scroll transitions and section animations.
- 🚀 **Featured Projects Showcase:** Interactive cards for AI Reel Generator, NEXUS Desktop AI Companion, Sonskyn PWA, and C++ Practice.
- 🏆 **Certificates Verification:** Direct links and modal view for verified Google Cloud, Walmart Global Tech, HP LIFE, and SkillCraft Technology certificates.
- 🛠️ **Skills & VS Code Window:** Dynamic tech stack categories rendered inside a developer-centric VS Code window component.
- 💼 **Interactive Terminal Experience:** Live terminal modal simulating intern task commands and logs.
- 📱 **100% Responsive Layout:** Seamless experience across desktop, tablet, and mobile displays.
- 🔍 **Production-Grade SEO & OpenGraph:** Full Metadata API integration (`sitemap.xml`, `robots.txt`, OpenGraph cards, Twitter cards, and Schema.org `Person` JSON-LD).

---

## 🛠️ Tech Stack

### Core Frameworks & Libraries
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), Vanilla CSS Tokens
- **Icons:** [Lucide React](https://lucide.dev/)

### Animations & 3D Visuals
- **3D Graphics:** [Spline 3D](https://spline.design/), [Three.js](https://threejs.org/), `@react-three/fiber`, `@react-three/drei`
- **Animations:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)

### Development Tools
- **Language:** JavaScript (ES6+), TypeScript
- **Deployment & Hosting:** [Vercel](https://vercel.com/)
- **Analytics:** `@vercel/analytics`

---

## 📁 Folder Structure

```text
armaan-portfolio/
├── public/
│   ├── assets/
│   │   ├── certificates/     # Certificate PDFs & images
│   │   └── images/           # Profile photo & project thumbnails
│   ├── resume/               # Downloadable PDF & HTML resume
│   ├── favicon.ico           # Browser tab icons
│   ├── icon.png              # App icons
│   └── google*.html          # Search Console verification
├── src/
│   ├── app/
│   │   ├── layout.js         # Root layout, metadata & JSON-LD
│   │   ├── page.js           # Portfolio page pipeline
│   │   ├── robots.js         # Dynamic robots.txt API
│   │   ├── sitemap.js        # Dynamic sitemap.xml API
│   │   └── globals.css       # Tailwind v4 & custom utilities
│   ├── components/
│   │   ├── About.jsx         # Bio & quick stats
│   │   ├── Certificates.jsx  # Glowing certificate cards
│   │   ├── Contact.jsx       # Contact form & social orbits
│   │   ├── Education.jsx     # Academic timeline
│   │   ├── Experience.jsx    # Terminal experience modal
│   │   ├── Hero.jsx          # Hero title & 3D Spline robot
│   │   ├── Navbar.jsx        # Typewriter logo & navigation
│   │   ├── Projects.jsx      # Project showcase cards
│   │   └── Skills.jsx        # VS Code window tech stack
│   └── lib/
│       ├── data.js           # Master portfolio data definitions
│       └── utils.js          # Classname helper utilities
├── .gitignore                # Git ignore specification
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies & scripts
├── vercel.json               # Vercel deployment specification
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Armaan0047/armaan-portfolio.git
   cd armaan-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running locally.

### Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

---

## 🔮 Future Improvements

- [ ] Add dark/light custom theme switcher toggle.
- [ ] Integrate a live blog section for tech writing and DSA solutions.
- [ ] Add real-time contact form backend integration via Resend / EmailJS.
- [ ] Expand interactive 3D particle custom canvas controls.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author & Contact

**Mohd. Armaan Tak**  
*Computer Engineering Student & Software Developer*  
📍 Jaipur, Rajasthan, India  

- **Portfolio:** [https://armaan-portfolio.vercel.app](https://armaan-portfolio.vercel.app)
- **GitHub:** [@Armaan0047](https://github.com/Armaan0047)
- **LinkedIn:** [Mohd. Armaan Tak](https://www.linkedin.com/in/mohd-armaan-tak-b5628a380/)
- **Instagram:** [@armaantxk](https://www.instagram.com/armaantxk)
- **LeetCode:** [4i5WHxc8kP](https://leetcode.com/u/4i5WHxc8kP/)
- **Email:** [takarmaan3@gmail.com](mailto:takarmaan3@gmail.com)
