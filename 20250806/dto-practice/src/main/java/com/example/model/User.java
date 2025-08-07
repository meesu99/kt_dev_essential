package com.example.model;

public class User {
    private Long id;
    private String name;
    private String email;
    private int age;
    private String phone;

    public User() {}

    public User(Long id, String name, String email, int age, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.phone = phone;
    }

    // getter/setter 메서드들
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    @Override
    public String toString() {
        return "User{id=" + id + ", name='" + name + "', email='" + email +
               "', age=" + age + ", phone='" + phone + "'}";
    }
}
