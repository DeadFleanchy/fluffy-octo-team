import React from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

export function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-yellow-500 dark:text-gray-400" />
      <Switch
        checked={darkMode}
        onCheckedChange={toggleDarkMode}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-4 w-4 text-gray-400 dark:text-blue-300" />
    </div>
  );
}