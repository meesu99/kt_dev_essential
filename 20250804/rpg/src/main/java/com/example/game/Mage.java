// Mage.java (마법사)
package com.example.game;

public class Mage {
    private String name = "지혜로운 마법사";
    private int health = 70;
    private int magic = 30;
    private int mana = 100;

    public void introduce() {
        System.out.println("🔮 " + name + "입니다! (체력:" + health + ", 마법력:" + magic + ", 마나:" + mana + ")");
    }

    public void castFireball() {
        if (mana >= 20) {
            System.out.println("🔥 파이어볼! 마법 데미지: " + magic);
            mana -= 20;
            System.out.println("   (남은 마나: " + mana + ")");
        } else {
            System.out.println("💨 마나가 부족합니다!");
        }
    }

    public void heal() {
        if (mana >= 15) {
            System.out.println("✨ 힐링! 체력을 25 회복합니다!");
            health = Math.min(health + 25, 100);
            mana -= 15;
        } else {
            System.out.println("💨 마나가 부족합니다!");
        }
    }
}