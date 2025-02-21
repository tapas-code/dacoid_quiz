import React from 'react';
import { Question as QuestionType } from '../types/quiz';
import { useQuizStore } from '../store/quizStore';
import { Check, X } from 'lucide-react';

interface QuestionProps {
  question: QuestionType;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  const { answers, answerQuestion } = useQuizStore();
  const currentAnswer = answers[question.id];

  const handleAnswerChange = (value: string | number) => {
    if (question.type === 'multiple-choice' && currentAnswer === undefined) {
      answerQuestion(question.id, value);
    } else if (question.type === 'integer') {
      answerQuestion(question.id, value);
    }
  };

  const getOptionStyle = (option: string, index: number) => {
    const optionLetter = String.fromCharCode(65 + index);
    if (currentAnswer === optionLetter) {
      const isCorrect = optionLetter === question.correctAnswer;
      return {
        containerClass: `flex items-center space-x-3 p-3 rounded-lg cursor-pointer opacity-100 ${
          isCorrect 
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-red-50 border-2 border-red-500'
        }`,
        iconComponent: isCorrect ? Check : X,
        iconClass: isCorrect ? 'text-blue-500' : 'text-red-500'
      };
    }
    return {
      containerClass: 'flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer',
      iconComponent: null,
      iconClass: ''
    };
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">
        Question {question.id}: {question.text}
      </h3>
      
      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const { containerClass, iconComponent: Icon, iconClass } = getOptionStyle(option, index);
            return (
              <label
                key={index}
                className={`${containerClass} ${currentAnswer !== undefined ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={String.fromCharCode(65 + index)}
                  checked={currentAnswer === String.fromCharCode(65 + index)}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="h-4 w-4 text-blue-600"
                  disabled={currentAnswer !== undefined}
                />
                <span className="flex-grow">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
                {Icon && <Icon className={`w-5 h-5 ${iconClass}`} />}
              </label>
            );
          })}
        </div>
      )}

      {question.type === 'integer' && (
        <div className="space-y-2">
          <input
            type="number"
            value={currentAnswer || ''}
            onChange={(e) => handleAnswerChange(parseInt(e.target.value, 10))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your answer"
          />
        </div>
      )}
    </div>
  );
};
