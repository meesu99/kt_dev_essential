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

    // H2 웹 콘솔 서버 활성화 - 포트 충돌 방지를 위해 조건부 실행
    @Bean(initMethod = "start", destroyMethod = "stop")
    public Server h2WebServer() {
        try {
            // 포트가 사용 중인지 확인
            java.net.ServerSocket testSocket = new java.net.ServerSocket(8082);
            testSocket.close();
            
            // 포트가 사용 가능하면 H2 서버 시작
            Server server = Server.createWebServer("-web", "-webAllowOthers", "-webPort", "8082");
            System.out.println("H2 웹 콘솔 서버가 8082 포트에서 시작되었습니다.");
            return server;
        } catch (Exception e) {
            System.out.println("H2 웹 콘솔 서버 시작 실패 (포트 8082가 이미 사용 중): " + e.getMessage());
            System.out.println("H2 콘솔은 http://localhost:8082 에서 접속 가능합니다.");
            // 이미 실행 중인 경우 null 반환하여 Spring이 오류로 처리하지 않도록 함
            return null;
        }
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
        try {
            // users 테이블 생성
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS users (" +
                    "id BIGINT AUTO_INCREMENT PRIMARY KEY, " +
                    "username VARCHAR(50) NOT NULL UNIQUE, " +
                    "password VARCHAR(100) NOT NULL, " +
                    "email VARCHAR(100) NOT NULL UNIQUE)");
            System.out.println("✅ users 테이블이 준비되었습니다.");
            
            // user_profiles 테이블 생성
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS user_profiles (" +
                    "id BIGINT AUTO_INCREMENT PRIMARY KEY, " +
                    "user_id BIGINT NOT NULL, " +
                    "nickname VARCHAR(50) NOT NULL, " +
                    "bio TEXT, " +
                    "FOREIGN KEY (user_id) REFERENCES users(id))");
            System.out.println("✅ user_profiles 테이블이 준비되었습니다.");
            
            // welcome_messages 테이블 생성
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS welcome_messages (" +
                    "id BIGINT AUTO_INCREMENT PRIMARY KEY, " +
                    "user_id BIGINT NOT NULL, " +
                    "message TEXT NOT NULL, " +
                    "created_at TIMESTAMP NOT NULL, " +
                    "FOREIGN KEY (user_id) REFERENCES users(id))");
            System.out.println("✅ welcome_messages 테이블이 준비되었습니다.");
            
            // students 테이블 생성 (기존 코드 유지)
            try {
                jdbcTemplate.queryForObject("SELECT COUNT(*) FROM students", Integer.class);
                System.out.println("[DB 정상 동작] students 테이블 확인");
            } catch (Exception e) {
                System.out.println("students 테이블을 생성합니다...");
                String createStudentsSql = "CREATE TABLE students (" +
                        "name VARCHAR(50) PRIMARY KEY, " +
                        "score INT NOT NULL)";
                jdbcTemplate.execute(createStudentsSql);
                System.out.println("students 테이블이 성공적으로 생성되었습니다.");
                
                // 초기 데이터 삽입 (선택사항)
                try {
                    jdbcTemplate.update("INSERT INTO students (name, score) VALUES (?, ?)", "테스트학생", 100);
                    System.out.println("초기 테스트 데이터가 삽입되었습니다.");
                } catch (Exception insertException) {
                    System.out.println("초기 데이터 삽입 중 오류 (무시됨): " + insertException.getMessage());
                }
            }
            
        } catch (Exception e) {
            System.out.println("데이터베이스 초기화 중 오류: " + e.getMessage());
        }
    }
}
