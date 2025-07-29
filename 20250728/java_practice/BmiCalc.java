import java.util.Scanner;

public class BmiCalc {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("키(cm): ");
        double height = sc.nextDouble();

        System.out.print("몸무게(kg): ");
        double weight = sc.nextDouble();

        double heightM = height / 100;
        double bmi = weight / (heightM * heightM);

        System.out.println("당신의 BMI는 " + bmi + "입니다.");
    }
}