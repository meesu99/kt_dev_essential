'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clearAuthCookies, getCookie } from '@/utils/auth';

export default function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // 쿠키 삭제
    clearAuthCookies();
    setLoggedOut(true);

    // 5초 카운트다운 후 홈으로 이동
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleImmediateRedirect = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        
        {/* 로그아웃 완료 아이콘 */}
        <div className="text-6xl mb-6">👋</div>
        
        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          로그아웃 완료
        </h1>
        
        {/* 메시지 */}
        <p className="text-gray-600 mb-6">
          성공적으로 로그아웃되었습니다.<br/>
          모든 인증 정보가 삭제되었습니다.
        </p>

        {/* 카운트다운 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 font-semibold">
            {countdown}초 후 홈페이지로 자동 이동합니다
          </p>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(6 - countdown) * 20}%` }}
            ></div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <button
            onClick={handleImmediateRedirect}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            지금 홈으로 이동
          </button>
          
          <div className="flex space-x-4">
            <Link
              href="/login"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors text-center"
            >
              다시 로그인
            </Link>
            <Link
              href="/products"
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors text-center"
            >
              상품 목록
            </Link>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            🔒 보안 정보
          </h3>
          <ul className="text-xs text-gray-600 space-y-1 text-left">
            <li>• 인증 쿠키가 완전히 삭제되었습니다</li>
            <li>• 보호된 페이지에 접근하려면 다시 로그인하세요</li>
            <li>• 브라우저를 완전히 닫는 것을 권장합니다</li>
          </ul>
        </div>

        {/* 디버그 정보 (개발용) */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-left">
          <h4 className="font-semibold text-yellow-800 mb-1">🛠️ 디버그 정보</h4>
          <p className="text-yellow-700">
            Auth Cookie: {getCookie('auth') || '삭제됨'}<br/>
            Expiration Cookie: {getCookie('authExpiration') || '삭제됨'}
          </p>
        </div>

      </div>
    </div>
  );
} 