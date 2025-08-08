package com.example.product.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import javax.sql.DataSource;
import org.h2.tools.Server;

@Configuration
public class DatabaseConfig {

    // 데이터소스 설정
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.h2.Driver");
        // 사용자 홈 디렉토리에 데이터베이스 파일 생성
        String dbPath = "C:/Users/meesu/spring_products";
        dataSource.setUrl("jdbc:h2:file:" + dbPath + ";AUTO_SERVER=TRUE;MODE=MySQL;DB_CLOSE_DELAY=-1");
        System.out.println("H2 데이터베이스 경로: " + dbPath);
        dataSource.setUsername("sa");
        dataSource.setPassword("");
        return dataSource;
    }

    // H2 웹 콘솔 서버 비활성화 (별도 실행)
    // @Bean(initMethod = "start", destroyMethod = "stop")
    // public Server h2WebServer() throws Exception {
    //     return Server.createWebServer("-web", "-webAllowOthers", "-webPort", "8084");
    // }

    // JdbcTemplate 설정
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        // 테이블 생성 및 초기 데이터 삽입
        initializeDatabase(jdbcTemplate);

        return jdbcTemplate;
    }

    private void initializeDatabase(JdbcTemplate jdbcTemplate) {
        try {
            // 테이블이 존재하는지 확인
            jdbcTemplate.queryForObject("SELECT COUNT(*) FROM products", Integer.class);
            System.out.println("products 테이블이 이미 존재합니다.");
        } catch (Exception e) {
            // 테이블이 존재하지 않으면 생성
            System.out.println("products 테이블을 생성합니다...");
            String createTableSql = "CREATE TABLE products (" +
                    "id BIGINT AUTO_INCREMENT PRIMARY KEY, " +
                    "name VARCHAR(255) NOT NULL, " +
                    "description TEXT, " +
                    "price INT NOT NULL, " +
                    "stock INT NOT NULL DEFAULT 0" +
                    ")";
            jdbcTemplate.execute(createTableSql);

            // 초기 데이터 삽입
            String insertSql = "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(insertSql, "노트북", "고성능 게이밍 노트북", 1500000, 10);
            jdbcTemplate.update(insertSql, "마우스", "무선 게이밍 마우스", 80000, 25);
            jdbcTemplate.update(insertSql, "키보드", "기계식 키보드", 120000, 15);
            jdbcTemplate.update(insertSql, "모니터", "27인치 4K 모니터", 300000, 8);
            jdbcTemplate.update(insertSql, "헤드셋", "노이즈 캔슬링 헤드셋", 200000, 12);

            System.out.println("테이블이 생성되고 초기 데이터가 삽입되었습니다.");
        }
    }
}
