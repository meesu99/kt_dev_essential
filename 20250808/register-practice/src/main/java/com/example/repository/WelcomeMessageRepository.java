package com.example.repository;

import com.example.model.WelcomeMessage;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;

@Repository
public class WelcomeMessageRepository {
    private final JdbcTemplate jdbcTemplate;

    public WelcomeMessageRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public WelcomeMessage save(WelcomeMessage wm) {
        if (wm.getId() == null) {
            String sql = "INSERT INTO welcome_messages(user_id, message, created_at) VALUES(?, ?, ?)";
            KeyHolder kh = new GeneratedKeyHolder();
            jdbcTemplate.update(con -> {
                PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setLong(1, wm.getUserId());
                ps.setString(2, wm.getMessage());
                ps.setTimestamp(3, Timestamp.valueOf(wm.getCreatedAt()));
                return ps;
            }, kh);
            if (kh.getKey() != null)
                wm.setId(kh.getKey().longValue());
        } else {
            jdbcTemplate.update("UPDATE welcome_messages SET user_id=?, message=?, created_at=? WHERE id=?",
                    wm.getUserId(), wm.getMessage(), Timestamp.valueOf(wm.getCreatedAt()), wm.getId());
        }
        return wm;
    }
}