// 파일 명은 꼭 route.js로 해야 함 (api 사용하고자 하면)
import { NextResponse } from 'next/server';   // GET 메서드의 내용을 가져오기 위함

export async function GET() {
  // 실제 API처럼 약간의 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const data = {
    message: '안녕하세요! Hello API입니다 👋',
    timestamp: new Date().toISOString(),
    status: 'success',
    data: {
      greeting: 'Hello World!',
      korean: '안녕하세요!',
      random: Math.floor(Math.random() * 100)
    }
  };

  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      message: 'POST 요청을 받았습니다!',
      received: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }
} 