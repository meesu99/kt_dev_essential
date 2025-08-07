package com.example.service;

import com.example.dto.UserCreateDto;
import com.example.dto.UserUpdateDto;
import com.example.model.User;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService {

    private Map<Long, User> users = new HashMap<>();
    private Long nextId = 1L;

    public UserService() {
        users.put(1L, new User(1L, "김철수", "kim@test.com", 25, "010-1234-5678"));
        users.put(2L, new User(2L, "이영희", "lee@test.com", 30, "010-9876-5432"));
        nextId = 3L;
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    public User getUserById(Long id) {
        return users.get(id);
    }

    public User createUser(UserCreateDto dto) {
        User newUser = new User();
        newUser.setId(nextId++);
        newUser.setName(dto.getName());
        newUser.setEmail(dto.getEmail());
        newUser.setAge(dto.getAge());
        newUser.setPhone(dto.getPhone());

        users.put(newUser.getId(), newUser);
        return newUser;
    }

    public User updateUser(UserUpdateDto dto) {
        User existingUser = users.get(dto.getId());
        if (existingUser != null) {
            existingUser.setName(dto.getName());
            existingUser.setEmail(dto.getEmail());
            existingUser.setAge(dto.getAge());
            existingUser.setPhone(dto.getPhone());
        }
        return existingUser;
    }

    public boolean deleteUser(Long id) {
        return users.remove(id) != null;
    }
}
