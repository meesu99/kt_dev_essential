'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    price: '',
    category: '디지털기기',
    location: '서초구 반포동',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'
  });

  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    '디지털기기',
    '가구/인테리어',
    '가전제품',
    '의류',
    '도서/음반',
    '스포츠/레저',
    '뷰티/미용',
    '기타'
  ];

  const locations = [
    '서초구 반포동',
    '강남구 역삼동',
    '마포구 홍대입구',
    '송파구 잠실동',
    '용산구 한남동',
    '성동구 성수동',
    '강서구 화곡동',
    '노원구 상계동',
    '관악구 신림동',
    '종로구 혜화동'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (!formData.title || !formData.desc || !formData.price) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    // 새 상품 데이터 생성
    const newProduct = {
      id: Date.now(),
      title: formData.title,
      desc: formData.desc,
      price: parseInt(formData.price),
      image: formData.image,
      location: formData.location,
      timeAgo: 0,
      likes: 0,
      chats: 0,
      status: '판매중'
    };

    // 로컬 스토리지에 저장 (실제 앱에서는 API 호출)
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
    existingProducts.unshift(newProduct);
    localStorage.setItem('products', JSON.stringify(existingProducts));

    alert('상품이 성공적으로 등록되었습니다!');
    router.push('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-0">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            뒤로가기
          </button>
          <h1 className="text-xl font-bold text-gray-900">중고거래 글쓰기</h1>
          <div className="w-20"></div> {/* 공간 확보용 */}
        </div>

        {/* 상품 등록 폼 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* 이미지 업로드 */}
          <div className="p-6 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              상품 사진 *
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="미리보기" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                >
                  사진 선택
                </label>
                <p className="text-xs text-gray-500 mt-1">* 최대 10장까지 등록 가능</p>
              </div>
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="p-6 space-y-6">
            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                글 제목 *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="상품명을 입력해주세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                카테고리 *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* 거래 지역 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                거래 지역 *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* 가격 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                가격 *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="가격을 입력해주세요 (나눔은 0원)"
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                />
                <span className="absolute right-3 top-3 text-gray-500">원</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">* 나눔의 경우 0원으로 입력해주세요</p>
            </div>

            {/* 설명 */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                자세한 설명 *
              </label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                placeholder="상품의 상태, 구매 시기, 사용감 등을 자세히 적어주세요."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                required
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>* 상품과 무관한 내용이나 광고, 욕설 등은 삭제될 수 있어요.</span>
                <span>{formData.desc.length}/1000</span>
              </div>
            </div>
          </div>

          {/* 등록 버튼 */}
          <div className="p-6 bg-gray-50 rounded-b-lg">
            <button
              type="submit"
              className="w-full py-4 bg-orange-500 text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors duration-200"
            >
              작성 완료
            </button>
          </div>
        </form>

        {/* 주의사항 */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-medium text-yellow-800 mb-2">🚨 안전한 거래를 위한 주의사항</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 직거래를 권장하며, 안전한 장소에서 거래하세요.</li>
            <li>• 사기 의심 거래는 즉시 신고해주세요.</li>
            <li>• 개인정보 유출에 주의하세요.</li>
            <li>• 상품의 실제 상태와 다를 경우 환불이 어려울 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 