"use client";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

const STAGGER = 0.035;

const TextRoll = ({ children, className, center = false }) => {
  if (typeof children !== "string") {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      variants={{ initial: {}, hovered: {} }}
      className={cn("relative block overflow-hidden", className)}
    >
      <motion.div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </motion.div>
      <motion.div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </motion.div>
    </motion.span>
  );
};

export { TextRoll };
