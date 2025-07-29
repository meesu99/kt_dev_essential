import java.util.Scanner;

public class SierpinskiTriangle {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("k 값을 입력해주세요. ");
        int input = sc.nextInt();
        sc.close();
        int height = (int)Math.pow(2, input);

        // 바닥 제외하고 생성
        for (int i = 1; i < height; i++){
            // 좌측 빈 공간
            for (int j = 0; j < (height - i); j++)
                System.out.print(" ");
            // 좌측 별
            System.out.print("*");

            // 중간 빈 공간
            if (i > 1){
                for (int k = 1; k < (2 * (i - 1)); k++)
                    System.out.print(" ");
                // 우측 별
                System.out.print("*");
            }
            System.out.println();
        }

        // 바닥 생성
        for (int i = 1; i < 2 * height; i++, System.out.print("*"));
    }
    
}
