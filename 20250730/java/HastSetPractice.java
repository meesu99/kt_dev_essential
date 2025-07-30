import java.util.HashSet;

public class HastSetPractice {
    public static void main(String[] args) {
        HashSet<Integer> hs = new HashSet<>();
        hs.add(5);
        hs.add(3);
        hs.add(5);
        hs.add(7);
        hs.add(3);

        System.out.println(hs.size());
    }
}
