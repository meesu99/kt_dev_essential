public class MultipleSix {
    public static void main(String[] args) {
        // 1~100 중 짝수이면서 3의 배수
        for (int i = 0; i < 96; i += 6, System.out.print(i + " "));

        // 1부터 더해서 200이 넘는 순간의 합
        int sum = 0;
        for (int j = 1; sum < 200; sum += j++);
        System.out.println("\n\n" + sum + "\n");

        // N=5로 가정하고, 1~5까지 순서대로 출력하는 코드
        for (int k = 0; k < 5; k++, System.out.print(k + " "));
    }
}
