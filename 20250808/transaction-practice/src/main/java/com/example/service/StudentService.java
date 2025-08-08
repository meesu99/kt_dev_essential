package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Student;
import com.example.repository.StudentRepository;

// service/StudentService.java
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // 트랜잭션이 없는 위험한 메서드
    public void addStudentsWithoutTransaction() {
        System.out.println("=== 트랜잭션 없이 학생들 추가 ===");

        studentRepository.save(new Student("김철수", 85));
        studentRepository.save(new Student("이영희", 92));

        // 의도적으로 오류 발생!
        throw new RuntimeException("의도적 오류 발생!");

        // 이 부분은 실행되지 않음
        // studentRepository.save(new Student("박민수", 78));
    }

    // 트랜잭션이 있는 안전한 메서드
    @Transactional
    public void addStudentsWithTransaction() {
        System.out.println("=== 트랜잭션으로 학생들 추가 ===");

        studentRepository.save(new Student("최지원", 88));
        studentRepository.save(new Student("정수빈", 95));

        // 의도적으로 오류 발생!
        throw new RuntimeException("의도적 오류 발생!");

        // 이 부분은 실행되지 않음
        // studentRepository.save(new Student("한소영", 82));
    }

    // 정상적인 학생 추가 (트랜잭션 적용)
    @Transactional
    public void addStudentsSafely() {
        System.out.println("=== 안전하게 학생들 추가 ===");

        studentRepository.save(new Student("김도현", 90));
        studentRepository.save(new Student("이서연", 87));
        studentRepository.save(new Student("박준호", 93));

        System.out.println("모든 학생 추가 완료!");
    }

    // 모든 학생 조회
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // 데이터 초기화
    @Transactional
    public void clearAllStudents() {
        // 간단하게 테이블 다시 생성으로 초기화
        String sql = "DROP TABLE IF EXISTS students";
        studentRepository.getJdbcTemplate().execute(sql);
        studentRepository.createTable();
    }
}
