'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
    fetchComments();
  }, [resolvedParams.id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${resolvedParams.id}`);
      
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else if (response.status === 404) {
        setError('상품을 찾을 수 없습니다.');
      } else {
        setError('상품을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?product_id=${resolvedParams.id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: resolvedParams.id,
          author_name: authorName.trim() || '익명',
          content: newComment.trim()
        })
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([...comments, newCommentData]);
        setNewComment('');
        setAuthorName('');
      } else {
        alert('댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setComments(comments.filter(comment => comment.id !== commentId));
      } else {
        alert('댓글 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/products/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'like' })
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProduct(updatedProduct);
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleChat = async () => {
    try {
      const response = await fetch('/api/chat-rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: resolvedParams.id,
          buyer_name: '구매자', // 실제로는 로그인한 사용자 이름
          seller_name: '판매자' // 실제로는 상품 등록자 이름
        })
      });

      if (response.ok) {
        const chatRoom = await response.json();
        
        // 상품의 채팅 수 증가
        const updateResponse = await fetch(`/api/products/${resolvedParams.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'chat' })
        });

        if (updateResponse.ok) {
          const updatedProduct = await updateResponse.json();
          setProduct(updatedProduct);
        }

        // 채팅방으로 이동
        router.push(`/chat/${chatRoom.id}`);
      } else {
        alert('채팅방 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error creating chat room:', error);
      alert('채팅방 생성 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${resolvedParams.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('상품이 삭제되었습니다.');
        router.push('/products');
      } else {
        alert('상품 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('상품 삭제 중 오류가 발생했습니다.');
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

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error}</h2>
            <Link
              href="/products"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              상품 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 뒤로가기 */}
        <Link 
          href="/products" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          상품 목록으로 돌아가기
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* 상품 이미지 */}
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>

            {/* 상품 정보 */}
            <div className="space-y-6">
              {/* 상태 배지 */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.status === '판매중' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  product.status === '예약중' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                }`}>
                  {product.status}
                </span>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  삭제
                </button>
              </div>

              {/* 제목 */}
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>

              {/* 카테고리 */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {product.category}
              </div>

              {/* 가격 */}
              <div className="text-3xl font-bold text-orange-500">
                {formatPrice(product.price)}
              </div>

              {/* 설명 */}
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>

              {/* 위치 및 시간 */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {product.location}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTimeAgo(product.created_at)}
                </div>
              </div>

              {/* 좋아요 및 채팅 수 */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
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

              {/* 액션 버튼들 */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleLike}
                  className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  관심
                </button>
                <button
                  onClick={handleChat}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  채팅하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            댓글 ({comments.length})
          </h3>

          {/* 댓글 작성 폼 */}
          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="mb-3">
              <input
                type="text"
                placeholder="닉네임 (선택사항)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
            <div className="flex space-x-3">
              <textarea
                placeholder="댓글을 작성해주세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              />
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmittingComment}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmittingComment ? '작성중...' : '댓글 작성'}
              </button>
            </div>
          </form>

          {/* 댓글 목록 */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          {comment.author_name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimeAgo(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {comment.content}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:text-red-600 text-xs ml-2"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 