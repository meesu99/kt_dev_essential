package com.example.spring_boot_user.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity                    // ← 이 클래스는 데이터베이스 테이블과 매핑됨
@Table(name = "users")     // ← 실제 테이블 이름 지정 (생략 가능)
public class User {

    @Id                              // ← 기본키(Primary Key)
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // ← 자동 증가
    private Long id;

    @Column(name = "user_name", nullable = false, length = 50)  // ← 컬럼 상세 설정
    private String name;

    @Column(nullable = false)
    private Integer age;

    @Column(unique = true)  // ← 이메일 중복 방지
    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // 기본 생성자 (JPA 필수!)
    public User() {}

    // 편의 생성자
    public User(String name, Integer age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) {
        this.name = name;
        this.updatedAt = LocalDateTime.now();
    }

    public Integer getAge() { return age; }
    public void setAge(Integer age) {
        this.age = age;
        this.updatedAt = LocalDateTime.now();
    }

    public String getEmail() { return email; }
    public void setEmail(String email) {
        this.email = email;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // toString 메소드 (디버깅용)
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", email='" + email + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}