"use client";
import { motion } from "framer-motion";
import React from "react";

const STAGGER = 0.04;

const EntranceTextRoll = ({ children, delay = 0, className = "", isLoaded = true }) => {
  if (typeof children !== "string") {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={`relative inline-flex overflow-hidden ${className}`}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
    >
      {children.split("").map((l, i) => (
        <motion.span
          variants={{
            hidden: { y: "120%", opacity: 0 },
            visible: { 
              y: 0, 
              opacity: 1, 
              transition: { 
                type: "spring", 
                damping: 15, 
                stiffness: 120, 
                delay: delay + i * STAGGER 
              } 
            },
          }}
          className="inline-block origin-bottom"
          key={i}
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </motion.span>
  );
};

export { EntranceTextRoll };
