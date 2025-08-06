package com.example.service;

import java.time.DayOfWeek;
import java.time.LocalDate;

import org.springframework.stereotype.Service;

@Service  // 🏪 "나는 비즈니스 로직을 처리하는 Service야!"
public class MessageService {

    // 환영 메시지 생성
    public String getWelcomeMessage(String name) {
        return String.format("안녕하세요, %s님! Spring MVC에 오신 것을 환영합니다! 🎉", name);
    }

    // 현재 시간 메시지
    public String getCurrentTimeMessage() {
        java.time.LocalDateTime now = java.time.LocalDateTime.now();
        return "현재 시간: " + now.toString();
    }

    // 랜덤 메시지
    public String getRandomMessage() {
        String[] messages = {
            "오늘도 열심히 코딩해요! 💻",
            "Spring은 정말 재미있어요! 🌱",
            "MVC 패턴을 마스터해봐요! 🚀",
            "개발자의 길은 험하지만 보람있어요! ⭐"
        };

        int randomIndex = (int)(Math.random() * messages.length);
        return messages[randomIndex];
    }

    public String getCurrentDateMessage() {
        LocalDate today = LocalDate.now();
        DayOfWeek dayOfWeek = today.getDayOfWeek();
        return "현재 요일: " + dayOfWeek.toString();
    }
}
