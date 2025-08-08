package com.example.config;

import org.h2.tools.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
public class DatabaseConfig {

    // 데이터소스 설정
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.h2.Driver");
        // transaction_example DB를 새로 사용하겠다!
        dataSource.setUrl("jdbc:h2:~/transaction_example;AUTO_SERVER=true;MODE=MySQL"); // 새로운 호환 DB
        dataSource.setUsername("sa");
        dataSource.setPassword("");
        return dataSource;
    }

    // H2 웹 콘솔 서버 활성화 - 이 부분 추가
    @Bean(initMethod = "start", destroyMethod = "stop")
    public Server h2WebServer() throws Exception {
        return Server.createWebServer("-web", "-webAllowOthers", "-webPort", "8082");
    }

    // JdbcTemplate 설정
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        // 테이블 생성 및 초기 데이터 삽입
        initializeDatabase(jdbcTemplate);

        return jdbcTemplate;
    }

    // 트랜잭션 매니저 설정
    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    private void initializeDatabase(JdbcTemplate jdbcTemplate) {
        // students 테이블 보장
        try {
            jdbcTemplate.queryForObject("SELECT COUNT(*) FROM students", Integer.class);
            System.out.println("[DB 정상 동작] students 테이블 확인");
        } catch (Exception e) {
            System.out.println("students 테이블을 생성합니다...");
            String createStudentsSql = "CREATE TABLE students (" +
                    "name VARCHAR(50) PRIMARY KEY, " +
                    "score INT NOT NULL)";
            jdbcTemplate.execute(createStudentsSql);
        }
    }
}
