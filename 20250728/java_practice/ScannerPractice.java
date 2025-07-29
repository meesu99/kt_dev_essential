import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class ScannerPractice {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, "UTF-8"));

        System.out.print("이름: ");
        String name = br.readLine();

        System.out.print("나이: ");
        int age = Integer.parseInt(br.readLine());

        System.out.println("안녕하세요, " + name + "님! 당신의 나이는 " + age + "살입니다.");
    }
}
