# 🔒 Next.js 미들웨어 인증 데모

Next.js 미들웨어를 사용한 간단한 쿠키 기반 인증 시스템 데모 프로젝트입니다.

## 📋 프로젝트 개요

이 프로젝트는 Next.js 13+ App Router의 미들웨어 기능을 활용하여 페이지 접근 권한을 제어하는 방법을 보여줍니다. 쿠키를 사용한 간단한 인증 시스템으로 보호된 페이지에 대한 접근을 관리합니다.

## ✨ 주요 기능

- 🔐 **미들웨어 기반 페이지 보호**: 특정 경로에 대한 접근 권한 자동 제어
- 🍪 **쿠키 기반 인증**: 브라우저 쿠키를 사용한 로그인 상태 관리
- 🔄 **자동 리다이렉트**: 미인증 사용자의 보호된 페이지 접근 시 로그인 페이지로 자동 이동
- 👤 **사용자 상태 표시**: 현재 로그인 상태와 사용자 정보 표시
- 📱 **반응형 UI**: 모바일과 데스크톱에서 모두 사용 가능한 인터페이스

## 🛠 기술 스택

- **프레임워크**: Next.js 15.4.4 (App Router)
- **언어**: JavaScript (ES6+)
- **스타일링**: Inline Styles
- **인증**: 쿠키 기반 클라이언트 사이드 인증
- **미들웨어**: Next.js Middleware

## 📁 프로젝트 구조

```
middleware-demo/
├── src/
│   └── app/
│       ├── middleware.js          # 미들웨어 설정
│       ├── page.js               # 홈 페이지
│       ├── layout.js             # 레이아웃
│       ├── login/
│       │   └── page.js           # 로그인 페이지
│       └── protected/
│           └── page.js           # 보호된 페이지
├── public/                       # 정적 파일
├── package.json
└── README.md
```

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd middleware-demo
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 브라우저에서 확인
[http://localhost:3000](http://localhost:3000)에서 데모를 확인할 수 있습니다.

## 📖 사용법

### 🏠 홈 페이지 (`/`)
- 현재 로그인 상태를 확인할 수 있습니다
- 다른 페이지로 이동할 수 있는 버튼들이 제공됩니다
- 테스트 시나리오가 안내되어 있습니다

### 📝 로그인 페이지 (`/login`)
- 아이디와 비밀번호를 입력하여 로그인할 수 있습니다
- **테스트용**: 아무 아이디/비밀번호나 입력해도 로그인됩니다
- 로그인 성공 시 자동으로 보호된 페이지로 이동합니다

### 🔐 보호된 페이지 (`/protected`)
- 로그인한 사용자만 접근할 수 있습니다
- 미인증 사용자는 자동으로 로그인 페이지로 리다이렉트됩니다
- 사용자 정보 표시 및 로그아웃 기능을 제공합니다

## 🧪 테스트 시나리오

### 기본 테스트 플로우
1. **홈 페이지 접속**: `http://localhost:3000`
2. **보호된 페이지 접근 시도**: "🔐 보호된 페이지로 이동" 클릭
3. **자동 리다이렉트 확인**: 미들웨어에 의해 자동으로 로그인 페이지로 이동
4. **로그인**: 아무 아이디/비밀번호 입력 후 로그인
5. **보호된 페이지 접근**: 로그인 후 보호된 페이지에 정상 접근 가능
6. **로그아웃**: 보호된 페이지에서 로그아웃 버튼 클릭
7. **재접근 테스트**: 다시 보호된 페이지 접근 시 로그인 페이지로 리다이렉트

### 미들웨어 동작 확인
- 브라우저 개발자 도구의 Network 탭에서 리다이렉트 동작 확인
- Application 탭에서 쿠키 저장/삭제 상태 확인

## 🔧 핵심 코드 설명

### 미들웨어 (`src/app/middleware.js`)
```javascript
export function middleware(request) {
  const authToken = request.cookies.get('auth_token');
  const isProtected = request.nextUrl.pathname.startsWith('/protected');

  if (!authToken && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
```

### 쿠키 설정 (로그인 시)
```javascript
document.cookie = `auth_token=${username}_token; path=/; max-age=${30 * 24 * 60 * 60}`;
```

### 쿠키 삭제 (로그아웃 시)
```javascript
document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
```

## ⚠️ 주의사항

- **데모 목적**: 이 프로젝트는 교육 및 데모 목적으로 제작되었습니다
- **보안**: 실제 프로덕션 환경에서는 더 강력한 인증 시스템을 사용해야 합니다
- **서버 사이드 검증**: 실제 애플리케이션에서는 서버 사이드에서도 토큰 검증이 필요합니다
- **HTTPS**: 프로덕션 환경에서는 반드시 HTTPS를 사용하여 쿠키를 보호해야 합니다

## 🚧 개선 가능한 점

- JWT 토큰 사용
- 서버 사이드 세션 관리
- 토큰 만료 시간 관리
- 비밀번호 암호화
- 사용자 등록 기능
- 데이터베이스 연동

## 📜 라이선스

이 프로젝트는 교육 목적으로 자유롭게 사용할 수 있습니다.

## 🤝 기여

버그 리포트나 기능 제안은 언제든 환영합니다!

---

**개발 환경**: Next.js 15.4.4, Node.js  
**마지막 업데이트**: 2025년 1월
