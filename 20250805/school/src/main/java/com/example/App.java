package com.example;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.example.config.SchoolConfig;
import com.example.school.*;
/**
 * Hello world!
 *
 */
public class App {
    public static void main( String[] args )
    {
        System.out.println( "🏫 학교 관리 시스템 시작!" );

        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SchoolConfig.class);
        System.out.println("✅ 모든 Bean 생성 완료!");

        StudentService studentService = context.getBean(StudentService.class);
        AttendanceService attendanceService = context.getBean(AttendanceService.class);
        GradeService gradeService = context.getBean(GradeService.class);
        
        String name = "김철수";
        studentService.registerStudent(name);
        attendanceService.markAttendance(name);
        gradeService.recordGrade("수학", 95);

        context.close();
        System.out.println("\n🏫 학교 관리 시스템 종료!");
    }
}
