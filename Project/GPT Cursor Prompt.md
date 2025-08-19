# 🎯 Cursor Master Prompt — 위치 기반 타게팅 캠페인(클론)

**역할**: 당신은 시니어 풀스택 엔지니어다. 아래 요구대로 **동작하는 코드와 파일**을 생성한다. 불필요한 설명은 최소화하고, 리포 구조/코드/스크립트/샘플 데이터를 제공하라.

---

## 0) 목표/제약
- 목표: **인앱 채팅 캠페인 발송·통계**가 가능한 MVP.
- **Frontend는 JavaScript(무 TypeScript)** 로 작성한다.
- **반경 필터는 PostGIS만 사용**한다.(`ST_DWithin`): Haversine/대안 사용 금지.
- 지도는 **Leaflet + OpenStreetMap**. 지오코딩은 **무료/스텁 인터페이스**(캐싱 포함).
- 기본 중심좌표: **서울시청 (37.5665, 126.9780)**.
- 관리자만 **고객(Customers) CRUD** 가능. 일반 사용자는 캠페인/지갑/통계만.
- 로그인은 **JWT(HttpOnly 쿠키)**, 비밀번호는 **BCrypt**.

---

## 1) 리포지토리 구조
```
/backend   # Spring Boot 3 (Java 17+)
/frontend  # Next.js (App Router) + JavaScript + Tailwind + Recharts + Leaflet
/db/sql    # 순수 SQL 마이그레이션 스크립트(V1__init.sql 등)
/README.md
```

---

## 2) 데이터베이스(스키마 = ILF) & 인덱스
**/db/sql/V1__init.sql** 파일을 생성하라. (PostgreSQL + **PostGIS 필수**)

```sql
-- 필수 확장
CREATE EXTENSION IF NOT EXISTS postgis;

-- 사용자 계정
CREATE TABLE IF NOT EXISTS app_users (
  id               BIGSERIAL PRIMARY KEY,
  email            VARCHAR(255) NOT NULL UNIQUE,
  password_hash    VARCHAR(255) NOT NULL,
  business_no      VARCHAR(64)  NOT NULL,
  company_name     VARCHAR(255) NOT NULL,
  points           BIGINT       NOT NULL DEFAULT 0,
  role             TEXT         NOT NULL DEFAULT 'USER', -- USER | ADMIN
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 수신 대상 고객
CREATE TABLE IF NOT EXISTS customers (
  id              BIGSERIAL PRIMARY KEY,
  name            VARCHAR(100),
  gender          VARCHAR(16),         -- index
  birth_year      INT,                 -- index
  phone           VARCHAR(50),
  road_address    VARCHAR(255),
  detail_address  VARCHAR(255),
  postal_code     VARCHAR(20),
  sido            VARCHAR(50),         -- composite index(sido,sigungu)
  sigungu         VARCHAR(80),         -- composite index(sido,sigungu)
  lat             DOUBLE PRECISION,
  lng             DOUBLE PRECISION,
  geom            GEOGRAPHY(POINT,4326) NOT NULL, -- 반경 필터 필수 사용
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 캠페인 정의
CREATE TABLE IF NOT EXISTS campaigns (
  id                   BIGSERIAL PRIMARY KEY,
  user_id              BIGINT NOT NULL REFERENCES app_users(id),
  title                VARCHAR(200),
  message_text         TEXT,
  link                 VARCHAR(500),
  filters              JSONB,
  price_per_recipient  INT,
  estimated_cost       BIGINT,
  final_cost           BIGINT,
  recipients_count     INT,
  status               TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 캠페인 대상 스냅샷
CREATE TABLE IF NOT EXISTS campaign_targets (
  id               BIGSERIAL PRIMARY KEY,
  campaign_id      BIGINT NOT NULL REFERENCES campaigns(id),
  customer_id      BIGINT NOT NULL REFERENCES customers(id),
  delivery_status  TEXT,
  sent_at          TIMESTAMPTZ,
  read_at          TIMESTAMPTZ,
  click_at         TIMESTAMPTZ
);

-- 지갑 거래 원장
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id             BIGSERIAL PRIMARY KEY,
  user_id        BIGINT NOT NULL REFERENCES app_users(id),
  type           TEXT, -- CHARGE | DEBIT_CAMPAIGN | REFUND
  amount         BIGINT,
  balance_after  BIGINT,
  meta           JSONB,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 인앱 알림 로그
CREATE TABLE IF NOT EXISTS chat_messages (
  id           BIGSERIAL PRIMARY KEY,
  user_id      BIGINT NOT NULL REFERENCES app_users(id),
  from_admin   BOOLEAN DEFAULT TRUE,
  campaign_id  BIGINT REFERENCES campaigns(id),
  text         TEXT,
  link         VARCHAR(500),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_customers_gender       ON customers(gender);
CREATE INDEX IF NOT EXISTS idx_customers_birth_year   ON customers(birth_year);
CREATE INDEX IF NOT EXISTS idx_customers_region       ON customers(sido, sigungu);
CREATE INDEX IF NOT EXISTS idx_customers_geom_gist    ON customers USING GIST(geom);

CREATE INDEX IF NOT EXISTS idx_ct_campaign_id         ON campaign_targets(campaign_id);
CREATE INDEX IF NOT EXISTS idx_ct_delivery_status     ON campaign_targets(delivery_status);
```

**/db/sql/V2__seed.sql** 를 생성하라. (관리자 1명, 더미 고객 N명 — 수도권 위경도, `geom=ST_SetSRID(ST_MakePoint(lng,lat),4326)::geography` 세팅)

---

