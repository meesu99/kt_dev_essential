public class OperatorPractice {
    public static void main(String[] args) {
        // 실습 문제 1
        int a = 10;
        int b = 3;

        System.out.println("덧셈: " + (a + b));
        System.out.println("나눗셈: " + (a / b));
        System.out.println("나머지: " + (a % b));

        
        // 실습 문제 2
        int age = 20;

        boolean isAdult = age >= 18;
        System.out.println("성인인가요? " + isAdult);

        boolean isTeenager = age >= 13 && age <= 19;
        System.out.println("청소년인가요? " + isTeenager);


        // 실습 문제 3
        int point = 0;
        point += 10;
        point -= 3;

        System.out.println("최종 점수: " + point);

        boolean isPassed = point >= 5 && point <= 20;
        System.out.println("합격 범위인가요? " + isPassed);
    }
}