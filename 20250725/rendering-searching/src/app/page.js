import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔍 렌더링 방식 비교 실습
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Next.js에서 CSR과 SSR의 차이점을 체험해보세요
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link 
            href="/csr"
            className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h2 className="text-2xl font-bold mb-3">CSR 방식</h2>
              <p className="text-purple-100 mb-4">
                Client-Side Rendering
              </p>
              <ul className="text-sm text-purple-100 text-left space-y-1">
                <li>• 브라우저에서 데이터 로딩</li>
                <li>• useState, useEffect 사용</li>
                <li>• 빠른 페이지 전환</li>
                <li>• 로딩 상태 관리</li>
              </ul>
            </div>
          </Link>

          <Link 
            href="/ssr"
            className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-8 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold mb-3">SSR 방식</h2>
              <p className="text-blue-100 mb-4">
                Server-Side Rendering
              </p>
              <ul className="text-sm text-blue-100 text-left space-y-1">
                <li>• 서버에서 데이터 미리 로딩</li>
                <li>• 빠른 초기 로딩</li>
                <li>• SEO 최적화</li>
                <li>• 완성된 HTML 전달</li>
              </ul>
            </div>
          </Link>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            💡 실습 내용
          </h3>
          <p className="text-gray-600">
            JSONPlaceholder API를 사용해서 포스트를 검색하고, 
            CSR과 SSR의 동작 방식 차이를 직접 확인해보세요!
          </p>
        </div>
      </div>
    </div>
  );
}
