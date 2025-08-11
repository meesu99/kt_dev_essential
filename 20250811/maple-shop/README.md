# 🏪 메이플샵 - 페리온 무기상점

Spring Boot로 구현된 메이플스토리 스타일의 무기상점 시스템입니다.

## 🌟 주요 기능

### Level 1: 인벤토리 & 거래 시스템
- **Player 클래스**: 플레이어 정보 및 인벤토리 관리
- **구매/판매 시스템**: 아이템 거래 및 메소 관리
- **인벤토리 관리**: 아이템 수량 관리 및 조회

### Level 2: 강화 시스템
- **아이템 강화**: +0 ~ +15까지 강화 가능
- **강화 성공률**: 레벨별 차등 적용
- **실패 결과**: 단순 실패, 레벨 하락, 아이템 파괴

## 🚀 실행 방법

### 1. 프로젝트 실행
```bash
# Maven Wrapper 사용
./mvnw spring-boot:run

# 또는 Maven 설치된 경우
mvn spring-boot:run
```

### 2. 웹 브라우저 접속
```
http://localhost:8080
```

## 📚 API 엔드포인트

### 상점 아이템 관리
- `GET /api/maple-shop/items` - 상점 아이템 조회 (필터링 지원)
- `GET /api/maple-shop/items/{id}` - 특정 아이템 조회
- `POST /api/maple-shop/items` - 새 아이템 추가
- `PUT /api/maple-shop/items/{id}` - 아이템 정보 수정
- `DELETE /api/maple-shop/items/{id}` - 아이템 삭제

### 플레이어 관리
- `GET /api/maple-shop/players/{id}` - 플레이어 정보 조회
- `POST /api/maple-shop/players` - 새 플레이어 생성
- `GET /api/maple-shop/inventory/{playerId}` - 플레이어 인벤토리 조회

### 거래 시스템
- `POST /api/maple-shop/purchase` - 아이템 구매
- `POST /api/maple-shop/sell` - 아이템 판매

### 강화 시스템
- `POST /api/maple-shop/enhance` - 아이템 강화
- `GET /api/maple-shop/enhance/info/{itemId}` - 강화 정보 조회

## 🎯 테스트 시나리오

### 기본 거래 테스트
```bash
# 1. 아이템 구매
POST /api/maple-shop/purchase?playerId=1&itemId=3&quantity=1

# 2. 아이템 판매
POST /api/maple-shop/sell?playerId=1&itemId=2&quantity=1

# 3. 인벤토리 조회
GET /api/maple-shop/inventory/1
```

### 강화 시스템 테스트
```bash
# 1. 강화 정보 조회
GET /api/maple-shop/enhance/info/1

# 2. 아이템 강화
POST /api/maple-shop/enhance?playerId=1&itemId=1
```

## 🎮 게임 시스템

### 강화 시스템 상세
- **+0 ~ +3**: 95% 성공률, 실패 시 단순 실패
- **+4 ~ +6**: 90% 성공률, 실패 시 단순 실패
- **+7 ~ +9**: 80% 성공률, 실패 시 레벨 하락
- **+10 ~ +12**: 70% 성공률, 실패 시 레벨 하락
- **+13 ~ +14**: 50% 성공률, 실패 시 아이템 파괴
- **+15**: 30% 성공률, 실패 시 아이템 파괴

### 강화 비용
- 기본 비용: 1,000 메소
- 레벨당 추가 비용: 500 메소
- 공식: `1,000 + (현재강화레벨 × 500)`

### 공격력 증가
- **+0 ~ +10**: 레벨당 +2 공격력
- **+11 ~ +15**: 레벨당 +3 공격력

## 🛠️ 기술 스택

- **Backend**: Spring Boot 3.5.4
- **Database**: H2 (인메모리)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Build Tool**: Maven
- **Java Version**: 17

## 📁 프로젝트 구조

```
src/
├── main/
│   ├── java/com/example/maple_shop/
│   │   ├── controller/
│   │   │   └── MapleShopController.java    # 메인 컨트롤러
│   │   ├── model/
│   │   │   ├── Item.java                   # 아이템 모델
│   │   │   ├── Player.java                 # 플레이어 모델
│   │   │   └── InventoryItem.java          # 인벤토리 아이템 모델
│   │   └── MapleShopApplication.java       # 메인 애플리케이션
│   └── resources/
│       ├── static/
│       │   └── index.html                  # 웹 테스트 페이지
│       └── application.properties          # 애플리케이션 설정
```

## 🎨 웹 인터페이스

프로젝트에는 테스트를 위한 웹 인터페이스가 포함되어 있습니다:

- **상점 아이템 조회**: 필터링 및 정렬 기능
- **플레이어 관리**: 정보 조회 및 인벤토리 확인
- **거래 시스템**: 구매/판매 기능
- **강화 시스템**: 강화 정보 조회 및 강화 시도

## 🔧 개발 환경 설정

### 필수 요구사항
- Java 17 이상
- Maven 3.6 이상

### IDE 설정
- IntelliJ IDEA, Eclipse, VS Code 등 지원
- Spring Boot DevTools 활성화 권장

## 📝 라이센스

이 프로젝트는 교육 목적으로 제작되었습니다.

## 🤝 기여하기

버그 리포트나 기능 제안은 언제든 환영합니다!

---

**즐거운 메이플샵 이용되세요! 🎮✨**
