'use client';

import { useState, useEffect } from 'react';
import koreanDictionary from '../../data/korean-dictionary.json';
import japaneseDictionary from '../../data/japanese-dictionary.json';
import wordOfTheDayData from '../../data/word-of-the-day.json';
import { getCustomWordsByLanguage } from '../../utils/dictionaryManager';
import WordCard from '../../components/WordCard';
import { addToFavorites } from '../../utils/favorites';

export default function DictionaryPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('korean');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(10);

  const languages = [
    { code: 'korean', label: '한국어', flag: '🇰🇷' },
    { code: 'japanese', label: '일본어', flag: '🇯🇵' },
    { code: 'english', label: '영어 (오늘의 단어)', flag: '🇺🇸' }
  ];

  const getAllWords = (language) => {
    switch (language) {
      case 'korean':
        const koreanWords = Object.values(koreanDictionary);
        const customKoreanWords = Object.values(getCustomWordsByLanguage('korean'));
        return [...koreanWords, ...customKoreanWords];
      case 'japanese':
        const japaneseWords = Object.values(japaneseDictionary);
        const customJapaneseWords = Object.values(getCustomWordsByLanguage('japanese'));
        return [...japaneseWords, ...customJapaneseWords];
      case 'english':
        return wordOfTheDayData.english || [];
      default:
        return [];
    }
  };

  const allWords = getAllWords(selectedLanguage);
  
  // 검색어로 필터링
  const filteredWords = allWords.filter(word => 
    word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (word.definition && word.definition.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (word.meaning && word.meaning.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 페이지네이션
  const totalPages = Math.ceil(filteredWords.length / wordsPerPage);
  const startIndex = (currentPage - 1) * wordsPerPage;
  const currentWords = filteredWords.slice(startIndex, startIndex + wordsPerPage);

  // 언어 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm('');
  }, [selectedLanguage]);

  const handleAddToFavorites = (word) => {
    const success = addToFavorites(word, selectedLanguage);
    if (success) {
      alert('즐겨찾기에 추가되었습니다!');
    } else {
      alert('이미 즐겨찾기에 있는 단어입니다.');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            단어 사전 📖
          </h1>
          <p className="text-gray-600">
            모든 단어를 언어별로 탐색하고 학습하세요
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* 언어 선택 */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    selectedLanguage === lang.code
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 검색 */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="단어 또는 뜻으로 검색..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          {/* 통계 정보 */}
          <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
            <span>
              총 {allWords.length}개 단어
              {searchTerm && ` 중 ${filteredWords.length}개 검색됨`}
            </span>
            <span>
              페이지 {currentPage} / {totalPages}
            </span>
          </div>
        </div>

        {/* 단어 목록 */}
        {currentWords.length > 0 ? (
          <div className="space-y-4 mb-8">
            {currentWords.map((word, index) => (
              <div key={`${word.word}-${index}`}>
                                 <WordCard
                   word={word}
                   language={selectedLanguage}
                   showFavoriteButton={true}
                   onAddToFavorites={() => handleAddToFavorites(word)}
                 />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600">
              다른 검색어를 시도해보세요.
            </p>
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              이전
            </button>
            
            {/* 페이지 번호들 */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    currentPage === page
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 