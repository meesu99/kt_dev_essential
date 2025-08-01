-- 당근마켓 상품 테이블 생성
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  image TEXT DEFAULT 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
  category VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT '판매중' CHECK (status IN ('판매중', '예약중', '판매완료')),
  likes INTEGER DEFAULT 0,
  chats INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 댓글 테이블 생성
CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name VARCHAR(50) NOT NULL DEFAULT '익명',
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 채팅방 테이블 생성
CREATE TABLE chat_rooms (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  buyer_name VARCHAR(50) NOT NULL DEFAULT '구매자',
  seller_name VARCHAR(50) NOT NULL DEFAULT '판매자',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 채팅 메시지 테이블 생성
CREATE TABLE chat_messages (
  id BIGSERIAL PRIMARY KEY,
  chat_room_id BIGINT NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_name VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 업데이트 시간 자동 갱신을 위한 트리거 함수 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at 
    BEFORE UPDATE ON comments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_rooms_updated_at 
    BEFORE UPDATE ON chat_rooms 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 활성화
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- 상품 테이블 정책
CREATE POLICY "Enable read access for all users" ON products
    FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON products
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON products
    FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON products
    FOR DELETE USING (true);

-- 댓글 테이블 정책
CREATE POLICY "Enable read access for all users" ON comments
    FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON comments
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON comments
    FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON comments
    FOR DELETE USING (true);

-- 채팅방 테이블 정책
CREATE POLICY "Enable read access for all users" ON chat_rooms
    FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON chat_rooms
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON chat_rooms
    FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON chat_rooms
    FOR DELETE USING (true);

-- 채팅 메시지 테이블 정책
CREATE POLICY "Enable read access for all users" ON chat_messages
    FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON chat_messages
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON chat_messages
    FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON chat_messages
    FOR DELETE USING (true);

-- 샘플 데이터 삽입
INSERT INTO products (title, description, price, image, category, location) VALUES
('아이폰 14 Pro 128GB 딥퍼플', '1년 사용, 케이스 끼고 사용해서 깨끗해요', 850000, 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop', '디지털기기', '서초구 반포동'),
('맥북 에어 M2 13인치', '대학교 과제용으로 사용했습니다. 정말 깨끗해요!', 1200000, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop', '디지털기기', '강남구 역삼동'),
('갤럭시 버즈 프로 2', '구매한지 3개월 됐고 거의 안써서 새것 같아요', 120000, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop', '디지털기기', '마포구 홍대입구'),
('닌텐도 스위치 OLED', '작년에 구매했는데 게임을 잘 안해서 팝니다', 280000, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop', '디지털기기', '송파구 잠실동'),
('무인양품 원목 책상', '이사가면서 팔아요. 흠집 거의 없어요', 150000, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', '가구/인테리어', '용산구 한남동'),
('에어팟 프로 2세대', '선물받았는데 이미 있어서 새제품 그대로 팔아요', 280000, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop', '디지털기기', '성동구 성수동'),
('다이슨 청소기 V11', '1년 사용했고 필터 새것으로 교체했어요', 320000, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', '가전제품', '강서구 화곡동'),
('커피머신 (나눔)', '새것으로 바꿔서 드려요. 직거래만 가능합니다', 0, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', '가전제품', '노원구 상계동');

-- 샘플 데이터의 좋아요와 채팅 수 업데이트
UPDATE products SET likes = 12, chats = 5 WHERE title = '아이폰 14 Pro 128GB 딥퍼플';
UPDATE products SET likes = 8, chats = 3 WHERE title = '맥북 에어 M2 13인치';
UPDATE products SET likes = 15, chats = 8, status = '예약중' WHERE title = '갤럭시 버즈 프로 2';
UPDATE products SET likes = 20, chats = 12 WHERE title = '닌텐도 스위치 OLED';
UPDATE products SET likes = 6, chats = 2 WHERE title = '무인양품 원목 책상';
UPDATE products SET likes = 25, chats = 15 WHERE title = '에어팟 프로 2세대';
UPDATE products SET likes = 9, chats = 4 WHERE title = '다이슨 청소기 V11';
UPDATE products SET likes = 35, chats = 20 WHERE title = '커피머신 (나눔)';

-- 샘플 댓글 데이터 삽입
INSERT INTO comments (product_id, author_name, content) VALUES
(1, '김철수', '상태가 정말 좋아 보이네요! 직거래 가능한가요?'),
(1, '이영희', '가격 네고 가능할까요?'),
(2, '박민수', '맥북 성능은 어떤가요? 발열은 심하지 않나요?'),
(3, '최지혜', '버즈 케이스도 같이 주시나요?'),
(8, '홍길동', '감사합니다! 좋은 분이시네요 ㅎㅎ');

-- 샘플 채팅방 데이터 삽입
INSERT INTO chat_rooms (product_id, buyer_name, seller_name) VALUES
(1, '김철수', '아이폰판매자'),
(2, '박민수', '맥북판매자'),
(3, '최지혜', '버즈판매자');

-- 샘플 채팅 메시지 삽입
INSERT INTO chat_messages (chat_room_id, sender_name, message) VALUES
(1, '김철수', '안녕하세요! 아이폰 상태 궁금해서 연락드려요'),
(1, '아이폰판매자', '안녕하세요! 정말 깨끗하게 사용했어요. 직거래 가능합니다!'),
(1, '김철수', '네! 언제 만날 수 있을까요?'),
(2, '박민수', '맥북 성능은 어떤가요?'),
(2, '맥북판매자', '과제용으로만 사용해서 성능은 문제없어요!'),
(3, '최지혜', '버즈 케이스도 함께 주시나요?'),
(3, '버즈판매자', '네! 케이스와 이어팁도 새것으로 드려요'); 
UPDATE products SET likes = 35, chats = 20 WHERE title = '커피머신 (나눔)'; 