'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CSRPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  // 전체 포스트 로드 (초기 로딩)
  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const allPosts = await response.json();
        setResults(allPosts);
      } catch (error) {
        console.error('초기 데이터 로딩 실패:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllPosts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      // 검색어가 없으면 전체 포스트 다시 로드
      setLoading(true);
      setHasSearched(false);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const allPosts = await response.json();
        setResults(allPosts);
      } catch (error) {
        console.error('전체 데이터 로딩 실패:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const allPosts = await response.json();
      
      // 검색어로 제목 필터링
      const filteredPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setResults(filteredPosts);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4"
          >
            ← 홈으로 돌아가기
          </Link>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">⚡</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">CSR 검색</h1>
                <p className="text-gray-600">Client-Side Rendering으로 포스트를 검색해보세요</p>
              </div>
            </div>
            
            {/* 검색 폼 */}
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어를 입력하세요... (예: qui, est, sunt)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? '검색 중...' : '검색'}
              </button>
              {hasSearched && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setHasSearched(false);
                    setLoading(true);
                    // 전체 데이터 다시 로드
                    fetch('https://jsonplaceholder.typicode.com/posts')
                      .then(response => response.json())
                      .then(allPosts => setResults(allPosts))
                      .catch(error => {
                        console.error('전체 데이터 로딩 실패:', error);
                        setResults([]);
                      })
                      .finally(() => setLoading(false));
                  }}
                  disabled={loading}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  초기화
                </button>
              )}
            </form>
          </div>
        </div>

        {/* 로딩 상태 */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
            <p className="text-sm text-gray-500 mt-2">클라이언트에서 데이터를 불러오는 중입니다</p>
          </div>
        )}

        {/* 검색 결과 또는 전체 포스트 */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {hasSearched ? `검색 결과 (${results.length}개)` : `전체 포스트 (${results.length}개)`}
            </h2>
            <p className="text-sm text-purple-600 mb-6">
              {hasSearched 
                ? '클라이언트에서 동적으로 필터링된 결과입니다' 
                : '클라이언트에서 동적으로 로드된 전체 포스트입니다'
              }
            </p>
            
            {results.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {results.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {post.body}
                        </p>
                      </div>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        ID: {post.id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : hasSearched ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-600">
                  다른 검색어로 시도해보세요. 예: "qui", "est", "sunt"
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  데이터를 불러올 수 없습니다
                </h3>
                <p className="text-gray-600">
                  잠시 후 다시 시도해주세요
                </p>
              </div>
            )}
          </div>
        )}

        {/* CSR 특징 설명 */}
        <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🔧 CSR 특징
          </h3>
          <ul className="text-gray-700 space-y-2">
            <li>• 브라우저에서 JavaScript로 데이터를 가져옵니다</li>
            <li>• useState와 이벤트 핸들러를 사용해 상태를 관리합니다</li>
            <li>• 로딩 상태를 직접 관리해야 합니다</li>
            <li>• 사용자와의 상호작용이 즉시 반영됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 