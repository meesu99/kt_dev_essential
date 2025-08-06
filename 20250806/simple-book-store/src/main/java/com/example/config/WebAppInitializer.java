package com.example.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * 🚀 Spring MVC 시작 설정
 *
 * 비유: 웹 애플리케이션의 "시동 버튼"
 * - web.xml 대신 Java로 설정
 * - 서버가 시작될 때 이 클래스를 자동으로 찾아서 실행
 */
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    /**
     * 🔧 Root 설정 클래스 (전역 설정)
     * 지금은 간단하게 null 반환
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return null;  // 간단한 예제에서는 생략
    }

    /**
     * 🌐 Web 설정 클래스 (웹 관련 설정)
     * WebConfig 클래스를 사용하겠다고 알려줌
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[] { WebConfig.class };
    }

    /**
     * 📍 URL 매핑 설정
     * "/" 으로 들어오는 모든 요청을 Spring MVC가 처리하게 함
     */
    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }

    /**
     * 🔤 한글 인코딩 설정
     */
    @Override
    protected javax.servlet.Filter[] getServletFilters() {
        org.springframework.web.filter.CharacterEncodingFilter encodingFilter =
            new org.springframework.web.filter.CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        encodingFilter.setForceEncoding(true);

        return new javax.servlet.Filter[] { encodingFilter };
    }
}
