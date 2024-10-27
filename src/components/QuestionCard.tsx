import React from 'react';
import { Question } from '../types';
import { Flower2 } from 'lucide-react';

interface Props {
  question: Question;
  selectedAnswers: number[];
  onAnswerSelect: (index: number) => void;
  showResult: boolean;
  isCorrect?: boolean;
}

export default function QuestionCard({
  question,
  selectedAnswers,
  onAnswerSelect,
  showResult,
  isCorrect,
}: Props) {
  return (
    <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 transform transition-all">
      <div className="flex items-center justify-center mb-6">
        <Flower2 className="w-8 h-8 text-emerald-600 mr-2" />
        <h2 className="text-2xl font-semibold text-emerald-800">Question {question.id}</h2>
      </div>
      
      <p className="text-xl text-center mb-8 text-gray-700">{question.text}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && onAnswerSelect(index)}
            className={`
              p-4 rounded-lg text-lg transition-all transform hover:scale-105
              ${showResult
                ? question.correctAnswers.includes(index)
                  ? 'bg-green-500 text-white'
                  : selectedAnswers.includes(index)
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700'
                : selectedAnswers.includes(index)
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }
              ${!showResult && 'hover:shadow-lg cursor-pointer'}
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`mt-6 text-center text-xl font-semibold
          ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? '答對了！' : '答錯了！'}
        </div>
      )}
    </div>
  );
}