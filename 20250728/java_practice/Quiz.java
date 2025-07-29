import java.util.Scanner;

public class Quiz {
    public static void main(String[] args) {
        // 1번
        System.out.println("< 1번 >");
        System.out.println("Hello, KT 신입사원 여러분!\n오늘은 JAVA의 첫걸음입니다.");


        // 2번
        System.out.println("\n\n< 2번 >");
        Scanner sc = new Scanner(System.in);

        System.out.print("이름을 입력하세요: ");
        String name = sc.nextLine();

        System.out.print("나이를 입력하세요: ");
        int age = sc.nextInt();

        System.out.println("\n안녕하세요, " + name + "님!\n당신은 " + age + "살이군요.");


        // 3번
        System.out.println("\n\n< 3번 >");
        int a = 10;
        int b = 3;
        int result = a / b;

        System.out.println("결과는: " + result);


        // 4번
        System.out.println("\n\n< 4번 >");
        System.out.println("나는 오늘 \"커피\"를 마셨다.\n그런데 \'Java\' 수업은 더 달콤했다.");


        // 5번
        System.out.println("\n\n< 5번 >");
        int number = 10; // "10"에서 10으로 수정
        System.out.println("숫자는: " + number);


        // 6번
        System.out.println("\n\n< 6번 >");
        System.out.print("물건 1의 가격을 입력하세요: ");
        int product1 = sc.nextInt(); 
        
        System.out.print("물건 2의 가격을 입력하세요: ");
        int product2 = sc.nextInt();

        System.out.print("물건 3의 가격을 입력하세요: ");
        int product3 = sc.nextInt();

        System.out.println("총합은 " + (product1 + product2 + product3) + "입니다.");


        // 계산기
        System.out.println("\n\n< 계산기 >");        
        System.out.print("첫번째 숫자를 입력하세요: ");
        int input1 = sc.nextInt();

        System.out.print("두번째 숫자를 입력하세요: "); 
        int input2 = sc.nextInt();

        System.out.println("\n덧셈 결과: " + (input1 + input2));
        System.out.println("뺄셈 결과: " + (input1 - input2));
        System.out.println("곱셈 결과: " + (input1 * input2));
        System.out.println("나눗셈 결과: " + (input1 / input2));


        // (심화) 실습 과제
        System.out.println("\n\n< (심화) 실습 과제 >");
        String operator = "";
        while(true){
            System.out.print("연산자를 입력해주세요.");
            operator = sc.next();

            if (operator.equals("%")) {
                System.out.println("계산 결과는 " + (input1 % input2) + "입니다.");                 
                break;
            }
            else if (operator.equals("+")) {
                System.out.println("계산 결과는 " + (input1 + input2) + "입니다.");                 
                break;
            } 
            else if (operator.equals("-")) {
                System.out.println("계산 결과는 " + (input1 - input2) + "입니다.");                 
                break;
            } 
            else if (operator.equals("*")) {
                System.out.println("계산 결과는 " + (input1 * input2) + "입니다.");                 
                break;
            }
            else if (operator.equals("/")) {
                System.out.println("계산 결과는 " + (double)(input1 / input2) + "입니다.");                 
                break;
            }    

            else
                System.out.print("잘못된 연산자입니다.");
        }


        // (심화) 주식 투자 복리 계산기
        System.out.println("\n\n< (심화) 주식 투자 복리 계산기 >");

        System.out.print("초기 투자금액(원): ");
        int PPP = sc.nextInt();

        System.out.print("추정 연 평균 수익률 (%): ");
        int rrr = sc.nextInt();

        System.out.print("투자 기간 (년): ");
        int ttt = sc.nextInt();

        System.out.println("투자 후 예상 자산: " + Math.round((PPP * Math.pow(1 + (double)(rrr / 100.0), ttt)) * 100) / 100.0);

        
        // (심화) 아파트 수익률 계산기
        System.out.println("\n\n< (심화) 아파트 수익률 계산기 >");
        
        System.out.println("=== 입력 ===");
        System.out.print("매매가(구입 가격, 원): ");
        int sellingPrice = sc.nextInt();

        System.out.print("월세 수입(월, 원): ");
        int monthIncome = sc.nextInt();

        System.out.print("연 유지비(관리비·세금 등, 원): ");
        int yearlyOutcome = sc.nextInt();

        System.out.print("투자 기간(년): ");
        int investDay = sc.nextInt();

        int totalSellingIncome = monthIncome * 12 * investDay;
        int totalOutcome = yearlyOutcome * investDay;
        int realIncome = totalSellingIncome - totalOutcome;
        double yearlyIncomeRate = Math.round((double)(realIncome / sellingPrice) * (double)(100 / investDay) * 100) / 100.0;

        System.out.println("\n=== 결과 ===");
        System.out.println("총 임대 수입: " + totalSellingIncome + " 원");
        System.out.println("총 유지비: " + totalOutcome + " 원");
        System.out.println("순수익: " + realIncome + " 원");
        System.out.println("연평균 수익률: " + yearlyIncomeRate + " %");
    }
}