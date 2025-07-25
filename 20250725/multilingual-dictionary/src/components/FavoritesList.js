'use client';

import { useState, useEffect } from 'react';
import { getFavorites, removeFromFavorites } from '../utils/favorites';
import WordCard from './WordCard';

export default function FavoritesList() {
  const [favorites, setFavorites] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [loading, setLoading] = useState(true);

  const languages = [
    { code: 'all', label: '전체', flag: '🌐' },
    { code: 'english', label: '영어', flag: '🇺🇸' },
    { code: 'korean', label: '한국어', flag: '🇰🇷' },
    { code: 'japanese', label: '일본어', flag: '🇯🇵' }
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setLoading(true);
    const favoriteWords = getFavorites();
    setFavorites(favoriteWords);
    setLoading(false);
  };

  const handleRemoveFromFavorites = (wordId) => {
    const success = removeFromFavorites(wordId);
    if (success) {
      loadFavorites(); // 목록 새로고침
      // 강제로 리렌더링을 위해 상태 업데이트
      setFavorites(prev => prev.filter(fav => fav.id !== wordId));
    }
  };

  const filteredFavorites = selectedLanguage === 'all' 
    ? favorites 
    : favorites.filter(fav => fav.language === selectedLanguage);

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500">
        즐겨찾기를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">⭐</span>
          즐겨찾기 ({favorites.length}개)
        </h2>
        
        {/* 언어 필터 */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedLanguage === lang.code
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
                {lang.code !== 'all' && (
                  <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {favorites.filter(fav => fav.language === lang.code).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-500 text-lg mb-2">
              {selectedLanguage === 'all' 
                ? '아직 즐겨찾기한 단어가 없습니다.' 
                : `${languages.find(l => l.code === selectedLanguage)?.label} 즐겨찾기가 없습니다.`}
            </p>
            <p className="text-gray-400 text-sm">
              사전에서 단어를 검색하고 ⭐ 버튼을 눌러 즐겨찾기에 추가해보세요!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFavorites.map((favorite) => (
              <div key={favorite.id} className="relative">
                <WordCard
                  word={favorite}
                  language={favorite.language}
                  showFavoriteButton={true}
                  onRemoveFromFavorites={() => handleRemoveFromFavorites(favorite.id)}
                />
                <div className="absolute top-2 right-12 text-xs text-gray-500">
                  추가일: {new Date(favorite.addedAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 