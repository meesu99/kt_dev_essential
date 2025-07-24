'use client';
import { useState, useEffect, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChatRoomPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const messagesEndRef = useRef(null);
  
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('구매자'); // 실제로는 로그인 시스템에서 가져와야 함
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchChatRoom();
    fetchMessages();
  }, [resolvedParams.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChatRoom = async () => {
    try {
      const response = await fetch('/api/chat-rooms');
      if (response.ok) {
        const rooms = await response.json();
        const room = rooms.find(r => r.id === parseInt(resolvedParams.id));
        if (room) {
          setChatRoom(room);
        }
      }
    } catch (error) {
      console.error('Error fetching chat room:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/chat-messages?chat_room_id=${resolvedParams.id}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const response = await fetch('/api/chat-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_room_id: resolvedParams.id,
          sender_name: currentUser,
          message: newMessage.trim()
        })
      });

      if (response.ok) {
        const newMsg = await response.json();
        setMessages([...messages, newMsg]);
        setNewMessage('');
      } else {
        alert('메시지 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('메시지 전송 중 오류가 발생했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatPrice = (price) => {
    if (price === 0) return "나눔";
    return price.toLocaleString() + "원";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg h-96 border border-gray-200 dark:border-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-6">
          <Link 
            href="/chat" 
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            채팅 목록으로 돌아가기
          </Link>

          {chatRoom && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={chatRoom.products?.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'}
                    alt={chatRoom.products?.title || '상품 이미지'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {chatRoom.products?.title || '상품 정보 없음'}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {chatRoom.buyer_name} ↔ {chatRoom.seller_name}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-500">
                    {formatPrice(chatRoom.products?.price || 0)}
                  </div>
                  <Link
                    href={`/products/${chatRoom.product_id}`}
                    className="text-sm text-gray-500 hover:text-orange-500"
                  >
                    상품 보기
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 채팅 영역 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-96">
          {/* 메시지 목록 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  아직 메시지가 없습니다. 첫 번째 메시지를 보내보세요!
                </p>
              </div>
            ) : (
              messages.map((message, index) => {
                const isMyMessage = message.sender_name === currentUser;
                const showTime = index === 0 || 
                  new Date(message.created_at).getTime() - new Date(messages[index - 1].created_at).getTime() > 60000;

                return (
                  <div key={message.id} className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md ${isMyMessage ? 'order-2' : 'order-1'}`}>
                      {!isMyMessage && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {message.sender_name}
                        </div>
                      )}
                      <div className={`rounded-lg p-3 ${
                        isMyMessage 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        {showTime && (
                          <p className={`text-xs mt-1 ${
                            isMyMessage ? 'text-orange-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {formatTime(message.created_at)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 메시지 입력 */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              {/* 사용자 전환 버튼 (데모용) */}
              <button
                type="button"
                onClick={() => setCurrentUser(currentUser === '구매자' ? '판매자' : '구매자')}
                className="px-3 py-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {currentUser}
              </button>
              
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              
              <button
                type="submit"
                disabled={!newMessage.trim() || isSending}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSending ? '전송 중...' : '전송'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 