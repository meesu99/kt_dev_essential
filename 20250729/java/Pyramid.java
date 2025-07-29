// 피라미드 별 출력
public class Pyramid {
    public static void main(String[] args) {  
        // 한 줄씩 총 5줄
        for(int i = 1; i < 6; i++){

            // 공백 작성
            for (int j = 5 - i; j > 0; j--)
                System.out.print(" ");
            
            // 별 작성
            for (int k = 0; k < (2 * i - 1); k++)
                System.out.print("*");

            System.out.println();
        }
    }
}
