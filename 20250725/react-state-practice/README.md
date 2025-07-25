# React 상태 관리 실습 프로젝트

> 100개의 상태와 Context API를 활용한 React 상태 관리 학습 프로젝트

## 📋 프로젝트 소개

이 프로젝트는 React의 다양한 상태 관리 패턴을 학습하고 실습하기 위해 만들어진 교육용 애플리케이션입니다. 총 100개의 상태를 3가지 서로 다른 방법으로 관리하며, Context API를 활용한 전역 다크모드 기능을 포함합니다.

## ✨ 주요 기능

### 🔢 100개 상태 관리
- **20개 개별 useState**: 각각 독립적인 상태 관리
- **30개 객체 상태**: 하나의 객체로 여러 상태 통합 관리
- **50개 useReducer 복합 상태**: 복잡한 상태 로직을 reducer로 관리
  - 카운터 20개
  - 토글 스위치 15개
  - 텍스트 입력 10개
  - 슬라이더 5개

### 🌙 다크모드 테마 시스템
- **3단계 테마 토글**: Light → Dark → System
- **Context API 전역 상태 관리**
- **Tailwind CSS v4.1 최신 다크모드 설정**
- **로컬 스토리지 설정 저장**
- **시스템 테마 자동 감지 및 변경 추적**

### 📊 실시간 통계 대시보드
- 총 상태 개수 (100개)
- 각 섹션별 상태 합계
- 전체 상태 값의 총합
- 실시간 업데이트

### 🎨 사용자 인터페이스
- **반응형 디자인** (모바일, 태블릿, 데스크톱)
- **부드러운 애니메이션** 및 전환 효과
- **직관적인 컨트롤** (버튼, 체크박스, 슬라이더, 입력 필드)
- **접근성 고려** (키보드 네비게이션, ARIA 레이블)

## 🛠 기술 스택

### Frontend
- **Next.js** `15.4.4` - React 프레임워크
- **React** `18+` - UI 라이브러리
- **Tailwind CSS** `v4.1` - 스타일링
- **JavaScript (ES6+)** - 프로그래밍 언어

### 상태 관리
- **useState** - 로컬 상태 관리
- **useReducer** - 복잡한 상태 로직
- **Context API** - 전역 상태 관리
- **useCallback** - 성능 최적화

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Turbopack** - 빠른 번들링

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone <repository-url>
cd react-state-practice

# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm start
```

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── contexts/
│   │   └── ThemeContext.js          # 테마 Context API
│   ├── globals.css                  # 전역 스타일 및 다크모드 설정
│   ├── layout.js                    # 루트 레이아웃
│   └── page.js                      # 메인 페이지 컴포넌트
├── public/                          # 정적 파일
│   ├── next.svg
│   └── ...
├── tailwind.config.js               # Tailwind CSS 설정
├── next.config.mjs                  # Next.js 설정
├── package.json                     # 프로젝트 의존성
└── README.md                        # 프로젝트 문서
```

## 🎯 상태 관리 패턴

### 1. 개별 useState (20개)
```javascript
const [individualStates, setIndividualStates] = useState(
  Array.from({ length: 20 }, (_, i) => ({ 
    id: i, 
    value: 0, 
    active: false 
  }))
);
```
**특징**: 간단한 배열 상태, 각 아이템별 독립적 업데이트

### 2. 객체 상태 관리 (30개)
```javascript
const [objectStates, setObjectStates] = useState(
  Object.fromEntries(
    Array.from({ length: 30 }, (_, i) => [
      `item_${i}`, 
      { counter: 0, text: `아이템 ${i}`, checked: false }
    ])
  )
);
```
**특징**: 키-값 쌍으로 구성된 객체, 중첩 상태 업데이트

### 3. useReducer 복합 상태 (50개)
```javascript
const [complexState, dispatch] = useReducer(stateReducer, {
  counters: { /* 20개 */ },
  toggles: { /* 15개 */ },
  texts: { /* 10개 */ },
  sliders: { /* 5개 */ }
});
```
**특징**: 액션 기반 상태 변경, 복잡한 상태 로직 분리

## 🌙 다크모드 구현

### Tailwind CSS v4.1 설정
```css
/* globals.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

### Context API 활용
```javascript
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // 테마 적용 로직
  const applyTheme = (newTheme) => {
    // Light → Dark → System 순환
  };
}
```

### 3단계 테마 시스템
- **Light**: 밝은 테마 고정
- **Dark**: 어두운 테마 고정
- **System**: 운영체제 설정 자동 추적

## 🎓 학습 목표

이 프로젝트를 통해 다음을 학습할 수 있습니다:

### React 상태 관리
- [ ] `useState`를 활용한 기본 상태 관리
- [ ] `useReducer`를 활용한 복잡한 상태 로직
- [ ] Context API를 활용한 전역 상태 관리
- [ ] `useCallback`을 활용한 성능 최적화
- [ ] 상태 업데이트 패턴 (불변성 유지)

### 고급 React 패턴
- [ ] 커스텀 훅 (`useTheme`) 생성
- [ ] Provider 패턴 구현
- [ ] 조건부 렌더링 및 스타일링
- [ ] 이벤트 핸들링 최적화

### 모던 CSS 및 스타일링
- [ ] Tailwind CSS 유틸리티 클래스
- [ ] 다크모드 구현 방법
- [ ] 반응형 디자인 패턴
- [ ] CSS 애니메이션 및 전환

### 개발 도구 및 워크플로우
- [ ] Next.js 프레임워크 활용
- [ ] ESLint를 활용한 코드 품질 관리
- [ ] 개발 서버 및 빌드 프로세스

## 🔍 코드 하이라이트

### 성능 최적화된 상태 업데이트
```javascript
const updateIndividualState = useCallback((index, field, value) => {
  setIndividualStates(prev => 
    prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    )
  );
}, []);
```

### 실시간 통계 계산
```javascript
const getStatistics = () => {
  const individualTotal = individualStates.reduce((sum, item) => sum + item.value, 0);
  const objectTotal = Object.values(objectStates).reduce((sum, item) => sum + item.counter, 0);
  const complexTotal = Object.values(complexState.counters).reduce((sum, value) => sum + value, 0);
  
  return {
    totalStates: 100,
    individualTotal,
    objectTotal,
    complexTotal,
    grandTotal: individualTotal + objectTotal + complexTotal
  };
};
```

## 🎨 UI/UX 특징

### 접근성 (Accessibility)
- 키보드 네비게이션 지원
- ARIA 레이블 및 역할 정의
- 색상 대비 최적화
- 스크린 리더 친화적

### 반응형 디자인
- Mobile First 접근법
- Flexbox 및 Grid 레이아웃
- 유연한 컴포넌트 크기 조정

### 사용자 경험
- 직관적인 컨트롤
- 실시간 피드백
- 부드러운 애니메이션
- 일관된 디자인 시스템

## 📱 브라우저 지원

- **Chrome** 90+
- **Firefox** 90+
- **Safari** 14+
- **Edge** 90+

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 교육 목적으로 만들어졌습니다.

## 👥 개발자

**React 개발 학습자를 위한 실습 프로젝트**

---

## 🏷️ 태그

`#React` `#NextJS` `#TailwindCSS` `#StateManagement` `#ContextAPI` `#DarkMode` `#교육` `#실습`
