import React from 'react';
import { Code2, Server, Database, Terminal, Award } from 'lucide-react';

export const PROJECT_ITEMS = [
  {
    id: 1,
    title: "AI Reel Generator",
    brand: "Personal Project",
    description: `An AI-powered reel generation platform that streamlines the content creation workflow by transforming ideas into engaging short-form videos. Built with modern web technologies and AI integrations, the application focuses on automation, usability, and efficient content generation.`,
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "AI APIs"],
    imageUrl: "/assets/images/projet_images/ai_reel_generator.png",
    link: "https://armaan-portfolio.vercel.app",
    github: "https://github.com/Armaan0047/reel-engine",
  },
  {
    id: 2,
    title: "NEXUS",
    brand: "Currently in Development",
    description: `NEXUS is an intelligent desktop AI companion designed to understand user context, assist with productivity, and provide real-time AI-powered assistance. The project follows a modular architecture with context awareness, plugin support, and scalable design principles.`,
    tags: ["Electron", "React", "Next.js", "TypeScript", "Node.js", "AI"],
    imageUrl: "/assets/images/projet_images/nexus.png",
    link: null,
    github: null,
  },
  {
    id: 3,
    title: "Sonskyn",
    brand: "Private Repository",
    description: `An offline-first Progressive Web Application developed for pharmaceutical field representatives to manage doctors, daily call reports, tour planning, expenses, follow-ups, and reporting. Built with a focus on performance, reliability, and seamless offline synchronization.`,
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PWA"],
    imageUrl: "/assets/images/projet_images/sonskyn.png",
    link: "https://sonskynsales.live",
    github: null,
  },
  {
    id: 4,
    title: "C++ Practice",
    brand: "Personal Project",
    description: `A collection of C++ programming exercises and Data Structures & Algorithms implementations created while strengthening programming fundamentals and problem-solving skills.`,
    tags: ["C++", "Data Structures", "Algorithms", "Problem Solving"],
    imageUrl: "/assets/images/projet_images/cpp_practice.png",
    link: "https://github.com/Armaan0047/C-Plus-Plus-Practice",
    github: "https://github.com/Armaan0047/C-Plus-Plus-Practice",
  }
];

export const EXPERIENCES = [
  {
    id: 1,
    role: 'Software Development Intern',
    company: 'SkillCraft Technology',
    shortName: 'SkillCraft',
    date: 'June 2026 — July 2026',
    asciiLogo: `
  ___ _   _ _ _  ___ ___    _  ___ _____ 
 / __| |_(_) | |/ __| _ \\  /_\\|_ _|_   _|
 \\__ \\ / / | | | (__|   / / _ \\| |  | |  
 |___/_\\_|_|_|_|\\___|_|_\\/_/ \\_\\___||_|  
    `,
    details: [
      'Completed a project-based Software Development Internship focused on strengthening programming fundamentals, application development, debugging, data handling, and problem-solving skills.',
      'Successfully developed: Temperature Converter, Number Guessing Game, Sudoku Solver, Product Data Scraper.',
      'Gained hands-on experience in writing clean, maintainable code while following industry-standard software development practices.',
      'Skills: C, C++, Python, JavaScript, Data Handling, Software Development'
    ],
    position: [0, 0, 0]
  }
];

export const CERTIFICATES = [
  {
    id: 1,
    title: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart Global Tech (Forage)",
    date: "February 8th, 2026",
    credentialId: "7kbDzkSLSYX2X3zZm",
    fileUrl: "/assets/certificates/walmart-forage-certificate.pdf",
    tags: ["Advanced Data Structures", "Software Architecture", "Relational Database Design", "Data Munging"],
    accentColor: "#00ff66"
  },
  {
    id: 2,
    title: "Google Cloud Career Launchpad (Data Analytics)",
    issuer: "Google Cloud",
    date: "February 10th, 2026",
    credentialId: "8nQGhcQn",
    fileUrl: "/assets/certificates/google-cloud-certificate.pdf",
    tags: ["Data Analytics", "Google Cloud", "SQL", "BigQuery"],
    accentColor: "#3758f9"
  },
  {
    id: 3,
    title: "Professional Networking for Career Growth",
    issuer: "HP LIFE Foundation",
    date: "January 12th, 2026",
    credentialId: "a3b1456b-ee49-4a3e-89d4-1106279c02d1",
    fileUrl: "/assets/certificates/hp-life-certificate.pdf",
    tags: ["Professional Branding", "Networking", "Career Growth"],
    accentColor: "#ff0055"
  },
  {
    id: 4,
    title: "Software Development Internship",
    issuer: "SkillCraft Technology",
    date: "July 1st, 2026",
    credentialId: "SCT/JUN26/0475",
    fileUrl: "/assets/certificates/skillcraft-certificate.png",
    tags: ["Software Development", "Problem Solving", "Clean Code"],
    accentColor: "#00ffff"
  }
];

export const allMarqueeLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", name: "HTML5" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", name: "CSS3" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", name: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", name: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", name: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg", name: "Next.js", invert: true },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", name: "Tailwind CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", name: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg", name: "Express.js", invert: true },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", name: "Supabase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", name: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg", name: "Firebase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", name: "MySQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", name: "C" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", name: "C++" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", name: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", name: "Git" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", name: "GitHub", invert: true },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", name: "VS Code" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", name: "Postman" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", name: "Figma" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg", name: "OpenAI", invert: true },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlegemini.svg", name: "Gemini", invert: true },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/claude.svg", name: "Claude", invert: true },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg", name: "ChatGPT", invert: true },
  { src: "/assets/images/projet_images/antigravity.svg", name: "Antigravity" },
];

export const skillCategories = [
  {
    name: "frontend.ts",
    icon: <Code2 className="w-4 h-4 text-sky-400" />,
    logos: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
    ],
    code: `export const frontend: TechStack = {
  description: "Building responsive, animated, and modern user interfaces.",
  skills: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion"
  ]
};`
  },
  {
    name: "backend.ts",
    icon: <Server className="w-4 h-4 text-green-400" />,
    logos: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
    ],
    code: `export const backend: TechStack = {
  description: "Developing APIs, server architecture, databases, and authentication.",
  skills: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "Supabase",
    "MongoDB",
    "Firebase",
    "MySQL",
    "C",
    "C++",
    "Python",
    "JavaScript"
  ]
};`
  },
  {
    name: "tools.ts",
    icon: <Database className="w-4 h-4 text-orange-400" />,
    logos: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
    ],
    code: `export const tools: TechStack = {
  description: "Managing version control, cloud deployment, and design tools.",
  skills: [
    "Git",
    "GitHub",
    "VS Code",
    "Vercel",
    "Netlify",
    "Postman",
    "Figma"
  ]
};`
  },
  {
    name: "ai.ts",
    icon: <Terminal className="w-4 h-4 text-pink-400" />,
    logos: [
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
      "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlegemini.svg",
      "/assets/images/projet_images/antigravity.svg"
    ],
    code: `export const ai: TechStack = {
  description: "Leveraging advanced AI models, APIs, and autonomous coding tools.",
  skills: [
    "OpenAI",
    "Gemini",
    "Claude",
    "ChatGPT",
    "Antigravity"
  ]
};`
  }
];
