# 🛍️ 상품 관리 시스템 (Product Management System)

Next.js를 활용한 로그인 기능이 포함된 상품 관리 시스템입니다. 실습을 통해 **React Hooks**, **Cookie 인증**, **외부 API 연동**, **미들웨어** 등의 핵심 웹 개발 기술을 학습할 수 있습니다.

## 🎯 프로젝트 개요

이 프로젝트는 다음과 같은 흐름으로 동작합니다:

```
[ 홈페이지 (/) ] → [ 로그인 (/login) ] → [ 상품 목록 (/products) ]
                           ↓                        ↓
[ 로그아웃 (/logout) ] ← [ 보호된 페이지 (/protected) ] ← [ 상품 등록 (/add-product) ]
```

## ✨ 주요 기능

### 🔐 **인증 시스템**
- **로그인**: 간단한 폼 기반 로그인 (쿠키 저장)
- **자동 만료**: 10분 후 자동 로그아웃
- **실시간 타이머**: 각 페이지에서 남은 시간 표시
- **미들웨어 보호**: 서버 레벨에서 `/protected` 경로 보호
- **전용 로그아웃 페이지**: 안전한 로그아웃 프로세스

### 📋 **상품 관리**
- **목록 조회**: JSONPlaceholder API를 통한 상품 목록 표시
- **상품 등록**: 새로운 상품 등록 폼 (가짜 POST 요청)
- **상품 삭제**: 개별 상품 삭제 기능 (DELETE 요청)
- **실시간 업데이트**: API 요청 후 즉시 UI 반영

### 🛡️ **보안 기능**
- **쿠키 기반 인증**: `document.cookie`를 활용한 클라이언트 사이드 인증
- **만료 시간 관리**: 자동 만료 및 수동 로그아웃
- **라우트 보호**: Next.js 미들웨어를 통한 페이지 접근 제어

## 🛠️ 기술 스택

| 분야 | 기술 |
|------|------|
| **프레임워크** | Next.js 14 (App Router) |
| **라이브러리** | React 18 |
| **스타일링** | Tailwind CSS |
| **상태 관리** | React Hooks (useState, useEffect) |
| **HTTP 클라이언트** | Fetch API |
| **인증** | Cookie 기반 인증 |
| **라우팅** | Next.js App Router + 미들웨어 |
| **외부 API** | JSONPlaceholder (테스트용) |

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone <repository-url>
cd frontend-login-demo

# 의존성 설치
npm install
```

### 실행
```bash
# 개발 서버 시작
npm run dev

# 브라우저에서 접속
# http://localhost:3000
```

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

## 📁 프로젝트 구조

```
frontend-login-demo/
├── src/
│   ├── app/                    # App Router 페이지들
│   │   ├── page.js            # 홈페이지 (/)
│   │   ├── layout.js          # 공통 레이아웃
│   │   ├── globals.css        # 전역 스타일
│   │   ├── login/
│   │   │   └── page.js        # 로그인 페이지
│   │   ├── products/
│   │   │   └── page.js        # 상품 목록 페이지
│   │   ├── add-product/
│   │   │   └── page.js        # 상품 등록 페이지
│   │   ├── protected/
│   │   │   └── page.js        # 보호된 페이지
│   │   └── logout/
│   │       └── page.js        # 로그아웃 페이지
│   └── utils/
│       └── auth.js            # 인증 관련 유틸리티 함수
├── middleware.js              # Next.js 미들웨어 (라우트 보호)
├── public/                    # 정적 파일들
├── package.json
└── README.md
```

## 📖 페이지별 상세 기능

### 🏠 **홈페이지 (`/`)**
- 프로젝트 소개 및 기능 설명
- 각 페이지로의 네비게이션 링크
- 기술 스택 및 구현 기능 소개

### 🔐 **로그인 페이지 (`/login`)**
- 사용자명/비밀번호 입력 폼
- 로그인 성공 시 쿠키 저장 (`auth=authenticated`, `authExpiration=시간`)
- 자동으로 `/products` 페이지로 리디렉션

### 📋 **상품 목록 페이지 (`/products`)**
- JSONPlaceholder API에서 상품 목록 조회 (`GET /posts`)
- 각 상품 카드에 삭제 버튼 (`DELETE /posts/:id`)
- 헤더에 로그인 만료 시간 실시간 표시
- 다른 페이지로의 네비게이션 링크

### ➕ **상품 등록 페이지 (`/add-product`)**
- 상품명, 설명, 사용자 ID 입력 폼
- 폼 제출 시 가짜 POST 요청 (`POST /posts`)
- 성공/실패 결과 표시
- 등록 후 폼 초기화

### 🛡️ **보호된 페이지 (`/protected`)**
- 미들웨어에 의해 보호되는 페이지
- 인증 정보 및 쿠키 상태 표시
- 남은 로그인 시간 실시간 표시
- 테스트 버튼들 (쿠키 확인, 로그아웃 등)

### 👋 **로그아웃 페이지 (`/logout`)**
- 모든 인증 쿠키 삭제
- 5초 카운트다운 후 홈으로 자동 이동
- 즉시 이동 및 다른 페이지로의 바로가기 링크

## 🔧 API 사용법

### 사용하는 외부 API
모든 API 요청은 [JSONPlaceholder](https://jsonplaceholder.typicode.com/)를 사용합니다.

```javascript
// 상품 목록 조회
GET https://jsonplaceholder.typicode.com/posts

