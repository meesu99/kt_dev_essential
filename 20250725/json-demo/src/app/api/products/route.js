// 상품 데이터 - 직접 작성한 JSON 데이터
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1290000,
    category: "스마트폰",
    inStock: true,
    description: "최신 애플 스마트폰"
  },
  {
    id: 2,
    name: "Galaxy S24 Ultra",
    price: 1350000,
    category: "스마트폰", 
    inStock: true,
    description: "삼성 플래그십 모델"
  },
  {
    id: 3,
    name: "MacBook Pro M3",
    price: 2390000,
    category: "노트북",
    inStock: false,
    description: "애플 고성능 노트북"
  },
  {
    id: 4,
    name: "AirPods Pro",
    price: 350000,
    category: "이어폰",
    inStock: true,
    description: "애플 무선 이어폰"
  }
];

// GET 요청 처리
export async function GET() {
  try {
    // 실제 서버에서 데이터베이스 조회를 시뮬레이션
    console.log('API 호출됨: /api/products');
    
    // JSON 응답 반환
    return Response.json({
      success: true,
      message: "상품 목록을 성공적으로 조회했습니다",
      data: products,
      total: products.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API 에러:', error);
    
    return Response.json({
      success: false,
      message: "상품 목록 조회 중 에러가 발생했습니다",
      error: error.message
    }, { status: 500 });
  }
}

// POST 요청 처리 (새 상품 추가)
export async function POST(request) {
  try {
    const newProduct = await request.json();
    
    // 새 상품에 ID 할당
    const productWithId = {
      id: products.length + 1,
      ...newProduct,
      createdAt: new Date().toISOString()
    };
    
    products.push(productWithId);
    
    return Response.json({
      success: true,
      message: "상품이 성공적으로 추가되었습니다",
      data: productWithId
    }, { status: 201 });
  } catch (error) {
    return Response.json({
      success: false,
      message: "상품 추가 중 에러가 발생했습니다",
      error: error.message
    }, { status: 400 });
  }
} 