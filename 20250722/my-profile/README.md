# My Profile 👨‍💻

Next.js와 React를 활용한 현대적이고 인터랙티브한 개인 프로필 웹사이트입니다.

## 🌟 프로젝트 소개

웹 개발자의 포트폴리오 사이트로, 개발 경험, 기술 스택, 관심사, 연락처 정보를 효과적으로 보여주는 반응형 웹 애플리케이션입니다.

## ✨ 주요 기능

### 🎨 사용자 인터페이스
- **모던 디자인**: 그라디언트와 카드 기반의 현대적인 UI
- **반응형 레이아웃**: 모든 기기에서 최적화된 사용자 경험
- **부드러운 애니메이션**: CSS 트랜지션과 호버 효과
- **다크/라이트 테마**: 사용자 선호에 맞는 테마 선택

### 📄 페이지 구성
- **홈 페이지** (`/`): 메인 소개 및 최근 프로젝트 소개
- **소개 페이지** (`/about`): 상세한 개발자 프로필 및 기술 스택
- **즐겨찾기** (`/favorites`): 좋아하는 것들과 관심사 공유
- **연락하기** (`/contact`): 프로필 카드와 연락처 정보

### 🧩 컴포넌트 기반 구조
- **재사용 가능한 컴포넌트**: 모듈화된 코드 구조
- **클라이언트 사이드 렌더링**: 동적인 사용자 인터랙션
- **반응형 그리드 시스템**: 자동 적응형 레이아웃

## 🛠️ 기술 스택

### Frontend Framework
- **Next.js 15.4.2**: React 기반 풀스택 프레임워크
- **React 19.1.0**: 사용자 인터페이스 라이브러리
- **React DOM 19.1.0**: DOM 렌더링 라이브러리

### 스타일링
- **Tailwind CSS 4.1.11**: 유틸리티 우선 CSS 프레임워크
- **PostCSS 8.5.6**: CSS 후처리 도구
- **Autoprefixer 10.4.21**: 벤더 프리픽스 자동 추가

### 개발 도구
- **ESLint 9**: 코드 품질 및 스타일 가이드
- **Turbopack**: Next.js 15의 고성능 번들러
- **Git**: 버전 관리

## 📁 프로젝트 구조

```
my-profile/
├── src/
│   ├── app/                 # App Router 구조
│   │   ├── about/          # 소개 페이지
│   │   │   └── page.js
│   │   ├── contact/        # 연락처 페이지
│   │   │   └── page.js
│   │   ├── favorites/      # 즐겨찾기 페이지
│   │   │   └── page.js
│   │   ├── globals.css     # 글로벌 스타일
│   │   ├── layout.js       # 루트 레이아웃
│   │   ├── page.js         # 홈 페이지
│   │   └── favicon.ico
│   └── components/         # 재사용 가능한 컴포넌트
│       ├── ClientLayout.js # 클라이언트 레이아웃
│       ├── FavoriteItem.js # 즐겨찾기 아이템
│       ├── FavoriteList.js # 즐겨찾기 리스트
│       ├── Footer.js       # 푸터 컴포넌트
│       ├── Header.js       # 헤더 컴포넌트
│       └── ProfileCard.js  # 프로필 카드
├── public/                 # 정적 파일
│   ├── next.svg
│   ├── vercel.svg
│   └── ...
├── package.json
├── tailwind.config.js
├── next.config.mjs
├── postcss.config.mjs
├── eslint.config.mjs
├── jsconfig.json
└── README.md
```

## 🚀 시작하기

### 설치

1. **의존성 설치**
   ```bash
   npm install
   ```

### 개발 서버 실행

```bash
# 개발 모드 (Turbopack 사용)
npm run dev

# 또는 기존 Webpack
npm run dev -- --webpack
```

