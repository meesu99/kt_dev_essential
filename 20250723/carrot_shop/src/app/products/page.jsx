'use client';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const sampleProducts = [
    { 
      id: 1, 
      title: '아이폰 14 Pro 128GB 딥퍼플', 
      desc: '1년 사용, 케이스 끼고 사용해서 깨끗해요', 
      price: 850000, 
      image: '/iphone.jpg',
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
      image: '/macbook.jpg',
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
      image: '/buds.jpg',
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
      image: '/switch.jpg',
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
      image: '/desk.jpg',
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
      image: '/airpods.jpg',
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
      image: '/dyson.jpg',
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
      image: '/coffee.jpg',
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
      image: '/laptop.jpg',
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
      image: '/ipad.jpg',
      location: '종로구 혜화동',
      timeAgo: 75,
      likes: 18,
      chats: 9,
      status: '판매중'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-0">
      {/* 필터 섹션 */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium">
              전체
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-50">
              디지털기기
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-50">
              가구/인테리어
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-50">
              가전제품
            </button>
          </div>
          <div className="text-sm text-gray-600">
            총 {sampleProducts.length}개의 상품
          </div>
        </div>
      </div>

      {/* 상품 그리드 */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sampleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* 플로팅 글쓰기 버튼 */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
} 