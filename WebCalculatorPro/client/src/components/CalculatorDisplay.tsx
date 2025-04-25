import React from 'react';
import { cn } from '@/lib/utils';
import { AngleMode } from '@/types/calculator';

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  memory: number;
  hasMemory: boolean;
  angleMode: AngleMode;
}

export function CalculatorDisplay({ 
  expression, 
  result, 
  memory, 
  hasMemory, 
  angleMode 
}: CalculatorDisplayProps) {
  return (
    <div className="p-4 theme-transition calculator-display">
      <div className="flex justify-between">
        <div className="text-sm theme-transition calculator-display-text">
          {hasMemory && <span>M: {memory}</span>}
        </div>
        <div className="text-sm theme-transition calculator-display-text">
          {angleMode}
        </div>
      </div>
      <div className="text-right font-mono text-xl mt-2 min-h-[1.5rem] break-all theme-transition calculator-display-text">
        {expression}
      </div>
      <div className="text-right font-mono text-4xl font-medium mt-1 break-all theme-transition calculator-display-text">
        {result}
      </div>
    </div>
  );
}
