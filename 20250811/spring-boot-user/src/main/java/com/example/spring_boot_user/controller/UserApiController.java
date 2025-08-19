package com.example.spring_boot_user.controller;

import com.example.spring_boot_user.entity.User;
import com.example.spring_boot_user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserApiController {

    @Autowired
    private UserService userService;

    // 모든 사용자 조회
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) Integer minAge,
        @RequestParam(required = false) Integer maxAge
    ) {
        List<User> users;

        if (name != null) {
            users = userService.searchUsersByName(name);
        } else if (minAge != null && maxAge != null) {
            users = userService.getUsersByAgeRange(minAge, maxAge);
        } else {
            users = userService.getAllUsers();
        }

        return ResponseEntity.ok(users);
    }

    // 특정 사용자 조회
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    // 사용자 생성
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 이메일 중복
        }
    }

    // 사용자 수정
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 사용자 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 사용자 수 조회
    @GetMapping("/count")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(userService.getUserCount());
    }
}