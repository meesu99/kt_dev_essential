package com.example.controller;

import com.example.dto.UserCreateDto;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 1. 사용자 목록 페이지
    @GetMapping()
    public String listUsers(Model model) {
        System.out.println("사용자 목록 페이지!");
        model.addAttribute("users", userService.getAllUsers());
        return "user/list";
    }

    // 2. 사용자 상세 페이지
    @GetMapping("/{id}")
    public String userDetail(@PathVariable Long id, Model model) {
        System.out.println("사용자 상세 페이지!");
        model.addAttribute("user", userService.getUserById(id));
        return "user/detail";
    }

    // 3. 사용자 생성 폼 페이지
    @GetMapping("/create")
    public String createUserForm(Model model) {
        model.addAttribute("userCreateDto", new UserCreateDto());
        return "user/create";
    }

    // 4. 사용자 생성 처리 ⭐ ModelAttribute의 핵심!
    @PostMapping("/create")
    public String createUser(@ModelAttribute UserCreateDto userCreate) {
        System.out.println(userCreate.toString());
        userService.createUser(userCreate);
        return "redirect:/users";
    }
}
