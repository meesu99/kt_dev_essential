'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, children }) => {
    const isActive = pathname === href;
    return (
      <Link 
        href={href}
        className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
          isActive 
            ? 'bg-primary text-white shadow-md' 
            : 'text-primary hover:bg-blue-50 hover:text-blue-700'
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold text-primary hover:text-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <span className="animate-pulse">🌟</span>
          My Profile
        </Link>
        
        <nav className="hidden md:flex space-x-1">
          <NavLink href="/">홈</NavLink>
          <NavLink href="/about">소개</NavLink>
          <NavLink href="/favorites">좋아하는 것</NavLink>
          <NavLink href="/contact">연락처</NavLink>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
} 