// 서버 컴포넌트 (SSR)

export default async function SSRPage() {
  try {
    // 서버에서 데이터 fetch
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
      cache: 'no-store' // 매번 새로운 데이터를 가져오기 위해
    });
    
    if (!res.ok) {
      throw new Error('데이터를 가져올 수 없습니다.');
    }
    
    const data = await res.json();

    return (
      <div className="font-sans min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            SSR 실습 페이지
          </h1>
          
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              💡 이 페이지는 서버에서 렌더링됩니다. 페이지 소스 보기를 하면 데이터가 이미 HTML에 포함되어 있습니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {data.map(post => (
              <div 
                key={post.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2 text-purple-600 dark:text-purple-400">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  {post.body}
                </p>
                <p className="text-xs text-gray-500">
                  Post ID: {post.id} | User ID: {post.userId}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a 
              href="/"
              className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              ← CSR 실습 페이지로 돌아가기
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="font-sans min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <h1 className="text-2xl font-bold mb-4">오류 발생</h1>
          <p>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</p>
        </div>
      </div>
    );
  }
}

export const metadata = {
  title: 'SSR 실습',
  description: '서버 사이드 렌더링 실습 페이지입니다.',
};
