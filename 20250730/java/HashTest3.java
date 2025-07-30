import java.util.HashMap;

public class HashTest3 {
    public static void main(String[] args) {
        HashMap<String, Integer> hm = new HashMap<>();
        hm.put("Science", 90);
        hm.put("Math", 50);
        hm.put("Korean", 88);
        hm.put("History", 100);

        String max = new String();
        int maxScore = 0;
        for (HashMap.Entry<String, Integer> entry : hm.entrySet()) {
            if(entry.getValue() > maxScore) max = entry.getKey();
        }
        System.out.println(max);
    }
}
