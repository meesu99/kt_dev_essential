'use client';

import { useState, useEffect } from 'react';
import { getWordOfTheDay, generateQuizOptions } from '../../utils/wordOfTheDay';
import QuizQuestion from '../../components/QuizQuestion';

export default function QuizPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [currentWord, setCurrentWord] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const languages = [
    { code: 'english', label: '영어', flag: '🇺🇸' },
    { code: 'korean', label: '한국어', flag: '🇰🇷' },
    { code: 'japanese', label: '일본어', flag: '🇯🇵' },
    { code: 'slang', label: '신조어', flag: '🔥' }
  ];

  useEffect(() => {
    loadNewQuestion();
  }, [selectedLanguage]);

  const loadNewQuestion = () => {
    // 오늘의 단어 목록에서 랜덤하게 선택
    import('../../data/word-of-the-day.json').then(wordOfTheDayData => {
      const wordsArray = wordOfTheDayData.default[selectedLanguage] || [];
      if (wordsArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        const word = wordsArray[randomIndex];
        const correctAnswer = word.meaning;
        const wrongOptions = generateQuizOptions(word, selectedLanguage, 3);
        
        setCurrentWord(word);
        setQuizOptions(wrongOptions);
      }
    });
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextQuestionCount = questionCount + 1;
    setQuestionCount(nextQuestionCount);
    
    // 다음 문제 개수가 총 문제 수에 도달하면 퀴즈 완료
    if (nextQuestionCount >= totalQuestions) {
      setIsQuizCompleted(true);
    } else {
      loadNewQuestion();
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setQuestionCount(0);
    setIsQuizCompleted(false);
    loadNewQuestion();
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setScore(0);
    setQuestionCount(0);
    setIsQuizCompleted(false);
    // useEffect가 selectedLanguage 변경을 감지해서 자동으로 새 문제를 로드함
  };

  if (isQuizCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '😊' : '😞'}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              퀴즈 완료!
            </h2>
            <div className="text-xl text-gray-700 mb-6">
              <p>총 점수: <span className="font-bold text-blue-600">{score}</span> / {totalQuestions}</p>
              <p>정답률: <span className="font-bold text-green-600">{percentage}%</span></p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={resetQuiz}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                다시 도전하기
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                홈으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            단어 퀴즈 🧠
          </h1>
          <p className="text-gray-600 mb-4">
            오늘의 단어로 퀴즈를 풀어보세요
          </p>
          
          {/* 진행률 바 */}
          <div className="bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionCount / totalQuestions) * 100}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-gray-600 mb-6">
            문제 {questionCount + 1} / {totalQuestions} | 점수: {score}
          </div>
        </div>

        {/* 언어 선택 */}
        <div className="mb-6">
          <div className="flex justify-center space-x-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedLanguage === lang.code
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {currentWord && (
          <QuizQuestion
            word={currentWord}
            language={selectedLanguage}
            options={quizOptions}
            correctAnswer={currentWord.meaning}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
} 