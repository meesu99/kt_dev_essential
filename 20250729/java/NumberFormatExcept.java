import java.util.Scanner;

public class NumberFormatExcept {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a number: ");
        String input = sc.nextLine();
        try {
            int num = Integer.parseInt(input);
            System.out.println("Double: " + (num * 2));
        } catch (NumberFormatException e) {
            System.err.println("Error: 숫자 형식이 아닙니다. -> \"" + input + "\"");
        } finally {
            System.out.println("Input processing finished.");
            sc.close();
        }
    }
    
}