브라우저에서 [http://localhost:3000](http://localhost:3000)를 열어 결과를 확인하세요.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 🎨 주요 페이지 소개

### 1. 홈 페이지 (`/`)
- **개발자 소개**: 간단한 자기소개와 개발 철학
- **기술 스택 배지**: 사용 기술들을 시각적으로 표현
- **최근 프로젝트**: 현재 진행 중인 학습 및 프로젝트 소개
- **인터랙티브 카드**: 호버 효과와 부드러운 애니메이션

### 2. 소개 페이지 (`/about`)
- **상세 프로필**: 개발자로서의 여정과 관심사
- **기술 스택**: 보유 기술과 학습 중인 기술들
- **학습 목표**: 향후 계획과 목표
- **애니메이션 효과**: 스크롤 기반 요소 등장 효과

### 3. 즐겨찾기 페이지 (`/favorites`)
- **개인 관심사**: 취미, 음악, 책, 음식 등
- **리스트 관리**: 동적 즐겨찾기 추가/제거 기능
- **카테고리 분류**: 다양한 관심사를 체계적으로 정리

### 4. 연락하기 페이지 (`/contact`)
- **프로필 카드**: 연락처 정보와 소셜 링크
- **연락 가이드라인**: 연락 시 참고사항
- **반응형 디자인**: 모바일에서도 편리한 연락처 접근

## 🎯 핵심 컴포넌트

### ProfileCard.js
```javascript
// 재사용 가능한 프로필 카드 컴포넌트
- 연락처 정보 동적 렌더링
- 소셜 링크 자동 연결
- 호버 효과 및 반응형 디자인
- 커스터마이징 가능한 props 시스템
```

### ClientLayout.js
```javascript
// 클라이언트 사이드 레이아웃 컴포넌트
- 전역 상태 관리
- 테마 변경 기능
- 네비게이션 제어
```

## 📱 반응형 디자인

### Tailwind CSS 브레이크포인트
- **sm**: 640px 이상 (모바일 가로)
- **md**: 768px 이상 (태블릿)
- **lg**: 1024px 이상 (데스크톱)
- **xl**: 1280px 이상 (대형 데스크톱)

### 그리드 시스템
```css
/* 자동 적응형 그리드 */
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))

/* 반응형 푸터 그리드 */
md:grid-cols-2 lg:grid-cols-4
```

## ⚡ 성능 최적화

### Next.js 15 최적화 기능
- **Turbopack**: 빠른 개발 서버 및 빌드
- **App Router**: 향상된 라우팅 성능
- **이미지 최적화**: 자동 이미지 압축 및 포맷 변환
- **코드 스플리팅**: 페이지별 자동 코드 분할

### 사용자 경험 최적화
- **Lazy Loading**: 컴포넌트 지연 로딩
- **CSS 최적화**: Tailwind의 PurgeCSS로 불필요한 CSS 제거
- **인터랙션 피드백**: 즉각적인 시각적 피드백

## 🎨 커스터마이징

### 테마 색상 변경
`tailwind.config.js`에서 커스텀 색상을 정의할 수 있습니다:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#7c3aed',
      }
    }
  }
}
```

### 컴포넌트 스타일 수정
각 컴포넌트는 Tailwind 클래스를 사용하여 쉽게 스타일을 변경할 수 있습니다.

## 📋 개발 스크립트

```json
{
  "dev": "next dev --turbopack",      // 개발 서버 (Turbopack)
  "build": "next build",             // 프로덕션 빌드
  "start": "next start",             // 프로덕션 서버
  "lint": "next lint"                // ESLint 실행
}
```

## 🔧 설정 파일

### next.config.mjs
- Next.js 설정 및 최적화 옵션

### tailwind.config.js
- Tailwind CSS 커스터마이징

### eslint.config.mjs
- 코드 품질 관리 규칙

## 📈 향후 개발 계획

- [ ] **TypeScript 마이그레이션**: 타입 안정성 향상
- [ ] **데이터베이스 연동**: 즐겨찾기 데이터 영구 저장
- [ ] **블로그 기능**: 개발 일지 및 기술 포스트 추가
- [ ] **프로젝트 포트폴리오**: 완성된 프로젝트 갤러리
- [ ] **다국어 지원**: 영어/한국어 언어 전환
- [ ] **PWA 기능**: 모바일 앱과 같은 경험 제공
- [ ] **SEO 최적화**: 검색 엔진 최적화 강화

## 🤝 기여하기

이 프로젝트는 학습 목적으로 만들어졌지만, 개선 제안은 언제나 환영입니다!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 학습 노트

### 배운 것들
- **Next.js App Router**: 최신 라우팅 시스템 활용
- **React Hooks**: useState, useEffect 등 훅 활용
- **Tailwind CSS**: 유틸리티 우선 스타일링 접근
- **반응형 웹 디자인**: 모바일 퍼스트 접근법
- **컴포넌트 설계**: 재사용 가능한 컴포넌트 구조

### 도전했던 부분
- **성능 최적화**: 렌더링 최적화와 번들 크기 관리
- **접근성**: 키보드 내비게이션과 스크린 리더 지원
- **크로스 브라우저 호환성**: 다양한 브라우저에서의 일관된 경험

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🙏 감사의 말

- **Next.js 팀**: 훌륭한 프레임워크 제공
- **Tailwind CSS**: 효율적인 스타일링 도구
- **React 커뮤니티**: 지속적인 영감과 학습 자료
- **개발자 커뮤니티**: 피드백과 조언

---

💡 **개발자 메모**: 이 프로젝트는 실제 학습 과정을 반영하여 지속적으로 업데이트됩니다. 코드 리뷰나 개선 제안은 언제든 환영합니다!
