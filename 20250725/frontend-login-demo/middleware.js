import { NextResponse } from 'next/server';

export function middleware(request) {
  // /protected 경로에 대해서만 인증 확인
  if (request.nextUrl.pathname.startsWith('/protected')) {
    // 쿠키에서 auth 토큰 확인
    const authCookie = request.cookies.get('auth');
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      // 인증되지 않은 경우 로그인 페이지로 리디렉션
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/protected/:path*'
}; 