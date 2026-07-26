import React from 'react';
import { cn } from "@/lib/utils";

const SectionHeader = ({ title, forceDark = false }) => {
  return (
    <div className="mb-12 md:mb-16">
      <h2 className={cn("text-3xl md:text-5xl font-bold font-montserrat mt-2 tracking-tight", forceDark ? "text-white" : "text-black dark:text-white")}>
        {title}
      </h2>
      <div className={cn("h-[2px] w-20 mt-4", forceDark ? "bg-white dark:bg-[#00ff66]" : "bg-zinc-900 dark:bg-[#00ff66]")}></div>
    </div>
  );
};

export default SectionHeader;
