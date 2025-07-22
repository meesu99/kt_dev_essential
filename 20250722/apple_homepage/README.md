# Apple Homepage Clone 🍎

Apple 공식 홈페이지를 HTML, CSS, JavaScript로 재현한 정적 웹사이트 프로젝트입니다.

## 📸 프로젝트 미리보기

이 프로젝트는 Apple의 공식 홈페이지 디자인과 사용자 경험을 충실히 재현했습니다.

## ✨ 주요 기능

### 🎨 디자인 및 레이아웃
- **Apple 디자인 시스템 구현**: 공식 Apple 홈페이지와 동일한 색상, 타이포그래피, 스페이싱 적용
- **글로벌 네비게이션**: Apple 제품 카테고리별 메뉴 구현
- **반응형 디자인**: 데스크톱, 태블릿, 모바일 기기에 최적화된 반응형 레이아웃

### 🏆 메인 섹션들
- **교육할인 히어로 섹션**: "Buy Mac or iPad for college" 캠페인 구현
- **제품 소개 섹션**: iPhone, MacBook Air, iPad Pro 등 주요 제품 섹션
- **Apple Intelligence**: AI 기능 소개 섹션
- **Apple TV+**: 스트리밍 서비스 콘텐츠 그리드
- **Apple 서비스**: Apple Card, Apple Watch 등 서비스 소개

### 🎯 인터랙티브 요소
- **플로팅 애니메이션**: CSS 키프레임을 활용한 제품 이미지 플로팅 효과
- **호버 효과**: 버튼과 카드 요소에 부드러운 호버 트랜지션
- **스크롤 애니메이션**: 이미지 페이드인 효과 구현
- **반응형 그리드**: 다양한 화면 크기에 맞는 그리드 레이아웃

## 🛠️ 사용된 기술

### Frontend
- **HTML5**: 시맨틱 마크업과 접근성 고려
- **CSS3**: 
  - Flexbox & Grid 레이아웃
  - CSS Variables (사용자 정의 속성)
  - 키프레임 애니메이션
  - 미디어 쿼리를 활용한 반응형 디자인
- **JavaScript (ES6+)**:
  - DOM 조작
  - Intersection Observer API
  - 이벤트 리스너

### 디자인 패턴
- **모바일 퍼스트**: 작은 화면부터 큰 화면으로 확장하는 반응형 접근
- **그리드 시스템**: CSS Grid를 활용한 복잡한 레이아웃 구성
- **컴포넌트 기반 CSS**: 재사용 가능한 CSS 클래스 구조

## 📁 프로젝트 구조

```
apple_homepage/
├── index.html          # 메인 HTML 파일
├── asset/              # 리소스 폴더
│   ├── hero1.jpg       # 히어로 섹션 배경 이미지
│   ├── apple.html      # 참조용 HTML 파일
│   ├── image_link.txt  # 이미지 링크 모음
│   └── apple_homepage_screenshot.jpeg
└── README.md           # 프로젝트 문서
```

## 🚀 시작하기

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd apple_homepage
   ```

2. **웹 서버 실행** (선택사항)
   ```bash
   # Python 3를 사용하는 경우
   python -m http.server 8000
   
   # Node.js의 http-server를 사용하는 경우
   npx http-server .
   
   # Live Server (VS Code 확장) 사용 권장
   ```

3. **브라우저에서 열기**
   - 파일 탐색기에서 `index.html`을 더블클릭하거나
   - 웹 서버를 실행한 경우 `http://localhost:8000`에 접속

## 🎨 주요 구현 특징

### 1. Apple 디자인 언어 구현
- **SF Pro Display 폰트 패밀리** 사용
- **Apple 색상 팔레트** 적용 (#0071e3, #1d1d1f 등)
- **미니멀한 디자인** 철학 반영

### 2. 성능 최적화
- **이미지 최적화**: 적절한 이미지 포맷과 크기 사용
- **CSS 최적화**: 불필요한 스타일 제거 및 효율적인 선택자 사용
- **JavaScript 최적화**: Intersection Observer를 활용한 효율적인 애니메이션

### 3. 접근성 고려사항
- **의미있는 HTML 구조**: 시맨틱 태그 활용
- **키보드 내비게이션**: Tab 키를 이용한 접근 가능
- **스크린 리더 지원**: ARIA 라벨 및 alt 텍스트 제공

## 📱 반응형 브레이크포인트

```css
/* 모바일 우선 접근 */
기본: 모든 화면 크기
@media (max-width: 768px): 태블릿 및 작은 데스크톱
@media (max-width: 480px): 모바일 기기
```

## 🎯 학습 목표 및 성과

이 프로젝트를 통해 다음을 학습하고 구현했습니다:

- **고급 CSS 레이아웃**: Grid와 Flexbox를 조합한 복잡한 레이아웃
- **CSS 애니메이션**: keyframes와 transition을 활용한 부드러운 애니메이션
- **반응형 웹 디자인**: 다양한 기기에서 최적화된 사용자 경험
- **성능 최적화**: 이미지 최적화 및 효율적인 CSS/JS 작성
- **브라우저 호환성**: 크로스 브라우저 지원을 위한 기술 적용

## 🔧 브라우저 호환성

- **Chrome 90+** ✅
- **Firefox 88+** ✅  
- **Safari 14+** ✅
- **Edge 90+** ✅

## 📝 향후 개선 계획

- [ ] **다크 모드 지원** 추가
- [ ] **PWA(Progressive Web App)** 기능 구현
- [ ] **SEO 최적화** 강화
- [ ] **웹 접근성(WCAG 2.1)** 완전 준수
- [ ] **TypeScript** 도입으로 코드 품질 향상

## 🤝 기여하기

이 프로젝트에 기여하고 싶으시다면:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 교육 목적으로 만들어진 Apple 홈페이지의 클론입니다. 
실제 Apple의 디자인과 콘텐츠는 Apple Inc.의 저작권에 속합니다.

## 🙏 감사의 말

- **Apple Inc.**: 훌륭한 디자인 영감 제공
- **웹 개발 커뮤니티**: 기술적 조언과 피드백

---

💡 **Note**: 이 프로젝트는 순수한 HTML, CSS, JavaScript만을 사용하여 구현되었으며, 프레임워크나 라이브러리 없이도 복잡한 웹사이트를 구현할 수 있음을 보여줍니다. 