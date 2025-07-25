'use client';

import { useState } from 'react';
import { searchWord } from '../utils/dictionary';
import { addToFavorites, isFavorite } from '../utils/favorites';
import WordCard from './WordCard';

export default function DictionarySearch() {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { code: 'english', label: '영어', flag: '🇺🇸' },
    { code: 'korean', label: '한국어', flag: '🇰🇷' },
    { code: 'japanese', label: '일본어', flag: '🇯🇵' }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const result = await searchWord(searchTerm.trim(), selectedLanguage);
      if (result) {
        setSearchResult(result);
      } else {
        setError('단어를 찾을 수 없습니다.');
      }
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToFavorites = () => {
    if (searchResult) {
      const success = addToFavorites(searchResult, selectedLanguage);
      if (success) {
        alert('즐겨찾기에 추가되었습니다!');
      } else {
        alert('이미 즐겨찾기에 있는 단어입니다.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">사전 검색</h2>
      
      {/* 언어 선택 */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
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

      {/* 검색 폼 */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색할 단어를 입력하세요..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '검색 중...' : '검색'}
          </button>
        </div>
      </form>

      {/* 에러 메시지 */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* 검색 결과 */}
      {searchResult && (
        <WordCard 
          word={searchResult} 
          language={selectedLanguage}
          showFavoriteButton={true}
          onAddToFavorites={handleAddToFavorites}
          isFavorited={isFavorite(searchResult.word, selectedLanguage)}
        />
      )}
    </div>
  );
} 