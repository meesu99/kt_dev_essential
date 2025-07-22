'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 현재 로그인된 사용자 확인
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkUser()

    // 인증 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                ⚔️ 캐릭터 대시보드
              </h1>
              <p className="text-purple-200 text-sm">
                당신의 모험을 기록하고 랭킹을 확인하세요
              </p>
            </div>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-white font-medium">
                    🎭 모험가 {user.email}
                  </div>
                  <div className="text-purple-200 text-xs">
                    환영합니다!
                  </div>
                </div>
                <Link 
                  href="/ranking"
                  className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors font-semibold shadow-md"
                >
                  🏆 랭킹보드
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
                >
                  👋 로그아웃
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link 
                  href="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                  🔑 로그인
                </Link>
                <Link 
                  href="/signup"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
                >
                  ⭐ 회원가입
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="bg-white rounded-lg shadow-lg p-8">
          {user ? (
            <div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-8 text-center">
                🎮 모험가 대시보드
              </h2>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-green-400 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">모험 준비 완료!</h3>
                    <p className="text-sm text-gray-600">
                      당신의 캐릭터들을 관리하고 다른 모험가들과 경쟁해보세요.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">👤</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 ml-3">
                      모험가 정보
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">🎭 닉네임:</span> {user.email.split('@')[0]}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">📧 이메일:</span> {user.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">📅 가입일:</span> {new Date(user.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">⚔️</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 ml-3">
                      모험 상태
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-green-600 font-bold text-lg">
                      ✅ 온라인
                    </p>
                    <p className="text-gray-700">
                      🛡️ 세션 활성화됨
                    </p>
                    <p className="text-gray-700">
                      🌟 모험 시작 가능
                    </p>
                  </div>
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/ranking"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-3 rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  🏆 랭킹보드 보기
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  🔄 대시보드 새로고침
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
                ⚡ 캐릭터 대시보드에 오신 것을 환영합니다!
              </h2>
              
              <p className="text-gray-600 mb-12 text-lg">
                당신만의 캐릭터를 생성하고 다른 모험가들과 경쟁하세요.<br/>
                레벨을 올리고 최강의 모험가가 되어보세요!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border-2 border-blue-200 hover:border-blue-300 transition-colors">
                  <div className="mb-6">
                    <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">⭐</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-3">
                      새로운 모험가
                    </h3>
                  </div>
                  <p className="text-blue-700 mb-6 text-base">
                    첫 모험을 시작하려면 계정을 만들어주세요.<br/>
                    무료로 가입하고 바로 시작할 수 있어요!
                  </p>
                  <Link 
                    href="/signup"
                    className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg transform hover:scale-105"
                  >
                    🎮 모험 시작하기
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border-2 border-green-200 hover:border-green-300 transition-colors">
                  <div className="mb-6">
                    <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🗝️</span>
                    </div>
                    <h3 className="text-2xl font-bold text-green-900 mb-3">
                      기존 모험가
                    </h3>
                  </div>
                  <p className="text-green-700 mb-6 text-base">
                    이미 계정이 있다면 로그인해서<br/>
                    당신의 캐릭터들을 확인해보세요!
                  </p>
                  <Link 
                    href="/login"
                    className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg transform hover:scale-105"
                  >
                    ⚔️ 모험 재개하기
                  </Link>
                </div>
              </div>

              {/* 기능 소개 */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-2xl border border-purple-200">
                <h3 className="text-2xl font-bold text-purple-900 mb-6">🎯 주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl mb-3">👤</div>
                    <h4 className="font-bold text-purple-800 mb-2">캐릭터 생성</h4>
                    <p className="text-purple-600 text-sm">나만의 캐릭터를 만들고 직업을 선택하세요</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-3">📈</div>
                    <h4 className="font-bold text-purple-800 mb-2">레벨 성장</h4>
                    <p className="text-purple-600 text-sm">레벨 1부터 200까지 성장시켜보세요</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-3">🏆</div>
                    <h4 className="font-bold text-purple-800 mb-2">랭킹 경쟁</h4>
                    <p className="text-purple-600 text-sm">다른 모험가들과 순위를 겨뤄보세요</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 푸터 */}
        <footer className="mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
            <p className="text-lg font-medium mb-2">⚔️ 캐릭터 대시보드</p>
            <p className="text-gray-300 text-sm">
              모든 모험가들을 위한 캐릭터 관리 플랫폼 • Made with ❤️
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
              <span>🎮 게임</span>
              <span>📊 랭킹</span>
              <span>👥 커뮤니티</span>
              <span>🏆 경쟁</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
