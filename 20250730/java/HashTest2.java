import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class HashTest2 {
    public static void main(String[] args) {
        HashSet<String> hs = new HashSet<>(Set.of("Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"));
        List<String> ls = new ArrayList<>(hs);

        ls.sort(null);
        System.out.println(ls);
    };
}

