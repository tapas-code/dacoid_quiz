import { create } from 'zustand';
import { QuizState, QuizAttempt } from '../types/quiz';
import { openDB } from 'idb';
import { questions } from '../data/questions';

const QUESTION_TIME = 30; // 30 seconds per question

interface QuizStore extends QuizState {
  startQuiz: () => void;
  answerQuestion: (questionId: number, answer: string | number) => void;
  submitQuiz: () => Promise<void>;
  updateTimer: () => void;
  loadAttempts: () => Promise<void>;
  moveToNextQuestion: () => void;
}

const dbPromise = openDB('quiz-db', 1, {
  upgrade(db) {
    db.createObjectStore('attempts', { keyPath: 'id' });
  },
});

export const useQuizStore = create<QuizStore>((set, get) => ({
  currentQuestion: 0,
  answers: {},
  timeRemaining: QUESTION_TIME,
  isComplete: true,
  attempts: [],
  totalTimeSpent: 0,

  startQuiz: () => {
    set({
      currentQuestion: 0,
      answers: {},
      timeRemaining: QUESTION_TIME,
      isComplete: false,
      totalTimeSpent: 0,
    });
  },

  moveToNextQuestion: () => {
    const state = get();
    set((prevState) => ({
      totalTimeSpent: prevState.totalTimeSpent + (QUESTION_TIME - state.timeRemaining),
    }));
    if (state.currentQuestion < questions.length - 1) {
      set({
        currentQuestion: state.currentQuestion + 1,
        timeRemaining: QUESTION_TIME,
      });
    } else {
      get().submitQuiz();
    }
  },

  answerQuestion: (questionId: number, answer: string | number) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    }));
  },

  submitQuiz: async () => {
    const state = get();
    // const timeSpent = questions.length * QUESTION_TIME - state.timeRemaining;
    const totalTimeSpent = state.totalTimeSpent + (QUESTION_TIME - state.timeRemaining);
    
    let correctAnswers = 0;
    Object.entries(state.answers).forEach(([id, answer]) => {
      const question = questions.find(q => q.id === parseInt(id));
      if (question && question.correctAnswer === answer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / questions.length) * 100;

    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      answers: state.answers,
      score,
      timeSpent: totalTimeSpent,
    };

    const db = await dbPromise;
    await db.add('attempts', attempt);

    set((state) => ({
      isComplete: true,
      attempts: [...state.attempts, attempt],
    }));
  },

  updateTimer: () => {
    const state = get();
    if (state.timeRemaining > 0) {
      set({ timeRemaining: state.timeRemaining - 1 });
    } else {
      // Time's up for current question
      get().moveToNextQuestion();
    }
  },

  loadAttempts: async () => {
    const db = await dbPromise;
    const attempts = await db.getAll('attempts');
    set({ attempts });
  },
}));