import React from 'react';
import { Question } from '../types';
import Timer from './Timer';
import { Check, X } from 'lucide-react';

interface QuizScreenProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLeft: number;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ 
  question, 
  currentQuestionIndex, 
  totalQuestions, 
  timeLeft, 
  onAnswer 
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState<number | null>(null);
  const [isProcessed, setIsProcessed] = React.useState(false);

  // Reset local state when question changes
  React.useEffect(() => {
    setSelectedOptionIndex(null);
    setIsProcessed(false);
  }, [question.id]);

  const handleOptionClick = (index: number, isCorrect: boolean) => {
    if (isProcessed) return;
    setSelectedOptionIndex(index);
    setIsProcessed(true);
    
    // Small delay to show visual feedback before moving on
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6 bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
        <div>
          <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">Question</span>
          <div className="text-xl font-bold text-white">
            {currentQuestionIndex + 1} <span className="text-gray-500 text-lg">/ {totalQuestions}</span>
          </div>
        </div>
        <Timer timeLeft={timeLeft} totalTime={30} />
      </div>

      {/* Question Card */}
      <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-4">
          {question.options.map((option, index) => {
            let buttonClass = "w-full p-5 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ";
            
            if (isProcessed) {
              if (index === selectedOptionIndex) {
                if (option.isCorrect) {
                  buttonClass += "bg-emerald-900/30 border-emerald-500 text-emerald-100";
                } else {
                  buttonClass += "bg-red-900/30 border-red-500 text-red-100";
                }
              } else if (option.isCorrect) {
                // Show correct answer even if user picked wrong
                 buttonClass += "bg-gray-800 border-emerald-500/50 opacity-60";
              } else {
                 buttonClass += "bg-gray-800 border-gray-700 opacity-40";
              }
            } else {
              buttonClass += "bg-gray-800/50 border-gray-700 hover:border-indigo-500 hover:bg-gray-800 text-gray-200";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index, option.isCorrect)}
                disabled={isProcessed}
                className={buttonClass}
              >
                <span className="text-lg">{option.text}</span>
                {isProcessed && index === selectedOptionIndex && (
                  <span className="ml-3">
                    {option.isCorrect ? (
                      <Check className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <X className="w-6 h-6 text-red-400" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;