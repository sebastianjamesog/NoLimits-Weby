import React from 'react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

  // Color logic based on time remaining
  const getColor = () => {
    if (timeLeft > 15) return "text-emerald-400";
    if (timeLeft > 7) return "text-yellow-400";
    return "text-red-500";
  };

  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      <svg className="transform -rotate-90 w-16 h-16">
        <circle
          className="text-gray-700"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="32"
          cy="32"
        />
        <circle
          className={`${getColor()} transition-all duration-500 ease-linear`}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="32"
          cy="32"
        />
      </svg>
      <span className={`absolute text-sm font-bold ${getColor()}`}>
        {timeLeft}s
      </span>
    </div>
  );
};

export default Timer;