// Archer.java (궁수)
package com.example.game;

public class Archer {
    private String name = "정확한 궁수";
    private int health = 85;
    private int accuracy = 90;
    private int arrows = 50;

    public void introduce() {
        System.out.println("🏹 " + name + "입니다! (체력:" + health + ", 정확도:" + accuracy + "%, 화살:" + arrows + "개)");
    }

    public void shootArrow() {
        if (arrows > 0) {
            System.out.println("🎯 화살 발사! 정확도 " + accuracy + "%로 명중!");
            arrows--;
            System.out.println("   (남은 화살: " + arrows + "개)");
        } else {
            System.out.println("🚫 화살이 떨어졌습니다!");
        }
    }

    public void multiShot() {
        if (arrows >= 3) {
            System.out.println("🎯🎯🎯 연속 발사! 3개의 화살을 동시에!");
            arrows -= 3;
        } else {
            System.out.println("🚫 화살이 부족합니다! (3개 필요)");
        }
    }
}
