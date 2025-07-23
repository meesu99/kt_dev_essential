'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'price_asc', 'price_desc'
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');

  const sampleProducts = [
    { 
      id: 1, 
      title: '아이폰 14 Pro 128GB 딥퍼플', 
      desc: '1년 사용, 케이스 끼고 사용해서 깨끗해요', 
      price: 850000, 
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
      location: '서초구 반포동',
      timeAgo: 30,
      likes: 12,
      chats: 5,
      status: '판매중'
    },
    { 
      id: 2, 
      title: '맥북 에어 M2 13인치', 
      desc: '대학교 과제용으로 사용했습니다. 정말 깨끗해요!', 
      price: 1200000, 
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
      location: '강남구 역삼동',
      timeAgo: 120,
      likes: 8,
      chats: 3,
      status: '판매중'
    },
    { 
      id: 3, 
      title: '갤럭시 버즈 프로 2', 
      desc: '구매한지 3개월 됐고 거의 안써서 새것 같아요', 
      price: 120000, 
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
      location: '마포구 홍대입구',
      timeAgo: 45,
      likes: 15,
      chats: 8,
      status: '예약중'
    },
    { 
      id: 4, 
      title: '닌텐도 스위치 OLED', 
      desc: '작년에 구매했는데 게임을 잘 안해서 팝니다', 
      price: 280000, 
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
      location: '송파구 잠실동',
      timeAgo: 180,
      likes: 20,
      chats: 12,
      status: '판매중'
    },
    { 
      id: 5, 
      title: '무인양품 원목 책상', 
      desc: '이사가면서 팔아요. 흠집 거의 없어요', 
      price: 150000, 
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      location: '용산구 한남동',
      timeAgo: 60,
      likes: 6,
      chats: 2,
      status: '판매중'
    },
    { 
      id: 6, 
      title: '에어팟 프로 2세대', 
      desc: '선물받았는데 이미 있어서 새제품 그대로 팔아요', 
      price: 280000, 
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
      location: '성동구 성수동',
      timeAgo: 90,
      likes: 25,
      chats: 15,
      status: '판매중'
    },
    { 
      id: 7, 
      title: '다이슨 청소기 V11', 
      desc: '1년 사용했고 필터 새것으로 교체했어요', 
      price: 320000, 
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      location: '강서구 화곡동',
      timeAgo: 240,
      likes: 9,
      chats: 4,
      status: '판매중'
    },
    { 
      id: 8, 
      title: '커피머신 (나눔)', 
      desc: '새것으로 바꿔서 드려요. 직거래만 가능합니다', 
      price: 0, 
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
      location: '노원구 상계동',
      timeAgo: 15,
      likes: 35,
      chats: 20,
      status: '판매중'
    },
    { 
      id: 9, 
      title: 'LG 그램 17인치 노트북', 
      desc: '업무용으로 사용했고 성능 좋아요', 
      price: 900000, 
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
      location: '관악구 신림동',
      timeAgo: 300,
      likes: 11,
      chats: 6,
      status: '판매완료'
    },
    { 
      id: 10, 
      title: '아이패드 프로 11인치 + 애플펜슬', 
      desc: '그림 그리기용으로 구매했는데 잘 안써서 팔아요', 
      price: 650000, 
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
      location: '종로구 혜화동',
      timeAgo: 75,
      likes: 18,
      chats: 9,
      status: '판매중'
    }
  ];

  // 상품 필터링 및 정렬 함수
  const filterAndSortProducts = (products, category, keyword, sortBy) => {
    let filtered = [...products];
    
    // 카테고리 필터링
    if (category !== '전체') {
      // 상품에 category 필드가 없으므로 제목을 기반으로 간단한 카테고리 매핑
      const categoryKeywords = {
        '디지털기기': ['아이폰', '맥북', '갤럭시', '아이패드', '노트북'],
        '가구/인테리어': ['책상', '의자', '침대', '소파'],
        '가전제품': ['청소기', '커피머신', '세탁기', '냉장고'],
        '의류': ['옷', '신발', '가방', '잠옷'],
        '도서/음반': ['책', '앨범', 'DVD', 'CD'],
        '스포츠/레저': ['운동', '자전거', '골프', '수영'],
        '뷰티/미용': ['화장품', '향수', '케어'],
        '기타': []
      };
      
      if (categoryKeywords[category]) {
        filtered = filtered.filter(product => 
          categoryKeywords[category].some(keyword => 
            product.title.toLowerCase().includes(keyword.toLowerCase())
          )
        );
      }
    }
    
    // 키워드 검색
    if (keyword.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(keyword.toLowerCase()) ||
        product.desc.toLowerCase().includes(keyword.toLowerCase()) ||
        product.location.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    // 정렬
    switch (sortBy) {
      case 'latest':
        return filtered.sort((a, b) => a.timeAgo - b.timeAgo);
      case 'price_asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  };

  // URL 파라미터에서 검색어 읽기
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    const categoryQuery = searchParams.get('category');
    
    if (searchQuery) {
      setSearchKeyword(searchQuery);
    }
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    }
  }, [searchParams]);

  // 컴포넌트 마운트 시 로컬 스토리지에서 상품 로드
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const combinedProducts = [...savedProducts, ...sampleProducts];
    setAllProducts(combinedProducts);
  }, []);

  // 상품 목록, 카테고리, 검색어, 정렬이 변경될 때마다 필터링 및 정렬 적용
  useEffect(() => {
    if (allProducts.length > 0) {
      const result = filterAndSortProducts(allProducts, selectedCategory, searchKeyword, sortBy);
      setFilteredProducts(result);
    }
  }, [allProducts, selectedCategory, searchKeyword, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-0">
      {/* 검색 및 필터 섹션 */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4 mb-4">
          {/* 검색창 */}
          <div className="relative">
            <input
              type="text"
              placeholder="상품명, 설명, 지역으로 검색해보세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* 카테고리 필터 버튼들 */}
          <div className="flex flex-wrap gap-2">
            {['전체', '디지털기기', '가구/인테리어', '가전제품', '의류', '도서/음반'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* 상품 개수 정보 및 필터 상태 */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="text-sm text-gray-600">
              {searchKeyword || selectedCategory !== '전체' ? (
                <span>
                  {filteredProducts.length}개의 상품 
                  {selectedCategory !== '전체' && <span className="ml-1">({selectedCategory})</span>}
                  {searchKeyword && <span className="ml-1">검색: "{searchKeyword}"</span>}
                </span>
              ) : (
                <span>총 {filteredProducts.length}개의 상품</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setSortBy('latest')}
                className={`text-sm transition-colors duration-200 ${
                  sortBy === 'latest' 
                    ? 'text-orange-500 font-medium' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                최신순
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => setSortBy('price_asc')}
                className={`text-sm transition-colors duration-200 ${
                  sortBy === 'price_asc' 
                    ? 'text-orange-500 font-medium' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                낮은 가격순
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => setSortBy('price_desc')}
                className={`text-sm transition-colors duration-200 ${
                  sortBy === 'price_desc' 
                    ? 'text-orange-500 font-medium' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                높은 가격순
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 그리드 */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* 빈 상태 메시지 */}
        {filteredProducts.length === 0 && allProducts.length > 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-gray-400 text-lg mb-2">검색 결과가 없습니다</div>
            <div className="text-gray-500 text-sm mb-6">
              {searchKeyword && selectedCategory !== '전체' 
                ? `"${searchKeyword}" 키워드와 "${selectedCategory}" 카테고리에 해당하는 상품이 없어요`
                : searchKeyword 
                ? `"${searchKeyword}" 키워드에 해당하는 상품이 없어요`
                : `"${selectedCategory}" 카테고리에 해당하는 상품이 없어요`
              }
            </div>
            <div className="space-x-2">
              {searchKeyword && (
                <button 
                  onClick={() => setSearchKeyword('')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  검색어 지우기
                </button>
              )}
              {selectedCategory !== '전체' && (
                <button 
                  onClick={() => setSelectedCategory('전체')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  전체 카테고리 보기
                </button>
              )}
            </div>
          </div>
        )}
        
        {allProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <div className="text-gray-400 text-lg mb-4">아직 등록된 상품이 없습니다</div>
            <Link 
              href="/add-product"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              첫 상품 등록하기
            </Link>
          </div>
        )}
      </main>

      {/* 플로팅 글쓰기 버튼 */}
      <Link 
        href="/add-product"
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center md:bottom-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
} 