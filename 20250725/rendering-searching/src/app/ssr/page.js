import Link from 'next/link';
import SearchForm from './SearchForm';

// 서버에서 데이터를 가져오는 함수
async function fetchPosts(searchTerm) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      cache: 'no-store' // 캐시하지 않고 항상 최신 데이터 가져오기
    });
    const allPosts = await response.json();
    
    // 검색어가 있으면 필터링, 없으면 전체 반환
    if (!searchTerm) {
      return allPosts;
    }
    
    const filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filteredPosts;
  } catch (error) {
    console.error('서버에서 데이터 가져오기 실패:', error);
    return [];
  }
}

export default async function SSRPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams?.q || '';
  const results = await fetchPosts(searchTerm);
  const hasSearched = !!searchTerm;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← 홈으로 돌아가기
          </Link>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">🚀</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">SSR 검색</h1>
                <p className="text-gray-600">Server-Side Rendering으로 포스트를 검색해보세요</p>
              </div>
            </div>
            
            {/* 검색 폼 - Client Component */}
            <SearchForm defaultValue={searchTerm} />
          </div>
        </div>

        {/* 검색 결과 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {hasSearched ? `검색 결과 (${results.length}개)` : `전체 포스트 (${results.length}개)`}
          </h2>
          <p className="text-sm text-blue-600 mb-6">
            {hasSearched 
              ? '서버에서 미리 렌더링된 검색 결과입니다' 
              : '서버에서 미리 렌더링된 전체 포스트입니다'
            }
          </p>
          
          {results.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {results.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {post.body}
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      ID: {post.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : hasSearched ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600 mb-4">
                "<strong>{searchTerm}</strong>"에 대한 결과가 없습니다
              </p>
              <p className="text-gray-600">
                다른 검색어로 시도해보세요. 예: "qui", "est", "sunt"
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                데이터를 불러올 수 없습니다
              </h3>
              <p className="text-gray-600">
                잠시 후 다시 시도해주세요
              </p>
            </div>
          )}
        </div>

        {/* SSR 특징 설명 */}
        <div className="mt-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            ⚡ SSR 특징
          </h3>
          <ul className="text-gray-700 space-y-2">
            <li>• 서버에서 데이터를 미리 가져와서 HTML을 생성합니다</li>
            <li>• 페이지 로딩 시 이미 데이터가 포함되어 있습니다</li>
            <li>• SEO에 유리하고 초기 로딩이 빠릅니다</li>
            <li>• URL 파라미터로 검색 상태를 관리합니다</li>
            <li>• 페이지 새로고침 시에도 검색 상태가 유지됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 