# Next.js 렌더링 실습 프로젝트

Next.js를 사용하여 **CSR(Client Side Rendering)**과 **SSR(Server Side Rendering)**의 차이점을 실습할 수 있는 프로젝트입니다.

## 📋 프로젝트 개요

이 프로젝트는 웹 렌더링의 두 가지 주요 방식인 CSR과 SSR을 직접 체험하고 비교할 수 있도록 구성되었습니다.

## 🛠️ 기술 스택

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS**
- **JavaScript**

## 🚀 설치 및 실행

### 필수 조건
- Node.js 18.0 이상
- npm 또는 yarn

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 📄 페이지 구조

### 1. 메인 페이지 (`/`) - CSR 실습
- **기술**: Client Side Rendering
- **특징**: 
  - `"use client"` 지시어 사용
  - `useEffect` Hook으로 API 호출
  - 로딩 상태 (`로딩 중입니다...`) 표시
  - 클라이언트에서 데이터 fetch

### 2. SSR 페이지 (`/ssr`) - SSR 실습
- **기술**: Server Side Rendering
- **특징**:
  - 서버 컴포넌트 (기본값)
  - `async/await`로 서버에서 데이터 fetch
  - 로딩 상태 없이 완성된 HTML 전송

## 🔍 CSR vs SSR 비교

### CSR (Client Side Rendering)
```javascript
"use client";
import { useState, useEffect } from "react";

export default function CSRPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 클라이언트에서 API 호출
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  return <div>{/* 렌더링 */}</div>;
}
```

**장점:**
- 초기 로드 후 빠른 페이지 전환
- 서버 부하 감소
- 인터랙티브한 사용자 경험

**단점:**
- 초기 로딩 시간
- SEO 최적화 어려움
- JavaScript 필수

### SSR (Server Side Rendering)
```javascript
// "use client" 지시어 없음 (서버 컴포넌트)

export default async function SSRPage() {
  // 서버에서 데이터 fetch
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return (
    <div>
      {/* 이미 데이터가 포함된 HTML 전송 */}
    </div>
  );
}
```

**장점:**
- 빠른 초기 페이지 로드
- SEO 최적화
- JavaScript 비활성화 상태에서도 동작

**단점:**
- 서버 부하 증가
- 페이지 전환 시 전체 새로고침

## 🧪 실습 방법

### 1. CSR 실습 확인
1. [http://localhost:3000](http://localhost:3000) 접속
2. 페이지 새로고침 시 **"로딩 중입니다..."** 메시지 확인
3. 개발자 도구 → Network 탭에서 API 호출 확인
4. 페이지 소스 보기(Ctrl+U) - HTML에 데이터 없음

### 2. SSR 실습 확인
1. [http://localhost:3000/ssr](http://localhost:3000/ssr) 접속
2. 로딩 상태 없이 바로 데이터 표시
3. 페이지 소스 보기(Ctrl+U) - HTML에 데이터 포함됨
4. Network 탭에서 별도 API 호출 없음 확인

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── page.js          # CSR 실습 페이지
│   ├── ssr/
│   │   └── page.js      # SSR 실습 페이지
│   ├── layout.js        # 루트 레이아웃
│   └── globals.css      # 전역 스타일
├── public/              # 정적 파일
└── README.md           # 프로젝트 문서
```

## 🌐 사용된 API

- **JSONPlaceholder**: `https://jsonplaceholder.typicode.com/`
  - 무료 테스트용 REST API
  - Posts, Users 데이터 제공

## 📚 학습 포인트

1. **렌더링 방식의 차이점 이해**
2. **Next.js App Router 사용법**
3. **서버 컴포넌트 vs 클라이언트 컴포넌트**
4. **SEO와 성능 최적화 고려사항**
5. **사용자 경험(UX) 관점에서의 렌더링 선택**

## 🔧 추가 스크립트

```bash
# 빌드
npm run build

# 프로덕션 실행
npm start

# 린팅
npm run lint
```

## 📖 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**개발자**: Next.js 렌더링 실습 프로젝트  
**버전**: 1.0.0  
**라이선스**: MIT
