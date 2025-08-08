package com.example.repository;

import com.example.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 🎯 RowMapper: ResultSet → User 객체 변환기
    private RowMapper<User> userRowMapper = new RowMapper<User>() {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            user.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
            return user;
        }
    };

    // 📋 모든 사용자 조회
    public List<User> findAll() {
        String sql = "SELECT * FROM users ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, userRowMapper);
    }

    // 🔍 ID로 사용자 조회
    public User findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        List<User> users = jdbcTemplate.query(sql, userRowMapper, id);
        return users.isEmpty() ? null : users.get(0);
    }

    // ➕ 사용자 생성
    // TODO : user를 저장하는 함수를 만들어보세요.
    // user.getId()가 null인지 아닌지 체크하고
    // insertUser 와 updateUser 함수를 나눠서 사용해보세요
    public User save(User user) {
        if (user.getId() == null) {
            // 새 사용자 추가
            return insertUser(user);
        } else {
            // 기존 사용자 수정
            return updateUser(user);
        }
    }

    // 새 사용자 추가 (ID 자동 생성)
    private User insertUser(User user) {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            return ps;
        }, keyHolder);

        // 생성된 ID 가져오기 (여러 키가 반환될 때 ID만 추출)
        Long generatedId = null;
        if (keyHolder.getKeys() != null && !keyHolder.getKeys().isEmpty()) {
            // 첫 번째 키 맵에서 ID 값 가져오기
            Object idValue = keyHolder.getKeys().get("ID");
            if (idValue != null) {
                generatedId = ((Number) idValue).longValue();
            }
        }

        if (generatedId == null) {
            throw new RuntimeException("생성된 사용자의 ID를 가져올 수 없습니다.");
        }

        return findById(generatedId);
    }

    // 기존 사용자 수정
    private User updateUser(User user) {
        String sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
        jdbcTemplate.update(sql, user.getName(), user.getEmail(), user.getId());
        return findById(user.getId());
    }

    // 🗑️ 사용자 삭제
    public boolean deleteById(Long id) {
        String sql = "DELETE FROM users WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        return rowsAffected > 0;
    }

    // 📊 전체 사용자 수 조회
    public long count() {
        String sql = "SELECT COUNT(*) FROM users";
        Long result = jdbcTemplate.queryForObject(sql, Long.class);
        return result != null ? result : 0L;
    }

    // 🔎 이름으로 검색
    public List<User> findByNameContaining(String keyword) {
        String sql = "SELECT * FROM users WHERE name LIKE ? ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, userRowMapper, "%" + keyword + "%");
    }
}
