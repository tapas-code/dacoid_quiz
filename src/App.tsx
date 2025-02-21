import React, { useEffect } from 'react';
import { Timer } from './components/Timer';
import { Question } from './components/Question';
import { QuizResults } from './components/QuizResults';
import { AttemptHistory } from './components/AttemptHistory';
import { useQuizStore } from './store/quizStore';
import { questions } from './data/questions';
import { Play, ChevronLeft, ChevronRight, Send } from 'lucide-react';

function App() {
  const {
    currentQuestion,
    isComplete,
    startQuiz,
    submitQuiz,
    loadAttempts,
    answers,
    moveToNextQuestion,
  } = useQuizStore();

  useEffect(() => {
    loadAttempts();
  }, []);

  const handleNext = () => {
    moveToNextQuestion();
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      useQuizStore.setState({ 
        currentQuestion: currentQuestion - 1,
        timeRemaining: 30 
      });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      submitQuiz();
    } else {
      alert('Please answer all questions before submitting!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {isComplete ? (
          <div className="space-y-8">
            <div className="text-center space-y-6 py-12">
              <h2 className="text-2xl font-semibold">Ready to start the quiz?</h2>
              <p className="text-gray-600">
                You have 30 seconds to answer each question.
                <br />
                Get instant feedback on your answers!
              </p>
              <button
                onClick={startQuiz}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz
              </button>
            </div>
            {Object.keys(answers).length > 0 && <QuizResults />}
            <AttemptHistory />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Interactive Quiz</h1>
              <Timer />
            </div>

            <div className="space-y-6 bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="inline-flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Previous
                  </button>
                  {currentQuestion < questions.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Submit
                      <Send className="w-5 h-5 ml-1" />
                    </button>
                  )}
                </div>
              </div>

              <Question question={questions[currentQuestion]} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;