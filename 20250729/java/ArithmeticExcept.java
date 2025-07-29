public class ArithmeticExcept {
    public static void main(String[] args) {
        int a = 10, b = 0;
        try {
            int result = a / b;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.err.println("Error: 0으로 나눌 수 없습니다.");
        } finally {
            System.out.println("Division attemp finished.");
        }

    }
    
}
