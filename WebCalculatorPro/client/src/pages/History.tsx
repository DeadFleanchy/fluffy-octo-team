import React from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { ChevronLeft } from 'lucide-react';

export default function HistoryPage() {
  const { state } = useCalculator();
  
  return (
    <div className="min-h-screen calculator-bg dark:bg-gray-900 p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl calculator-card theme-transition dark:shadow-gray-800">
        <CardHeader className="calculator-primary theme-transition">
          <div className="flex justify-between items-center">
            <CardTitle className="calculator-text text-xl">Calculation History</CardTitle>
            <div className="flex items-center gap-3">
              <DarkModeToggle />
              <Separator orientation="vertical" className="h-6 bg-white/30" />
              <Link href="/">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Calculator
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          {state.history.length === 0 ? (
            <div className="text-center py-20 opacity-60">
              <p>No calculation history yet</p>
              <p className="text-sm mt-2">Perform calculations to see them here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.history.map((item, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded calculator-display theme-transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg calculator-display-text">{item.expression}</div>
                      <div className="text-2xl font-mono font-medium calculator-display-text">= {item.result}</div>
                    </div>
                    <div className="text-xs opacity-60 calculator-display-text">{item.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}