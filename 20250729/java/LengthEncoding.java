import java.util.Scanner;

public class LengthEncoding {
    public static void main(String[] args) {
        // 초기값 입력
        Scanner sc = new Scanner(System.in);
        System.out.print("입력: ");
        String input = sc.nextLine();
        String output = ""; int num = 1;

        for (int i = 0; i < input.length(); i++) {
            // 첫 번째 순서
            if (i == 0) {
                output += input.charAt(0);

                // 전 문자 = 현재 문자
            } else if (input.charAt(i) == input.charAt(i - 1)) {
                num++;

                // 전 문자 != 현재 문자
            } else {
                output += num;
                output += input.charAt(i);
                num = 1;
            }
        }
        System.out.println("출력: " + (output + num));
        sc.close();
    }

}
