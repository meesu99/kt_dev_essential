'use client';

import { useState, useEffect } from 'react';
import { isFavorite } from '../utils/favorites';

export default function WordCard({ 
  word, 
  language, 
  showFavoriteButton = false, 
  onAddToFavorites, 
  onRemoveFromFavorites
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsFavorited(isFavorite(word.word, language));
  }, [word.word, language]);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      onRemoveFromFavorites && onRemoveFromFavorites();
    } else {
      onAddToFavorites && onAddToFavorites();
    }
    // 상태 업데이트
    setIsFavorited(!isFavorited);
  };
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

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getLanguageIcon(language)}</span>
          <span className="text-sm text-gray-600">{getLanguageLabel(language)}</span>
        </div>
        
        {showFavoriteButton && isClient && (
          <button
            onClick={handleFavoriteToggle}
            className={`text-2xl transition-all duration-200 transform hover:scale-110 ${
              isFavorited 
                ? 'text-yellow-500 hover:text-yellow-600 drop-shadow-md' 
                : 'text-gray-300 hover:text-yellow-400'
            }`}
            title={isFavorited ? '즐겨찾기에서 제거' : '즐겨찾기에 추가'}
          >
            {isFavorited ? '⭐' : '☆'}
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{word.word}</h3>
          {word.pronunciation && (
            <p className="text-gray-600 text-sm">발음: {word.pronunciation}</p>
          )}
        </div>

        <div>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
            {word.partOfSpeech}
          </span>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-1">뜻:</h4>
          <p className="text-gray-700">{word.definition || word.meaning}</p>
        </div>

        {word.example && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">예문:</h4>
            <p className="text-gray-700 italic">"{word.example}"</p>
          </div>
        )}
      </div>
    </div>
  );
} 