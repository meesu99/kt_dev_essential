'use client';

import { useState, useEffect } from 'react';

export default function QuizQuestion({ 
  word, 
  language, 
  options, 
  correctAnswer,
  onAnswer,
  onNext 
}) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    // 새로운 문제가 로드될 때 상태 초기화 및 선택지 순서 고정
    setSelectedAnswer('');
    setIsAnswered(false);
    setShowResult(false);
    
    if (word && correctAnswer && options) {
      const allOptions = [correctAnswer, ...options];
      const shuffled = [...allOptions].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  }, [word, correctAnswer, options]);

  const getLanguageIcon = (lang) => {
    switch (lang) {
      case 'english': return '🇺🇸';
      case 'korean': return '🇰🇷';
      case 'japanese': return '🇯🇵';
      default: return '📖';
    }
  };

  const getLanguageLabel = (lang) => {
    switch (lang) {
      case 'english': return '영어';
      case 'korean': return '한국어';
      case 'japanese': return '일본어';
      default: return '언어';
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    setIsAnswered(true);
    setShowResult(true);
    
    const isCorrect = selectedAnswer === correctAnswer;
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    onNext();
  };

  if (!word) {
    return (
      <div className="text-center py-8 text-gray-500">
        퀴즈를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg">{getLanguageIcon(language)}</span>
          <span className="text-sm text-gray-600">{getLanguageLabel(language)} 퀴즈</span>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-3xl font-bold text-blue-900 mb-2 text-center">
            {word.word}
          </h3>
          <p className="text-blue-700 text-center">위 단어의 뜻은 무엇일까요?</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => !isAnswered && setSelectedAnswer(option)}
            disabled={isAnswered}
            className={`w-full p-4 text-left rounded-lg border transition-colors ${
              isAnswered
                ? option === correctAnswer
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : option === selectedAnswer
                  ? 'border-red-500 bg-red-50 text-red-800'
                  : 'border-gray-300 bg-gray-50 text-gray-500'
                : selectedAnswer === option
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
            {option}
            {isAnswered && option === correctAnswer && (
              <span className="float-right text-green-600">✓</span>
            )}
            {isAnswered && option === selectedAnswer && option !== correctAnswer && (
              <span className="float-right text-red-600">✗</span>
            )}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg mb-4 ${
          selectedAnswer === correctAnswer
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">
              {selectedAnswer === correctAnswer ? '🎉' : '😞'}
            </span>
            <span className={`font-bold ${
              selectedAnswer === correctAnswer ? 'text-green-800' : 'text-red-800'
            }`}>
              {selectedAnswer === correctAnswer ? '정답입니다!' : '틀렸습니다!'}
            </span>
          </div>
          
          <div className="text-sm text-gray-700">
            <p><strong>정답:</strong> {correctAnswer}</p>
            {word.example && (
              <p className="mt-2"><strong>예문:</strong> &ldquo;{word.example}&rdquo;</p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            답안 제출
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            다음 문제
          </button>
        )}
      </div>
    </div>
  );
} 