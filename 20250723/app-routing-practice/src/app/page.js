'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [helloData, setHelloData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // 다크모드 초기화 및 로컬스토리지 로드
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // 시스템 설정 확인
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 외부 API에서 posts 가져오기
        const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!postsRes.ok) {
          throw new Error('Posts 데이터를 가져오는데 실패했습니다');
        }
        const postsData = await postsRes.json();
        setPosts(postsData.slice(0, 50)); // API에서 50개 받아오기
        
        // 로컬 API에서 hello 데이터 가져오기
        const helloRes = await fetch('/api/hello');
        if (!helloRes.ok) {
          throw new Error('Hello API 호출에 실패했습니다');
        }
        const helloApiData = await helloRes.json();
        console.log('Hello API 응답:', helloApiData);
        setHelloData(helloApiData);
        
      } catch (err) {
        console.error('에러 발생:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-500'} mx-auto mb-4`}></div>
          <div className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>데이터 로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-xl text-red-500">에러: {error}</div>
          <button
            onClick={toggleDarkMode}
            className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
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
            🚀 Async/Await 예제
          </h1>
          <div className="flex gap-4 items-center">
            <a
              href="/products"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } shadow-lg`}
            >
              🛍️ 상품 보기
            </a>
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

        {/* Hello API 결과 섹션 */}
        {helloData && (
          <div className={`mb-8 rounded-lg p-6 text-white transition-all duration-300 ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600'
          }`}>
            <h2 className="text-2xl font-bold mb-4">📡 로컬 API 응답</h2>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="text-lg mb-2">{helloData.message}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/20 rounded p-3 hover:bg-white/30 transition-colors">
                  <div className="text-sm opacity-75">영어</div>
                  <div className="font-semibold">{helloData.data.greeting}</div>
                </div>
                <div className="bg-white/20 rounded p-3 hover:bg-white/30 transition-colors">
                  <div className="text-sm opacity-75">한국어</div>
                  <div className="font-semibold">{helloData.data.korean}</div>
                </div>
                <div className="bg-white/20 rounded p-3 hover:bg-white/30 transition-colors">
                  <div className="text-sm opacity-75">랜덤 숫자</div>
                  <div className="font-semibold">{helloData.data.random}</div>
                </div>
              </div>
              <div className="text-xs opacity-75 mt-3">
                응답 시간: {new Date(helloData.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        )}
        
        {/* Posts 섹션 */}
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            📝 외부 API Posts (상위 25개)
          </h2>
          <div className="grid gap-4">
            {posts.slice(0, 25).map(post => (
              <div key={post.id} className={`rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 ${
                darkMode 
                  ? 'bg-gray-800 border-purple-500 hover:bg-gray-750' 
                  : 'bg-white border-blue-500 hover:bg-gray-50'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    darkMode 
                      ? 'bg-purple-900 text-purple-200' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    Post #{post.id}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    darkMode 
                      ? 'text-gray-300 bg-gray-700' 
                      : 'text-gray-500 bg-gray-100'
                  }`}>
                    👤 User {post.userId}
                  </span>
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 leading-tight ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {post.title}
                </h3>
                
                <p className={`leading-relaxed text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        
                  <div className={`text-center rounded-lg p-4 shadow-sm transition-colors duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              ✨ <strong>Async/Await</strong> 패턴으로 두 개의 API를 순차적으로 호출했습니다!
            </div>
            <div className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              콘솔에서 Hello API 응답을 확인해보세요 🔍
            </div>
            <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              📊 API에서 {posts.length}개 받아와서 25개 표시 | {darkMode ? '🌙 다크모드' : '🌞 라이트모드'} 활성화됨
            </div>
          </div>
      </div>
    </div>
  );
}
