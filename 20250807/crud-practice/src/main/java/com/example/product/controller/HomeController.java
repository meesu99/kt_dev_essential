package com.example.product.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @GetMapping("/")
    @ResponseBody
    public String home() {
        return "{\"message\": \"Hello! Spring MVC 애플리케이션이 실행 중입니다.\", \"status\": \"success\"}";
    }
    
    @GetMapping("/test")
    @ResponseBody
    public String test() {
        return "{\"message\": \"Test endpoint is working!\", \"status\": \"success\"}";
    }
}
