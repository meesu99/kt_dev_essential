'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout, isAdmin } from '../utils/auth';
import LoginModal from './LoginModal';

export default function Navigation() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const navItems = [
    { href: '/', label: '홈', icon: '🏠' },
    { href: '/dictionary', label: '단어사전', icon: '📖' },
    { href: '/favorites', label: '즐겨찾기', icon: '⭐' },
    { href: '/quiz', label: '퀴즈', icon: '🧠' },
    ...(isAdmin() ? [{ href: '/admin', label: '관리자', icon: '⚙️' }] : [])
  ];

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <span className="text-xl font-bold text-gray-800">다언어 사전</span>
            </div>
            
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* 사용자 정보 및 로그인/로그아웃 */}
              {user ? (
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-sm text-gray-600">
                    {user.name} 님
                    {user.role === 'admin' && (
                      <span className="ml-1 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        관리자
                      </span>
                    )}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors ml-4"
                >
                  🔑 로그인
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
} 