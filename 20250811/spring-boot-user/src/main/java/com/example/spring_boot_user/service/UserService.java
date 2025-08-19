package com.example.spring_boot_user.service;

import com.example.spring_boot_user.entity.User;
import com.example.spring_boot_user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 모든 사용자 조회
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ID로 사용자 조회
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // 이메일로 사용자 조회
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // 사용자 생성
    public User createUser(User user) {
        // 이메일 중복 체크
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("이미 존재하는 이메일입니다: " + user.getEmail());
        }
        return userRepository.save(user);
    }

    // 사용자 수정
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(updatedUser.getName());
                    user.setAge(updatedUser.getAge());
                    user.setEmail(updatedUser.getEmail());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + id));
    }

    // 사용자 삭제
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("사용자를 찾을 수 없습니다: " + id);
        }
        userRepository.deleteById(id);
    }

    // 나이 범위로 사용자 검색
    public List<User> getUsersByAgeRange(Integer minAge, Integer maxAge) {
        return userRepository.findByAgeBetween(minAge, maxAge);
    }

    // 이름으로 사용자 검색
    public List<User> searchUsersByName(String keyword) {
        return userRepository.findByNameContaining(keyword);
    }

    // 전체 사용자 수
    public long getUserCount() {
        return userRepository.count();
    }
}