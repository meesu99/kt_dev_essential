'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [helloData, setHelloData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setPosts(postsData.slice(0, 5)); // 처음 5개만 표시
        
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">데이터 로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-xl text-red-500">에러: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🚀 Async/Await 예제
        </h1>

        {/* Hello API 결과 섹션 */}
        {helloData && (
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">📡 로컬 API 응답</h2>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <p className="text-lg mb-2">{helloData.message}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/20 rounded p-3">
                  <div className="text-sm opacity-75">영어</div>
                  <div className="font-semibold">{helloData.data.greeting}</div>
                </div>
                <div className="bg-white/20 rounded p-3">
                  <div className="text-sm opacity-75">한국어</div>
                  <div className="font-semibold">{helloData.data.korean}</div>
                </div>
                <div className="bg-white/20 rounded p-3">
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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">📝 외부 API Posts (상위 5개)</h2>
          <div className="grid gap-4">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Post #{post.id}
                  </span>
                  <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                    👤 User {post.userId}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center bg-white rounded-lg p-4 shadow-sm">
          <div className="text-gray-600">
            ✨ <strong>Async/Await</strong> 패턴으로 두 개의 API를 순차적으로 호출했습니다!
          </div>
          <div className="text-sm text-gray-500 mt-2">
            콘솔에서 Hello API 응답을 확인해보세요 🔍
          </div>
        </div>
      </div>
    </div>
  );
}
