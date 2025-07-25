'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Protected() {
  const [userInfo, setUserInfo] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // 쿠키에서 인증 정보 확인 (클라이언트 사이드에서도 확인)
    const authCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth='));
    
    if (authCookie) {
      setUserInfo({
        authenticated: true,
        loginTime: new Date().toLocaleString('ko-KR'),
        cookieValue: authCookie.split('=')[1]
      });
    }

    // 현재 시간 업데이트
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // 쿠키 삭제
    document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    alert('로그아웃되었습니다.');
    window.location.href = '/login';
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-green-900">🔒 보호된 페이지</h1>
            <div className="flex space-x-4">
              <Link
                href="/products"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                상품 목록으로
              </Link>
              <Link
                href="/add-product"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                상품 등록
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* 환영 메시지 */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                축하합니다! 보호된 페이지에 성공적으로 접근했습니다.
              </h2>
              <p className="text-gray-600">
                이 페이지는 로그인한 사용자만 볼 수 있습니다.
              </p>
            </div>
          </div>

          {/* 사용자 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🔐 인증 정보
              </h3>
              {userInfo ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">상태:</span>
                    <span className="text-green-600 font-semibold">✅ 인증됨</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">쿠키값:</span>
                    <span className="text-blue-600 font-mono text-sm">{userInfo.cookieValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">접근 시간:</span>
                    <span className="text-gray-800">{userInfo.loginTime}</span>
                  </div>
                </div>
              ) : (
                <p className="text-red-600">인증 정보를 불러올 수 없습니다.</p>
              )}
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ⏰ 현재 시간
              </h3>
              <div className="text-center">
                <div className="text-2xl font-mono text-blue-600 mb-2">
                  {currentTime.toLocaleTimeString('ko-KR')}
                </div>
                <div className="text-gray-600">
                  {currentTime.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 기능 설명 */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🛡️ 보안 기능 설명
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800 mb-2">미들웨어 보호</h4>
                <p className="text-blue-700 text-sm">
                  Next.js 미들웨어가 이 페이지에 대한 접근을 제어합니다. 
                  인증 쿠키가 없으면 자동으로 로그인 페이지로 리디렉션됩니다.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800 mb-2">쿠키 기반 인증</h4>
                <p className="text-green-700 text-sm">
                  브라우저 쿠키를 사용하여 사용자의 로그인 상태를 유지합니다. 
                  쿠키는 1시간 후 자동으로 만료됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🎮 테스트 액션
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={refreshPage}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                페이지 새로고침
              </button>
              <button
                onClick={() => {
                  const cookies = document.cookie.split(';').map(cookie => {
                    const [name, value] = cookie.trim().split('=');
                    return { name, value };
                  });
                  alert('현재 쿠키:\n' + JSON.stringify(cookies, null, 2));
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                쿠키 정보 확인
              </button>
              <button
                onClick={() => {
                  if (confirm('정말로 로그아웃하시겠습니까?')) {
                    handleLogout();
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                로그아웃 테스트
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
