import java.util.HashMap;
import java.util.Map;

public class HashMapTest {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("Alice", 90);
        map.put("Bob", 85);
        System.out.println(map.get("Alice"));
        map.put("Alice", 95);
        System.out.println(map);
        map.remove("Bob");
        System.out.println(map);

    }
}