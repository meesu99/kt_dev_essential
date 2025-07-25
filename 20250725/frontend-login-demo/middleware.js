import { NextResponse } from 'next/server';

export function middleware(request) {
  // /protected 경로에 대해서만 인증 확인
  if (request.nextUrl.pathname.startsWith('/protected')) {
    // 쿠키에서 auth 토큰과 만료 시간 확인
    const authCookie = request.cookies.get('auth');
    const expirationCookie = request.cookies.get('authExpiration');
    
    // 인증 쿠키가 없거나 값이 잘못된 경우
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // 만료 시간 쿠키가 없는 경우
    if (!expirationCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // 만료 시간 체크
    const expirationTime = new Date(expirationCookie.value);
    const currentTime = new Date();
    
    if (currentTime >= expirationTime) {
      // 만료된 경우 로그인 페이지로 리디렉션
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/protected/:path*'
}; 