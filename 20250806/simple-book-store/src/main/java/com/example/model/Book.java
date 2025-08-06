package com.example.model;

/**
 * 📚 도서 정보 클래스 (간단 버전)
 *
 * 비유: 책의 "신분증" 같은 역할
 */
public class Book {

    private String title;       // 도서명
    private String author;      // 저자
    private String category;    // 카테고리
    private int price;          // 가격
    private String description; // 설명

    // 기본 생성자 (Spring이 필요로 함!)
    public Book() {}

    // 생성자
    public Book(String title, String author, String category, int price, String description) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.price = price;
        this.description = description;
    }

    // 카테고리별 이모지
    public String getCategoryEmoji() {
        switch (this.category) {
            case "소설": return "📖";
            case "과학": return "🔬";
            case "역사": return "📜";
            case "컴퓨터": return "💻";
            default: return "📚";
        }
    }

    // 가격 포맷팅
    public String getFormattedPrice() {
        return String.format("%,d원", this.price);
    }

    // Getter & Setter
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    @Override
    public String toString() {
        return "Book{title='" + title + "', author='" + author +
               "', category='" + category + "', price=" + price + "}";
    }
}
