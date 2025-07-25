# 📚 JSON 응답 처리 실습 프로젝트

Next.js 15를 기반으로 한 JSON 데이터 처리 학습용 웹 애플리케이션입니다. `fetch()`, `JSON.stringify()`, `JSON.parse()`의 동작 원리를 실습하고 이해할 수 있도록 설계되었습니다.

## 🎯 학습 목표

- **fetch API** 사용법과 비동기 HTTP 통신 이해
- **JSON.stringify()** - JavaScript 객체를 JSON 문자열로 변환
- **JSON.parse()** - JSON 문자열을 JavaScript 객체로 변환
- **API 라우트** 설계 및 구현 (Next.js App Router)
- **에러 처리** 및 로딩 상태 관리

## ✨ 주요 기능

### 📡 JSON 데이터 가져오기
- fetch API를 사용한 서버 데이터 요청
- response.json()으로 JSON → JavaScript 객체 변환
- 실시간 로그로 처리 과정 시각화

### 🧪 JSON 메서드 테스트
- JSON.stringify()와 JSON.parse() 동작 확인
- 다양한 데이터 타입 변환 테스트
- 변환 전후 데이터 비교 분석

### ➕ 상품 관리
- 상품 목록 조회 (GET /api/products)
- 새 상품 추가 (POST /api/products)
- 실시간 UI 업데이트

### 📋 실시간 로그
- 모든 JSON 처리 과정을 터미널 스타일로 표시
- 타임스탬프와 함께 상세한 실행 정보 제공
- 에러 메시지 및 성공/실패 상태 표시

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone <repository-url>
cd json-demo

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

### 사용 가능한 스크립트

```bash
npm run dev      # 개발 서버 실행 (Turbopack 사용)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 코드 검사
```

## 📁 프로젝트 구조

```
json-demo/
├── src/
│   └── app/
│       ├── api/
│       │   └── products/
│       │       └── route.js          # 상품 API 라우트
│       ├── globals.css               # 전역 스타일
│       ├── layout.js                 # 루트 레이아웃
│       └── page.js                   # 메인 페이지 (JSON 실습)
├── public/                           # 정적 파일
├── package.json                      # 프로젝트 설정
└── README.md                         # 프로젝트 문서
```

## 🛠 사용 기술

- **Frontend**: React 19, Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Development**: ESLint, Turbopack
- **API**: Next.js API Routes

## 📖 실습 가이드

### 1. 기본 JSON 응답 받기

```javascript
// 1. API 호출
const response = await fetch('/api/products');

// 2. JSON을 JavaScript 객체로 변환
const result = await response.json();

// 3. 데이터 사용
console.log(result.data); // 상품 목록 배열
```

### 2. JSON.stringify() 사용법

```javascript
const product = {
  name: "iPhone 15",
  price: 1290000,
  inStock: true
};

// JavaScript 객체 → JSON 문자열
const jsonString = JSON.stringify(product);
console.log(jsonString); // '{"name":"iPhone 15","price":1290000,"inStock":true}'
```

### 3. JSON.parse() 사용법

```javascript
const jsonString = '{"name":"iPhone 15","price":1290000,"inStock":true}';

// JSON 문자열 → JavaScript 객체
const product = JSON.parse(jsonString);
console.log(product.name); // "iPhone 15"
```

### 4. POST 요청으로 데이터 전송

```javascript
const newProduct = {
  name: "Galaxy S24",
  price: 1350000,
  category: "스마트폰"
};

const response = await fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newProduct)  // 객체를 JSON 문자열로 변환
});

const result = await response.json();
```

## 🎨 UI 구성요소

### 메인 대시보드
- **상품 목록 가져오기**: API 호출 및 JSON 응답 처리 실습
- **JSON 메서드 테스트**: 데이터 변환 과정 시연
- **로그 클리어**: 실행 로그 초기화

### 상품 관리 섹션
- **상품 목록**: 서버에서 받은 JSON 데이터를 카드 형태로 표시
- **상품 추가 폼**: 새 상품 정보 입력 및 POST 요청 전송

### 실행 로그 패널
- **터미널 스타일**: 개발자 도구와 유사한 인터페이스
- **컬러 코딩**: 시간, 메시지, 데이터별 색상 구분
- **JSON 포맷팅**: 객체 데이터를 읽기 쉽게 들여쓰기

## 🔍 학습 포인트

### JSON 데이터 타입 변환
- `undefined`, `function` → JSON에서 제거됨
- `Date` 객체 → ISO 문자열로 변환
- `NaN`, `Infinity` → `null`로 변환

### 에러 처리 패턴
```javascript
try {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  // 성공 처리
} catch (error) {
  console.error('API 호출 실패:', error.message);
  // 에러 처리
}
```

### 비동기 처리 모범 사례
- `async/await` 패턴 사용
- Promise 체이닝 대신 try/catch 활용
- 로딩 상태 및 에러 상태 관리

## 🤝 기여하기

1. 이 저장소를 Fork합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -am '새 기능 추가'`)
4. 브랜치에 Push합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🙋‍♂️ 문의사항

프로젝트에 관한 질문이나 제안사항이 있으시면 Issues를 통해 연락해주세요.

---

**Happy Learning! 🎓 JSON 마스터가 되어보세요!**
