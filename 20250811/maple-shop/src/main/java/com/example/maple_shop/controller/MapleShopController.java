package com.example.maple_shop.controller;

import com.example.maple_shop.model.Item;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/maple-shop")
public class MapleShopController {

    // 상점 아이템 목록 (실제로는 DB 사용)
    private List<Item> shopItems = new ArrayList<>();
    private Long nextId = 1L;

    // 생성자에서 페리온 무기상점 초기 아이템 설정
    public MapleShopController() {
        // 초보자용 무기
        shopItems.add(new Item(nextId++, "나무 검", 1000, "한손검",
                12, 1, "초보 모험가를 위한 기본 검"));
        shopItems.add(new Item(nextId++, "나무 활", 1200, "활",
                10, 1, "초보 궁수용 나무 활"));
        shopItems.add(new Item(nextId++, "나무 지팡이", 800, "지팡이",
                8, 1, "견습 마법사의 첫 지팡이"));

        // 중급자용 무기
        shopItems.add(new Item(nextId++, "강철 검", 15000, "한손검",
                45, 15, "튼튼한 강철로 만든 검"));
        shopItems.add(new Item(nextId++, "컴포지트 보우", 18000, "활",
                42, 15, "복합 소재로 만든 고급 활"));
        shopItems.add(new Item(nextId++, "마법 지팡이", 20000, "지팡이",
                50, 15, "마나가 깃든 신비한 지팡이"));

        // 고급 무기
        shopItems.add(new Item(nextId++, "미스릴 검", 80000, "한손검",
                85, 30, "전설의 금속 미스릴로 제작된 명검"));
        shopItems.add(new Item(nextId++, "엘븐 보우", 90000, "활",
                82, 30, "엘프족이 만든 신성한 활"));
    }

    // 🏪 GET - 상점 전체 아이템 조회 (필터링 기능 포함)
    @GetMapping("/items")
    public List<Item> getAllItems(
        @RequestParam(required = false) String itemType,    // 무기 종류 필터
        @RequestParam(defaultValue = "0") int maxPrice,     // 최대 가격 필터
        @RequestParam(defaultValue = "0") int minLevel      // 최소 레벨 필터
    ) {
        return shopItems.stream()
            .filter(item -> itemType == null || item.getItemType().equals(itemType))
            .filter(item -> maxPrice == 0 || item.getPrice() <= maxPrice)
            .filter(item -> item.getRequiredLevel() >= minLevel)
            .toList();
    }

    // 🔍 GET - 특정 아이템 상세 조회
    @GetMapping("/items/{id}")
    public Item getItem(@PathVariable Long id) {
        return shopItems.stream()
                .filter(item -> item.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    // ✨ POST - 새로운 아이템 입고 (상점 사장이 신규 아이템 추가)
    @PostMapping("/items")
    public Item addNewItem(@RequestBody Item item) {
        item.setId(nextId++);
        shopItems.add(item);
        return item;
    }

    // 🔧 PUT - 아이템 정보 수정 (가격 조정, 스탯 밸런싱 등)
    @PutMapping("/items/{id}")
    public Item updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        for (int i = 0; i < shopItems.size(); i++) {
            Item item = shopItems.get(i);
            if (item.getId().equals(id)) {
                updatedItem.setId(id);
                shopItems.set(i, updatedItem);
                return updatedItem;
            }
        }
        return null;  // 아이템을 찾지 못한 경우
    }

    // 🗑️ DELETE - 아이템 판매 중단 (품절, 단종 등)
    @DeleteMapping("/items/{id}")
    public boolean removeItem(@PathVariable Long id) {
        return shopItems.removeIf(item -> item.getId().equals(id));
    }

    // 🎯 GET - 레벨별 추천 무기 (추가 기능)
    @GetMapping("/recommend/{level}")
    public List<Item> getRecommendedItems(@PathVariable int level) {
        return shopItems.stream()
            .filter(item -> item.getRequiredLevel() <= level)  // 착용 가능한 레벨
            .filter(item -> item.getRequiredLevel() >= level - 10)  // 적당한 성능
            .limit(3)  // 상위 3개만
            .toList();
    }

    // 💰 GET - 예산별 무기 추천
    @GetMapping("/budget/{budget}")
    public List<Item> getItemsByBudget(@PathVariable int budget) {
        return shopItems.stream()
            .filter(item -> item.getPrice() <= budget)
            .sorted((a, b) -> Integer.compare(b.getAttackPower(), a.getAttackPower()))  // 공격력 높은 순
            .limit(5)
            .toList();
    }
}
