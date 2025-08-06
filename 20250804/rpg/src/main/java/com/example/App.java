// App.java
package com.example;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.example.game.*;

public class App {
    public static void main(String[] args) {
        System.out.println("🎮 RPG 게임을 시작합니다!\n");

        // Spring Container로 게임 세계 생성
        ApplicationContext gameWorld =
            new ClassPathXmlApplicationContext("game-characters.xml");

        System.out.println("✨ 모든 캐릭터들이 게임 세계에 소환되었습니다!\n");

        // 캐릭터들 소개
        System.out.println("=== 🎭 캐릭터 소개 ===");

        Warrior warrior = (Warrior) gameWorld.getBean("warrior");
        warrior.introduce();

        Mage mage = (Mage) gameWorld.getBean("mage");
        mage.introduce();

        Archer archer = (Archer) gameWorld.getBean("archer");
        archer.introduce();

        // 전투 시뮬레이션
        System.out.println("\n=== ⚔️ 전투 시작! ===");

        warrior.attack();
        warrior.defendSkill();

        System.out.println();

        mage.castFireball();
        mage.heal();
        mage.castFireball(); // 마나 소모 후 재사용

        System.out.println();

        archer.shootArrow();
        archer.multiShot();

        System.out.println("\n🏆 전투 종료! 모든 캐릭터가 경험치를 얻었습니다!");
    }
}
