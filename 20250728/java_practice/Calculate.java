public class Calculate {
    public static void main(String[] args) {
        int x = 10, y = 3;

        int sum = x + y;
        int product = x * y;

        System.out.println("합계: " + sum);
        System.out.println("곱셈: " + product);

        boolean isAdult = true;
        boolean isMember = false;

        System.out.println("성인인가요? " + isAdult);
        System.out.println("회원인가요? " + isMember);
        System.out.println("성인이거나 회원인가요? " + (isAdult || isMember));
        System.out.println("성인이면서 회원인가요? " + (isAdult && isMember));
        System.out.println("x는 소수인가요? " + is_prime(x));
        System.out.println("y는 소수인가요? " + is_prime(y));
    }

    public static boolean is_prime(int num) {
        if (num == 2) return true;
        if (num < 2 || num % 2 == 0)
            return false;
        
        for (int i = 3; i <= Math.sqrt(num); i = i + 2) {
            if (num % i == 0)
                return false;
        }

        return true;
    }
}
