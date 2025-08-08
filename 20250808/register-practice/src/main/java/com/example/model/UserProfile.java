package com.example.model;

public class UserProfile {
    private Long id;
    private Long userId;
    private String nickname;
    private String bio;

    public UserProfile() {
    }

    public UserProfile(Long userId, String nickname) {
        this.userId = userId;
        this.nickname = nickname;
        this.bio = "새로 가입한 회원입니다.";
    }

    // TODO : getter/setter 완성해보세요!
}