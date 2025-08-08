package com.example.controller;

import com.example.model.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users - 모든 사용자 조회
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        // TODO : userService를 올바른 형태로 users 객체에 담아보세요. 
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // GET /api/users/1 - 특정 사용자 조회
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            // TODO : 해당 부분을 완성해보세요.
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /api/users - 새 사용자 생성
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            // 디버깅을 위한 로그 추가
            System.out.println("POST 요청 받은 사용자 데이터: " + user);
            System.out.println("이름: " + user.getName() + ", 이메일: " + user.getEmail());

            // 요청 바디 검증
            if (user == null) {
                System.out.println("ERROR: 사용자 객체가 null입니다.");
                return ResponseEntity.badRequest().build();
            }

            if (user.getName() == null || user.getName().trim().isEmpty()) {
                System.out.println("ERROR: 이름이 비어있습니다.");
                return ResponseEntity.badRequest().build();
            }

            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                System.out.println("ERROR: 이메일이 비어있습니다.");
                return ResponseEntity.badRequest().build();
            }
						// TODO : 
            User newUser = userService.createUser(user);
            System.out.println("생성된 사용자: " + newUser);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            System.out.println("ERROR 발생: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    // DELETE /api/users/1 - 사용자 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
