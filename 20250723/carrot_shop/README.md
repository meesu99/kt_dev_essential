# 🥕 당근마켓 클론

> **Next.js**와 **Tailwind CSS**로 구현한 당근마켓 스타일의 중고거래 플랫폼

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.0-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4?style=flat-square&logo=tailwindcss)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)

## 📖 프로젝트 소개

실제 당근마켓과 동일한 UI/UX를 제공하는 중고거래 웹 애플리케이션입니다. 사용자가 상품을 등록하고, 검색하고, 상세 정보를 확인할 수 있는 완전한 기능을 제공합니다.

### ✨ 주요 특징

- 🎨 **당근마켓과 동일한 디자인**: 실제 당근마켓의 UI/UX를 완벽 재현
- 📱 **완전 반응형**: 데스크톱, 태블릿, 모바일 모든 기기에서 최적화
- ⚡ **실시간 검색**: 상품명, 설명, 지역 검색 지원
- 🏷️ **카테고리 필터링**: 디지털기기, 가구, 가전 등 카테고리별 분류
- 📊 **다양한 정렬**: 최신순, 가격순(오름/내림차순) 정렬
- 🖼️ **이미지 뷰어**: 전체화면 모달과 다중 이미지 지원
- 💾 **로컬 저장**: 브라우저 로컬 스토리지를 통한 데이터 저장

## 🚀 주요 기능

### 🏠 홈페이지
- **히어로 섹션**: 당근마켓 브랜딩과 CTA 버튼
- **카테고리 영역**: 8개 주요 카테고리 아이콘과 상품 수 표시
- **인기 상품**: 최신 등록 상품들의 카드형 레이아웃
- **통계 섹션**: 사용자 수, 만족도 등 서비스 통계
- **CTA 섹션**: 앱 다운로드 및 서비스 이용 유도

### 🛍️ 상품 목록 (Products)
- **통합 검색창**: 실시간 키워드 검색
- **카테고리 필터**: 클릭 한 번으로 카테고리별 필터링
- **다중 정렬**: 최신순 / 낮은 가격순 / 높은 가격순
- **상품 카드**: 이미지, 제목, 가격, 위치, 시간, 좋아요/채팅 수
- **상태 표시**: 판매중, 예약중, 판매완료 배지
- **빈 상태 처리**: 검색 결과 없을 때 친화적인 안내

### 📄 상품 상세페이지
- **고품질 이미지**: 4:3 비율 최적화 + 전체화면 모달
- **다중 이미지**: 여러 사진 좌우 슬라이드 (키보드 지원)
- **상품 정보**: 제목, 가격, 위치, 시간, 조회수, 상세 설명
- **판매자 정보**: 프로필 사진, 이름, 평점, 리뷰 수, 응답률
- **상호작용**: 좋아요 토글, 채팅하기 버튼
- **공유 기능**: 상품 링크 공유 버튼

### ✍️ 상품 등록
- **이미지 업로드**: 사진 선택 및 미리보기
- **상품 정보 입력**: 제목, 카테고리, 지역, 가격, 상세 설명
- **폼 검증**: 필수 항목 체크 및 유효성 검사
- **나눔 지원**: 0원 입력으로 나눔 상품 등록
- **안전 안내**: 안전거래 주의사항 안내

### 🔍 검색 & 필터링
- **헤더 검색창**: 전역 검색 후 상품 페이지로 이동
- **페이지 내 검색**: 상품 페이지 내 실시간 검색
- **멀티 필터**: 카테고리 + 키워드 + 정렬 동시 적용
- **URL 파라미터**: 검색 상태를 URL에 반영하여 공유 가능

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **UI Library**: Headless UI components with custom styling

### 데이터 관리
- **상태 관리**: React useState, useEffect hooks
- **로컬 저장소**: Browser LocalStorage API
- **라우팅**: Next.js App Router

### 개발 도구
- **Linting**: ESLint
- **Code Formatting**: Prettier (내장)
- **Build Tool**: Next.js built-in build system

## 📦 설치 및 실행

### 요구사항
- Node.js 18.0 이상
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone <repository-url>
cd carrot_shop

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속

### 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
carrot_shop/
├── src/
│   └── app/
│       ├── components/           # 재사용 컴포넌트
│       │   ├── Header.jsx       # 네비게이션 헤더
│       │   └── ProductCard.jsx  # 상품 카드 컴포넌트
│       ├── products/            # 상품 관련 페이지
│       │   ├── page.jsx         # 상품 목록 페이지
│       │   └── [id]/
│       │       └── page.jsx     # 상품 상세 페이지
│       ├── add-product/         # 상품 등록 페이지
│       │   └── page.jsx
│       ├── layout.js            # 루트 레이아웃
│       ├── page.js              # 홈페이지
│       └── globals.css          # 전역 스타일
├── public/                      # 정적 파일
├── package.json
└── README.md
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary Orange**: `#FF6B35` (당근마켓 브랜드 컬러)
- **Gray Scale**: `gray-50` ~ `gray-900` (Tailwind CSS)
- **State Colors**: 
  - 예약중: `green-500`
  - 판매완료: `gray-500`
  - 좋아요: `red-500`

### 타이포그래피
- **Font Family**: Geist Sans (Next.js 기본 폰트)
- **Font Sizes**: `text-xs` ~ `text-6xl` (Tailwind CSS)

### 컴포넌트
- **Card**: 둥근 모서리 + 그림자 효과
- **Button**: 라운드 코너 + 호버 효과
- **Input**: 포커스 시 orange ring 효과

## 📱 반응형 브레이크포인트

```css
sm:  640px   /* 모바일 */
md:  768px   /* 태블릿 */
lg:  1024px  /* 데스크톱 */
xl:  1280px  /* 대형 데스크톱 */
```

## 🔮 향후 개발 계획

### Phase 1 - 사용자 시스템
- [ ] 회원가입 / 로그인 기능
- [ ] 사용자 프로필 관리
- [ ] 마이페이지 (판매/구매 내역)

### Phase 2 - 실시간 기능
- [ ] 실시간 채팅 시스템
- [ ] 알림 기능 (새 메시지, 관심상품 가격변동)
- [ ] 실시간 상품 업데이트

### Phase 3 - 고급 기능
- [ ] 결제 시스템 연동
- [ ] 지도 기반 위치 서비스
- [ ] 상품 리뷰 및 평점 시스템
- [ ] 안전거래 에스크로 서비스

### Phase 4 - 확장성
- [ ] 모바일 앱 (React Native)
- [ ] 관리자 대시보드
- [ ] 데이터 분석 및 추천 시스템

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

## 👨‍💻 개발자

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 감사인사

- [당근마켓](https://www.daangn.com/) - 디자인 영감
- [Next.js](https://nextjs.org/) - 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - 스타일링
- [Unsplash](https://unsplash.com/) - 고품질 이미지 제공

---

⭐ 이 프로젝트가 도움이 되었다면 별점을 눌러주세요!
