package com.example.game;

public class Sword implements Weapon {
    @Override
    public void attack() {
        System.out.println("⚔️ 검으로 베기 공격! 데미지: 25");
    }

    @Override
    public String getName() {
        return "강철 검";
    }
}
