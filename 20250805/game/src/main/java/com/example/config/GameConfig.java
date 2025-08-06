// GameConfig.java
package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.example.game.*;

@Configuration
public class GameConfig {

    // 1. 무기 Bean들 등록
    @Bean
    public Weapon sword() {
        System.out.println("🔧 강철 검을 제작 중...");
        return new Sword();
    }

    @Bean
    public Weapon bow() {
        System.out.println("🔧 엘프 활을 제작 중...");
        return new Bow();
    }

    // 2. 전사 Bean 등록 (무기 의존성 주입)
    @Bean
    public Warrior warrior() {
        System.out.println("🔧 전사를 소환 중...");
        // sword() 메서드를 호출해서 Sword Bean을 주입
        return new Warrior(sword());
    }

    // 3. 다른 타입의 전사도 만들 수 있음
    @Bean(name = "archerWarrior")  // Bean 이름을 직접 지정
    @Primary
    public Warrior archerWarrior() {
        System.out.println("🔧 궁수형 전사를 소환 중...");
        // bow() 메서드를 호출해서 Bow Bean을 주입
        return new Warrior(bow());
    }
}