// 상품 등록 (가짜 요청)
POST https://jsonplaceholder.typicode.com/posts
Content-Type: application/json
{
  "title": "상품명",
  "body": "상품 설명",  
  "userId": 1
}

// 상품 삭제 (가짜 요청)
DELETE https://jsonplaceholder.typicode.com/posts/:id
```

### 인증 쿠키 구조
```javascript
// 인증 토큰
document.cookie = "auth=authenticated; path=/; max-age=600";

// 만료 시간 (ISO 형식)
document.cookie = "authExpiration=2024-01-01T12:00:00.000Z; path=/; max-age=600";
```

## 🧪 테스트 시나리오

### 1. **기본 플로우 테스트**
1. 홈페이지(`/`) 접속 → "시작하기" 클릭
2. 로그인 페이지에서 임의의 사용자명/비밀번호 입력
3. 상품 목록 페이지에서 API로 불러온 데이터 확인
4. 상품 등록 페이지에서 새 상품 등록
5. 보호된 페이지에서 인증 정보 확인

### 2. **상품 삭제 테스트**
1. `/products` 페이지에서 임의 상품의 "삭제" 버튼 클릭
2. 확인 다이얼로그에서 "확인" 선택
3. 개발자 도구 Network 탭에서 DELETE 요청 확인
4. 해당 상품이 목록에서 제거되는 것 확인

### 3. **로그인 만료 테스트**
1. 로그인 후 임의 페이지에서 대기
2. 헤더의 카운트다운 타이머 관찰 (10분)
3. 만료 시 자동으로 로그인 페이지로 리디렉션 확인

### 4. **로그아웃 테스트**
1. "로그아웃 페이지" 링크 클릭
2. `/logout` 페이지에서 5초 카운트다운 관찰
3. 홈으로 자동 이동 후 보호된 페이지 접근 시 로그인 페이지로 리디렉션 확인

## 🔍 개발자 도구 활용

### Network 탭에서 확인할 수 있는 것들
- **GET** 요청: 상품 목록 조회 시
- **POST** 요청: 상품 등록 시 
- **DELETE** 요청: 상품 삭제 시

### Application 탭에서 확인할 수 있는 것들
- **Cookies**: `auth`, `authExpiration` 쿠키 상태
- **Storage**: 현재는 사용하지 않음

### Console 탭에서 확인할 수 있는 것들
- API 요청/응답 로그
- 에러 메시지
- 디버그 정보

## 🎓 학습 포인트

이 프로젝트를 통해 학습할 수 있는 핵심 개념들:

### React/Next.js
- **useState**: 컴포넌트 상태 관리
- **useEffect**: 생명주기 및 부수 효과 처리
- **App Router**: Next.js 13+ 라우팅 시스템
- **Client vs Server Components**: 'use client' 지시어 활용

### HTTP & API
- **Fetch API**: 외부 API와의 통신
- **HTTP Methods**: GET, POST, DELETE 요청
- **JSON**: 데이터 직렬화/역직렬화
- **Error Handling**: 네트워크 에러 처리

### 인증 & 보안
- **Cookie**: 브라우저 쿠키를 통한 상태 관리
- **Middleware**: 서버 사이드 라우트 보호
- **Session Management**: 로그인/로그아웃 플로우

### UX/UI
- **Loading States**: 로딩 상태 표시
- **Error States**: 에러 상태 처리
- **Responsive Design**: 모바일 친화적 디자인
- **Real-time Updates**: 실시간 타이머 및 상태 업데이트

## 🐛 알려진 제한사항

1. **가짜 API**: JSONPlaceholder는 실제로 데이터를 저장하지 않습니다
2. **간단한 인증**: 실제 프로덕션에서는 JWT나 OAuth 등을 사용해야 합니다
3. **클라이언트 사이드 인증**: 서버 사이드 인증 검증이 부족합니다
4. **에러 처리**: 더 세밀한 에러 처리가 필요할 수 있습니다

## 🔮 향후 개선 방향

- [ ] **실제 백엔드 API** 연동
- [ ] **JWT 토큰** 기반 인증 시스템
- [ ] **상품 상세 페이지** 추가
- [ ] **페이지네이션** 구현
- [ ] **검색 기능** 추가
- [ ] **이미지 업로드** 기능
- [ ] **사용자 관리** 기능
- [ ] **테스트 코드** 작성

## 📄 라이선스

이 프로젝트는 교육 목적으로 만들어졌습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**📞 문의사항이 있으시면 언제든 연락주세요!**

이 프로젝트가 웹 개발 학습에 도움이 되길 바랍니다. 🚀
