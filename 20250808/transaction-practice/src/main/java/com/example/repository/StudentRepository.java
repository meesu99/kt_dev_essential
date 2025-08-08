package com.example.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.model.Student;

// repository/StudentRepository.java
@Repository
public class StudentRepository {

    private final JdbcTemplate jdbcTemplate;

    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // TODO : 테이블 생성은 안전하게 DatabaseConfig 안에서 진행.
    // 혹은 h2 DB console 에서 직접 CREATE TABLE 로 테이블 만든 후 실행 !

    // 학생 저장
    public void save(Student student) {
        String sql = "INSERT INTO students (name, score) VALUES (?, ?) " +
                    "ON DUPLICATE KEY UPDATE score = VALUES(score)";
        jdbcTemplate.update(sql, student.getName(), student.getScore());

        System.out.println("저장됨: " + student);
    }

    // 학생 조회
    public Student findByName(String name) {
        String sql = "SELECT name, score FROM students WHERE name = ?";
        try {
            return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
                Student student = new Student();
                student.setName(rs.getString("name"));
                student.setScore(rs.getInt("score"));
                return student;
            }, name);
        } catch (Exception e) {
            return null;
        }
    }

    // 모든 학생 조회
    public List<Student> findAll() {
        String sql = "SELECT name, score FROM students";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Student student = new Student();
            student.setName(rs.getString("name"));
            student.setScore(rs.getInt("score"));
            return student;
        });
    }

    public Object getJdbcTemplate() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getJdbcTemplate'");
    }
}
