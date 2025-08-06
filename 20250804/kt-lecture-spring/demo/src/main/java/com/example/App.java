package com.example;

import com.example.controller.StudentController;
import com.example.service.StudentService;


public class App {
    public static void main(String[] args) {
        // 수동 DI (직접 객체 생성 및 연결)
        StudentService service = new StudentService();
        StudentController controller = new StudentController(service);

        // 실행
        controller.run();
    }
}
