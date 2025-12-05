'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { questions } from './data/questions';
import { GameState, Question } from './types';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

const TIME_PER_QUESTION = 30;

// Utility to shuffle array (Fisher-Yates algorithm)
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const WhitelistPage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const handleStart = () => {
    // Shuffle questions and their options
    const shuffledQuestions = shuffle(questions).map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));

    setActiveQuestions(shuffledQuestions);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameState(GameState.PLAYING);
    setTimeLeft(TIME_PER_QUESTION);
  };

  const handleRetry = () => {
    setGameState(GameState.START);
  };

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    // Use activeQuestions for length check
    if (nextIndex < activeQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      setGameState(GameState.FINISHED);
    }
  }, [currentQuestionIndex, activeQuestions.length]);

  const handleTimeUp = useCallback(() => {
    // Treat time up as wrong answer
    handleAnswer(false);
  }, [handleAnswer]);

  // Timer Logic
  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameState, currentQuestionIndex, handleTimeUp]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2560')] bg-cover bg-center bg-no-repeat bg-fixed">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />

      <div className="relative z-10 w-full">
        {gameState === GameState.START && (
          <StartScreen onStart={handleStart} />
        )}

        {gameState === GameState.PLAYING && activeQuestions.length > 0 && (
          <QuizScreen
            question={activeQuestions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={activeQuestions.length}
            timeLeft={timeLeft}
            onAnswer={handleAnswer}
          />
        )}

        {gameState === GameState.FINISHED && (
          <ResultScreen
            score={score}
            totalQuestions={activeQuestions.length}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  );
};

export default WhitelistPage;