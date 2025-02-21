export interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'integer';
  options?: string[];
  correctAnswer: string | number;
}

export interface QuizAttempt {
  id: string;
  timestamp: number;
  answers: Record<number, string | number>;
  score: number;
  timeSpent: number;
}

export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string | number>;
  timeRemaining: number;
  isComplete: boolean;
  attempts: QuizAttempt[];
  totalTimeSpent: number;
}