## 3) 백엔드(Spring Boot 3)
**의존성**: spring-boot-starter-web, validation, data-jpa, security, jjwt, postgresql, postgis-jdbc, lombok, jackson.

**보안**
- `BCryptPasswordEncoder`로 해시.
- 로그인 성공 시 **JWT 발급 → HttpOnly, SameSite=Lax 쿠키**.
- `USER/ADMIN` RBAC. `/admin/**`는 ADMIN만.

**도메인/리포지토리/서비스/컨트롤러** 구현:
- Auth: `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`, `GET /me`
- Customers(ADMIN):  
  `GET /admin/customers?gender=&sido=&sigungu=&ageFrom=&ageTo=&page=&size=`  
  `POST /admin/customers`, `PUT /admin/customers/{id}`, `DELETE /admin/customers/{id}`
- Campaigns:
  - **미리보기** `POST /campaigns/preview`  
    입력: `filters`  
    처리: recipients 계산 + **단가(활성 필터 수: 1→50, 2→70, 3→90, 4→110, 5+→130원)** + `estimated_cost = recipients × 단가`  
    반환: `{recipients, unitPrice, estimatedCost}`
  - **생성/수정** `POST /campaigns`, `PUT /campaigns/{id}` (DRAFT만 수정)
  - **발송** `POST /campaigns/{id}/send`  
    처리: 포인트 ≥ 예상비용 확인 → **wallet_transactions(-)** 기록 → `campaign_targets` 스냅샷 생성 → 비동기 워커 시작 → status `SENDING`
  - **통계** `GET /campaigns/{id}/stats` (합계 & 시계열)
- Wallet:
  `POST /wallet/charge`(+), `GET /wallet/ledger`, `GET /wallet/balance`
- Tracking:
  `GET /t/r/{targetId}`(read), `GET /t/c/{targetId}`(click) → 해당 행 `read_at`/`click_at` 업데이트 후 픽셀/리다이렉트
- **SSE** 진행률: `GET /sse/progress?campaignId=...`
- **CSV 내보내기**: `GET /exports/campaigns/{id}/targets.csv` (마스킹 적용)

**반경 필터: PostGIS 전용 쿼리**
```sql
-- 중심(lat,lng)과 반경(m)으로 대상 계산 예시
SELECT COUNT(*)
FROM customers c
WHERE ST_DWithin(
  c.geom,
  ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
  :meters
);
```
(Haversine 등 다른 방식 금지)

---

## 4) 프런트엔드(Next.js + JavaScript)
**세팅**: Next.js(App Router) + **JavaScript** + Tailwind + Recharts + Leaflet(OSM 타일). JWT는 **쿠키 기반**, API는 **/backend** 프록시.

**페이지**
- `/login`, `/signup`
- `/dashboard` (USER): KPI 카드, 24h 라인, 분포 막대, **수신자 지도(서울시청 중심)**, TOP 테이블, CSV 다운로드
- `/campaigns/new` (세그먼트 빌더)  
  - 필터 폼: 성별/나이대/지역(시도/시군구)/반경(지도에서 원 드래그)  
  - **미리보기 호출** 즉시 반영(대상 수/단가/예상비용)  
  - 메시지/링크 입력 → 저장(DRAFT) → 발송 버튼(포인트 부족 시 경고)
- `/wallet` : 충전(모의), 원장 테이블
- `/admin/customers` (ADMIN): 목록/검색(페이징), 생성/수정 모달, 삭제, 지도 미리보기
- `/alerts` : **인앱 알림함(채팅형)**, 광고 상세(“갤럭시 폴드7 최저가 판매”, 링크 프리뷰 https://shop.kt.com/)

**권한 라우팅 가드**
- 로그인 후 `role=ADMIN → /admin`, 그 외 `/dashboard`.

**PII 마스킹**
- 리스트/CSV 기본 마스킹(전화/주소 일부).

**지도**
- Leaflet + OSM 타일, 중심 `(37.5665,126.9780)`.

**가격/필터 로직 (JavaScript)**
```js
function activeFilterCount(f){
  let c = 0;
  if (f.gender && f.gender.length) c++;
  if (f.ageRange && f.ageRange.length===2) c++;
  if (f.region && ((f.region.sido?.length||0)+(f.region.sigungu?.length||0))>0) c++;
  if (f.radius && f.radius.meters>0) c++;
  return c;
}
function unitPriceByFilters(n){
  const table = [0,50,70,90,110,130];
  return table[Math.min(n,5)];
}
```

---

## 5) 환경변수 및 실행
- `/backend` `application.yml` 또는 `.env`: DB URL/USER/PASS, JWT SECRET, COOKIE NAME.
- `/frontend` `.env.local`: `NEXT_PUBLIC_API_BASE=http://localhost:8080`
- 루트 `README.md`에 **세팅→DB 스크립트 실행→백/프 기동** 명령 작성.

---

## 6) 수용 기준(샘플)
- **발송 버튼** 클릭 시 포인트 부족이면 차단·알림, 충분하면 차감 후 `campaign_targets`가 생성되고 **SSE 진행률**이 표시된다.
- **대시보드**에서 24시간 sent/read/click 라인이 보이고, 성별/나이/지역 분포 막대가 표시된다.
- **지도**는 서울시청을 중심으로 로드되고, 반경 오버레이 드래그로 세그먼트가 변한다.
- **ADMIN**만 고객 CRUD 화면이 보이며, 일반 사용자에겐 보이지 않는다.

---

## 7) 산출물 요구
- 위 구조로 모든 코드/파일 생성.
- SQL 마이그레이션(V1__init.sql, V2__seed.sql) 완비.
- 로컬에서 e2e 흐름 동작.

> 이제 위 명세대로 코드를 출력/생성하라.

