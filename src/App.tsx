import React, { useState, useEffect } from 'react';
import { questions } from './data/questions';
import QuestionCard from './components/QuestionCard';
import type { GameState } from './types';
import { TreePine } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    selectedAnswers: [],
    showResult: false,
  });

  useEffect(() => {
    let timer: number;
    if (gameState.showResult) {
      timer = window.setTimeout(() => {
        if (gameState.currentQuestionIndex < questions.length - 1) {
          setGameState({
            currentQuestionIndex: gameState.currentQuestionIndex + 1,
            selectedAnswers: [],
            showResult: false,
          });
        }
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [gameState.showResult]);

  const currentQuestion = questions[gameState.currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    const newSelectedAnswers = currentQuestion.isMultipleChoice
      ? gameState.selectedAnswers.includes(index)
        ? gameState.selectedAnswers.filter(i => i !== index)
        : [...gameState.selectedAnswers, index]
      : [index];

    setGameState({
      ...gameState,
      selectedAnswers: newSelectedAnswers,
    });
  };

  const handleConfirm = () => {
    if (gameState.selectedAnswers.length === 0) return;

    const isCorrect = currentQuestion.isMultipleChoice
      ? gameState.selectedAnswers.some(answer => 
          currentQuestion.correctAnswers.includes(answer))
      : currentQuestion.correctAnswers.some(answer => 
          gameState.selectedAnswers.includes(answer));

    setGameState({
      ...gameState,
      showResult: true,
      isCorrect,
    });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center py-10 px-4"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1501426026826-31c667bdf23d")',
      }}
    >
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center mb-8">
          <TreePine className="w-10 h-10 text-emerald-700 mr-3" />
          <h1 className="text-4xl font-bold text-emerald-800 text-center">
            Wedding Quiz
          </h1>
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedAnswers={gameState.selectedAnswers}
          onAnswerSelect={handleAnswerSelect}
          showResult={gameState.showResult}
          isCorrect={gameState.isCorrect}
        />

        {!gameState.showResult && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleConfirm}
              disabled={gameState.selectedAnswers.length === 0}
              className={`
                px-8 py-3 rounded-lg text-xl font-semibold transition-all transform
                ${gameState.selectedAnswers.length > 0
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              確認答案
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-white text-lg">
          Question {gameState.currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}

export default App;