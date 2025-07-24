'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  // 컴포넌트 마운트 체크
  useEffect(() => {
    setMounted(true);
  }, []);

  // 안전하게 useTheme 호출
  let themeData = { isDarkMode: false, toggleTheme: () => {} };
  try {
    if (mounted) {
      themeData = useTheme();
    }
  } catch (error) {
    // ThemeProvider가 없을 때 기본값 사용
    console.warn('ThemeProvider not found, using default theme');
  }

  const { isDarkMode, toggleTheme } = themeData;

  const isActive = (path) => {
    return pathname === path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🥕</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">당근마켓</span>
          </Link>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-orange-500'
              }`}
            >
              홈
            </Link>
            <Link 
              href="/products" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/products') 
                  ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-orange-500'
              }`}
            >
              중고거래
            </Link>
            <Link 
              href="/chat" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/chat') 
                  ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-orange-500'
              }`}
            >
              채팅
            </Link>
            <Link 
              href="/my" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/my') 
                  ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-orange-500'
              }`}
            >
              나의 당근
            </Link>
          </nav>

          {/* 검색창 */}
          <div className="hidden sm:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="물품이나 동네를 검색해보세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700 transition-colors duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* 우측 버튼들 */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
              </svg>
            </button>
            
            {/* 다크모드 토글 버튼 */}
            {mounted && (
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                title={isDarkMode ? '라이트 모드로 변경' : '다크 모드로 변경'}
              >
                {isDarkMode ? (
                  // 라이트 모드 아이콘 (태양)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  // 다크 모드 아이콘 (달)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}
            
            <Link 
              href="/add-product"
              className="hidden sm:block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
            >
              글쓰기
            </Link>

            <button className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button className="md:hidden text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 transition-colors duration-300">
        <div className="grid grid-cols-4 h-16">
          <Link 
            href="/" 
            className={`flex flex-col items-center justify-center text-xs ${
              isActive('/') ? 'text-orange-500' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <svg className="w-6 h-6 mb-1" fill={isActive('/') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            홈
          </Link>
          
          <Link 
            href="/products" 
            className={`flex flex-col items-center justify-center text-xs ${
              isActive('/products') ? 'text-orange-500' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <svg className="w-6 h-6 mb-1" fill={isActive('/products') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            중고거래
          </Link>
          
          <Link 
            href="/chat" 
            className={`flex flex-col items-center justify-center text-xs ${
              isActive('/chat') ? 'text-orange-500' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <svg className="w-6 h-6 mb-1" fill={isActive('/chat') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            채팅
          </Link>
          
          <Link 
            href="/my" 
            className={`flex flex-col items-center justify-center text-xs ${
              isActive('/my') ? 'text-orange-500' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <svg className="w-6 h-6 mb-1" fill={isActive('/my') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            나의 당근
          </Link>
        </div>
      </div>
    </header>
  );
} 