'use client';

import { useEffect, useState } from 'react';
import { getAllWordsOfTheDay } from '../utils/wordOfTheDay';
import { addToFavorites } from '../utils/favorites';
import WordCard from './WordCard';

export default function WordOfTheDay() {
  const [wordsOfTheDay, setWordsOfTheDay] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  useEffect(() => {
    const words = getAllWordsOfTheDay();
    setWordsOfTheDay(words);
  }, []);

  const languages = [
    { code: 'english', label: '영어', flag: '🇺🇸' },
    { code: 'korean', label: '한국어', flag: '🇰🇷' },
    { code: 'japanese', label: '일본어', flag: '🇯🇵' },
    { code: 'slang', label: '신조어', flag: '🔥' }
  ];

  const handleAddToFavorites = (language) => {
    const word = wordsOfTheDay[language];
    if (word) {
      const success = addToFavorites(word, language);
      if (success) {
        alert('즐겨찾기에 추가되었습니다!');
      } else {
        alert('이미 즐겨찾기에 있는 단어입니다.');
      }
    }
  };

  const currentWord = wordsOfTheDay[selectedLanguage];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2">📅</span>
        오늘의 단어
      </h2>
      
      {/* 언어 선택 탭 */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                selectedLanguage === lang.code
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 오늘의 단어 카드 */}
      {currentWord ? (
        <WordCard 
          word={currentWord}
          language={selectedLanguage}
          showFavoriteButton={true}
          onAddToFavorites={() => handleAddToFavorites(selectedLanguage)}
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
          오늘의 단어를 불러오는 중...
        </div>
      )}
    </div>
  );
} 