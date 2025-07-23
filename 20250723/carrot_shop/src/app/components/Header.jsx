'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🥕</span>
            </div>
            <span className="text-xl font-bold text-gray-900">당근마켓</span>
          </Link>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              홈
            </Link>
            <Link 
              href="/products" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/products') 
                  ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              중고거래
            </Link>
            <Link 
              href="/chat" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/chat') 
                  ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              채팅
            </Link>
            <Link 
              href="/my" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/my') 
                  ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                  : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              나의 당근
            </Link>
          </nav>

          {/* 검색창 */}
          <div className="hidden sm:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="물품이나 동네를 검색해보세요"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 우측 버튼들 */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
              </svg>
            </button>
            
            <button className="hidden sm:block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium">
              글쓰기
            </button>

            <button className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button className="md:hidden text-gray-600 hover:text-orange-500 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 h-16">
          <Link 
            href="/" 
            className={`flex flex-col items-center justify-center text-xs ${
              isActive('/') ? 'text-orange-500' : 'text-gray-600'
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
              isActive('/products') ? 'text-orange-500' : 'text-gray-600'
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
              isActive('/chat') ? 'text-orange-500' : 'text-gray-600'
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
              isActive('/my') ? 'text-orange-500' : 'text-gray-600'
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