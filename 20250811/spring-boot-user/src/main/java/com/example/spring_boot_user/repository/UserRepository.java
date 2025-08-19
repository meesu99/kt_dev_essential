package com.example.spring_boot_user.repository;

import com.example.spring_boot_user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // === 1. 기본 메소드들 (JpaRepository가 자동 제공) ===
    // save(user)           → 저장/수정
    // findById(id)         → ID로 조회
    // findAll()            → 전체 조회
    // deleteById(id)       → ID로 삭제
    // count()              → 전체 개수
    // existsById(id)       → 존재 여부 확인

    // === 2. 메소드 이름으로 쿼리 자동 생성 ===

    // 이름으로 사용자 찾기
    Optional<User> findByName(String name);

    // 이메일로 사용자 찾기
    Optional<User> findByEmail(String email);

    // 나이로 사용자들 찾기
    List<User> findByAge(Integer age);

    // 나이 범위로 사용자들 찾기
    List<User> findByAgeBetween(Integer minAge, Integer maxAge);

    // 나이가 특정 값보다 큰 사용자들
    List<User> findByAgeGreaterThan(Integer age);

    // 이름에 특정 문자열이 포함된 사용자들
    List<User> findByNameContaining(String keyword);

    // 이름으로 시작하는 사용자들
    List<User> findByNameStartingWith(String prefix);

    // 여러 조건 조합
    List<User> findByNameAndAge(String name, Integer age);
    List<User> findByNameOrEmail(String name, String email);

    // 정렬과 함께
    List<User> findByAgeGreaterThanOrderByNameAsc(Integer age);

    // === 3. 커스텀 쿼리 (직접 SQL 작성) ===

    // JPQL 사용
    @Query("SELECT u FROM User u WHERE u.age >= :minAge AND u.age <= :maxAge")
    List<User> findUsersByAgeRange(@Param("minAge") Integer minAge,
                                   @Param("maxAge") Integer maxAge);

    // 네이티브 SQL 사용
    @Query(value = "SELECT * FROM users WHERE user_name LIKE %:keyword%",
           nativeQuery = true)
    List<User> searchUsersByName(@Param("keyword") String keyword);

    // 특정 나이 이상의 사용자 수 조회
    @Query("SELECT COUNT(u) FROM User u WHERE u.age >= :age")
    Long countUsersByMinAge(@Param("age") Integer age);

    // 이메일 도메인별 사용자 조회
    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain")
    List<User> findUsersByEmailDomain(@Param("domain") String domain);
}
