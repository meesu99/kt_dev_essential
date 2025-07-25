import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">상품 관리 시스템</h1>
            <nav className="flex space-x-4">
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                로그인
              </Link>
              <Link
                href="/products"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                상품 목록
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 환영 섹션 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🛍️ 상품 관리 시스템에 오신 것을 환영합니다
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            로그인하여 상품을 조회하고 등록해보세요
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            시작하기 →
          </Link>
        </div>

        {/* 기능 소개 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">로그인</h3>
            <p className="text-gray-600 text-sm mb-4">
              간편한 로그인으로 시스템에 접근하세요
            </p>
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              로그인하기 →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">상품 목록</h3>
            <p className="text-gray-600 text-sm mb-4">
              등록된 상품들을 한눈에 확인하세요
            </p>
            <Link
              href="/products"
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              목록 보기 →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">➕</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">상품 등록</h3>
            <p className="text-gray-600 text-sm mb-4">
              새로운 상품을 시스템에 등록하세요
            </p>
            <Link
              href="/add-product"
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              등록하기 →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">보호된 페이지</h3>
            <p className="text-gray-600 text-sm mb-4">
              인증된 사용자만 접근 가능한 페이지
            </p>
            <Link
              href="/protected"
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              접근하기 →
            </Link>
          </div>

        </div>

        {/* 기술 스택 및 기능 설명 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🚀 구현된 기능들
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">🛠️ 기술 스택</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Next.js 14 (App Router)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  React Hooks (useState, useEffect)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Tailwind CSS
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Fetch API
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Cookie 기반 인증
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Next.js 미들웨어
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">✅ 핵심 기능</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  쿠키 기반 로그인 시스템
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  외부 API 연동 (JSONPlaceholder)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  상품 목록 조회 (GET 요청)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  상품 등록 폼 (POST 요청)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  미들웨어 기반 페이지 보호
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  반응형 UI 디자인
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h5 className="font-semibold text-blue-800 mb-2">💡 개발자 도구 활용 팁</h5>
            <p className="text-blue-700 text-sm">
              개발자 도구(F12)의 Network 탭에서 API 요청을 확인하고, 
              Application 탭에서 쿠키 정보를 확인해보세요. 
              Console 탭에서는 에러 메시지와 디버그 정보를 볼 수 있습니다.
            </p>
          </div>

        </div>

      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>상품 관리 시스템 - Next.js 실습 프로젝트</p>
            <p className="mt-2">Fetch API, Cookie 인증, 미들웨어 활용</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
