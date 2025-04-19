import { useState, useEffect } from 'react';
import { CalculatorState, CalculationRecord, Theme, AngleMode } from '@/types/calculator';
import { calculate, formatExpression } from '@/lib/calculator';
import { formatTime } from '@/lib/utils';

const STORAGE_KEYS = {
  HISTORY: 'calculator-history',
  THEME: 'calculator-theme',
  MEMORY: 'calculator-memory',
  ANGLE_MODE: 'calculator-angle-mode'
};

const MAX_HISTORY_ITEMS = 20;

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>({
    expression: '',
    result: '0',
    memory: 0,
    hasMemory: false,
    angleMode: 'RAD',
    history: [],
    theme: 'blue'
  });

  // Load saved state from localStorage on initial render
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null;
      const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
      const savedMemory = localStorage.getItem(STORAGE_KEYS.MEMORY);
      const savedAngleMode = localStorage.getItem(STORAGE_KEYS.ANGLE_MODE) as AngleMode | null;

      setState(prev => ({
        ...prev,
        theme: savedTheme || 'blue',
        history: savedHistory ? JSON.parse(savedHistory) : [],
        memory: savedMemory ? parseFloat(savedMemory) : 0,
        hasMemory: !!savedMemory,
        angleMode: savedAngleMode || 'RAD'
      }));

      // Apply theme
      if (savedTheme) {
        document.body.classList.add(`calculator-theme-${savedTheme}`);
      } else {
        document.body.classList.add('calculator-theme-blue');
      }
    } catch (error) {
      console.error('Error loading calculator state:', error);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
    if (state.hasMemory) {
      localStorage.setItem(STORAGE_KEYS.MEMORY, state.memory.toString());
    } else {
      localStorage.removeItem(STORAGE_KEYS.MEMORY);
    }
    localStorage.setItem(STORAGE_KEYS.ANGLE_MODE, state.angleMode);

    // Apply theme class
    document.body.className = '';
    document.body.classList.add(`calculator-theme-${state.theme}`);
  }, [state.theme, state.history, state.memory, state.hasMemory, state.angleMode]);

  const setTheme = (theme: Theme) => {
    setState(prev => ({ ...prev, theme }));
  };

  const appendToExpression = (value: string) => {
    if (state.result === 'Error') {
      // Clear error state before adding new input
      setState(prev => ({ ...prev, expression: value, result: calculate(value, state.angleMode) }));
      return;
    }

    setState(prev => {
      const newExpression = prev.expression + value;
      return {
        ...prev,
        expression: newExpression,
        result: calculate(newExpression, state.angleMode)
      };
    });
  };

  const toggleAngleMode = () => {
    setState(prev => {
      const newAngleMode = prev.angleMode === 'RAD' ? 'DEG' : 'RAD';
      // Recalculate result with new angle mode
      return {
        ...prev,
        angleMode: newAngleMode,
        result: calculate(prev.expression, newAngleMode)
      };
    });
  };

  const clearExpression = () => {
    setState(prev => ({
      ...prev,
      expression: '',
      result: '0'
    }));
  };

  const clearEntry = () => {
    setState(prev => {
      // Find the last operator to keep
      const lastOperatorMatch = prev.expression.match(/[+\-×÷(]/g);
      const lastOperatorPos = lastOperatorMatch 
        ? prev.expression.lastIndexOf(lastOperatorMatch[lastOperatorMatch.length - 1])
        : -1;
      
      const newExpression = prev.expression.substring(0, lastOperatorPos + 1);
      return {
        ...prev,
        expression: newExpression,
        result: newExpression ? calculate(newExpression, prev.angleMode) : '0'
      };
    });
  };

  const backspace = () => {
    setState(prev => {
      const newExpression = prev.expression.slice(0, -1);
      return {
        ...prev,
        expression: newExpression,
        result: newExpression ? calculate(newExpression, prev.angleMode) : '0'
      };
    });
  };

  const calculateResult = () => {
    if (state.expression) {
      try {
        const result = calculate(state.expression, state.angleMode);
        
        // Add to history
        const newHistoryItem: CalculationRecord = {
          expression: formatExpression(state.expression),
          result,
          timestamp: formatTime(new Date())
        };
        
        setState(prev => {
          const newHistory = [newHistoryItem, ...prev.history];
          // Limit history size
          if (newHistory.length > MAX_HISTORY_ITEMS) {
            newHistory.pop();
          }
          
          return {
            ...prev,
            result,
            expression: '',
            history: newHistory
          };
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          result: 'Error'
        }));
      }
    }
  };

  // Memory functions
  const memoryClear = () => {
    setState(prev => ({
      ...prev,
      memory: 0,
      hasMemory: false
    }));
  };

  const memoryRecall = () => {
    if (state.hasMemory) {
      setState(prev => {
        const newExpression = prev.expression + prev.memory.toString();
        return {
          ...prev,
          expression: newExpression,
          result: calculate(newExpression, prev.angleMode)
        };
      });
    }
  };

  const memoryAdd = () => {
    setState(prev => {
      const currentValue = prev.result !== 'Error' ? parseFloat(prev.result) || 0 : 0;
      return {
        ...prev,
        memory: prev.memory + currentValue,
        hasMemory: true
      };
    });
  };

  const memorySubtract = () => {
    setState(prev => {
      const currentValue = prev.result !== 'Error' ? parseFloat(prev.result) || 0 : 0;
      return {
        ...prev,
        memory: prev.memory - currentValue,
        hasMemory: true
      };
    });
  };

  const handleNegate = () => {
    setState(prev => {
      if (prev.expression === '') {
        return {
          ...prev,
          expression: '-',
          result: '-'
        };
      } else {
        // Toggle negative/positive for the last number in expression
        const lastNumberMatch = prev.expression.match(/(-?\d*\.?\d+)$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          const negated = lastNumber.startsWith('-') 
            ? lastNumber.substring(1) 
            : `-${lastNumber}`;
          const newExpression = prev.expression.substring(0, lastNumberMatch.index) + negated;
          return {
            ...prev,
            expression: newExpression,
            result: calculate(newExpression, prev.angleMode)
          };
        }
        return prev;
      }
    });
  };

  const handleButtonClick = (value: string) => {
    if (value === 'rad') {
      toggleAngleMode();
    } else if (value === '+/-') {
      handleNegate();
    } else {
      appendToExpression(value);
    }
  };

  return {
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
  };
}
