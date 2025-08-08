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

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}