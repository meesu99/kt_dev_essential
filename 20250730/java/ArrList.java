import java.util.ArrayList;

public class ArrList {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("Java");
        list.add("Python");
        list.add("C++");
        System.out.println(list.get(1));    // Python
        list.remove("C++");
        System.out.println(list);                 // [Java, Python]
    }
    
}
