import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { calculate } from '@/lib/calculator';
import { AngleMode } from '@/types/calculator';
import soundService from '@/lib/soundService';

interface InputPanelProps {
  angleMode: AngleMode;
  onAddToHistory: (expression: string, result: string) => void;
}

export function InputPanel({ angleMode, onAddToHistory }: InputPanelProps) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<{expression: string, result: string}[]>([]);

  const calculateResult = () => {
    if (!expression.trim()) return;
    
    try {
      // Play the special equals sound when calculating
      soundService.playEqualsSound();
      
      const calculatedResult = calculate(expression, angleMode);
      setResult(calculatedResult);
      
      // Add to local panel history
      setHistory(prev => [{expression, result: calculatedResult}, ...prev.slice(0, 4)]);
      
      // Add to main calculator history
      onAddToHistory(expression, calculatedResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculateResult();
    }
  };

  return (
    <Card className="calculator-card theme-transition w-full">
      <CardHeader className="calculator-primary text-white">
        <CardTitle className="text-lg">Input Panel</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="expression" className="text-sm font-medium">
            Enter Expression
          </label>
          <div className="flex gap-2">
            <Input
              id="expression"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. 2+2 or sin(45)"
              className="flex-1"
            />
            <Button 
              onClick={calculateResult}
              className="calculator-btn-equals"
            >
              Calculate
            </Button>
          </div>
        </div>
        
        {result && (
          <div className="p-3 rounded calculator-display theme-transition">
            <div className="text-sm calculator-display-text">Result:</div>
            <div className="text-2xl font-mono font-medium calculator-display-text">
              {result}
            </div>
          </div>
        )}
        
        {history.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-medium mb-2">Recent Calculations</h3>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-2 rounded text-sm calculator-card border border-opacity-10 border-gray-400"
                  >
                    <div className="opacity-80">{item.expression}</div>
                    <div className="font-mono font-medium">= {item.result}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}