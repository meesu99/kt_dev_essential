import java.util.Arrays;
import java.util.Scanner;

public class ArrayPractice {
    public static void main(String[] args) {
        // 리터럴 배열 출력
        int[] arr = {1, 2, 3, 4, 5};
        for (int v : arr) {
            
            System.out.print(v + " ");
        }


        // 인덱스 수정 후 출력
        int [] nums = {10, 20, 30};
        nums[1] = 25;
        System.out.println("\n" + Arrays.toString(nums));


        // 사용자 입력 배열 처리
        Scanner sc = new Scanner(System.in);
        int[] data = new int[3];
        for (int i = 0; i < data.length; i++) {
            System.out.print("숫자 입력: ");
            data[i] = sc.nextInt();
        }
        System.out.println(Arrays.toString(data));
        sc.close();
    }
}
