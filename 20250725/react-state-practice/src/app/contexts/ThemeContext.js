"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// ThemeContext 생성
const ThemeContext = createContext();

// ThemeProvider 컴포넌트
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 테마 설정 함수 (공식 문서 방식)
  const applyTheme = (newTheme) => {
    console.log('🎨 Applying theme:', newTheme);
    
    const htmlElement = document.documentElement;
    
    // 기존 클래스 제거
    htmlElement.classList.remove('dark', 'light');
    
    let shouldBeDark = false;
    
    if (newTheme === 'dark') {
      shouldBeDark = true;
    } else if (newTheme === 'light') {
      shouldBeDark = false;
    } else if (newTheme === 'system') {
      // 시스템 테마 확인
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // 공식 문서에 따른 클래스 적용
    htmlElement.classList.toggle('dark', shouldBeDark);
    
    setIsDarkMode(shouldBeDark);
    
    // localStorage에 저장
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.theme = newTheme;
    }
    
    console.log('📋 Applied dark mode:', shouldBeDark);
    console.log('📋 HTML classes:', htmlElement.className);
  };

  // 초기 테마 설정
  useEffect(() => {
    // 공식 문서의 권장 방법
    const savedTheme = localStorage.getItem('theme');
    let initialTheme = 'system';
    
    if (savedTheme === 'dark' || savedTheme === 'light') {
      initialTheme = savedTheme;
    }
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
    
    // 시스템 테마 변경 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // 테마 토글 함수
  const toggleTheme = () => {
    console.log('🔄 Toggle theme clicked, current:', theme);
    
    let newTheme;
    if (theme === 'light') {
      newTheme = 'dark';
    } else if (theme === 'dark') {
      newTheme = 'system';
    } else {
      newTheme = 'light';
    }
    
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // 특정 테마로 설정하는 함수
  const setSpecificTheme = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
    setTheme: setSpecificTheme,
    isSystem: theme === 'system'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// useTheme 커스텀 훅
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// 테마 관련 유틸리티 함수들
export const themeUtils = {
  // 다크모드에 따른 클래스 반환
  getThemeClass: (lightClass, darkClass) => {
    return `${lightClass} dark:${darkClass}`;
  },
  
  // 배경 색상 클래스
  getBgClass: () => "bg-gray-50 dark:bg-gray-900",
  
  // 텍스트 색상 클래스
  getTextClass: () => "text-gray-800 dark:text-gray-200",
  
  // 카드 배경 클래스
  getCardClass: () => "bg-white dark:bg-gray-800",
  
  // 보더 클래스
  getBorderClass: () => "border-gray-200 dark:border-gray-700",
  
  // 입력 필드 클래스
  getInputClass: () => "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
}; 