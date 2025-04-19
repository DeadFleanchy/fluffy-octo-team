import React from 'react';
import { Theme } from '@/types/calculator';
import { cn } from '@/lib/utils';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <div className="flex gap-2">
      <button 
        onClick={() => onThemeChange('blue')}
        className={cn(
          "w-8 h-8 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center",
          "transition-transform hover:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        )}
        aria-label="Blue theme"
      >
        <span className={cn("text-white", currentTheme !== 'blue' && "hidden")}>✓</span>
      </button>
      
      <button 
        onClick={() => onThemeChange('dark')}
        className={cn(
          "w-8 h-8 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center",
          "transition-transform hover:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        )}
        aria-label="Dark theme"
      >
        <span className={cn("text-white", currentTheme !== 'dark' && "hidden")}>✓</span>
      </button>
      
      <button 
        onClick={() => onThemeChange('green')}
        className={cn(
          "w-8 h-8 rounded-full border-2 border-white bg-green-500 flex items-center justify-center",
          "transition-transform hover:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        )}
        aria-label="Green theme"
      >
        <span className={cn("text-white", currentTheme !== 'green' && "hidden")}>✓</span>
      </button>
    </div>
  );
}
