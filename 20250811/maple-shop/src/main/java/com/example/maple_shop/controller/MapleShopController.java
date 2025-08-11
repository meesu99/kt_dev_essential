package com.example.maple_shop.controller;

import com.example.maple_shop.model.Item;
import com.example.maple_shop.model.Player;
import com.example.maple_shop.model.InventoryItem;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/maple-shop")
public class MapleShopController {

    // 상점 아이템 목록 (실제로는 DB 사용)
    private List<Item> shopItems = new ArrayList<>();
    private Long nextItemId = 1L;
    
    // 플레이어 목록 (실제로는 DB 사용)
    private Map<Long, Player> players = new HashMap<>();
    private Long nextPlayerId = 1L;

    // 생성자에서 페리온 무기상점 초기 아이템 설정
    public MapleShopController() {
        // 초보자용 무기
        shopItems.add(new Item(nextItemId++, "나무 검", 1000, "한손검",
                12, 1, "초보 모험가를 위한 기본 검"));
        shopItems.add(new Item(nextItemId++, "나무 활", 1200, "활",
                10, 1, "초보 궁수용 나무 활"));
        shopItems.add(new Item(nextItemId++, "나무 지팡이", 800, "지팡이",
                8, 1, "견습 마법사의 첫 지팡이"));

        // 중급자용 무기
        shopItems.add(new Item(nextItemId++, "강철 검", 15000, "한손검",
                45, 15, "튼튼한 강철로 만든 검"));
        shopItems.add(new Item(nextItemId++, "컴포지트 보우", 18000, "활",
                42, 15, "복합 소재로 만든 고급 활"));
        shopItems.add(new Item(nextItemId++, "마법 지팡이", 20000, "지팡이",
                50, 15, "마나가 깃든 신비한 지팡이"));

        // 고급 무기
        shopItems.add(new Item(nextItemId++, "미스릴 검", 80000, "한손검",
                85, 30, "전설의 금속 미스릴로 제작된 명검"));
        shopItems.add(new Item(nextItemId++, "엘븐 보우", 90000, "활",
                82, 30, "엘프족이 만든 신성한 활"));
        
        // 초기 플레이어 생성
        players.put(nextPlayerId, new Player(nextPlayerId++, "모험가1", 1, 10000));
        players.put(nextPlayerId, new Player(nextPlayerId++, "모험가2", 15, 50000));
        players.put(nextPlayerId, new Player(nextPlayerId++, "모험가3", 30, 150000));
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
    
    // 🔍 GET - 아이템 이름으로 검색
    @GetMapping("/items/search")
    public List<Item> searchItemsByName(@RequestParam String itemName) {
        return shopItems.stream()
                .filter(item -> item.getName().contains(itemName))
                .toList();
    }
    
    // 🔍 GET - 아이템 이름으로 정확한 검색
    @GetMapping("/items/name/{itemName}")
    public Item getItemByName(@PathVariable String itemName) {
        return shopItems.stream()
                .filter(item -> item.getName().equals(itemName))
                .findFirst()
                .orElse(null);
    }

    // ✨ POST - 새로운 아이템 입고 (상점 사장이 신규 아이템 추가)
    @PostMapping("/items")
    public Item addNewItem(@RequestBody Item item) {
        item.setId(nextItemId++);
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
    
    // 🛒 POST - 아이템 구매 (아이템 이름으로)
    @PostMapping("/purchase/name")
    public Map<String, Object> purchaseItemByName(
            @RequestParam Long playerId,
            @RequestParam String itemName,
            @RequestParam(defaultValue = "1") int quantity) {
        
        Map<String, Object> response = new HashMap<>();
        
        // 플레이어 확인
        Player player = players.get(playerId);
        if (player == null) {
            response.put("success", false);
            response.put("message", "플레이어를 찾을 수 없습니다.");
            return response;
        }
        
        // 아이템 이름으로 상점에서 검색
        Item item = shopItems.stream()
                .filter(shopItem -> shopItem.getName().equals(itemName))
                .findFirst()
                .orElse(null);
        
        if (item == null) {
            response.put("success", false);
            response.put("message", "상점에서 '" + itemName + "' 아이템을 찾을 수 없습니다.");
            return response;
        }
        
        // 이미 인벤토리에 있는지 확인 (1개만 소지 가능)
        if (player.hasItem(itemName)) {
            response.put("success", false);
            response.put("message", "이미 '" + itemName + "' 아이템을 소지하고 있습니다. (최대 1개)");
            return response;
        }
        
        // 레벨 제한 확인
        if (player.getLevel() < item.getRequiredLevel()) {
            response.put("success", false);
            response.put("message", "레벨이 부족합니다. 필요 레벨: " + item.getRequiredLevel());
            return response;
        }
        
        // 메소 확인
        int totalCost = item.getPrice() * quantity;
        if (player.getMeso() < totalCost) {
            response.put("success", false);
            response.put("message", "메소가 부족합니다. 필요 메소: " + totalCost);
            return response;
        }
        
        // 구매 처리
        player.setMeso(player.getMeso() - totalCost);
        player.addItem(item, quantity);
        
        response.put("success", true);
        response.put("message", "구매가 완료되었습니다.");
        response.put("playerMeso", player.getMeso());
        response.put("purchasedItem", item.getName());
        response.put("quantity", quantity);
        response.put("totalCost", totalCost);
        
        return response;
    }
    
    // 🛒 POST - 아이템 구매 (기존 ID 방식)
    @PostMapping("/purchase")
    public Map<String, Object> purchaseItem(
            @RequestParam Long playerId,
            @RequestParam Long itemId,
            @RequestParam int quantity) {
        
        Map<String, Object> response = new HashMap<>();
        
        // 플레이어 확인
        Player player = players.get(playerId);
        if (player == null) {
            response.put("success", false);
            response.put("message", "플레이어를 찾을 수 없습니다.");
            return response;
        }
        
        // 아이템 확인
        Item item = shopItems.stream()
                .filter(shopItem -> shopItem.getId().equals(itemId))
                .findFirst()
                .orElse(null);
        
        if (item == null) {
            response.put("success", false);
            response.put("message", "아이템을 찾을 수 없습니다.");
            return response;
        }
        
        // 이미 인벤토리에 있는지 확인 (1개만 소지 가능)
        if (player.hasItem(item.getName())) {
            response.put("success", false);
            response.put("message", "이미 '" + item.getName() + "' 아이템을 소지하고 있습니다. (최대 1개)");
            return response;
        }
        
        // 레벨 제한 확인
        if (player.getLevel() < item.getRequiredLevel()) {
            response.put("success", false);
            response.put("message", "레벨이 부족합니다. 필요 레벨: " + item.getRequiredLevel());
            return response;
        }
        
        // 메소 확인
        int totalCost = item.getPrice() * quantity;
        if (player.getMeso() < totalCost) {
            response.put("success", false);
            response.put("message", "메소가 부족합니다. 필요 메소: " + totalCost);
            return response;
        }
        
        // 구매 처리
        player.setMeso(player.getMeso() - totalCost);
        player.addItem(item, quantity);
        
        response.put("success", true);
        response.put("message", "구매가 완료되었습니다.");
        response.put("playerMeso", player.getMeso());
        response.put("purchasedItem", item.getName());
        response.put("quantity", quantity);
        response.put("totalCost", totalCost);
        
        return response;
    }
    
    // 💰 POST - 아이템 판매 (아이템 이름으로)
    @PostMapping("/sell/name")
    public Map<String, Object> sellItemByName(
            @RequestParam Long playerId,
            @RequestParam String itemName,
            @RequestParam(defaultValue = "1") int quantity) {
        
        Map<String, Object> response = new HashMap<>();
        
        // 플레이어 확인
        Player player = players.get(playerId);
        if (player == null) {
            response.put("success", false);
            response.put("message", "플레이어를 찾을 수 없습니다.");
            return response;
        }
        
        // 인벤토리에서 아이템 이름으로 확인
        InventoryItem invItem = player.findItemByName(itemName);
        if (invItem == null || invItem.getQuantity() < quantity) {
            response.put("success", false);
            response.put("message", "판매할 아이템이 부족합니다.");
            return response;
        }
        
        // 판매 처리 (판매가는 구매가의 70%)
        int sellPrice = (int)(invItem.getItem().getPrice() * 0.7 * quantity);
        player.setMeso(player.getMeso() + sellPrice);
        player.removeItemByName(itemName, quantity);
        
        response.put("success", true);
        response.put("message", "판매가 완료되었습니다.");
        response.put("playerMeso", player.getMeso());
        response.put("soldItem", invItem.getItem().getName());
        response.put("quantity", quantity);
        response.put("sellPrice", sellPrice);
        
        return response;
    }
    
    // 💰 POST - 아이템 판매 (기존 ID 방식)
    @PostMapping("/sell")
    public Map<String, Object> sellItem(
            @RequestParam Long playerId,
            @RequestParam Long itemId,
            @RequestParam int quantity) {
        
        Map<String, Object> response = new HashMap<>();
        
        // 플레이어 확인
        Player player = players.get(playerId);
        if (player == null) {
            response.put("success", false);
            response.put("message", "플레이어를 찾을 수 없습니다.");
            return response;
        }
        
        // 인벤토리에서 아이템 확인
        InventoryItem invItem = player.findItem(itemId);
        if (invItem == null || invItem.getQuantity() < quantity) {
            response.put("success", false);
            response.put("message", "판매할 아이템이 부족합니다.");
            return response;
        }
        
        // 판매 처리 (판매가는 구매가의 70%)
        int sellPrice = (int)(invItem.getItem().getPrice() * 0.7 * quantity);
        player.setMeso(player.getMeso() + sellPrice);
        player.removeItem(itemId, quantity);
        
        response.put("success", true);
        response.put("message", "판매가 완료되었습니다.");
        response.put("playerMeso", player.getMeso());
        response.put("soldItem", invItem.getItem().getName());
        response.put("quantity", quantity);
        response.put("sellPrice", sellPrice);
        
        return response;
    }
    
    // 📦 GET - 플레이어 인벤토리 조회
    @GetMapping("/inventory/{playerId}")
    public Map<String, Object> getPlayerInventory(@PathVariable Long playerId) {
        Map<String, Object> response = new HashMap<>();
        
        Player player = players.get(playerId);
        if (player == null) {
            response.put("success", false);
            response.put("message", "플레이어를 찾을 수 없습니다.");
            return response;
        }
        
        response.put("success", true);
        response.put("player", player);
        response.put("inventory", player.getInventory());
        
        return response;
    }
    
    // 👤 GET - 플레이어 정보 조회
    @GetMapping("/players/{playerId}")
    public Player getPlayer(@PathVariable Long playerId) {
        return players.get(playerId);
    }
    
    // 👤 POST - 새 플레이어 생성
    @PostMapping("/players")
    public Player createPlayer(@RequestBody Player player) {
        player.setId(nextPlayerId++);
        players.put(player.getId(), player);
        return player;
    }
    
    // ⚡ POST - 아이템 강화 (아이템 이름으로)
    @PostMapping("/enhance/name")
    public Map<String, Object> enhanceItemByName(
            @RequestParam Long playerId,
            @RequestParam String itemName) {
        
        Map<String, Object> response = new HashMap<>();
        
        // 플레이어 확인
        Player player = players.get(playerId);
        if (player == null) {
            response.put("success", false);
            response.put("message", "플레이어를 찾을 수 없습니다.");
            return response;
        }
        
        // 인벤토리에서 아이템 이름으로 확인
        InventoryItem invItem = player.findItemByName(itemName);
        if (invItem == null) {
            response.put("success", false);
            response.put("message", "강화할 아이템을 찾을 수 없습니다.");
            return response;
        }
        
        Item item = invItem.getItem();
        
        // 강화 가능 여부 확인
        if (!item.canEnhance()) {
            response.put("success", false);
            response.put("message", "이 아이템은 더 이상 강화할 수 없습니다.");
            return response;
        }
        
        // 강화 비용 계산 (강화 레벨이 높을수록 비용 증가)
        int enhanceCost = calculateEnhanceCost(item.getEnhancementLevel());
        
        // 메소 확인
        if (player.getMeso() < enhanceCost) {
            response.put("success", false);
            response.put("message", "강화 비용이 부족합니다. 필요 메소: " + enhanceCost);
            return response;
        }
        
        // 강화 성공률 계산
        double successRate = calculateSuccessRate(item.getEnhancementLevel());
        
        // 강화 시도
        boolean isSuccess = Math.random() < successRate;
        
        if (isSuccess) {
            // 강화 성공
            item.setEnhancementLevel(item.getEnhancementLevel() + 1);
            player.setMeso(player.getMeso() - enhanceCost);
            
            response.put("success", true);
            response.put("message", "강화 성공! " + item.getEnhancedName());
            response.put("enhancementLevel", item.getEnhancementLevel());
            response.put("enhancedAttackPower", item.getEnhancedAttackPower());
            response.put("cost", enhanceCost);
            response.put("playerMeso", player.getMeso());
        } else {
            // 강화 실패
            player.setMeso(player.getMeso() - enhanceCost);
            
            // 실패 결과 결정
            String failureResult = determineFailureResult(item.getEnhancementLevel());
            
            if (failureResult.equals("destroy")) {
                // 아이템 파괴
                item.setDestroyed(true);
                player.removeItemByName(itemName, 1);
                response.put("message", "강화 실패! 아이템이 파괴되었습니다.");
            } else if (failureResult.equals("downgrade")) {
                // 강화 레벨 하락
                item.setEnhancementLevel(Math.max(0, item.getEnhancementLevel() - 1));
                response.put("message", "강화 실패! 강화 레벨이 하락했습니다.");
            } else {
                // 단순 실패
                response.put("message", "강화 실패! 다음에 다시 시도해보세요.");
            }
            
            response.put("success", false);
            response.put("enhancementLevel", item.getEnhancementLevel());
            response.put("enhancedAttackPower", item.getEnhancedAttackPower());
            response.put("cost", enhanceCost);
            response.put("playerMeso", player.getMeso());
        }
        
        return response;
    }
    
    // ⚡ POST - 아이템 강화 (기존 ID 방식)
    @PostMapping("/enhance")
    public Map<String, Object> enhanceItem(
            @RequestParam Long playerId,
            @RequestParam Long itemId) {
        
        Map<String, Object> response = new HashMap<>();
        
        // 플레이어 확인
        Player player = players.get(playerId);
        if (player == null) {
            response.put("success", false);
            response.put("message", "플레이어를 찾을 수 없습니다.");
            return response;
        }
        
        // 인벤토리에서 아이템 확인
        InventoryItem invItem = player.findItem(itemId);
        if (invItem == null) {
            response.put("success", false);
            response.put("message", "강화할 아이템을 찾을 수 없습니다.");
            return response;
        }
        
        Item item = invItem.getItem();
        
        // 강화 가능 여부 확인
        if (!item.canEnhance()) {
            response.put("success", false);
            response.put("message", "이 아이템은 더 이상 강화할 수 없습니다.");
            return response;
        }
        
        // 강화 비용 계산 (강화 레벨이 높을수록 비용 증가)
        int enhanceCost = calculateEnhanceCost(item.getEnhancementLevel());
        
        // 메소 확인
        if (player.getMeso() < enhanceCost) {
            response.put("success", false);
            response.put("message", "강화 비용이 부족합니다. 필요 메소: " + enhanceCost);
            return response;
        }
        
        // 강화 성공률 계산
        double successRate = calculateSuccessRate(item.getEnhancementLevel());
        
        // 강화 시도
        boolean isSuccess = Math.random() < successRate;
        
        if (isSuccess) {
            // 강화 성공
            item.setEnhancementLevel(item.getEnhancementLevel() + 1);
            player.setMeso(player.getMeso() - enhanceCost);
            
            response.put("success", true);
            response.put("message", "강화 성공! " + item.getEnhancedName());
            response.put("enhancementLevel", item.getEnhancementLevel());
            response.put("enhancedAttackPower", item.getEnhancedAttackPower());
            response.put("cost", enhanceCost);
            response.put("playerMeso", player.getMeso());
        } else {
            // 강화 실패
            player.setMeso(player.getMeso() - enhanceCost);
            
            // 실패 결과 결정
            String failureResult = determineFailureResult(item.getEnhancementLevel());
            
            if (failureResult.equals("destroy")) {
                // 아이템 파괴
                item.setDestroyed(true);
                player.removeItem(itemId, 1);
                response.put("message", "강화 실패! 아이템이 파괴되었습니다.");
            } else if (failureResult.equals("downgrade")) {
                // 강화 레벨 하락
                item.setEnhancementLevel(Math.max(0, item.getEnhancementLevel() - 1));
                response.put("message", "강화 실패! 강화 레벨이 하락했습니다.");
            } else {
                // 단순 실패
                response.put("message", "강화 실패! 다음에 다시 시도해보세요.");
            }
            
            response.put("success", false);
            response.put("enhancementLevel", item.getEnhancementLevel());
            response.put("enhancedAttackPower", item.getEnhancedAttackPower());
            response.put("cost", enhanceCost);
            response.put("playerMeso", player.getMeso());
        }
        
        return response;
    }
    
    // 강화 비용 계산
    private int calculateEnhanceCost(int currentLevel) {
        // 기본 비용 1000, 레벨당 500씩 증가
        return 1000 + (currentLevel * 500);
    }
    
    // 강화 성공률 계산
    private double calculateSuccessRate(int currentLevel) {
        if (currentLevel <= 3) return 0.95;      // +0~+3: 95%
        if (currentLevel <= 6) return 0.90;      // +4~+6: 90%
        if (currentLevel <= 9) return 0.80;      // +7~+9: 80%
        if (currentLevel <= 12) return 0.70;     // +10~+12: 70%
        if (currentLevel <= 14) return 0.50;     // +13~+14: 50%
        return 0.30;                              // +15: 30%
    }
    
    // 실패 결과 결정
    private String determineFailureResult(int currentLevel) {
        if (currentLevel <= 3) return "simple";      // +0~+3: 단순 실패
        if (currentLevel <= 6) return "simple";      // +4~+6: 단순 실패
        if (currentLevel <= 9) return "downgrade";   // +7~+9: 레벨 하락
        if (currentLevel <= 12) return "downgrade";  // +10~+12: 레벨 하락
        if (currentLevel <= 14) return "destroy";    // +13~+14: 파괴
        return "destroy";                             // +15: 파괴
    }
    
    // 🔍 GET - 강화 정보 조회 (아이템 이름으로)
    @GetMapping("/enhance/info/name/{itemName}")
    public Map<String, Object> getEnhanceInfoByName(@PathVariable String itemName) {
        Map<String, Object> response = new HashMap<>();
        
        Item item = shopItems.stream()
                .filter(shopItem -> shopItem.getName().equals(itemName))
                .findFirst()
                .orElse(null);
        
        if (item == null) {
            response.put("success", false);
            response.put("message", "아이템을 찾을 수 없습니다.");
            return response;
        }
        
        response.put("success", true);
        response.put("item", item);
        response.put("enhancementLevel", item.getEnhancementLevel());
        response.put("maxEnhancementLevel", item.getMaxEnhancementLevel());
        response.put("baseAttackPower", item.getAttackPower());
        response.put("enhancedAttackPower", item.getEnhancedAttackPower());
        response.put("canEnhance", item.canEnhance());
        response.put("enhanceCost", calculateEnhanceCost(item.getEnhancementLevel()));
        response.put("successRate", calculateSuccessRate(item.getEnhancementLevel()) * 100);
        
        return response;
    }
    
    // 🔍 GET - 강화 정보 조회 (기존 ID 방식)
    @GetMapping("/enhance/info/{itemId}")
    public Map<String, Object> getEnhanceInfo(@PathVariable Long itemId) {
        Map<String, Object> response = new HashMap<>();
        
        Item item = shopItems.stream()
                .filter(shopItem -> shopItem.getId().equals(itemId))
                .findFirst()
                .orElse(null);
        
        if (item == null) {
            response.put("success", false);
            response.put("message", "아이템을 찾을 수 없습니다.");
            return response;
        }
        
        response.put("success", true);
        response.put("item", item);
        response.put("enhancementLevel", item.getEnhancementLevel());
        response.put("maxEnhancementLevel", item.getMaxEnhancementLevel());
        response.put("baseAttackPower", item.getAttackPower());
        response.put("enhancedAttackPower", item.getEnhancedAttackPower());
        response.put("canEnhance", item.canEnhance());
        response.put("enhanceCost", calculateEnhanceCost(item.getEnhancementLevel()));
        response.put("successRate", calculateSuccessRate(item.getEnhancementLevel()) * 100);
        
        return response;
    }
}
