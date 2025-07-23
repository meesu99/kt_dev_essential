'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (!res.ok) {
          throw new Error('데이터를 가져오는데 실패했습니다');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">에러: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          📝 Posts 게시판
        </h1>
        
        <div className="grid gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Post #{post.id}
                </span>
                <span className="text-gray-500 text-sm">
                  User {post.userId}
                </span>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
                {post.title}
              </h2>
              
              <p className="text-gray-600 leading-relaxed">
                {post.body}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 text-gray-500">
          총 {posts.length}개의 게시글
        </div>
      </div>
    </div>
  );
}
