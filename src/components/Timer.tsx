import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';

export const Timer: React.FC = () => {
  const { timeRemaining, updateTimer, isComplete } = useQuizStore();

  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(updateTimer, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, isComplete]);

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-5 h-5" />
      <div className="text-lg font-semibold">
        <span className={timeRemaining <= 5 ? 'text-red-600' : ''}>
          {timeRemaining}s
        </span>
      </div>
    </div>
  );
};