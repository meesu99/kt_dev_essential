'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 샘플 상품 데이터 (실제로는 API에서 가져올 데이터)
  const sampleProducts = [
    { 
      id: 1, 
      title: '아이폰 14 Pro 128GB 딥퍼플', 
      desc: '1년 사용, 케이스 끼고 사용해서 깨끗해요. 액정에 흠집 전혀 없고, 배터리 상태도 91%로 양호합니다. 충전기, 케이스 함께 드려요.', 
      price: 850000, 
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
      location: '서초구 반포동',
      timeAgo: 30,
      likes: 12,
      chats: 5,
      status: '판매중',
      seller: {
        name: '당근이',
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        reviewCount: 23,
        responseRate: 95
      },
      images: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop'
      ]
    },
    { 
      id: 2, 
      title: '맥북 에어 M2 13인치', 
      desc: '대학교 과제용으로 사용했습니다. 정말 깨끗하고 성능도 여전히 뛰어나요! 사용한 지 6개월 정도 되었고, 항상 케이스 끼고 사용했어서 외관 상태 매우 좋습니다. 충전기, 박스 모두 있어요.', 
      price: 1200000, 
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
      location: '강남구 역삼동',
      timeAgo: 120,
      likes: 8,
      chats: 3,
      status: '판매중',
      seller: {
        name: '맥북러버',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b0e3?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        reviewCount: 31,
        responseRate: 100
      },
      images: [
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop'
      ]
    },
    { 
      id: 3, 
      title: '갤럭시 버즈 프로 2', 
      desc: '구매한지 3개월 됐고 거의 안써서 새것 같아요. 노이즈 캔슬링 정말 좋고, 케이스에 흠집 하나도 없어요. 정품 박스, 충전 케이블 모두 있습니다.', 
      price: 120000, 
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
      location: '마포구 홍대입구',
      timeAgo: 45,
      likes: 15,
      chats: 8,
      status: '예약중',
      seller: {
        name: '음악매니아',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        reviewCount: 18,
        responseRate: 88
      },
      images: [
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop'
      ]
    },
    { 
      id: 4, 
      title: '닌텐도 스위치 OLED', 
      desc: '작년에 구매했는데 게임을 잘 안해서 팝니다. OLED 화면이 정말 선명하고 예쁘더라고요. 젤다, 포켓몬 게임 카트리지도 함께 드릴게요!', 
      price: 280000, 
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
      location: '송파구 잠실동',
      timeAgo: 180,
      likes: 20,
      chats: 12,
      status: '판매중',
      seller: {
        name: '게이머123',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 4.6,
        reviewCount: 15,
        responseRate: 92
      },
      images: [
        'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop'
      ]
    },
    { 
      id: 5, 
      title: '무인양품 원목 책상', 
      desc: '이사가면서 팔아요. 흠집 거의 없고 상태 정말 좋아요. 원목 특유의 따뜻한 느낌이 좋습니다. 책상 다리 분리 가능해서 이사할 때 편해요.', 
      price: 150000, 
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      location: '용산구 한남동',
      timeAgo: 60,
      likes: 6,
      chats: 2,
      status: '판매중',
      seller: {
        name: '미니멀라이프',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        reviewCount: 27,
        responseRate: 98
      },
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop'
      ]
    },
    { 
      id: 6, 
      title: '에어팟 프로 2세대', 
      desc: '선물받았는데 이미 있어서 새제품 그대로 팔아요. 미개봉 새제품입니다. 애플케어+ 등록도 안 했어요. 정가보다 저렴하게 드려요!', 
      price: 280000, 
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
      location: '성동구 성수동',
      timeAgo: 90,
      likes: 25,
      chats: 15,
      status: '판매중',
      seller: {
        name: '애플매니아',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        rating: 5.0,
        reviewCount: 45,
        responseRate: 100
      },
      images: [
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=600&fit=crop'
      ]
    },
    { 
      id: 7, 
      title: '다이슨 청소기 V11', 
      desc: '1년 사용했고 필터 새것으로 교체했어요. 흡입력이 정말 좋고 무선이라 편해요. 모든 브러시와 충전 거치대 포함해서 드립니다.', 
      price: 320000, 
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      location: '강서구 화곡동',
      timeAgo: 240,
      likes: 9,
      chats: 4,
      status: '판매중',
      seller: {
        name: '청소의달인',
        profileImage: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        reviewCount: 33,
        responseRate: 95
      },
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop'
      ]
    },
    { 
      id: 8, 
      title: '커피머신 (나눔)', 
      desc: '새것으로 바꿔서 드려요. 직거래만 가능합니다. 캡슐식 커피머신이고 작동 잘 됩니다. 커피 캡슐 몇 개도 함께 드릴게요!', 
      price: 0, 
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
      location: '노원구 상계동',
      timeAgo: 15,
      likes: 35,
      chats: 20,
      status: '판매중',
      seller: {
        name: '나눔천사',
        profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
        rating: 4.9,
        reviewCount: 52,
        responseRate: 100
      },
      images: [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop'
      ]
    },
    { 
      id: 9, 
      title: 'LG 그램 17인치 노트북', 
      desc: '업무용으로 사용했고 성능 좋아요. 17인치 대화면에 가벼워서 이동성도 뛰어납니다. 오피스 프로그램 설치되어 있어요.', 
      price: 900000, 
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
      location: '관악구 신림동',
      timeAgo: 300,
      likes: 11,
      chats: 6,
      status: '판매완료',
      seller: {
        name: '직장인A',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 4.7,
        reviewCount: 19,
        responseRate: 89
      },
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop'
      ]
    },
    { 
      id: 10, 
      title: '아이패드 프로 11인치 + 애플펜슬', 
      desc: '그림 그리기용으로 구매했는데 잘 안써서 팔아요. 애플펜슬 2세대, 키보드 케이스도 함께 드립니다. 화면 보호필름 부착되어 있어요.', 
      price: 650000, 
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
      location: '종로구 혜화동',
      timeAgo: 75,
      likes: 18,
      chats: 9,
      status: '판매중',
      seller: {
        name: '디지털아티스트',
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b0e3?w=100&h=100&fit=crop&crop=face',
        rating: 4.8,
        reviewCount: 25,
        responseRate: 94
      },
      images: [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop'
      ]
    }
  ];

  const formatTimeAgo = (minutes) => {
    if (minutes < 60) return `${minutes}분 전`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}시간 전`;
    return `${Math.floor(minutes / 1440)}일 전`;
  };

  const formatPrice = (price) => {
    if (price === 0) return "나눔";
    return price.toLocaleString() + "원";
  };

  useEffect(() => {
    // URL에서 상품 ID 추출
    const productId = parseInt(params.id);
    
    // 로컬 스토리지에서 사용자가 등록한 상품 확인
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const allProducts = [...savedProducts, ...sampleProducts];
    
    // 해당 ID의 상품 찾기
    const foundProduct = allProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    
    setLoading(false);
  }, [params.id]);

  // 키보드 이벤트 (ESC로 모달 닫기, 화살표키로 이미지 넘기기)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showImageModal) {
        if (e.key === 'Escape') {
          setShowImageModal(false);
        } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
          setCurrentImageIndex(prev => prev - 1);
        } else if (e.key === 'ArrowRight' && product?.images && currentImageIndex < product.images.length - 1) {
          setCurrentImageIndex(prev => prev + 1);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showImageModal, currentImageIndex, product?.images]);

  // 모달 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (showImageModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showImageModal]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-0 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <div className="text-gray-600">상품 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 md:pt-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <div className="text-xl text-gray-600 mb-4">상품을 찾을 수 없습니다</div>
          <Link 
            href="/products"
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-0">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-200 sticky top-16 md:top-0 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              뒤로가기
            </button>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 transition-colors duration-200 ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
              >
                <svg className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white">
          {/* 상품 이미지 */}
          <div className="relative">
            <div 
              className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-95 transition-opacity duration-200"
              onClick={() => setShowImageModal(true)}
            >
              <img 
                src={product.images ? product.images[0] : product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
              
              {/* 확대 아이콘 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-20 transition-opacity duration-200">
                <div className="bg-white bg-opacity-90 rounded-full p-2">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* 상품 상태 배지 */}
            {product.status === "예약중" && (
              <div className="absolute top-4 left-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                예약중
              </div>
            )}
            {product.status === "판매완료" && (
              <div className="absolute top-4 left-4 bg-gray-500 text-white text-sm px-3 py-1 rounded-full">
                판매완료
              </div>
            )}
            
            {/* 이미지 개수 표시 */}
            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                {currentImageIndex + 1}/{product.images.length}
              </div>
            )}
          </div>

          {/* 상품 정보 */}
          <div className="p-6">
            {/* 판매자 정보 */}
            {product.seller && (
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center">
                  <img 
                    src={product.seller.profileImage} 
                    alt={product.seller.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{product.seller.name}</div>
                    <div className="text-sm text-gray-500">
                      ⭐ {product.seller.rating} ({product.seller.reviewCount}개 리뷰) • 
                      응답률 {product.seller.responseRate}%
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  프로필 보기
                </button>
              </div>
            )}

            {/* 상품 제목과 가격 */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {formatPrice(product.price)}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{product.location}</span>
                <span className="mx-2">•</span>
                <span>{formatTimeAgo(product.timeAgo)}</span>
                <span className="mx-2">•</span>
                <span>조회 {Math.floor(Math.random() * 100) + 50}</span>
              </div>
            </div>

            {/* 상품 설명 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">상품 정보</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.desc}
              </p>
            </div>

            {/* 관심, 채팅 통계 */}
            <div className="flex items-center space-x-6 mb-8 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                관심 {product.likes}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                채팅 {product.chats}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-t-0 md:p-0 md:mt-4">
          <div className="max-w-4xl mx-auto flex space-x-3">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex-shrink-0 p-3 border border-gray-300 rounded-lg transition-colors duration-200 ${
                isLiked ? 'bg-red-50 border-red-300 text-red-500' : 'hover:bg-gray-50'
              }`}
            >
              <svg className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <button className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors duration-200">
              {product.seller ? `${product.seller.name}님께 채팅하기` : '채팅하기'}
            </button>
          </div>
        </div>

        {/* 모바일에서 하단 버튼 공간 확보 */}
        <div className="h-20 md:hidden"></div>
      </div>

      {/* 전체화면 이미지 모달 */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          {/* 닫기 버튼 */}
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 이미지 컨테이너 */}
          <div className="relative max-w-4xl max-h-full">
            <img
              src={product.images ? product.images[currentImageIndex] : product.image}
              alt={product.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* 이전/다음 버튼 (여러 이미지가 있을 때만) */}
            {product.images && product.images.length > 1 && (
              <>
                {/* 이전 버튼 */}
                {currentImageIndex > 0 && (
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* 다음 버튼 */}
                {currentImageIndex < product.images.length - 1 && (
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                {/* 이미지 인디케이터 */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </>
            )}
          </div>

          {/* 배경 클릭으로 닫기 */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setShowImageModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
} 