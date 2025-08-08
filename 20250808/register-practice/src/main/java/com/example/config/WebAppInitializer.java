package com.example.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
import com.example.config.WebConfig;

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
     * 데이터베이스 설정을 포함
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        System.out.println("🔧 Root 설정 클래스 로드: DatabaseConfig");
        return new Class<?>[] { DatabaseConfig.class };
    }

    /**
     * 🌐 Web 설정 클래스 (웹 관련 설정)
     * WebConfig 클래스를 사용하겠다고 알려줌
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        System.out.println("🌐 Web 설정 클래스 로드: WebConfig");
        return new Class[] { WebConfig.class };
    }

    /**
     * 📍 URL 매핑 설정
     * "/" 으로 들어오는 모든 요청을 Spring MVC가 처리하게 함
     */
    @Override
    protected String[] getServletMappings() {
        System.out.println("📍 URL 매핑 설정: /");
        return new String[] { "/" };
    }

    /**
     * 🔤 한글 인코딩 설정
     */
    @Override
    protected javax.servlet.Filter[] getServletFilters() {
        System.out.println("🔤 인코딩 필터 설정: UTF-8");
        org.springframework.web.filter.CharacterEncodingFilter encodingFilter =
            new org.springframework.web.filter.CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        encodingFilter.setForceEncoding(true);

        return new javax.servlet.Filter[] { encodingFilter };
    }
}
