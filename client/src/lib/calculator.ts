import * as math from 'mathjs';

export function calculate(expr: string, angleMode: 'RAD' | 'DEG'): string {
  try {
    // Handle empty expression
    if (!expr.trim()) return '0';

    // Replace ÷ with / and × with *
    let expression = expr
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/−/g, '-');

    // Convert degrees to radians for trigonometric functions if in DEG mode
    if (angleMode === 'DEG') {
      expression = expression
        .replace(/sin\(/g, 'sin(pi/180*')
        .replace(/cos\(/g, 'cos(pi/180*')
        .replace(/tan\(/g, 'tan(pi/180*');
    }

    // Calculate the result
    const result = math.evaluate(expression);

    // Format the result
    if (result === undefined || result === null) {
      return 'Error';
    }

    // Handle different result types
    if (typeof result === 'number') {
      if (!isFinite(result)) {
        return 'Error';
      }
      // Round to 10 decimal places to avoid floating point issues
      const roundedResult = parseFloat(result.toFixed(10));
      // Remove trailing zeros
      return roundedResult.toString();
    }

    return result.toString();
  } catch (error) {
    console.error('Calculation error:', error);
    return 'Error';
  }
}

export function isOperator(value: string): boolean {
  return ['+', '-', '×', '÷', '*', '/', '−'].includes(value);
}

export function formatExpression(expr: string): string {
  return expr
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/-/g, '−');
}
