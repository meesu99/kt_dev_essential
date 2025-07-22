# ⚔️ 캐릭터 대시보드 - 랭킹 시스템

> **모험가들을 위한 캐릭터 관리 & 랭킹 플랫폼**  
> Next.js + Supabase로 구현한 실시간 게임 캐릭터 랭킹 시스템

## 🎮 프로젝트 소개

**캐릭터 대시보드**는 RPG 게임 스타일의 캐릭터 생성 및 랭킹 관리 시스템입니다.  
사용자는 자신만의 캐릭터를 생성하고, 레벨을 관리하며, 다른 모험가들과 랭킹을 겨룰 수 있습니다.

### ✨ 핵심 특징
- 🎭 **캐릭터 생성**: 이름, 직업, 레벨 설정
- 🏆 **실시간 랭킹**: 레벨별 순위 시스템
- ⚔️ **직업 시스템**: 초보자/전사/마법사/궁수/도적/해적
- 🛡️ **보안 관리**: 본인 캐릭터만 수정/삭제 가능
- 📊 **직업별 필터링**: 전체 또는 특정 직업 랭킹 확인

---

## 🛠️ 기술 스택

- **Frontend:** Next.js 15.4.2 (App Router)
- **Backend:** Supabase (PostgreSQL + Auth)
- **Styling:** Tailwind CSS
- **Authentication:** Supabase Auth
- **Database:** Supabase PostgreSQL with RLS
- **Language:** JavaScript (ES6+)

---

## 🎯 주요 기능

### 🔐 사용자 인증
- [x] **이메일/비밀번호 회원가입**
- [x] **이메일/비밀번호 로그인**
- [x] **세션 기반 인증 관리**
- [x] **자동 로그아웃**

### ⚔️ 캐릭터 관리 (CRUD)
- [x] **캐릭터 생성** - 이름, 레벨(1-200), 직업 선택
- [x] **캐릭터 조회** - 실시간 랭킹보드
- [x] **캐릭터 수정** - 본인 캐릭터만 편집 가능
- [x] **캐릭터 삭제** - 본인 캐릭터만 삭제 가능

### 🏆 랭킹 시스템
- [x] **레벨순 랭킹** - 높은 레벨부터 정렬
- [x] **직업별 필터링** - 전체/직업별 랭킹 확인
- [x] **실시간 업데이트** - 수동 새로고침 기능
- [x] **랭킹 표시** - 1~3위 특별 표시 (🥇🥈🥉)

### 🎨 사용자 경험
- [x] **게임적 테마** - RPG 스타일 UI/UX
- [x] **반응형 디자인** - 모바일/데스크톱 대응
- [x] **직관적 네비게이션** - 아이콘 기반 UI
- [x] **실시간 피드백** - 성공/오류 메시지

### 🔒 보안 기능
- [x] **Row Level Security (RLS)** 적용
- [x] **사용자별 권한 관리** - 본인 데이터만 수정 가능
- [x] **SQL Injection 방지**
- [x] **인증 기반 API 접근**

---

## ⚡ 빠른 시작

### 1️⃣ **의존성 설치**
```bash
npm install
```

