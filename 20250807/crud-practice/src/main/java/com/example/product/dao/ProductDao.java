package com.example.product.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.dao.EmptyResultDataAccessException;
import com.example.product.model.Product;

@Repository
public class ProductDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 모든 상품 조회
    public List<Product> findAll() {
        String sql = "SELECT * FROM products ORDER BY id";
        return jdbcTemplate.query(sql, new ProductRowMapper());
    }

    // 상품 추가 및 수정
    public Product save(Product product) {
        if (product.getId() == null) {
            // 새 상품 추가
            String sql = "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sql, product.getName(), product.getDescription(),
                    product.getPrice(), product.getStock());
        } else {
            // 기존 상품 수정
            String sql = "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?";
            jdbcTemplate.update(sql, product.getName(), product.getDescription(),
                    product.getPrice(), product.getStock(), product.getId());
        }
        return product;
    }

    // ID로 상품 찾기
    public Product findById(Long id) {
        String sql = "SELECT * FROM products WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new ProductRowMapper(), id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    // 상품 삭제
    public void deleteById(Long id) {
        String sql = "DELETE FROM products WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    // 상품 존재 여부 확인
    public boolean existsById(Long id) {
        String sql = "SELECT COUNT(*) FROM products WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    // RowMapper 내부 클래스
    private class ProductRowMapper implements RowMapper<Product> {
        @Override
        public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
            Product product = new Product();
            product.setId(rs.getLong("id"));
            product.setName(rs.getString("name"));
            product.setDescription(rs.getString("description"));
            product.setPrice(rs.getInt("price"));
            product.setStock(rs.getInt("stock"));
            return product;
        }
    }
}