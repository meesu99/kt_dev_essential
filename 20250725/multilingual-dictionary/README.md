# 📚 다언어 사전 (Multilingual Dictionary)

영어, 한국어, 일본어를 지원하는 현대적인 웹 기반 사전 애플리케이션입니다. 단어 검색부터 학습 기능까지 다양한 언어 학습 도구를 제공합니다.

## ✨ 주요 기능

### 🔍 **다언어 사전 검색**
- **영어**: Free Dictionary API를 활용한 실시간 검색
- **한국어/일본어**: 로컬 JSON 데이터베이스 검색
- 단어, 품사, 뜻, 예문, 발음 정보 제공
- 기본 사전 + 관리자가 추가한 커스텀 단어 통합 검색

### 📅 **오늘의 단어**
- 날짜 기반으로 매일 다른 단어 제공
- 3개 언어별로 각각 50개의 엄선된 단어
- 탭 형태로 언어 전환 가능

### ⭐ **즐겨찾기 기능**
- 단어를 즐겨찾기에 추가/제거 (☆ ↔ ⭐)
- localStorage를 사용한 클라이언트 사이드 저장
- 언어별 필터링 및 관리
- 추가 날짜 표시

### 🧠 **퀴즈 모드**
- 4지 선택 문제 형태
- 50개 단어 풀에서 랜덤 출제
- 진행률 표시 및 점수 관리
- 정답/오답 즉시 피드백
- 퀴즈 완료 후 결과 분석

### 📖 **전체 단어 사전**
- 언어별 모든 단어 탐색
- 검색 기능 및 페이지네이션
- 기본 단어 + 커스텀 단어 통합 표시

### 🔐 **로그인 시스템**
- 클라이언트 사이드 인증
- 관리자/일반사용자 권한 구분
- 로그인 상태별 메뉴 접근 제어

### ⚙️ **관리자 기능**
- 한국어/일본어 사전 단어 CRUD
- 직관적인 단어 에디터 모달
- 실시간 사전 업데이트

## 🛠 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **UI 라이브러리**: React 19
- **스타일링**: Tailwind CSS 4
- **상태 관리**: React Hooks (useState, useEffect)
- **데이터 저장**: localStorage (즐겨찾기, 커스텀 단어, 인증)
- **외부 API**: Free Dictionary API (영어 단어)
- **폰트**: Geist Sans, Geist Mono
- **개발 도구**: ESLint, Turbopack

## 🚀 설치 및 실행

### 시스템 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 방법

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/multilingual-dictionary.git
   cd multilingual-dictionary
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저에서 접속**
   ```
   http://localhost:3000
   ```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 린팅
npm run lint
```

## 📱 사용법

### 네비게이션
- **🏠 홈**: 사전 검색 + 오늘의 단어
- **📖 단어사전**: 전체 단어 탐색
- **⭐ 즐겨찾기**: 저장한 단어 관리
- **🧠 퀴즈**: 단어 학습 퀴즈
- **⚙️ 관리자**: 사전 관리 (관리자만)

### 기본 사용법

1. **단어 검색**
   - 홈페이지에서 언어 선택
   - 검색창에 단어 입력
   - ⭐ 버튼으로 즐겨찾기 추가

2. **오늘의 단어 학습**
   - 언어 탭 클릭으로 전환
   - 매일 새로운 단어 확인
   - 즐겨찾기에 추가 가능

3. **퀴즈 참여**
   - `/quiz` 페이지 접속
   - 언어 선택 후 퀴즈 시작
   - 4지 선택 문제 풀이

4. **즐겨찾기 관리**
   - `/favorites` 페이지에서 저장한 단어 확인
   - 언어별 필터링
   - 불필요한 단어 제거

## 🔑 테스트 계정

### 관리자 계정
- **아이디**: `admin`
- **비밀번호**: `admin123`
- **권한**: 사전 단어 추가/수정/삭제

### 일반 사용자 계정
- **아이디**: `user1` / **비밀번호**: `user123`
- **아이디**: `user2` / **비밀번호**: `user456`
- **권한**: 기본 사전 기능 이용

## 📁 프로젝트 구조

```
multilingual-dictionary/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.js           # 메인 레이아웃
│   │   ├── page.js             # 홈페이지
│   │   ├── dictionary/
│   │   │   └── page.js         # 전체 단어사전
│   │   ├── favorites/
│   │   │   └── page.js         # 즐겨찾기
│   │   ├── quiz/
│   │   │   └── page.js         # 퀴즈
│   │   └── admin/
│   │       └── page.js         # 관리자 페이지
│   ├── components/             # React 컴포넌트
│   │   ├── Navigation.js       # 네비게이션 바
│   │   ├── WordCard.js         # 단어 카드
│   │   ├── DictionarySearch.js # 사전 검색
│   │   ├── WordOfTheDay.js     # 오늘의 단어
│   │   ├── QuizQuestion.js     # 퀴즈 문제
│   │   ├── FavoritesList.js    # 즐겨찾기 목록
│   │   ├── LoginModal.js       # 로그인 모달
│   │   └── WordEditor.js       # 단어 에디터
│   ├── data/                   # 정적 데이터
│   │   ├── korean-dictionary.json
│   │   ├── japanese-dictionary.json
│   │   └── word-of-the-day.json
│   └── utils/                  # 유틸리티 함수
│       ├── dictionary.js       # 사전 검색
│       ├── wordOfTheDay.js     # 오늘의 단어
│       ├── favorites.js        # 즐겨찾기 관리
│       ├── auth.js             # 인증 관리
│       └── dictionaryManager.js # 사전 관리
├── public/                     # 정적 자산
└── README.md
```

## 🎨 주요 특징

### 사용자 경험 (UX)
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **직관적 인터페이스**: 명확한 아이콘과 시각적 피드백
- **즉시 반응**: 클라이언트 사이드 상태 관리로 빠른 응답
- **접근성**: 키보드 네비게이션 및 스크린 리더 고려

### 성능 최적화
- **Next.js App Router**: 최신 React 서버 컴포넌트 활용
- **Turbopack**: 빠른 개발 서버 및 빌드
- **로컬 데이터**: 한국어/일본어 사전의 빠른 검색
- **클라이언트 캐싱**: localStorage 활용한 데이터 지속성

### 확장성
- **모듈화된 구조**: 재사용 가능한 컴포넌트
- **타입 안전성**: JSDoc 주석으로 타입 힌트 제공
- **유지보수**: 명확한 파일 구조와 명명 규칙

## 🌟 데이터 통계

- **영어 단어**: 50개 (고급 어휘 위주)
- **한국어 단어**: 50개 (정서적/문화적 표현)
- **일본어 단어**: 50개 (미학적/철학적 개념)
- **총 단어 수**: 150개 + 사용자 추가 단어

## 🤝 기여 방법

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 말

- **Free Dictionary API**: 영어 단어 데이터 제공
- **Next.js Team**: 훌륭한 프레임워크
- **Tailwind CSS**: 아름다운 스타일링 시스템
- **Vercel**: 폰트 및 호스팅 플랫폼

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 언제든지 연락주세요!

---

⭐ **이 프로젝트가 도움이 되셨다면 스타를 눌러주세요!** ⭐
