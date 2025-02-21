import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { History } from 'lucide-react';

export const AttemptHistory: React.FC = () => {
  const { attempts } = useQuizStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <History className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Previous Attempts</h2>
      </div>
      
      <div className="space-y-2">
        {attempts.slice().reverse().map((attempt) => (
          <div
            key={attempt.id}
            className="p-4 bg-white rounded-lg shadow border"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  Score: {attempt.score.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(attempt.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="text-sm text-gray-600">
                Time: {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};