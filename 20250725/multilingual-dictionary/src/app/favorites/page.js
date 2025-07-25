'use client';

import FavoritesList from '../../components/FavoritesList';

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            즐겨찾기 ⭐
          </h1>
          <p className="text-gray-600">
            저장한 단어들을 확인하고 복습하세요
          </p>
        </div>

        <FavoritesList />
      </div>
    </div>
  );
} 