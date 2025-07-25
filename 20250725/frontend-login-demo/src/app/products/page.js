'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isAuthenticated, logout, getRemainingTime } from '@/utils/auth';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // JSONPlaceholder API를 사용하여 상품 목록 조회
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // 처음 10개 항목만 표시
        setProducts(data.slice(0, 10));
      } catch (err) {
        setError('상품 목록을 불러오는데 실패했습니다: ' + err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 인증 상태 및 만료 시간 체크
  useEffect(() => {
    // 초기 인증 체크
    if (!isAuthenticated()) {
      logout('/login');
      return;
    }

    // 남은 시간 업데이트
    const updateRemainingTime = () => {
      const timeInfo = getRemainingTime();
      if (!timeInfo) {
        // 시간이 만료되었거나 쿠키가 없는 경우
        logout('/login');
        return;
      }
      setRemainingTime(timeInfo);
    };

    // 초기 시간 설정
    updateRemainingTime();

    // 1초마다 남은 시간 업데이트
    const timer = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout('/login');
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm(`상품 #${productId}를 정말로 삭제하시겠습니까?`)) {
      return;
    }

    try {
      // DELETE API 요청
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 성공 시 상품 목록에서 제거
      setProducts(prevProducts => 
        prevProducts.filter(product => product.id !== productId)
      );

      alert(`상품 #${productId}가 성공적으로 삭제되었습니다!`);
      console.log('Delete successful for product ID:', productId);

    } catch (error) {
      alert(`상품 삭제에 실패했습니다: ${error.message}`);
      console.error('Delete error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-600">상품 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">상품 목록</h1>
              {remainingTime && (
                <p className="text-sm text-gray-600 mt-1">
                  ⏰ 로그인 만료까지: <span className="font-mono font-semibold text-orange-600">
                    {remainingTime.formatted}
                  </span>
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <Link
                href="/add-product"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                상품 등록
              </Link>
              <Link
                href="/protected"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                보호된 페이지
              </Link>
              <Link
                href="/logout"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                로그아웃 페이지
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                즉시 로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 상품 목록 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    상품 #{product.id}
                  </h3>
                  <h4 className="text-md font-semibold text-indigo-600 mb-3">
                    {product.title}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {product.body}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      사용자 ID: {product.userId}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        자세히 보기
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
