class Calculator {
    // 정수 두 개를 더하는 메서드
    public int add(int a, int b) {
        System.out.println("정수 덧셈: " + a + " + " + b);
        return a + b;
    }

    // 실수 두 개를 더하는 메서드
    public double add(double a, double b) {
        System.out.println("실수 덧셈: " + a + " + " + b);
        return a + b;
    }

    // 정수 세 개를 더하는 메서드
    public int add(int a, int b, int c) {
        System.out.println("정수 3개 덧셈: " + a + " + " + b + " + " + c);
        return a + b + c;
    }

    // 문자열 두 개를 연결하는 메서드
    public String add(String a, String b) {
        System.out.println("문자열 연결: " + a + " + " + b);
        return a + b;
    }
}

public class OverloadingPractice {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        calc.add(5, 10); // 정수 덧셈
        calc.add(3.5, 2.5); // 실수 덧셈
        calc.add(1, 2, 3); // 정수 3개 덧셈
        calc.add("Hello, ", "World!"); // 문자열 연결
    }
    
}
