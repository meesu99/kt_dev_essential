'use client';
import Link from 'next/link';
import ProductCard from './components/ProductCard';
import { useState, useEffect } from 'react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?limit=4');
      if (response.ok) {
        const products = await response.json();
        setFeaturedProducts(products.slice(0, 4)); // 처음 4개만 가져오기
      } else {
        console.error('Failed to fetch products');
        // 실패시 더미 데이터 사용
        setFeaturedProducts([
          { 
            id: 1, 
            title: '아이폰 14 Pro 128GB 딥퍼플', 
            description: '1년 사용, 케이스 끼고 사용해서 깨끗해요', 
            price: 850000, 
            image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
            location: '서초구 반포동',
            timeAgo: 30,
            likes: 12,
            chats: 5,
            status: '판매중'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // 에러시 더미 데이터 사용
      setFeaturedProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { name: '디지털기기', icon: '📱', count: 234 },
    { name: '가구/인테리어', icon: '🛋️', count: 189 },
    { name: '가전제품', icon: '📺', count: 156 },
    { name: '의류', icon: '👕', count: 298 },
    { name: '도서/음반', icon: '📚', count: 145 },
    { name: '스포츠/레저', icon: '⚽', count: 203 },
    { name: '뷰티/미용', icon: '💄', count: 167 },
    { name: '기타', icon: '📦', count: 321 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-orange-400 to-orange-600 text-white mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              우리 동네<br />중고거래 당근마켓
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              중고거래부터 동네정보까지, 이웃과 함께해요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products" className="px-8 py-4 bg-white text-orange-500 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors duration-200">
                중고거래 시작하기
              </Link>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-orange-500 transition-colors duration-200">
                앱 다운로드
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="bg-white dark:bg-gray-800 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">인기 카테고리</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">{category.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{category.count}개</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 상품 섹션 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">지금 인기있는 중고거래</h2>
            <Link href="/products" className="text-orange-500 font-medium hover:text-orange-600 transition-colors duration-200">
              더보기 →
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
                  <div className="aspect-square bg-gray-300 dark:bg-gray-600 rounded-t-lg"></div>
                  <div className="p-3">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="bg-orange-50 dark:bg-gray-800 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">당근마켓과 함께하는 우리 동네</h2>
            <p className="text-gray-600 dark:text-gray-300">믿을 수 있는 이웃과 함께하는 중고거래</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">2,000만+</div>
              <div className="text-gray-600 dark:text-gray-300">누적 다운로드</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">1,000만+</div>
              <div className="text-gray-600 dark:text-gray-300">월 사용자</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">사용자 만족도</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">24시간</div>
              <div className="text-gray-600 dark:text-gray-300">평균 판매 시간</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 바로 시작해보세요!</h2>
          <p className="text-gray-300 dark:text-gray-400 mb-8">우리 동네에서 안전하고 쉬운 중고거래를 경험해보세요.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="px-8 py-4 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors duration-200">
              중고거래 둘러보기
            </Link>
            <button className="px-8 py-4 border border-gray-600 dark:border-gray-500 text-gray-300 dark:text-gray-400 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200">
              앱 스토어에서 다운로드
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
