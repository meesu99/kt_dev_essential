package com.example.game;

public class Bow implements Weapon {
    @Override
    public void attack() {
        System.out.println("🏹 활로 원거리 공격! 데미지: 20");
    }

    @Override
    public String getName() {
        return "엘프 활";
    }
}