### 2️⃣ **Supabase 프로젝트 설정**
1. [https://app.supabase.com](https://app.supabase.com)에서 새 프로젝트 생성
2. **Settings** → **API** 에서 프로젝트 정보 확인

### 3️⃣ **환경변수 설정**
프로젝트 루트에 `.env.local` 파일 생성:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4️⃣ **데이터베이스 테이블 생성**
Supabase **SQL Editor**에서 다음 SQL 실행:

```sql
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  character_name TEXT NOT NULL,
  userlevel INTEGER DEFAULT 1 CHECK (userlevel >= 1 AND userlevel <= 200),
  userjob TEXT DEFAULT 'beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS 정책 설정
CREATE POLICY "Anyone can view profiles" 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert profiles" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profiles" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profiles" 
  ON profiles FOR DELETE 
  USING (auth.uid() = user_id);
```

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
│   ├── page.js            # 캐릭터 대시보드 홈
│   ├── login/
│   │   └── page.js        # 로그인 페이지
│   ├── signup/
│   │   └── page.js        # 회원가입 페이지
│   ├── ranking/
│   │   └── page.js        # 랭킹보드 페이지 (핵심)
│   ├── layout.js          # 전역 레이아웃
│   └── globals.css        # 전역 스타일
└── lib/
    └── supabase.js        # Supabase 클라이언트 설정
```

---

## 🎮 사용 방법

### 🆕 첫 모험 시작
1. **회원가입** - 이메일/비밀번호로 계정 생성
2. **로그인** - 계정으로 로그인
3. **캐릭터 생성** - 랭킹 페이지에서 "캐릭터 추가" 클릭

### ⚔️ 캐릭터 관리
- **이름 설정**: 원하는 캐릭터명 입력
- **직업 선택**: 초보자/전사/마법사/궁수/도적/해적 중 선택
- **레벨 설정**: 1부터 200까지 자유롭게 설정

### 🏆 랭킹 확인
- **전체 랭킹**: 모든 캐릭터의 레벨순 순위
- **직업별 랭킹**: 특정 직업의 캐릭터들만 필터링
- **실시간 업데이트**: 새로고침 버튼으로 최신 데이터 확인

---

## 📊 직업 시스템

| 직업 | 설명 | 색상 |
|------|------|------|
| 🆕 초보자 | 모든 모험가의 시작점 | 회색 |
| ⚔️ 전사 | 근접 전투의 전문가 | 빨간색 |
| 🔮 마법사 | 마법과 지혜의 대가 | 파란색 |
| 🏹 궁수 | 원거리 사격의 명수 | 초록색 |
| 🗡️ 도적 | 은밀함과 속도의 달인 | 보라색 |
| 🏴‍☠️ 해적 | 바다의 자유로운 영혼 | 노란색 |

---

## 🔧 핵심 코드 구현

### 캐릭터 생성
```javascript
const { data, error } = await supabase
  .from('profiles')
  .insert([{
    user_id: user.id,
    character_name: formData.character_name,
    userlevel: parseInt(formData.userlevel),
    userjob: formData.userjob
  }])
```

### 랭킹 데이터 조회
```javascript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .order('userlevel', { ascending: false })
  .order('created_at', { ascending: true })
```

### 본인 캐릭터만 수정
```javascript
const { data, error } = await supabase
  .from('profiles')
  .update(updateData)
  .eq('id', characterId)
  .eq('user_id', user.id) // RLS로 보안 강화
```

---

## 🛡️ 보안 특징

### Row Level Security (RLS)
- **읽기**: 모든 사용자가 랭킹 조회 가능
- **쓰기**: 로그인한 사용자만 캐릭터 생성 가능  
- **수정/삭제**: 본인이 만든 캐릭터만 관리 가능

### 데이터 검증
- **레벨 제한**: 1-200 범위 내에서만 설정 가능
- **직업 검증**: 정해진 직업 목록에서만 선택 가능
- **사용자 인증**: 모든 CRUD 작업에 인증 필요

---

## 🚀 배포 및 프로덕션

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 환경변수 설정
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 프로덕션 체크리스트
- [ ] 환경변수 설정 확인
- [ ] Supabase RLS 정책 검증
- [ ] 도메인별 CORS 설정
- [ ] 이메일 인증 활성화 (선택사항)

---

## 💡 향후 개발 계획

### 🔮 예정된 기능들
- [ ] **길드 시스템** - 팀 기반 랭킹
- [ ] **업적 시스템** - 다양한 도전 과제
- [ ] **캐릭터 아바타** - 이미지 업로드 기능
- [ ] **전투 시스템** - 캐릭터 간 대결
- [ ] **레벨 히스토리** - 성장 기록 추적
- [ ] **친구 시스템** - 다른 모험가와 소통

### 🛠️ 기술적 개선
- [ ] **실시간 알림** - WebSocket 연동
- [. **캐싱 시스템** - Redis 도입
- [ ] **모바일 앱** - React Native 버전
- [ ] **API 문서화** - Swagger/OpenAPI

---

## 🐛 문제 해결

### 자주 발생하는 문제들

**1. 캐릭터 추가 실패**
- 테이블 존재 여부 확인
- RLS 정책이 올바르게 설정되었는지 확인
- 콘솔에서 상세 오류 메시지 확인

**2. 랭킹이 표시되지 않음**
- 데이터베이스 연결 상태 확인
- SELECT 권한 확인 (RLS 정책)
- 새로고침 버튼 사용

**3. 수정/삭제 권한 없음**
- 본인이 생성한 캐릭터인지 확인
- 로그인 상태 확인
- user_id 매칭 확인

---

## 📞 지원 및 기여

### 🤝 기여 방법
1. 이슈 확인 및 등록
2. Fork & Branch 생성
3. 기능 개발 또는 버그 수정
4. Pull Request 제출

### 📧 연락처
- **개발자**: [이메일 주소]
- **이슈 등록**: GitHub Issues
- **피드백**: GitHub Discussions

---

<div align="center">

## 🎉 모험가님의 도전을 기다립니다! ⚔️

**캐릭터를 생성하고 최강의 모험가가 되어보세요!**

[![랭킹보드 바로가기](https://img.shields.io/badge/🏆-랭킹보드_바로가기-yellow?style=for-the-badge)](http://localhost:3000/ranking)

*최고 레벨에 도전하고 전설의 모험가가 되세요!*

</div>
