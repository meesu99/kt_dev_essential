public class BlockScope {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            int temp = i * 2;
            System.out.println("temp = " + temp);
        }
        // System.out.println(temp);    // 오류: temp cannot be resolved
    }
}