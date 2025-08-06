package com.example.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.example")  // com.example 안에서 @Component 찾아라
public class AppConfig {
    
}
