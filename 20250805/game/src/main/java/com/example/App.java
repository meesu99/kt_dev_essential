package com.example;

// App.java
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import com.example.config.GameConfig;
import com.example.game.*;

public class App {
    public static void main(String[] args) {
        System.out.println("🎮 RPG 게임 시작!\n");

        // 게임 세계 생성 (Spring Container 시작)
        ApplicationContext gameWorld =
            new AnnotationConfigApplicationContext(GameConfig.class);

        System.out.println("\n✅ 게임 세계 준비 완료!\n");

        // 검을 든 전사 소환
        System.out.println("=== 🗡️ 검 전사 소환 ===");
        Warrior swordWarrior = gameWorld.getBean(Warrior.class);
        swordWarrior.introduce();
        swordWarrior.fight();

        System.out.println();

        // 활을 든 전사 소환 (이름으로 지정)
        System.out.println("=== 🏹 궁수 전사 소환 ===");
        Warrior bowWarrior = (Warrior) gameWorld.getBean("archerWarrior");
        bowWarrior.introduce();
        bowWarrior.fight();

        System.out.println("\n🎮 게임 종료!");
    }
}
