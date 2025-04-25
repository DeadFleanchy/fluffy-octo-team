export type Theme = 'blue' | 'dark' | 'green' | 'purple';

export type AngleMode = 'RAD' | 'DEG';

export interface CalculationRecord {
  expression: string;
  result: string;
  timestamp: string;
}

export interface CalculatorState {
  expression: string;
  result: string;
  memory: number;
  hasMemory: boolean;
  angleMode: AngleMode;
  history: CalculationRecord[];
  theme: Theme;
}

export interface KeypadButtonProps {
  value: string;
  display?: string;
  className?: string;
  onClick: (value: string) => void;
  colSpan?: number;
  type?: 'number' | 'operator' | 'function' | 'equals';
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
}
