package com.example.model;

import java.util.List;

/**
 * 👨‍🎓 학생 정보 클래스 - 바인딩 학습용
 */
public class Student {
    private String name;
    private int age;
    private String email;
    private boolean scholarship;
    private List<String> hobbies;

    // 기본 생성자 (Spring 필수!)
    public Student() {
        System.out.println("👨‍🎓 Student 객체 생성됨!");
    }
    
    // Getter & Setter (바인딩을 위해 필수!)
    public void setName(String name) { this.name = name; }
    public String getName() { return name; }

    public void setAge(int age) { this.age = age; }
    public int getAge() { return age; }

    public void setEmail(String email) { this.email = email; }
    public String getEmail() { return email; }

    public boolean isScholarship() { return scholarship; }
    public void setScholarship(boolean scholarship) {
        System.out.println("🏆 장학금 설정: " + scholarship);
        this.scholarship = scholarship;
    }

    public List<String> getHobbies() { return hobbies; }
    public void setHobbies(List<String> hobbies) {
        this.hobbies = hobbies;
    }

    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age +
               ", email='" + email + "', scholarship=" + scholarship +
               ", hobbies=" + hobbies + "}";
    }
}
