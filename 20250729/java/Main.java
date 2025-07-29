import java.util.Scanner;

public class Main {
   public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    /*
    // 짝수/홀수 판별기
    System.out.print("정수 입력: ");
    int n = sc.nextInt();
    if (n % 2 == 0) {
        System.out.println(n + "는 짝수입니다.");
    } else {
        System.out.println(n + "는 홀수입니다.\n");
    }


    // 세 자리 수 부호 판별기
    System.out.print("정수 입력: ");
    int x = sc.nextInt();
    if (x > 0) {
        System.out.println("양수");
    } else if (x < 0) {
        System.out.println("음수");
    } else {
        System.out.println("영(zero)");
    }
    

    // 점수 등급 부여기
    System.out.print("점수 입력: ");
    int score = sc.nextInt();
    char grade;
    if (score >= 90)        grade = 'A';
    else if (score >= 80)   grade = 'B';
    else if (score >= 70)   grade = 'C';
    else if (score >= 60)   grade = 'D';
    else                    grade = 'F';
    System.out.println("등급: " + grade);
    

   // 출력만 보고 구현하기 (나이)
   System.out.print("\n나이를 입력: ");
   int age = sc.nextInt();

   System.out.println((age / 10 * 10) + "대입니다.");


    // 출력만 보고 구현하기 (흡연)
    if (age >= 19)      System.out.println("흡연 가능 연령입니다.");
    else                System.out.println("흡연 불가");


    // 출력만 보고 구현하기 (행운)
    int lucky = (int)(Math.random()*10)+1;
    System.out.println("오늘의 행운 번호는 " + lucky + "입니다.");
    */

    // 실습 과제 (계절 출력)
    System.out.print("월을 입력해주세요.: ");
    int month = sc.nextInt();
    int weather = (month % 12) / 3;

    // if - else if - else
    if (weather  == 0)          printFunc("겨울");
    else if (weather  == 1)     printFunc("봄");
    else if (weather  == 2)     printFunc("여름");
    else                        printFunc("가을");

    // switch
    String result = switch (weather) {
        case 0 -> "겨울";
        case 1 -> "봄";
        case 2 -> "여름";
        case 3 -> "가을";
        default -> "월을 잘못 입력했습니다.";
    };  printFunc(result);

    sc.close();
   }

   // Println() 출력문
   public static void printFunc(String s){
      System.out.println(s);
   }
}