// 구구단 5단 중 3의 배수만 출력
public class Gugudan {
    public static void main(String[] args) { 
        // 3의 배수씩 넘어가기
        for (int i = 3; i <= 30; i += 3)
            System.out.println("5 * " + i + " = " + 5 * i);
    }
}
