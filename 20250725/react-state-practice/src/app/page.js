"use client";

import { useState, useReducer, useCallback } from "react";
import { useTheme, themeUtils } from "./contexts/ThemeContext";

// 상태 관리를 위한 reducer
const stateReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_COUNTER':
      return {
        ...state,
        counters: {
          ...state.counters,
          [action.id]: action.value
        }
      };
    case 'TOGGLE_SWITCH':
      return {
        ...state,
        toggles: {
          ...state.toggles,
          [action.id]: !state.toggles[action.id]
        }
      };
    case 'UPDATE_TEXT':
      return {
        ...state,
        texts: {
          ...state.texts,
          [action.id]: action.value
        }
      };
    case 'UPDATE_SLIDER':
      return {
        ...state,
        sliders: {
          ...state.sliders,
          [action.id]: action.value
        }
      };
    default:
      return state;
  }
};

export default function Home() {
  // ThemeContext 사용
  const { isDarkMode, toggleTheme, theme, isSystem } = useTheme();

  // 방법 1: 개별 useState로 상태 관리 (20개)
  const [individualStates, setIndividualStates] = useState(
    Array.from({ length: 20 }, (_, i) => ({ id: i, value: 0, active: false }))
  );

  // 방법 2: 객체로 상태 관리 (30개)
  const [objectStates, setObjectStates] = useState(
    Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => [
        `item_${i}`, 
        { counter: 0, text: `아이템 ${i}`, checked: false }
      ])
    )
  );

  // 방법 3: useReducer로 복잡한 상태 관리 (50개)
  const [complexState, dispatch] = useReducer(stateReducer, {
    counters: Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`counter_${i}`, 0])),
    toggles: Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`toggle_${i}`, false])),
    texts: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`text_${i}`, ''])),
    sliders: Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`slider_${i}`, 50]))
  });

  // 개별 상태 업데이트 함수들
  const updateIndividualState = useCallback((index, field, value) => {
    setIndividualStates(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    );
  }, []);

  const updateObjectState = useCallback((key, field, value) => {
    setObjectStates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  }, []);

  // 전체 상태 초기화
  const resetAllStates = () => {
    setIndividualStates(
      Array.from({ length: 20 }, (_, i) => ({ id: i, value: 0, active: false }))
    );
    setObjectStates(
      Object.fromEntries(
        Array.from({ length: 30 }, (_, i) => [
          `item_${i}`, 
          { counter: 0, text: `아이템 ${i}`, checked: false }
        ])
      )
    );
    dispatch({ type: 'RESET_ALL' });
  };

  // 통계 계산
  const getStatistics = () => {
    const individualTotal = individualStates.reduce((sum, item) => sum + item.value, 0);
    const objectTotal = Object.values(objectStates).reduce((sum, item) => sum + item.counter, 0);
    const complexTotal = Object.values(complexState.counters).reduce((sum, value) => sum + value, 0);
    
    return {
      totalStates: 100,
      individualTotal,
      objectTotal,
      complexTotal,
      grandTotal: individualTotal + objectTotal + complexTotal
    };
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className={`text-4xl font-bold ${themeUtils.getTextClass()}`}>
              React 상태 관리 예제 (100개 상태)
            </h1>
            
            {/* 다크모드 토글 버튼 */}
            <button
              onClick={toggleTheme}
              className={`
                relative inline-flex items-center justify-center w-14 h-8 
                rounded-full transition-all duration-300 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 focus:ring-blue-500
                ${isDarkMode 
                  ? 'bg-blue-600 shadow-lg shadow-blue-900/50' 
                  : 'bg-gray-300 shadow-md shadow-gray-400/50'
                }
              `}
              aria-label="다크모드 토글"
            >
              <span 
                className={`
                  absolute w-6 h-6 rounded-full shadow-md transform transition-all duration-300
                  flex items-center justify-center text-xs
                  ${isDarkMode 
                    ? 'translate-x-3 bg-gray-100 dark:bg-gray-200 text-gray-800' 
                    : '-translate-x-3 bg-white text-gray-700'
                  }
                `}
              >
                {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🔄'}
              </span>
            </button>
          </div>
          
          {/* 테마 상태 표시 */}
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
            isDarkMode 
              ? 'bg-blue-900 text-blue-200' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            현재 테마: {
              theme === 'light' ? '라이트 모드 ☀️' : 
              theme === 'dark' ? '다크 모드 🌙' : 
              `시스템 모드 🔄 (${isDarkMode ? '다크' : '라이트'})`
            }
          </div>

          <div className={`p-4 rounded-lg shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h2 className={`text-lg font-semibold mb-2 ${themeUtils.getTextClass()}`}>통계</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalStates}</div>
                <div className={themeUtils.getTextClass()}>총 상태 개수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.individualTotal}</div>
                <div className={themeUtils.getTextClass()}>개별 상태 합계</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.objectTotal}</div>
                <div className={themeUtils.getTextClass()}>객체 상태 합계</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.complexTotal}</div>
                <div className={themeUtils.getTextClass()}>복합 상태 합계</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.grandTotal}</div>
                <div className={themeUtils.getTextClass()}>전체 합계</div>
              </div>
            </div>
          </div>
          <button
            onClick={resetAllStates}
            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            모든 상태 초기화
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 섹션 1: 개별 useState (20개) */}
          <div className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400">
              개별 useState (20개)
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {individualStates.map((item, index) => (
                <div key={index} className={`border p-3 rounded-md transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${themeUtils.getTextClass()}`}>상태 {index + 1}</span>
                    <label className={`flex items-center ${themeUtils.getTextClass()}`}>
                      <input
                        type="checkbox"
                        checked={item.active}
                        onChange={(e) => updateIndividualState(index, 'active', e.target.checked)}
                        className="mr-2 rounded w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      활성
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateIndividualState(index, 'value', item.value - 1)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className={`min-w-[50px] text-center font-mono ${themeUtils.getTextClass()}`}>{item.value}</span>
                    <button
                      onClick={() => updateIndividualState(index, 'value', item.value + 1)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 섹션 2: 객체 상태 (30개) */}
          <div className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-400">
              객체 상태 관리 (30개)
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {Object.entries(objectStates).map(([key, item]) => (
                <div key={key} className={`border p-3 rounded-md transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => updateObjectState(key, 'text', e.target.value)}
                      className="flex-1 p-2 text-sm mr-2 transition-colors duration-200 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent"
                    />
                    <label className={`flex items-center ${themeUtils.getTextClass()}`}>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => updateObjectState(key, 'checked', e.target.checked)}
                        className="mr-2 rounded w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      체크
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateObjectState(key, 'counter', item.counter - 1)}
                      className="px-3 py-1 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className={`min-w-[50px] text-center font-mono ${themeUtils.getTextClass()}`}>{item.counter}</span>
                    <button
                      onClick={() => updateObjectState(key, 'counter', item.counter + 1)}
                      className="px-3 py-1 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 섹션 3: useReducer 복잡한 상태 (50개) */}
          <div className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h3 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-400">
              useReducer 복합 상태 (50개)
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* 카운터들 (20개) */}
              <div>
                <h4 className={`font-medium mb-2 ${themeUtils.getTextClass()}`}>카운터 (20개)</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(complexState.counters).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-1">
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_COUNTER', id: key, value: value - 1 })}
                        className="px-2 py-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded text-xs transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className={`min-w-[30px] text-center text-sm font-mono ${themeUtils.getTextClass()}`}>{value}</span>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_COUNTER', id: key, value: value + 1 })}
                        className="px-2 py-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded text-xs transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 토글들 (15개) */}
              <div>
                <h4 className={`font-medium mb-2 ${themeUtils.getTextClass()}`}>토글 (15개)</h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(complexState.toggles).map(([key, value]) => (
                    <label key={key} className={`flex items-center text-sm ${themeUtils.getTextClass()}`}>
                                              <input
                          type="checkbox"
                          checked={value}
                          onChange={() => dispatch({ type: 'TOGGLE_SWITCH', id: key })}
                          className="mr-1 rounded w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      {key.split('_')[1]}
                    </label>
                  ))}
                </div>
              </div>

              {/* 텍스트 입력들 (10개) */}
              <div>
                <h4 className={`font-medium mb-2 ${themeUtils.getTextClass()}`}>텍스트 입력 (10개)</h4>
                <div className="space-y-2">
                  {Object.entries(complexState.texts).map(([key, value]) => (
                    <input
                      key={key}
                      type="text"
                      value={value}
                      onChange={(e) => dispatch({ type: 'UPDATE_TEXT', id: key, value: e.target.value })}
                      placeholder={`텍스트 ${key.split('_')[1]}`}
                      className="w-full p-3 text-sm transition-colors duration-200 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-600 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  ))}
                </div>
              </div>

              {/* 슬라이더들 (5개) */}
              <div>
                <h4 className={`font-medium mb-2 ${themeUtils.getTextClass()}`}>슬라이더 (5개)</h4>
                <div className="space-y-2">
                  {Object.entries(complexState.sliders).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className={`text-sm min-w-[60px] ${themeUtils.getTextClass()}`}>{key.split('_')[1]}:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => dispatch({ type: 'UPDATE_SLIDER', id: key, value: parseInt(e.target.value) })}
                        className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500 dark:accent-red-400"
                      />
                      <span className={`text-sm min-w-[30px] font-mono ${themeUtils.getTextClass()}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className={`text-center mt-8 ${themeUtils.getTextClass()}`}>
          <p>총 100개의 상태를 다양한 방법으로 관리하는 예제입니다.</p>
          <p className="text-sm mt-2 opacity-75">
            개별 useState (20개) + 객체 상태 (30개) + useReducer 복합 상태 (50개) = 100개
          </p>
          <p className="text-xs mt-2 opacity-60">
            🌙 Context API로 전역 다크모드 상태 관리 중
          </p>
        </footer>
      </div>
    </div>
  );
}
