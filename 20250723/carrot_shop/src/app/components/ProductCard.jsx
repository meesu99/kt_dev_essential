export default function ProductCard({ product }) {
  const formatTimeAgo = (minutes) => {
    if (minutes < 60) return `${minutes}분 전`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}시간 전`;
    return `${Math.floor(minutes / 1440)}일 전`;
  };

  const formatPrice = (price) => {
    if (price === 0) return "나눔";
    return price.toLocaleString() + "원";
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
      {/* 상품 이미지 */}
      <div className="relative aspect-square">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover rounded-t-lg"
          onError={handleImageError}
        />
        {product.status === "예약중" && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            예약중
          </div>
        )}
        {product.status === "판매완료" && (
          <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
            판매완료
          </div>
        )}
      </div>
      
      {/* 상품 정보 */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
          {product.title}
        </h3>
        
        {product.desc && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
            {product.desc}
          </p>
        )}
        
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span>{product.location}</span>
          <span className="mx-1">•</span>
          <span>{formatTimeAgo(product.timeAgo)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            {product.likes > 0 && (
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{product.likes}</span>
              </div>
            )}
            
            {product.chats > 0 && (
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{product.chats}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
