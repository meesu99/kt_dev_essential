// PizzaRestaurantApp.java
package com.example;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.example.pizza.*;

public class App {
    public static void main(String[] args) {
        System.out.println("🏪 피자집 문을 엽니다!");

        // 1. Spring Container 시작 (XML 파일 읽어서 Bean들 생성)
        ApplicationContext pizzaRestaurant =
            new ClassPathXmlApplicationContext("pizza-staff.xml");

        System.out.println("✅ 모든 직원들이 출근했습니다!\n");

        // 2. 피자 셰프 불러오기
        PizzaChef chef = (PizzaChef) pizzaRestaurant.getBean("chef");
        chef.introduceMyself();
        chef.makePizza();

        System.out.println(); // 줄바꿈

        // 3. 웨이터 불러오기
        Waiter waiter = (Waiter) pizzaRestaurant.getBean("waiter");
        waiter.takeOrder();
        waiter.servePizza();

        System.out.println(); // 줄바꿈

        // 4. 계산원 불러오기
        Cashier cashier = (Cashier) pizzaRestaurant.getBean("cashier");
        cashier.calculateBill();
        cashier.sayThankYou();

        System.out.println("\n🎉 피자집 하루 영업이 끝났습니다!");
    }
}
