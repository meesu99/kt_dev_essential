package com.example.model;

import java.time.LocalDateTime;

public class WelcomeMessage {
    private Long id;
    private Long userId;
    private String message;
    private LocalDateTime createdAt;

    public WelcomeMessage() {
    }

    public WelcomeMessage(Long userId) {
        this.userId = userId;
        this.message = "회원가입을 축하드립니다!";
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}