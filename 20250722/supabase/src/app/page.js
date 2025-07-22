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
        <header className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              🚀 Supabase 인증 데모
            </h1>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  안녕하세요, {user.email}님!
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link 
                  href="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  로그인
                </Link>
                <Link 
                  href="/signup"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="bg-white rounded-lg shadow-sm p-8">
          {user ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                🎉 로그인 성공!
              </h2>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Supabase 인증이 성공적으로 작동하고 있습니다!
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    📧 사용자 정보
                  </h3>
                  <p className="text-gray-600">
                    <strong>이메일:</strong> {user.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>가입일:</strong> {new Date(user.created_at).toLocaleDateString('ko-KR')}
                  </p>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    🔐 인증 상태
                  </h3>
                  <p className="text-green-600 font-medium">
                    ✅ 로그인됨
                  </p>
                  <p className="text-gray-600">
                    세션이 활성화되어 있습니다.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                👋 Supabase 인증 시스템에 오신 것을 환영합니다!
              </h2>
              
              <p className="text-gray-600 mb-8">
                이메일과 비밀번호를 사용하여 회원가입하거나 로그인하세요.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
                  <h3 className="text-lg font-medium text-blue-900 mb-3">
                    🆕 새로운 사용자
                  </h3>
                  <p className="text-blue-700 mb-4">
                    계정이 없다면 간단하게 회원가입하세요.
                  </p>
                  <Link 
                    href="/signup"
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    회원가입하기
                  </Link>
                </div>

                <div className="p-6 border border-green-200 rounded-lg bg-green-50">
                  <h3 className="text-lg font-medium text-green-900 mb-3">
                    🔑 기존 사용자
                  </h3>
                  <p className="text-green-700 mb-4">
                    이미 계정이 있다면 로그인하세요.
                  </p>
                  <Link 
                    href="/login"
                    className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    로그인하기
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 푸터 */}
        <footer className="mt-8 text-center text-gray-500">
          <p>💡 Supabase를 활용한 간단한 인증 시스템 데모</p>
        </footer>
      </div>
    </div>
  )
}
