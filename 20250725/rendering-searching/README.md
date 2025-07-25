# 🔍 CSR vs SSR 검색 앱

Next.js에서 **Client-Side Rendering(CSR)**과 **Server-Side Rendering(SSR)**의 차이점을 직접 체험할 수 있는 실습 프로젝트입니다.

## 📋 프로젝트 개요

이 프로젝트는 Next.js의 두 가지 렌더링 방식을 비교 학습하기 위해 제작된 교육용 애플리케이션입니다. 동일한 검색 기능을 CSR과 SSR 방식으로 각각 구현하여, 실제 사용자 경험과 개발 방식의 차이점을 명확하게 이해할 수 있습니다.

## ✨ 주요 기능

### 🏠 홈페이지
- CSR과 SSR 페이지로의 직관적인 네비게이션
- 각 렌더링 방식의 특징 설명
- 모던하고 반응형 UI 디자인

### ⚡ CSR 페이지 (`/csr`)
- **클라이언트 사이드 렌더링** 구현
- `useState`, `useEffect` Hook 활용
- 브라우저에서 실시간 데이터 로딩 및 검색
- 로딩 상태 관리 (스피너, 진행 상태)
- 즉각적인 사용자 상호작용

### 🚀 SSR 페이지 (`/ssr`)
- **서버 사이드 렌더링** 구현
- 서버에서 데이터 미리 로딩
- URL 파라미터 기반 검색 상태 관리
- SEO 최적화된 완성된 HTML 제공
- 페이지 새로고침 시에도 상태 유지

### 🔍 공통 검색 기능
- JSONPlaceholder API를 통한 포스트 검색
- 초기 진입 시 전체 100개 포스트 표시
- 검색어 기반 실시간 필터링
- 검색 결과가 없을 때 적절한 안내 메시지
- 검색 초기화 기능

## 🛠 기술 스택

- **프레임워크**: Next.js 15.4.4
- **언어**: JavaScript (React 19.1.0)
- **스타일링**: TailwindCSS 4
- **외부 API**: JSONPlaceholder (https://jsonplaceholder.typicode.com)
- **개발 도구**: ESLint, Turbopack

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd rendering-searching
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
```
http://localhost:3000
```

## 📁 프로젝트 구조

```
rendering-searching/
├── src/
│   └── app/
│       ├── layout.js          # 전체 레이아웃
│       ├── page.js            # 홈페이지 (네비게이션)
│       ├── globals.css        # 전역 스타일
│       ├── csr/
│       │   └── page.js        # CSR 구현 페이지
│       └── ssr/
│           ├── page.js        # SSR 구현 페이지
│           └── SearchForm.js  # 검색 폼 클라이언트 컴포넌트
├── public/                    # 정적 파일
├── package.json
└── README.md
```

## 🆚 CSR vs SSR 비교

| 특징 | CSR (Client-Side) | SSR (Server-Side) |
|------|------------------|-------------------|
| **초기 로딩** | 빈 화면 → 로딩 → 데이터 | 즉시 완성된 HTML |
| **데이터 로딩** | 브라우저에서 API 호출 | 서버에서 미리 로딩 |
| **상태 관리** | JavaScript 상태 | URL 파라미터 |
| **사용자 경험** | 로딩 중 대기 필요 | 즉시 콘텐츠 확인 |
| **상호작용** | 즉각적인 반응 | 페이지 이동 필요 |
| **SEO** | 불리함 | 유리함 |
| **새로고침** | 상태 초기화 | 상태 유지 |

## 📱 사용 방법

### 1. 홈페이지에서 방식 선택
- **CSR 방식**: 클라이언트 사이드 렌더링 체험
- **SSR 방식**: 서버 사이드 렌더링 체험

### 2. 검색 기능 테스트
- **전체 데이터**: 초기 진입 시 100개 포스트 확인
- **검색 테스트**: 다음 검색어로 테스트
  - `qui` - 여러 결과
  - `est` - 많은 결과
  - `sunt` - 일부 결과
  - `xyz` - 결과 없음

### 3. 차이점 체험
- **로딩 속도**: CSR의 로딩 vs SSR의 즉시 표시
- **상태 유지**: 검색 후 페이지 새로고침 비교
- **사용자 경험**: 각 방식의 장단점 체험

## 🎯 학습 포인트

### React Hooks 활용
```javascript
// CSR에서 상태 관리
const [searchTerm, setSearchTerm] = useState('');
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(true);

// 데이터 로딩
useEffect(() => {
  // API 호출 로직
}, []);
```

### Next.js App Router
```javascript
// SSR 구현
export default async function SSRPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const results = await fetchPosts(searchParams?.q);
  // 서버에서 미리 렌더링
}
```

### 비동기 처리 패턴
- **CSR**: `fetch` + `async/await` + 상태 관리
- **SSR**: 서버 컴포넌트에서 직접 데이터 페칭

## 🎨 UI/UX 특징

- **모던 디자인**: TailwindCSS 기반 그라데이션과 애니메이션
- **반응형**: 모바일부터 데스크톱까지 대응
- **접근성**: 적절한 색상 대비와 키보드 네비게이션
- **로딩 상태**: 스피너와 프로그레스 인디케이터
- **에러 처리**: 네트워크 오류 시 안내 메시지

## 🔧 개발 시 고려사항

### CSR 구현 포인트
```javascript
'use client'; // 클라이언트 컴포넌트 명시
// useState, useEffect 활용
// 로딩 상태 관리 필수
// 에러 핸들링 구현
```

### SSR 구현 포인트
```javascript
// 서버 컴포넌트 (기본값)
// searchParams await 처리 (Next.js 15)
// cache: 'no-store' 옵션
// 클라이언트 컴포넌트 분리
```

## 📈 확장 가능성

- **검색 필터 추가**: 작성자, 카테고리별 필터링
- **페이지네이션**: 대용량 데이터 처리
- **실시간 검색**: 디바운스 적용 자동 검색
- **즐겨찾기**: 로컬 스토리지 활용
- **다크모드**: 테마 전환 기능

## 🤝 기여하기

이 프로젝트는 학습 목적으로 제작되었습니다. 개선 아이디어나 버그 리포트는 언제든 환영합니다!

## 📄 라이선스

MIT License - 자유롭게 학습 및 참고 목적으로 사용하세요.

---

**🎓 학습 목표 달성 체크리스트**
- [ ] CSR과 SSR의 동작 방식 차이 이해
- [ ] React Hooks (useState, useEffect) 활용
- [ ] Next.js App Router 구조 파악
- [ ] 비동기 데이터 처리 방법 습득
- [ ] 사용자 경험 관점에서의 렌더링 방식 비교
- [ ] 실무에서의 렌더링 방식 선택 기준 이해
