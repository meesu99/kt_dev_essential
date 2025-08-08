package com.example.product.repository;

import com.example.product.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ProductRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> findAll() {
        String sql = "SELECT id, name, description, price, stock, created_at FROM products";
        return jdbcTemplate.query(sql, new ProductRowMapper());
    }

    public Product findById(Long id) {
        String sql = "SELECT id, name, description, price, stock, created_at FROM products WHERE id = ?";
        List<Product> results = jdbcTemplate.query(sql, new ProductRowMapper(), id);
        return results.isEmpty() ? null : results.get(0);
    }

    public Product save(Product product) {
        if (product.getId() == null) {
            // 새 상품 추가
            String sql = "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sql, product.getName(), product.getDescription(), product.getPrice(), product.getStock());
            
            // 생성된 ID 조회
            String idSql = "SELECT LAST_INSERT_ID()";
            Long id = jdbcTemplate.queryForObject(idSql, Long.class);
            product.setId(id);
        } else {
            // 기존 상품 수정
            String sql = "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?";
            jdbcTemplate.update(sql, product.getName(), product.getDescription(), product.getPrice(), product.getStock(), product.getId());
        }
        return product;
    }

    public void deleteById(Long id) {
        String sql = "DELETE FROM products WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public boolean existsById(Long id) {
        String sql = "SELECT COUNT(*) FROM products WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    private static class ProductRowMapper implements RowMapper<Product> {
        @Override
        public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
            Product product = new Product();
            product.setId(rs.getLong("id"));
            product.setName(rs.getString("name"));
            product.setDescription(rs.getString("description"));
            product.setPrice(rs.getInt("price"));
            product.setStock(rs.getInt("stock"));
            product.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
            return product;
        }
    }
}
