package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 🏠 홈페이지 컨트롤러 (간단 버전)
 */
@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        System.out.println("🏠 홈페이지 접속!");

        model.addAttribute("message", "📚 간단한 북스토어에 오신 것을 환영합니다!");

        return "index";  // templates/index.html
    }
}
