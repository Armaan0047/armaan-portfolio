import { Montserrat, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Mohd. Armaan Tak | Software Developer",
  description: "Portfolio of Mohd. Armaan Tak featuring Full Stack Development, AI projects, Software Engineering, and modern web applications.",
  keywords: [
    "Mohd Armaan Tak",
    "Armaan Tak",
    "Armaan Portfolio",
    "Software Developer",
    "Computer Engineering",
    "Next.js Developer",
    "React Developer",
    "Full Stack Developer",
    "AI Developer",
    "Portfolio",
    "Jaipur",
    "PIET"
  ],
  authors: [{ name: "Mohd. Armaan Tak", url: "https://armaan-portfolio.vercel.app" }],
  creator: "Mohd. Armaan Tak",
  publisher: "Mohd. Armaan Tak",
  metadataBase: new URL("https://armaan-portfolio.vercel.app"),
  alternates: {
    canonical: "https://armaan-portfolio.vercel.app",
  },
  openGraph: {
    title: "Mohd. Armaan Tak | Software Developer",
    description: "Portfolio of Mohd. Armaan Tak featuring Full Stack Development, AI projects, Software Engineering, and modern web applications.",
    url: "https://armaan-portfolio.vercel.app",
    siteName: "Mohd. Armaan Tak Portfolio",
    images: [
      {
        url: "/assets/images/armaan-profile.jpeg",
        width: 800,
        height: 1000,
        alt: "Mohd. Armaan Tak - Software Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohd. Armaan Tak | Software Developer",
    description: "Portfolio of Mohd. Armaan Tak featuring Full Stack Development, AI projects, Software Engineering, and modern web applications.",
    images: ["/assets/images/armaan-profile.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohd. Armaan Tak",
    "jobTitle": "Software Developer",
    "url": "https://armaan-portfolio.vercel.app",
    "image": "https://armaan-portfolio.vercel.app/assets/images/armaan-profile.jpeg",
    "email": "takarmaan3@gmail.com",
    "telephone": "+916375803498",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "addressCountry": "India"
    },
    "almaMater": {
      "@type": "EducationalOrganization",
      "name": "Poornima Institute of Engineering & Technology"
    },
    "knowAbout": [
      "Full Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Supabase",
      "MongoDB",
      "Firebase",
      "MySQL",
      "C++",
      "Python",
      "AI Applications"
    ],
    "sameAs": [
      "https://github.com/Armaan0047",
      "https://www.linkedin.com/in/mohd-armaan-tak-b5628a380/",
      "https://www.instagram.com/armaantxk",
      "https://leetcode.com/u/4i5WHxc8kP/"
    ]
  };

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className="font-sans min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 overflow-x-hidden"
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const originalWarn = console.warn;
              console.warn = function(...args) {
                if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) return;
                originalWarn.apply(console, args);
              };
            `,
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
