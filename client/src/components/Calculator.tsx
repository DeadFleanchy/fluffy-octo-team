import React, { useEffect, useCallback } from 'react';
import { CalculatorDisplay } from './CalculatorDisplay';
import { CalculatorKeypad } from './CalculatorKeypad';
import { ThemeSwitcher } from './ThemeSwitcher';
import { InputPanel } from './InputPanel';
import { DarkModeToggle } from './DarkModeToggle';
import { useCalculator } from '@/hooks/useCalculator';
import { formatTime } from '@/lib/utils';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { History } from 'lucide-react';

export function Calculator() {
  const {
    state,
    setTheme,
    handleButtonClick,
    clearExpression,
    clearEntry,
    backspace,
    calculateResult,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract
  } = useCalculator();
  
  // Function to handle input from the Input Panel
  const handleManualInput = useCallback((expression: string, result: string) => {
    // Create new history item
    const newHistoryItem = {
      expression,
      result,
      timestamp: formatTime(new Date())
    };
    
    const { setState } = useCalculator();
    
    // Update state with the new history item
    setState((prev) => {
      const newHistory = [newHistoryItem, ...prev.history];
      // Limit history size
      if (newHistory.length > 20) {
        newHistory.pop();
      }
      return {
        ...prev,
        history: newHistory
      };
    });
  }, []);

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (/[0-9.+\-*/()^]/.test(key)) {
        handleButtonClick(key);
        event.preventDefault();
      } else if (key === 'Enter' || key === '=') {
        calculateResult();
        event.preventDefault();
      } else if (key === 'Escape') {
        clearExpression();
        event.preventDefault();
      } else if (key === 'Backspace') {
        backspace();
        event.preventDefault();
      } else if (key.toLowerCase() === 's') {
        handleButtonClick('sin');
        event.preventDefault();
      } else if (key.toLowerCase() === 'c') {
        handleButtonClick('cos');
        event.preventDefault();
      } else if (key.toLowerCase() === 't') {
        handleButtonClick('tan');
        event.preventDefault();
      } else if (key.toLowerCase() === 'l') {
        handleButtonClick('log');
        event.preventDefault();
      } else if (key.toLowerCase() === 'n') {
        handleButtonClick('ln');
        event.preventDefault();
      } else if (key.toLowerCase() === 'r') {
        handleButtonClick('sqrt');
        event.preventDefault();
      } else if (key.toLowerCase() === 'd') {
        handleButtonClick('rad');
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    handleButtonClick, 
    calculateResult, 
    clearExpression, 
    backspace
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 calculator-bg">
      <style>{`
        .calculator-theme-blue {
          --primary: #2196F3;
          --secondary: #64B5F6;
          --dark: #1976D2;
          --text: #FFFFFF;
          --bg: #F5F5F5;
          --card: #FFFFFF;
          --hover: #E3F2FD;
          --display-bg: #E3F2FD;
          --display-text: #1565C0;
          --btn-operator: #1E88E5;
          --btn-number: #F5F5F5;
          --btn-function: #E1F5FE;
          --btn-equals: #2196F3;
          --history-bg: #F5F5F5;
          --memory-indicator: #2196F3;
        }
        
        .calculator-theme-dark {
          --primary: #424242;
          --secondary: #616161;
          --dark: #212121;
          --text: #FFFFFF;
          --bg: #121212;
          --card: #1E1E1E;
          --hover: #333333;
          --display-bg: #2D2D2D;
          --display-text: #E0E0E0;
          --btn-operator: #424242;
          --btn-number: #2D2D2D;
          --btn-function: #333333;
          --btn-equals: #424242;
          --history-bg: #1A1A1A;
          --memory-indicator: #BB86FC;
        }
        
        .calculator-theme-green {
          --primary: #4CAF50;
          --secondary: #81C784;
          --dark: #388E3C;
          --text: #FFFFFF;
          --bg: #F1F8E9;
          --card: #FFFFFF;
          --hover: #E8F5E9;
          --display-bg: #E8F5E9;
          --display-text: #2E7D32;
          --btn-operator: #43A047;
          --btn-number: #F5F5F5;
          --btn-function: #E8F5E9;
          --btn-equals: #4CAF50;
          --history-bg: #F1F8E9;
          --memory-indicator: #4CAF50;
        }
        
        .calculator-theme-purple {
          --primary: #9C27B0;
          --secondary: #BA68C8;
          --dark: #7B1FA2;
          --text: #FFFFFF;
          --bg: #F3E5F5;
          --card: #FFFFFF;
          --hover: #EDE7F6;
          --display-bg: #EDE7F6;
          --display-text: #6A1B9A;
          --btn-operator: #8E24AA;
          --btn-number: #F5F5F5;
          --btn-function: #F3E5F5;
          --btn-equals: #9C27B0;
          --history-bg: #F3E5F5;
          --memory-indicator: #9C27B0;
        }
        
        .calculator-bg {
          background-color: var(--bg);
        }
        
        .calculator-card {
          background-color: var(--card);
          color: var(--display-text);
        }
        
        .calculator-primary {
          background-color: var(--primary);
        }
        
        .calculator-text {
          color: var(--text);
        }
        
        .calculator-display {
          background-color: var(--display-bg);
        }
        
        .calculator-display-text {
          color: var(--display-text);
        }
        
        .calculator-history-bg {
          background-color: var(--history-bg);
        }
        
        .calculator-btn-number {
          background-color: var(--btn-number);
          color: var(--primary);
        }
        
        .calculator-btn-operator {
          background-color: var(--btn-operator);
          color: var(--text);
        }
        
        .calculator-btn-function {
          background-color: var(--btn-function);
          color: var(--primary);
        }
        
        .calculator-btn-equals {
          background-color: var(--btn-equals);
          color: var(--text);
        }
        
        .calculator-btn {
          transition: all 0.1s ease;
        }
        
        .calculator-btn:active {
          transform: scale(0.95);
        }
        
        .theme-transition {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>

      <div className="flex flex-col gap-4 w-full max-w-6xl">
        {/* Calculator Main */}
        <div className="w-full rounded-lg shadow-xl overflow-hidden theme-transition calculator-card">
          {/* Header with title, history button, and theme switcher */}
          <div className="flex justify-between items-center px-4 py-3 theme-transition calculator-primary">
            <h2 className="font-medium text-xl calculator-text">Scientific Calculator</h2>
            <div className="flex items-center gap-3">
              <Link href="/history">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  <History className="mr-1 h-4 w-4" />
                  History
                </Button>
              </Link>
              <ThemeSwitcher 
                currentTheme={state.theme} 
                onThemeChange={setTheme} 
              />
            </div>
          </div>

          {/* Calculator Display */}
          <CalculatorDisplay 
            expression={state.expression}
            result={state.result}
            memory={state.memory}
            hasMemory={state.hasMemory}
            angleMode={state.angleMode}
          />

          {/* Calculator Keypad */}
          <CalculatorKeypad 
            onButtonClick={handleButtonClick}
            onEquals={calculateResult}
            onClear={clearExpression}
            onClearEntry={clearEntry}
            onBackspace={backspace}
            onMemoryClear={memoryClear}
            onMemoryRecall={memoryRecall}
            onMemoryAdd={memoryAdd}
            onMemorySubtract={memorySubtract}
          />
        </div>
        
        {/* Input Panel */}
        <InputPanel 
          angleMode={state.angleMode}
          onAddToHistory={handleManualInput}
        />
      </div>
    </div>
  );
}
