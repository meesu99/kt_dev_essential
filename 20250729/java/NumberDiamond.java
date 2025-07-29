import java.util.Scanner;

public class NumberDiamond {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("n = ");
        int n = sc.nextInt();
        sc.close();

        // 위 피라미드
        for (int i = 1; i <= n; i++) {
            // 공백 만들기
            for (int j = 0; j < (n - i); j++, System.out.print("  "));

            // 좌측 숫자 넣기
            for (int k = 1; k <= i; k++)
                System.out.print(k + " ");

            // 우측 숫자 넣기
            for (int l = i - 1; l > 0; l--)
                System.out.print(l + " ");

            System.out.println();
        }

        // 아래 피라미드 만들기
        for (int i = n - 1; i > 0; i--) {
            // 공백 만들기
            for (int j = 0; j < (n - i); j++, System.out.print("  "));
            
            // 좌측 숫자 넣기
            for (int k = 1; k <= i; k++)
                System.out.print(k + " ");

            // 우측 숫자 넣기
            for (int l = i - 1; l > 0; l--)
                System.out.print(l + " ");
                
            System.out.println();
        }
    }
    
}
