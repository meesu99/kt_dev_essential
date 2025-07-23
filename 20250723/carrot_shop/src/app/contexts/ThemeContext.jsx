'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 저장된 테마 설정 불러오기
  useEffect(() => {
    try {
      // 브라우저 환경에서만 실행
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        } else {
          setIsDarkMode(systemPrefersDark);
        }
      }
    } catch (error) {
      console.warn('테마 설정 불러오기 실패:', error);
      setIsDarkMode(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 테마 변경 시 localStorage에 저장하고 HTML에 class 적용
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try {
        const theme = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.warn('테마 설정 저장 실패:', error);
      }
    }
  }, [isDarkMode, isLoading]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value = {
    isDarkMode,
    toggleTheme,
    isLoading
  };

  // 로딩 중일 때는 테마가 깜빡이지 않도록 처리
  if (isLoading) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 