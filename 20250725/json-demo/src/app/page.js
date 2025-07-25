'use client';

import { useState } from "react";

export default function JsonDemo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });

  // 로그 추가 함수
  const addLog = (message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, data, timestamp }]);
  };

  // JSON 데이터 가져오기 (fetch 실습)
  const fetchProducts = async () => {
    setLoading(true);
    addLog("🚀 API 호출 시작: /api/products");
    
    try {
      const response = await fetch('/api/products');
      addLog("📡 서버 응답 받음", `Status: ${response.status}`);
      
      // JSON을 JavaScript 객체로 변환
      const result = await response.json();
      addLog("🔄 JSON → JS 객체 변환 완료", result);
      
      setProducts(result.data);
      addLog("✅ 상품 데이터 설정 완료", `${result.data.length}개 상품`);
      
    } catch (error) {
      addLog("❌ 에러 발생", error.message);
    } finally {
      setLoading(false);
    }
  };

  // 새 상품 추가
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      addLog("⚠️ 필수 정보가 누락되었습니다");
      return;
    }

    try {
      addLog("📝 새 상품 추가 요청", newProduct);
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseInt(newProduct.price),
          inStock: true
        })
      });

      const result = await response.json();
      addLog("✅ 상품 추가 완료", result);
      
      // 목록 새로고침
      fetchProducts();
      
      // 폼 초기화
      setNewProduct({
        name: '',
        price: '',
        category: '',
        description: ''
      });
      
    } catch (error) {
      addLog("❌ 상품 추가 실패", error.message);
    }
  };

  // JSON.stringify와 JSON.parse 테스트
  const testJsonMethods = () => {
    addLog("🧪 JSON 메서드 테스트 시작");
    
    // 1. JavaScript 객체 생성
    const testObject = {
      user: "김개발",
      age: 28,
      skills: ["JavaScript", "React", "Next.js"],
      active: true,
      joinDate: new Date().toISOString()
    };
    addLog("📦 원본 JS 객체", testObject);

    // 2. JSON.stringify() - JS 객체를 JSON 문자열로 변환
    const jsonString = JSON.stringify(testObject);
    addLog("🔄 JSON.stringify() 결과", `타입: ${typeof jsonString}, 내용: ${jsonString}`);

    // 3. JSON.parse() - JSON 문자열을 JS 객체로 변환
    const parsedObject = JSON.parse(jsonString);
    addLog("🔄 JSON.parse() 결과", parsedObject);

    // 4. 깊은 비교 테스트
    const isEqual = JSON.stringify(testObject) === JSON.stringify(parsedObject);
    addLog("🔍 변환 전후 비교", `동일함: ${isEqual}`);

    // 5. 다양한 데이터 타입 테스트
    const complexData = {
      string: "문자열",
      number: 42,
      boolean: true,
      array: [1, 2, 3],
      object: { nested: "중첩 객체" },
      nullValue: null,
      undefinedValue: undefined, // JSON에서는 제거됨
      dateValue: new Date(), // 문자열로 변환됨
      functionValue: () => {} // JSON에서는 제거됨
    };
    addLog("🧪 복잡한 데이터 타입 테스트", complexData);
    
    const complexJson = JSON.stringify(complexData);
    addLog("🔄 복잡한 데이터 JSON화", complexJson);
    
    const complexParsed = JSON.parse(complexJson);
    addLog("🔄 복잡한 데이터 파싱", complexParsed);
  };

  // 로그 클리어
  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON 응답 처리 실습</h1>
          <p className="text-gray-600 mb-6">fetch(), JSON.stringify(), JSON.parse() 동작 원리를 학습해보세요!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium"
            >
              {loading ? "로딩 중..." : "📡 상품 목록 가져오기"}
            </button>
            
            <button
              onClick={testJsonMethods}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              🧪 JSON 메서드 테스트
            </button>
            
            <button
              onClick={clearLogs}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              🗑️ 로그 클리어
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 상품 목록 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📦 상품 목록</h2>
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-8">상품 목록을 불러오려면 "상품 목록 가져오기" 버튼을 클릭하세요.</p>
            ) : (
              <div className="space-y-3">
                {products.map(product => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? '재고 있음' : '품절'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-medium">
                        {product.price.toLocaleString()}원
                      </span>
                      <span className="text-gray-500 text-xs">{product.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* 새 상품 추가 폼 */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">➕ 새 상품 추가</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="상품명"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="가격"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="카테고리"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="설명"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addProduct}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  상품 추가하기
                </button>
              </div>
            </div>
          </div>

          {/* 실행 로그 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📋 실행 로그</h2>
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500">로그가 여기에 표시됩니다...</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-2">
                    <div className="text-blue-400">[{log.timestamp}]</div>
                    <div className="text-yellow-400">{log.message}</div>
                    {log.data && (
                      <div className="text-green-300 ml-4 whitespace-pre-wrap">
                        {typeof log.data === 'string' 
                          ? log.data 
                          : JSON.stringify(log.data, null, 2)
                        }
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 학습 가이드 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📚 학습 가이드</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">1. fetch() API</h3>
              <p className="text-sm text-gray-600">
                서버에서 JSON 데이터를 비동기적으로 가져오는 방법을 학습합니다.
                response.json()으로 JSON을 JavaScript 객체로 변환합니다.
              </p>
            </div>
            <div className="border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">2. JSON.stringify()</h3>
              <p className="text-sm text-gray-600">
                JavaScript 객체를 JSON 문자열로 변환합니다.
                서버로 데이터를 전송할 때 주로 사용됩니다.
              </p>
            </div>
            <div className="border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">3. JSON.parse()</h3>
              <p className="text-sm text-gray-600">
                JSON 문자열을 JavaScript 객체로 변환합니다.
                서버에서 받은 JSON 응답을 처리할 때 사용됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
