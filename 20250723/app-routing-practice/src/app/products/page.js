'use client';

import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', price: '' });
  const [isAdding, setIsAdding] = useState(false);

  // 다크모드 초기화
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // 다크모드 변경 시 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 상품 데이터 fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/products');
        
        // 상태코드와 헤더 정보 출력
        console.log('📊 API 응답 상태:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          url: response.url
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Products API 응답 데이터:', data);
        setProducts(data);
        
      } catch (err) {
        console.error('상품 데이터 fetch 에러:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 상품 추가 함수
  const addProduct = async (e) => {
    e.preventDefault();
    
    if (!newProduct.title.trim() || !newProduct.price) {
      alert('상품명과 가격을 모두 입력해주세요!');
      return;
    }

    try {
      setIsAdding(true);
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newProduct.title.trim(),
          price: parseInt(newProduct.price)
        })
      });

      // POST 응답 상태 정보 출력
      console.log('📝 POST API 응답 상태:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('상품 추가 결과:', result);
      
      alert(`✅ ${result.message}`);
      setNewProduct({ title: '', price: '' });
      
      // 상품 목록 새로고침
      const updatedResponse = await fetch('/api/products');
      const updatedData = await updatedResponse.json();
      setProducts(updatedData);
      
    } catch (err) {
      console.error('상품 추가 에러:', err);
      alert(`❌ 상품 추가 실패: ${err.message}`);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-500'} mx-auto mb-4`}></div>
          <div className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>상품 로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-xl text-red-500 mb-4">에러: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className={`px-4 py-2 rounded-lg transition-colors mr-4 ${
              darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            🔄 다시 시도
          </button>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            {darkMode ? '🌞 라이트 모드' : '🌙 다크 모드'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더와 다크모드 토글 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            🛍️ 상품 목록
          </h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => window.history.back()}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              } shadow-lg`}
            >
              ← 뒤로가기
            </button>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600 shadow-lg' 
                  : 'bg-white text-gray-800 hover:bg-gray-100 shadow-lg'
              }`}
            >
              {darkMode ? '🌞 라이트 모드' : '🌙 다크 모드'}
            </button>
          </div>
        </div>

        {/* 상품 추가 폼 */}
        <div className={`mb-8 rounded-lg p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            ➕ 새 상품 추가
          </h2>
          <form onSubmit={addProduct} className="flex gap-4">
            <input
              type="text"
              placeholder="상품명을 입력하세요"
              value={newProduct.title}
              onChange={(e) => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
              className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                  : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
            <input
              type="number"
              placeholder="가격"
              value={newProduct.price}
              onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
              className={`w-32 px-4 py-2 rounded-lg border transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                  : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
            <button
              type="submit"
              disabled={isAdding}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-600' 
                  : 'bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400'
              } disabled:cursor-not-allowed`}
            >
              {isAdding ? '추가 중...' : '➕ 추가'}
            </button>
          </form>
        </div>

        {/* 상품 목록 */}
        {products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map(product => (
              <div key={product.id} className={`rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    darkMode 
                      ? 'bg-blue-900 text-blue-200' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    ID #{product.id}
                  </span>
                  <span className="text-2xl">📦</span>
                </div>
                
                <h3 className={`text-xl font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {product.title}
                </h3>
                
                <div className={`text-2xl font-bold ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  {product.price.toLocaleString()}원
                </div>
                
                <button className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}>
                  🛒 장바구니 담기
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="text-6xl mb-4">📦</div>
            <div className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              상품이 없습니다
            </div>
          </div>
        )}

        {/* 하단 정보 */}
        <div className={`text-center mt-8 rounded-lg p-4 shadow-sm transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            ✨ <strong>/api/products</strong> API에서 가져온 상품 데이터
          </div>
          <div className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            총 {products.length}개의 상품이 있습니다 🛍️
          </div>
          <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            📊 GET: 200 OK, POST: 201 Created, Error: 400 Bad Request | {darkMode ? '🌙 다크모드' : '🌞 라이트모드'} 활성화됨
          </div>
          <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            콘솔에서 상세한 HTTP 상태코드와 헤더 정보를 확인하세요 🔍
          </div>
        </div>
      </div>
    </div>
  );
} 