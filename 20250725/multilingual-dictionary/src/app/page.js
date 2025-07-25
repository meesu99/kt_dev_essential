'use client';

import DictionarySearch from '../components/DictionarySearch';
import WordOfTheDay from '../components/WordOfTheDay';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            다언어 사전 📚
          </h1>
          <p className="text-gray-600 text-lg">
            영어, 한국어, 일본어 단어를 검색하고 학습하세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽: 오늘의 단어 */}
          <div>
            <WordOfTheDay />
          </div>

          {/* 오른쪽: 사전 검색 */}
          <div>
            <DictionarySearch />
          </div>
        </div>

        {/* 기능 소개 섹션 */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            주요 기능
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold text-gray-800 mb-2">사전 검색</h3>
              <p className="text-gray-600 text-sm">
                영어, 한국어, 일본어 단어의 뜻과 예문을 검색할 수 있습니다.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="font-bold text-gray-800 mb-2">오늘의 단어</h3>
              <p className="text-gray-600 text-sm">
                매일 새로운 단어를 학습하고 어휘력을 늘려보세요.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold text-gray-800 mb-2">즐겨찾기</h3>
              <p className="text-gray-600 text-sm">
                중요한 단어들을 저장하고 언제든지 다시 볼 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
