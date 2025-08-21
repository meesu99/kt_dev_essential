
flowchart TD
    U[사용자 브라우저\n(Chrome/Edge)] -->|HTTP/HTTPS| FE[Frontend\nNext.js + TailwindCSS\nLeaflet / Recharts]

    subgraph Local API
      BE[Backend\nSpring Boot\nREST + SSE + JWT] -->|JPA| DB[(PostgreSQL in Docker)]
      DB --- PGX[(PostGIS Extension\nGEOGRAPHY(POINT,4326)\nST_DWithin 등)]
    end

    FE -->|Fetch / 쿠키(JWT HttpOnly)| BE
    BE -->|SSE 진행률| FE

    %% 외부 API / 오픈 데이터
    FE -->|Script Load| DAUM[Daum Postcode\n(주소 검색)]
    FE -->|Tile 요청| OSM[OpenStreetMap Tiles\n(지도 배경)]
    BE -->|REST (KakaoAK)| KAKAO[Kakao Local API\n(지오코딩: 주소→좌표)]

    %% 데이터 흐름 강조
    KAKAO -->|lat/lng 반환| BE -->|geom 저장| DB
    FE -->|필터(성별/나이/지역/반경)| BE -->|ST_DWithin| DB
    