package com.example.repository;

import com.example.model.UserProfile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class UserProfileRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserProfileRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public UserProfile save(UserProfile profile) {
        if (profile.getId() == null) {
        // "TODO : sql 문을 완성해보세요!"
            String sql = 
            KeyHolder kh = new GeneratedKeyHolder();
            jdbcTemplate.update(con -> {
                PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setLong(1, profile.getUserId());
                ps.setString(2, profile.getNickname());
                ps.setString(3, profile.getBio());
                return ps;
            }, kh);
            if (kh.getKey() != null)
                profile.setId(kh.getKey().longValue());
        } else {
            jdbcTemplate.update("UPDATE user_profiles SET user_id=?, nickname=?, bio=? WHERE id=?",
                    profile.getUserId(), profile.getNickname(), profile.getBio(), profile.getId());
        }
        return profile;
    }
}