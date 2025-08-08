# Spring MVC + Thymeleaf + @Transactional 실습 프로젝트

## 🚀 프로젝트 개요

이 프로젝트는 Spring MVC, Thymeleaf, 그리고 @Transactional 어노테이션을 활용한 트랜잭션 관리 실습을 위한 웹 애플리케이션입니다.

## 🛠️ 기술 스택

- **Spring MVC 5.3.23** - 웹 프레임워크
- **Thymeleaf 3.0.15** - 템플릿 엔진
- **H2 Database 1.4.200** - 인메모리 데이터베이스
- **Spring JDBC** - 데이터베이스 접근
- **Spring Transaction** - 트랜잭션 관리
- **Maven** - 빌드 도구

## 📋 주요 기능

### ✅ 구현된 기능들

1. **회원가입 기능**
   - User 정보 저장
   - UserProfile 자동 생성
   - WelcomeMessage 자동 생성
   - @Transactional을 활용한 트랜잭션 관리

2. **사용자 목록 조회**
   - 등록된 모든 사용자 정보 표시
   - 비밀번호 마스킹 처리

3. **트랜잭션 롤백 테스트**
   - 의도적 에러 발생으로 롤백 테스트
   - 모든 데이터가 롤백되는 것을 확인

4. **H2 데이터베이스 연동**
   - 자동 테이블 생성
   - H2 웹 콘솔 제공 (포트: 8082)

## 🏃‍♂️ 실행 방법

### 1. 프로젝트 빌드
```bash
mvn clean compile
```

### 2. 애플리케이션 실행
```bash
mvn jetty:run
```

### 3. 접속
- **메인 페이지**: http://localhost:8080
- **H2 콘솔**: http://localhost:8082
  - JDBC URL: `jdbc:h2:~/transaction_example`
  - Username: `sa`
  - Password: (비어있음)

## 📁 프로젝트 구조

```
src/main/java/com/example/
├── config/
│   ├── DatabaseConfig.java      # 데이터베이스 설정
│   ├── WebAppInitializer.java  # 웹 애플리케이션 초기화
│   └── WebConfig.java          # 웹 설정
├── controller/
│   ├── HomeController.java      # 메인 페이지 컨트롤러
│   └── UserController.java      # 사용자 관련 컨트롤러
├── model/
│   ├── User.java               # 사용자 모델
│   ├── UserProfile.java        # 사용자 프로필 모델
│   └── WelcomeMessage.java     # 환영 메시지 모델
├── repository/
│   ├── UserRepository.java      # 사용자 저장소
│   ├── UserProfileRepository.java # 프로필 저장소
│   └── WelcomeMessageRepository.java # 메시지 저장소
└── service/
    └── UserService.java         # 사용자 서비스 (트랜잭션 관리)
```

## 🎯 학습 목표

### @Transactional 어노테이션 이해
- **정상 케이스**: User, UserProfile, WelcomeMessage가 모두 성공적으로 저장
- **에러 케이스**: 하나라도 실패하면 모든 데이터가 롤백

### 트랜잭션의 ACID 속성
- **Atomicity (원자성)**: 모든 작업이 성공하거나 모두 실패
- **Consistency (일관성)**: 데이터베이스 상태가 일관되게 유지
- **Isolation (격리성)**: 동시 실행되는 트랜잭션들이 서로 격리
- **Durability (지속성)**: 커밋된 트랜잭션은 영구적으로 저장

## 🧪 테스트 시나리오

### 1. 정상 회원가입 테스트
1. http://localhost:8080/users/register 접속
2. 사용자 정보 입력 후 "정상 회원가입" 버튼 클릭
3. 성공 페이지 확인
4. H2 콘솔에서 users, user_profiles, welcome_messages 테이블 확인

### 2. 롤백 테스트
1. 회원가입 폼에서 정보 입력
2. "의도적 실패" 버튼 클릭
3. 에러 메시지 확인
4. H2 콘솔에서 데이터가 저장되지 않았음을 확인

## 🔧 데이터베이스 스키마

### users 테이블
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
```

### user_profiles 테이블
```sql
CREATE TABLE user_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### welcome_messages 테이블
```sql
CREATE TABLE welcome_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **모던한 UI**: 깔끔하고 직관적인 인터페이스
- **사용자 친화적**: 명확한 네비게이션과 피드백
- **에러 처리**: 명확한 에러 메시지 표시

## 📝 TODO 항목 완료 현황

- ✅ UserProfile 모델의 getter/setter 구현
- ✅ UserProfileRepository의 SQL 문 완성
- ✅ UserService의 @Transactional 메서드 구현
- ✅ UserController 완전 구현
- ✅ 데이터베이스 테이블 생성 로직 수정
- ✅ 템플릿 파일들 구현 (index.html, success.html, list.html)
- ✅ CSS 스타일링 개선

## 🚀 향후 개선 사항

1. **보안 강화**
   - 비밀번호 암호화
   - 입력값 검증 강화

2. **기능 확장**
   - 사용자 정보 수정
   - 사용자 삭제
   - 페이징 처리

3. **테스트 코드**
   - 단위 테스트 작성
   - 통합 테스트 작성

## 📞 문의사항

프로젝트에 대한 질문이나 개선 제안이 있으시면 언제든지 연락해주세요!

---

**Happy Coding! 🎉**
