import java.util.Scanner;

public class ReverseTriangle {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("N = ");
        int i = sc.nextInt();
        sc.close();
        
        for (; i > 0; i--, System.out.println()){
            for (int j = 0; j < i; j++, System.out.print(j + " "));    
        }
        
    }
}
