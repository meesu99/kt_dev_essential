package com.example.controller;

import com.example.model.Book;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 📚 도서 관리 컨트롤러 (간단 버전)
 *
 * 비유: 도서관 "사서" 역할
 */
@Controller
@RequestMapping("/book")
public class BookController {

    // 📚 책 목록 저장소 (메모리에 저장 - 실제로는 DB 사용)
    private List<Book> books = new ArrayList<>();

    /**
     * 📋 책 목록 보기
     */
    @GetMapping("/list")
    public String bookList(Model model) {
        System.out.println("📋 책 목록 요청! 현재 " + books.size() + "권");

        model.addAttribute("books", books);

        return "book/list";  // templates/book/list.html
    }

    /**
     * ➕ 책 추가 폼 보여주기 (GET)
     */
    @GetMapping("/add")
    public String addForm() {
        System.out.println("➕ 책 추가 폼 요청");

        return "book/add";  // templates/book/add.html
    }

    /**
     * 💾 책 추가 처리하기 (POST)
     * Spring이 자동으로 폼 데이터를 Book 객체로 만들어줌!
     */
    @PostMapping("/add")
    public String addBook(Book book, Model model) {
        System.out.println("💾 책 추가 처리: " + book);

        // 📝 간단한 검증
        if (book.getTitle() == null || book.getTitle().trim().isEmpty()) {
            model.addAttribute("error", "제목을 입력해주세요!");
            return "book/add";  // 다시 폼으로
        }

        if (book.getPrice() <= 0) {
            model.addAttribute("error", "가격은 0보다 커야 합니다!");
            return "book/add";
        }

        // 📚 책 목록에 추가
        books.add(book);

        System.out.println("✅ 책 추가 완료! 총 " + books.size() + "권");

        // 📄 상세 페이지로 이동
        model.addAttribute("book", book);
        model.addAttribute("message", "책이 성공적으로 추가되었습니다!");

        return "book/detail";  // templates/book/detail.html
    }

    /**
     * 🔍 책 검색 (GET - 검색은 조회이므로 GET 사용)
     */
    @GetMapping("/search")
    public String searchBooks(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            Model model) {

        System.out.println("🔍 책 검색: keyword=" + keyword + ", category=" + category);

        List<Book> results = new ArrayList<>();

        // 🔎 검색 로직 (간단하게)
        for (Book book : books) {
            boolean match = true;

            // 키워드 검색 (제목 또는 저자에 포함되어 있으면)
            if (keyword != null && !keyword.trim().isEmpty()) {
                String k = keyword.toLowerCase();
                boolean titleMatch = book.getTitle().toLowerCase().contains(k);
                boolean authorMatch = book.getAuthor().toLowerCase().contains(k);

                if (!titleMatch && !authorMatch) {
                    match = false;
                }
            }

            // 카테고리 검색
            if (category != null && !category.trim().isEmpty()) {
                if (!category.equals(book.getCategory())) {
                    match = false;
                }
            }

            if (match) {
                results.add(book);
            }
        }

        System.out.println("📊 검색 결과: " + results.size() + "권 발견");

        model.addAttribute("books", results);
        model.addAttribute("keyword", keyword);
        model.addAttribute("category", category);
        model.addAttribute("resultCount", results.size());

        return "book/list";  // 같은 목록 템플릿 재사용
    }
}
