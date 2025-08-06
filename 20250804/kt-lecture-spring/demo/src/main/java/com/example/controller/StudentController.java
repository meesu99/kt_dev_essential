package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;


public class StudentController {
    private final StudentService studentService;

    // 생성자 수동 주입
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    public void run() {
        System.out.println("=== 학생 추가 ===");
        studentService.addStudent(new Student("Alice", 20));
        studentService.addStudent(new Student("Bob", 22));

        System.out.println("\n=== 전체 목록 ===");
        for (Student s : studentService.getAllStudents()) {
            System.out.println(s.getName() + ", 나이: " + s.getAge());
        }

        System.out.println("\n=== 이름으로 찾기 ===");
        Student result = studentService.findStudentByName("Bob");
        if (result != null) {
            System.out.println("찾은 학생: " + result.getName() + ", 나이: " + result.getAge());
        } else {
            System.out.println("학생을 찾을 수 없습니다.");
        }
    }
}
