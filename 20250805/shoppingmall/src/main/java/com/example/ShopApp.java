// ShopApp.java
package com.example;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.example.shop.OrderController;
import com.example.config.AppConfig;

public class ShopApp 
{
    public static void main( String[] args )
    {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        OrderController controller = context.getBean(OrderController.class);

        System.out.println("=== 온라인 쇼핑몰 주문 시스템 ==");
        controller.handleOrderRequest("노트북", 2);
    }
}
