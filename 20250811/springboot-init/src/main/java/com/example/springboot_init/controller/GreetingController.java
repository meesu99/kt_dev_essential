package com.example.springboot_init.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GreetingController {

    @Value("${app.welcome-message}")
    private String welcomeMessage;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("message", welcomeMessage);
        return "index";
    }

    @GetMapping("/greeting")
    public String greeting(
        @RequestParam(value = "name", defaultValue = "World") String name,
        Model model
    ) {
        model.addAttribute("name", name);
        model.addAttribute("message", "Hello, " + name + "!");
        return "greeting";
    }
}
