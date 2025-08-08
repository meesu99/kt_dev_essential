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

    // JdbcTemplate 반환 메서드 수정
    public JdbcTemplate getJdbcTemplate() {
        return this.jdbcTemplate;
    }

    // 테이블 생성 메서드 추가
    public void createTable() {
        String createStudentsSql = "CREATE TABLE students (" +
                "name VARCHAR(50) PRIMARY KEY, " +
                "score INT NOT NULL)";
        jdbcTemplate.execute(createStudentsSql);
        System.out.println("students 테이블이 생성되었습니다.");
    }
}
