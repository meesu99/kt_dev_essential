export async function GET() {
    const products = [
      { id: 1, title: '키보드', price: 30000 },
      { id: 2, title: '마우스', price: 15000 }
    ];

    return new Response(JSON.stringify(products), {
      status: 200,
      statusText: 'OK',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  }

export async function POST(request) {
  try {
    const body = await request.json();
    
    // 새 상품 추가 시뮬레이션
    const newProduct = {
      id: Date.now(),
      title: body.title || '새 상품',
      price: body.price || 0
    };

    return new Response(JSON.stringify({
      message: '상품이 성공적으로 추가되었습니다',
      product: newProduct
    }), {
      status: 201,
      statusText: 'Created',
      headers: { 
        'Content-Type': 'application/json',
        'Location': `/api/products/${newProduct.id}`
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Invalid JSON format',
      message: '잘못된 JSON 형식입니다'
    }), {
      status: 400,
      statusText: 'Bad Request',
      headers: { 
        'Content-Type': 'application/json'
      }
    });
  }
}