"use client";

import { motion } from "framer-motion";

type RiskGaugeProps = {
  value: number;
};

export function RiskGauge({ value }: RiskGaugeProps) {
  // Normalize value to be between 0 and 100
  const normalizedValue = Math.min(100, Math.max(0, value));
  
  // Calculate rotation based on value (from -90 to 90 degrees)
  const rotation = -90 + (180 * normalizedValue / 100);
  
  const getColor = (value: number) => {
    if (value < 33) return "var(--chart-2)";
    if (value < 66) return "var(--chart-4)";
    return "var(--chart-1)";
  };

  return (
    <div className="relative w-full h-[100px] flex items-center justify-center">
      {/* Background arc */}
      <div className="absolute w-full h-full">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path
            d="M20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Colored arc representing the value */}
      <div className="absolute w-full h-full">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path
            d="M20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={getColor(normalizedValue)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * normalizedValue / 100)}
          />
        </svg>
      </div>
      
      {/* Needle */}
      <div className="absolute w-full h-full">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <motion.line
            initial={{ rotate: -90, originX: 100, originY: 100 }}
            animate={{ rotate: rotation, originX: 100, originY: 100 }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="var(--foreground)"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="6"
            fill="var(--foreground)"
          />
        </svg>
      </div>
      
      {/* Value label */}
      <div className="absolute bottom-0 text-lg font-bold">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(normalizedValue)}%
        </motion.span>
      </div>
      
      {/* Risk labels */}
      <div className="absolute w-full bottom-2">
        <div className="flex justify-between text-xs text-muted-foreground px-4">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}