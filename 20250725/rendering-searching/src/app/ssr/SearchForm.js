'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm({ defaultValue = '' }) {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // URL 파라미터로 검색어 전달
    router.push(`/ssr?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleClear = () => {
    setSearchTerm('');
    router.push('/ssr');
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요... (예: qui, est, sunt)"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
      >
        검색
      </button>
      {defaultValue && (
        <button
          type="button"
          onClick={handleClear}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
        >
          초기화
        </button>
      )}
    </form>
  );
} 