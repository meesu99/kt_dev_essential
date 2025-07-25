'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // 가짜 POST 요청 (JSONPlaceholder는 실제로 저장하지 않지만 응답은 받음)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setResult({
        success: true,
        message: '상품이 성공적으로 등록되었습니다!',
        data: data
      });

      // 폼 초기화
      setFormData({
        title: '',
        body: '',
        userId: 1
      });

    } catch (error) {
      setResult({
        success: false,
        message: '상품 등록에 실패했습니다: ' + error.message,
        data: null
      });
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">상품 등록</h1>
            <div className="flex space-x-4">
              <Link
                href="/products"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                상품 목록으로
              </Link>
              <Link
                href="/protected"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                보호된 페이지
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 상품명 */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    상품명
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="상품명을 입력하세요"
                  />
                </div>

                {/* 상품 설명 */}
                <div>
                  <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                    상품 설명
                  </label>
                  <textarea
                    name="body"
                    id="body"
                    rows={4}
                    required
                    value={formData.body}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="상품 설명을 입력하세요"
                  />
                </div>

                {/* 사용자 ID */}
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                    사용자 ID
                  </label>
                  <input
                    type="number"
                    name="userId"
                    id="userId"
                    min="1"
                    required
                    value={formData.userId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* 제출 버튼 */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {loading ? '등록 중...' : '상품 등록'}
                  </button>
                </div>
              </form>

              {/* 결과 표시 */}
              {result && (
                <div className={`mt-6 p-4 rounded-md ${
                  result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </p>
                  
                  {result.success && result.data && (
                    <div className="mt-3 p-3 bg-gray-50 rounded border">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">등록된 상품 정보:</h4>
                      <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
