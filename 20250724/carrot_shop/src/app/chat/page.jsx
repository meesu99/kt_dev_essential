'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChatPage() {
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/chat-rooms');
      if (response.ok) {
        const data = await response.json();
        setChatRooms(data);
      } else {
        console.error('Failed to fetch chat rooms');
      }
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return '방금 전';
    
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffInMinutes = Math.floor((now - createdAt) / (1000 * 60));
    
    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return `${Math.floor(diffInMinutes / 1440)}일 전`;
  };

  const formatPrice = (price) => {
    if (price === 0) return "나눔";
    return price.toLocaleString() + "원";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">채팅</h1>
          <p className="text-gray-600 dark:text-gray-400">
            진행 중인 거래 채팅을 확인해보세요.
          </p>
        </div>

        {chatRooms.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              진행 중인 채팅이 없습니다
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              상품 페이지에서 채팅하기 버튼을 눌러 거래를 시작해보세요!
            </p>
            <Link
              href="/products"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
            >
              상품 둘러보기
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {chatRooms.map((room) => (
              <Link
                key={room.id}
                href={`/chat/${room.id}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    {/* 상품 이미지 */}
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={room.products?.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'}
                        alt={room.products?.title || '상품 이미지'}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 채팅방 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {room.products?.title || '상품 정보 없음'}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                          {formatTimeAgo(room.updated_at)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>{room.buyer_name}</span>
                          <span>↔</span>
                          <span>{room.seller_name}</span>
                        </div>
                        <span className="text-sm font-medium text-orange-500">
                          {formatPrice(room.products?.price || 0)}
                        </span>
                      </div>
                    </div>

                    {/* 화살표 아이콘 */}
                    <div className="text-gray-400 dark:text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 