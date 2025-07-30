import java.util.Arrays;
import java.util.Random;

public class Lotto {
    public static void main(String[] args) {
        printLotto(generateLotto());
    }

    // 번호 중복 검사
    public static boolean isDuplicate(int[] arr, int num) {
        for (int v : arr) {
            if (v == num) return true;
        }
        return false;
    }

    // 로또 번호 생성
    public static int[] generateLotto() {
        int[] nums = new int[6];
        Random r = new Random();
        for (int i = 0; i < nums.length; i++) {
            int n;
            do {
                n = r.nextInt(45) + 1;
            } while (isDuplicate(nums, n));
            nums[i] = n;
        }
        return nums;
    }

    // 로또 번호 출력
    public static void printLotto(int[] nums) {
        Arrays.sort(nums);
        System.out.println(Arrays.toString(nums));
    }
}
