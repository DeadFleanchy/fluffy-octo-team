import React from 'react';
import { CalculationRecord } from '@/types/calculator';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface HistoryPanelProps {
  history: CalculationRecord[];
}

export function HistoryPanel({ history }: HistoryPanelProps) {
  return (
    <div className="lg:w-1/4 theme-transition calculator-history-bg rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-3 theme-transition calculator-primary">
        <h3 className="font-medium text-lg calculator-text">History</h3>
      </div>
      <div className="h-[500px] overflow-y-auto p-4" id="history-list">
        {history.length === 0 ? (
          <div className="text-center py-6 opacity-70">
            No calculations yet
          </div>
        ) : (
          history.map((record, index) => (
            <div 
              key={index} 
              className="mb-3 p-3 rounded theme-transition calculator-card"
            >
              <div className="text-sm opacity-70">{record.expression}</div>
              <div className="text-xl font-mono font-medium">= {record.result}</div>
              <div className="text-xs opacity-50 mt-1">{record.timestamp}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
