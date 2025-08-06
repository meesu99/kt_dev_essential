package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@Controller
public class HelloController {

    // 🏠 기본 페이지
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Thymeleaf 데모");
        model.addAttribute("message", "Spring + Thymeleaf 연동 성공!");

        String formattedNow = LocalDateTime.now().format(
        DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH:mm:ss")
        );
        model.addAttribute("currentTime", formattedNow);

        return "hello";  // hello.html 파일 찾기
    }

    // 👤 프로필 페이지
    @GetMapping("/profile")
    public String profile(Model model) {
        model.addAttribute("name", "김코딩");
        model.addAttribute("age", 25);
        model.addAttribute("job", "백엔드 개발자");

        // 🎯 기술 스택 리스트
        List<String> skills = Arrays.asList("Java", "Spring", "Thymeleaf", "MySQL");
        model.addAttribute("skills", skills);

        return "profile";  // profile.html 파일 찾기
    }


    @GetMapping("/about")
    public String about(Model model) {
    // 여러분의 정보로 채워보세요!
    model.addAttribute("myName", "박민수");
    model.addAttribute("myHobby", "🎱🎳🎮🛒");
    model.addAttribute("myDream", "즐거운 삶 살기!");

    // 좋아하는 것들 리스트
    List<String> favorites = Arrays.asList("놀기", "먹기", "자기");
    model.addAttribute("favorites", favorites);

    return "about";
}

}
