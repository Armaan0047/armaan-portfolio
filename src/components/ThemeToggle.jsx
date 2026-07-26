'use client';
import { ToggleTheme } from './ui/toggle-theme';

export default function ThemeToggle() {
  return (
    <div className="flex items-center justify-center">
      <ToggleTheme 
        animationType="round-morph" 
        className="bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 shadow-sm"
      />
    </div>
  );
}
