# 🚀 Supabase 인증 시스템 연습 프로젝트

> **KT 판교 신입사원 교육 - VibeCoding 2일차**  
> Supabase를 활용한 이메일 회원가입/로그인 시스템 구현

## 📋 프로젝트 소개

이 프로젝트는 **Supabase**를 활용하여 간단한 **이메일 인증 시스템**을 구현하는 연습용 프로젝트입니다.  
Next.js와 Supabase를 연동하여 회원가입, 로그인, 로그아웃 기능을 구현했습니다.

### ✨ 학습 목표
- Supabase Auth 시스템 이해
- Next.js App Router와 Supabase 연동
- 사용자 인증 상태 관리
- 클라이언트 사이드 인증 처리

---

## 🛠️ 기술 스택

- **Frontend:** Next.js 15.4.2 (App Router)
- **Styling:** Tailwind CSS
- **Authentication:** Supabase Auth
- **Language:** JavaScript (ES6+)

---

## 🎯 구현된 기능

### 🔐 인증 관련
- [x] **이메일/비밀번호 회원가입**
- [x] **이메일/비밀번호 로그인**
- [x] **로그아웃**
- [x] **사용자 세션 관리**
- [x] **실시간 인증 상태 업데이트**

### 📄 페이지 구조
- **`/`** - 홈페이지 (로그인 상태에 따른 다른 UI)
- **`/signup`** - 회원가입 페이지
- **`/login`** - 로그인 페이지

### 🎨 UI/UX 특징
- 깔끔한 반응형 디자인
- 사용자 친화적인 폼 검증
- 성공/오류 메시지 표시
- 로딩 상태 표시

---

## ⚡ 빠른 시작

### 1️⃣ **의존성 설치**
```bash
npm install
```

### 2️⃣ **Supabase 프로젝트 설정**
1. [https://app.supabase.com](https://app.supabase.com)에서 새 프로젝트 생성
2. 프로젝트 생성 후 **Settings** → **API** 섹션에서 정보 확인

### 3️⃣ **환경변수 설정**
프로젝트 루트에 `.env.local` 파일 생성:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4️⃣ **Supabase 인증 설정**
Supabase 대시보드에서:
- **Authentication** → **Settings** 이동
- **Site URL**에 `http://localhost:3000` 추가
- 테스트를 위해 **Email confirmations** 비활성화 (선택사항)

### 5️⃣ **개발 서버 실행**
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── page.js            # 홈페이지 (인증 상태 관리)
│   ├── login/
│   │   └── page.js        # 로그인 페이지
│   ├── signup/
│   │   └── page.js        # 회원가입 페이지
│   ├── layout.js          # 전역 레이아웃
│   └── globals.css        # 전역 스타일
└── lib/
    └── supabase.js        # Supabase 클라이언트 설정
```

---

## 🧪 테스트 방법

### 회원가입 테스트
1. `/signup` 페이지로 이동
2. 유효한 이메일과 비밀번호(최소 6자) 입력
3. 회원가입 버튼 클릭
4. 성공 메시지 확인 후 자동으로 로그인 페이지로 이동

### 로그인 테스트
1. `/login` 페이지로 이동
2. 가입한 이메일과 비밀번호 입력
3. 로그인 버튼 클릭
4. 성공 시 홈페이지로 이동되며 사용자 정보 표시

### 로그아웃 테스트
1. 로그인 상태에서 홈페이지의 "로그아웃" 버튼 클릭
2. 로그아웃 후 비로그인 상태 UI로 변경

---

## 🔧 주요 코드 설명

### Supabase 클라이언트 초기화
```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 회원가입 처리
```javascript
const { error } = await supabase.auth.signUp({
  email,
  password,
})
```

### 로그인 처리
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})
```

### 인증 상태 감지
```javascript
const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
  setUser(session?.user ?? null)
})
```

---

## 📝 학습 포인트

### 🎯 **배운 것들**
- Supabase Auth API 사용법
- Next.js App Router에서 클라이언트 컴포넌트 활용
- React hooks를 이용한 상태 관리
- 환경변수를 통한 보안 설정
- 사용자 경험을 고려한 UI 설계

### 💡 **개선할 수 있는 점들**
- [ ] 비밀번호 재설정 기능
- [ ] 소셜 로그인 (Google, GitHub 등)
- [ ] 프로필 페이지
- [ ] 이메일 인증 확인
- [ ] 더 자세한 폼 검증

---

## 🚨 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요!
- Supabase 프로젝트의 RLS(Row Level Security) 정책을 확인하세요
- 프로덕션 환경에서는 더 강력한 비밀번호 정책을 적용하세요

---

## 📞 문제 해결

### 자주 발생하는 오류들

**1. "Invalid login credentials" 오류**
- 이메일 확인이 필요한 경우: Supabase에서 이메일 확인 설정 확인
- 비밀번호가 틀린 경우: 올바른 비밀번호 입력 확인

**2. 환경변수 오류**
- `.env.local` 파일이 올바른 위치에 있는지 확인
- 변수명이 `NEXT_PUBLIC_`로 시작하는지 확인
- 개발 서버 재시작 후 다시 시도

**3. Supabase 연결 오류**
- Supabase 프로젝트 URL과 API 키가 올바른지 확인
- 네트워크 연결 상태 확인

---

<div align="center">

**🎉 Supabase 인증 시스템 연습 완료! 🎉**

*KT 판교 신입사원 교육 - VibeCoding 2일차*

</div>
