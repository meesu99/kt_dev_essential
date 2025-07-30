import java.util.ArrayList;

public class HashTest1 {
    public static void main(String[] args) {
        ArrayList<Integer> ar = new ArrayList<>();
        for (int i = 1; i < 11; i ++) ar.add(i);

        int j = 0;
        ArrayList<Integer> arPair = new ArrayList<>();
        for (int item : ar) {
            if (j % 2 == 1) arPair.add(item);
            j++;
        }

        System.out.println(arPair);
    }
    
}
