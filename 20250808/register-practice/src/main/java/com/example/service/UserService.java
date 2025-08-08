package com.example.service;

import com.example.model.User;
import com.example.model.UserProfile;
import com.example.model.WelcomeMessage;
import com.example.repository.UserProfileRepository;
import com.example.repository.UserRepository;
import com.example.repository.WelcomeMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final WelcomeMessageRepository welcomeMessageRepository;

    public UserService(UserRepository userRepository, UserProfileRepository userProfileRepository,
            WelcomeMessageRepository welcomeMessageRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.welcomeMessageRepository = welcomeMessageRepository;
    }

    // TODO : @Transactional을 활용한 유저 등록을 완성해보세요!
    @Transactional
    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("이미 존재하는 사용자명입니다: " + user.getUsername());
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다: " + user.getEmail());
        }
        
        // TODO : 1. User 정보 저장
        User savedUser = userRepository.save(user);
        
        // TODO : 2. profile 새로 만들어서 저장하기
        UserProfile userProfile = new UserProfile(savedUser.getId(), savedUser.getUsername());
        userProfileRepository.save(userProfile);
        
        // TODO : 3. WelcomeMessage 저장하기
        WelcomeMessage welcomeMessage = new WelcomeMessage(savedUser.getId());
        welcomeMessageRepository.save(welcomeMessage);

        return savedUser;
    }

    @Transactional
    public User registerUserWithError(User user) {
        User savedUser = userRepository.save(user);
        userProfileRepository.save(new UserProfile(savedUser.getId(), savedUser.getUsername()));
        if (true)
            throw new RuntimeException("⚠️ 의도적 예외 발생! 모든 작업이 롤백됩니다.");

        return savedUser;
    }

    @Transactional(readOnly = true)
    public User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다: " + id));
    }

    @Transactional(readOnly = true)
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
}