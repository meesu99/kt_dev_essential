import java.util.HashSet;
import java.util.Set;

public class HashSetTest {
    public static void main(String[] args) {
       Set<Integer> set = new HashSet<>();
       set.add(3);
       set.add(1);
       set.add(3);
       System.out.println(set.contains(1));
       set.remove(1);
       System.out.println(set); 
    }    
}
