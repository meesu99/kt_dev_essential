//1행에는 1~10, 2행에는 각 숫자의 2배를 출력하는 코드를 작성하세요.
public class DoubleNum {
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++, System.out.print(i + " "));
        System.out.println();
        for (int j = 0; j < 10; j++, System.out.print(2 * j + " "));
    }
    
}
