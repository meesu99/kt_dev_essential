"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 외부 API 호출 함수
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // JSONPlaceholder API 사용 (무료 테스트 API)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        
        if (!response.ok) {
          throw new Error('API 호출에 실패했습니다.');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
      fetchPosts();
  }, []);

  // 에러가 발생했을 때 표시할 컴포넌트
  if (error) {
    return (
      <div className="font-sans min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg font-medium">오류가 발생했습니다: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
            CSR 실습 - API 데이터 목록
          </h2>
          
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {post.body}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Post ID: {post.id} | User ID: {post.userId}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            onClick={() => window.location.reload()}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            다시 로드하기
          </button>
          
          <a
            href="/ssr"
            className="rounded-full bg-purple-500 hover:bg-purple-600 text-white transition-colors flex items-center justify-center font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            SSR 실습 페이지 →
          </a>
        </div>
      </main>
    </div>
  );
}
