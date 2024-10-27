import React from 'react';
import { Leaf, CheckCircle2, XCircle } from 'lucide-react';
import { Question } from '../types';

interface AnswerRevealProps {
  question: Question;
  selectedAnswers: number[];
}

export function AnswerReveal({ question, selectedAnswers }: AnswerRevealProps) {
  const isCorrect = question.isMultiSelect
    ? selectedAnswers.some(answer => question.correctAnswers.includes(answer))
    : question.correctAnswers[0] === selectedAnswers[0];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-8 border border-green-100">
        <div className="flex flex-col items-center gap-4 mb-8">
          {isCorrect ? (
            <>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-serif text-green-800">答對了！</h3>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-3xl font-serif text-red-800">答錯了！</h3>
            </>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-green-100 pb-4">
            <Leaf className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-serif text-green-800">
              {question.id}. {question.text}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`
                  p-4 rounded-lg relative overflow-hidden
                  ${question.correctAnswers.includes(index)
                    ? 'bg-green-100 border-2 border-green-500'
                    : selectedAnswers.includes(index)
                    ? 'bg-red-100 border-2 border-red-500'
                    : 'bg-gray-50 border-2 border-transparent'}
                `}
              >
                <span className="text-lg font-medium text-gray-800">{option}</span>
                {question.correctAnswers.includes(index) && (
                  <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-green-600" />
                )}
                {selectedAnswers.includes(index) && !question.correctAnswers.includes(index) && (
                  <XCircle className="absolute top-4 right-4 w-6 h-6 text-red-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}