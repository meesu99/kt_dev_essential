package com.example.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

// Spring MVC 애플리케이션을 시작하는 클래스
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    // Root Context는 사용하지 않음 (나중에 배울 거예요!)
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return null;  // 지금은 사용하지 않음
    }

    // 웹 관련 설정 클래스 지정
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[] { WebConfig.class };  // 우리가 만든 설정 클래스!
    }

    // DispatcherServlet이 처리할 URL 패턴
    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };  // 모든 요청을 DispatcherServlet이 처리
    }
}
