# 🚀 App Routing Practice

Next.js App Router와 API Routes를 학습하기 위한 실습 프로젝트입니다.

## 📋 프로젝트 개요

이 프로젝트는 Next.js의 App Router 시스템을 사용하여 다음과 같은 기능들을 실습할 수 있습니다:
- **App Router** 구조와 페이지 라우팅
- **API Routes** 구현 및 HTTP 메서드 처리
- **외부 API 호출** 및 데이터 페칭
- **Async/Await** 패턴 활용
- **다크모드** 구현
- **Tailwind CSS**를 활용한 반응형 UI

## ✨ 주요 기능

### 🏠 홈페이지 (`/`)
- 외부 API (JSONPlaceholder)에서 게시글 데이터 fetch
- 로컬 Hello API 호출 및 응답 데이터 표시
- 다크모드/라이트모드 토글 기능
- 로딩 상태 및 에러 처리
- 반응형 카드 레이아웃

### 🛍️ 상품 페이지 (`/products`)
- 로컬 Products API에서 상품 목록 조회
- 새 상품 추가 기능 (POST 요청)
- HTTP 상태코드 및 헤더 정보 콘솔 출력
- 상품 카드 UI와 장바구니 기능 (UI만)

### ℹ️ 소개 페이지 (`/about`)
- 간단한 회사 소개 페이지

### 🔌 API Routes
- **`/api/hello`**: GET/POST 메서드 지원, 다국어 인사말 및 랜덤 데이터 반환
- **`/api/products`**: GET/POST 메서드 지원, 상품 목록 조회 및 추가

## 🛠 기술 스택

- **Next.js** 15.4.3 (App Router)
- **React** 19.1.0
- **Tailwind CSS** 4.0
- **JavaScript** (ES6+)

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 3. 기타 스크립트
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# ESLint 검사
npm run lint
```

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── about/
│   │   └── page.js              # 소개 페이지
│   ├── api/
│   │   ├── hello/
│   │   │   └── route.js         # Hello API 라우트
│   │   └── products/
│   │       └── route.js         # Products API 라우트
│   ├── products/
│   │   └── page.js              # 상품 목록 페이지
│   ├── globals.css              # 전역 스타일
│   ├── layout.js                # 루트 레이아웃
│   └── page.js                  # 홈페이지
└── public/                      # 정적 파일들
```

## 🎯 학습 포인트

### 1. App Router 구조
- 파일 기반 라우팅 시스템
- `page.js`로 페이지 컴포넌트 정의
- `layout.js`로 공통 레이아웃 구성

### 2. API Routes
- `route.js` 파일로 API 엔드포인트 생성
- HTTP 메서드별 함수 정의 (GET, POST)
- `NextResponse`를 활용한 응답 처리

### 3. 데이터 페칭
- `fetch()` API 사용
- Async/Await 패턴 적용
- 로딩 상태 및 에러 처리

### 4. 상태 관리
- `useState`로 컴포넌트 상태 관리
- `useEffect`로 사이드 이펙트 처리
- localStorage를 활용한 다크모드 설정 저장

## 🔍 API 엔드포인트

### GET `/api/hello`
Hello 메시지와 랜덤 데이터를 반환합니다.

**응답 예시:**
```json
{
  "message": "안녕하세요! Hello API입니다 👋",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "status": "success",
  "data": {
    "greeting": "Hello World!",
    "korean": "안녕하세요!",
    "random": 42
  }
}
```

### GET `/api/products`
상품 목록을 반환합니다.

**응답 예시:**
```json
[
  { "id": 1, "title": "키보드", "price": 30000 },
  { "id": 2, "title": "마우스", "price": 15000 }
]
```

### POST `/api/products`
새 상품을 추가합니다.

**요청 본문:**
```json
{
  "title": "모니터",
  "price": 200000
}
```

## 🎨 UI 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **다크모드**: 시스템 설정 감지 및 수동 토글
- **부드러운 애니메이션**: Tailwind CSS 트랜지션 효과
- **모던한 카드 레이아웃**: 그림자와 호버 효과
- **직관적인 UI/UX**: 이모지와 명확한 버튼 텍스트

## 🌟 추가 개선 아이디어

- [ ] 상품 삭제 기능 추가
- [ ] 페이지네이션 구현
- [ ] 검색 및 필터링 기능
- [ ] 장바구니 상태 관리
- [ ] 이미지 업로드 기능
- [ ] 사용자 인증 시스템

## 📚 학습 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)

---

💡 **팁**: 개발자 도구의 콘솔을 열어 API 호출 과정과 HTTP 상태 정보를 자세히 확인해보세요!
