import React from 'react';
import { cn } from '@/lib/utils';
import { KeypadButtonProps } from '@/types/calculator';
import soundService from '@/lib/soundService';

function KeypadButton({ 
  value, 
  display, 
  className, 
  onClick, 
  colSpan = 1, 
  type = 'number',
  hideOnMobile = false,
  hideOnTablet = false
}: KeypadButtonProps) {
  // Define classes based on button type
  const buttonClass = cn(
    "calculator-btn py-3 px-2 rounded font-medium theme-transition",
    {
      "calculator-btn-number": type === 'number',
      "calculator-btn-operator": type === 'operator',
      "calculator-btn-function": type === 'function',
      "calculator-btn-equals": type === 'equals',
      "hidden sm:block": hideOnMobile,
      "hidden md:block": hideOnTablet,
      "col-span-1": colSpan === 1,
      "col-span-2": colSpan === 2,
      "col-span-3": colSpan === 3,
      "col-span-4": colSpan === 4
    },
    className
  );

  const handleClick = () => {
    // Call the onClick handler passed from parent
    onClick(value);
  };

  const handleMouseDown = () => {
    // Play the click sound when button is pressed
    soundService.playClickSound();
  };

  const handleMouseUp = () => {
    // Play the release sound when button is released
    soundService.playReleaseSound();
  };

  return (
    <button 
      className={buttonClass}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {display || value}
    </button>
  );
}

interface CalculatorKeypadProps {
  onButtonClick: (value: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onBackspace: () => void;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
}

export function CalculatorKeypad({
  onButtonClick,
  onEquals,
  onClear,
  onClearEntry,
  onBackspace,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract
}: CalculatorKeypadProps) {
  return (
    <div className="p-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
      {/* Memory Buttons Row */}
      <KeypadButton value="MC" onClick={onMemoryClear} type="function" />
      <KeypadButton value="MR" onClick={onMemoryRecall} type="function" />
      <KeypadButton value="M+" onClick={onMemoryAdd} type="function" />
      <KeypadButton value="M-" onClick={onMemorySubtract} type="function" />

      {/* Scientific Functions Row 1 */}
      <KeypadButton value="sin" onClick={onButtonClick} type="function" hideOnMobile />
      <KeypadButton value="cos" onClick={onButtonClick} type="function" hideOnMobile />

      {/* Scientific Functions Row 2 */}
      <KeypadButton value="tan" onClick={onButtonClick} type="function" hideOnTablet />
      <KeypadButton value="rad" onClick={onButtonClick} type="function" />
      <KeypadButton value="log" onClick={onButtonClick} type="function" hideOnMobile />
      <KeypadButton value="ln" onClick={onButtonClick} type="function" hideOnTablet />

      {/* Scientific Functions Row 3 */}
      <KeypadButton value="(" onClick={onButtonClick} type="function" />
      <KeypadButton value=")" onClick={onButtonClick} type="function" />
      <KeypadButton value="sqrt" display="√" onClick={onButtonClick} type="function" hideOnMobile />
      <KeypadButton value="^" display="x^y" onClick={onButtonClick} type="function" hideOnTablet />

      {/* Main Calculator Buttons */}
      <KeypadButton value="C" onClick={onClear} type="function" />
      <KeypadButton value="CE" onClick={onClearEntry} type="function" />
      <KeypadButton value="⌫" onClick={onBackspace} type="function" />
      <KeypadButton value="/" display="÷" onClick={onButtonClick} type="operator" />

      <KeypadButton value="7" onClick={onButtonClick} />
      <KeypadButton value="8" onClick={onButtonClick} />
      <KeypadButton value="9" onClick={onButtonClick} />
      <KeypadButton value="*" display="×" onClick={onButtonClick} type="operator" />

      <KeypadButton value="4" onClick={onButtonClick} />
      <KeypadButton value="5" onClick={onButtonClick} />
      <KeypadButton value="6" onClick={onButtonClick} />
      <KeypadButton value="-" display="−" onClick={onButtonClick} type="operator" />

      <KeypadButton value="1" onClick={onButtonClick} />
      <KeypadButton value="2" onClick={onButtonClick} />
      <KeypadButton value="3" onClick={onButtonClick} />
      <KeypadButton value="+" onClick={onButtonClick} type="operator" />

      <KeypadButton value="+/-" display="±" onClick={onButtonClick} />
      <KeypadButton value="0" onClick={onButtonClick} />
      <KeypadButton value="." onClick={onButtonClick} />
      <KeypadButton value="=" onClick={onEquals} type="equals" />
    </div>
  );
}
