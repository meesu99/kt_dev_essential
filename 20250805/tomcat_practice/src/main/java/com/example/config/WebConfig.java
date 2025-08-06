package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

// 🎪 Spring MVC 설정의 메인 무대!
@Configuration
@EnableWebMvc
@ComponentScan("com.example")  // com.example 패키지의 모든 클래스 스캔
public class WebConfig implements WebMvcConfigurer {

    // 🖼️ JSP 파일을 찾아주는 도우미 (ViewResolver)
    @Bean
    public InternalResourceViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();

        // JSP 파일 위치 설정
        resolver.setPrefix("/WEB-INF/views/jsp/");  // 앞에 붙일 경로
        resolver.setSuffix(".jsp");             // 뒤에 붙일 확장자

        // Controller에서 "hello" 리턴하면 → /WEB-INF/views/hello.jsp 찾기

        return resolver;
    }

    // 📂 CSS, JS, 이미지 같은 정적 파일 처리
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/resources/");
    }
}
