public class Java2 {
    public static void main(String[] args) {
        System.out.println("");

        // 별 출력
        for (int i = 0; i < 5; i++) System.out.print("★");
        System.out.println("\n");

        // 짝수 출력
        for (int i = 1; i < 6; i++) System.out.print(2 * i);
        System.out.println("\n");

        // 팩토리얼
        int sum = 1, i = 1;
        for (i = 2; i < 6; sum *= i++);
        System.out.print(sum + "\n\n");
    }
}
