import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { questions } from '../data/questions';
import { Trophy } from 'lucide-react';

export const QuizResults: React.FC = () => {
  const { answers, attempts } = useQuizStore();
  const currentAttempt = attempts[attempts.length - 1];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
        <Trophy className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-xl">Your Score: {currentAttempt.score.toFixed(1)}%</p>
        <p className="text-lg">Time Taken: {formatTime(currentAttempt.timeSpent)}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Question Review</h3>
        {questions.map((question) => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;

          return (
            <div
              key={question.id}
              className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <p className="font-medium">{question.text}</p>
              <div className="mt-2 space-y-1">
                <p>Your answer: {userAnswer}</p>
                <p>Correct answer: {question.correctAnswer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};