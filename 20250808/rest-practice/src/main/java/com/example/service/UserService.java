package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 모든 사용자 조회
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ID로 사용자 조회
    public User getUserById(Long id) {
        User user = userRepository.findById(id);
        if (user == null) {
            throw new RuntimeException("사용자를 찾을 수 없습니다: " + id);
        }
        return user;
    }

    // 사용자 생성
    public User createUser(User user) {
        // 비즈니스 로직: 이메일 중복 체크 (간단 버전)
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            throw new RuntimeException("이름은 필수입니다!");
        }

        return userRepository.save(user);
    }

    // 사용자 삭제
    public boolean deleteUser(Long id) {
        if (!userRepository.deleteById(id)) {
            throw new RuntimeException("삭제할 사용자가 없습니다: " + id);
        }
        return true;
    }
}
