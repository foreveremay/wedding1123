export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswers: number[];
  isMultipleChoice?: boolean;
}

export interface GameState {
  currentQuestionIndex: number;
  selectedAnswers: number[];
  showResult: boolean;
  isCorrect?: boolean;
}