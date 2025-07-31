// User 클래스
class User  {
    String name;
    int age;
    String email;

    public User(String name, int age, String email) {
        // 기본 생성자
        this.name = name;
        this.age = age;
        this.email = email;
    }

    // 사용자 정보 출력 메서드
    void printUserInfo() {
        System.out.println("User -> name: " + name + ", age: " + age + ", email: " + email);
    }
}

// Point 클래스
class Point {
    int x;
    int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    double distanceOrigin() {
        return (double)Math.sqrt(x * x + y * y);
    }
}

// BankAccount 클래스
class BankAccount {
    String accountNumber;
    int balance;

    public BankAccount(String accountNumber, int initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    void deposit(int amount) {
        if (amount > 0) {
            balance += amount;
        } else {
            System.out.println("Deposit amount must be positive.");
        }
    }

    void withdraw(int amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Invalid withdrawal amount.");
        }
    }
}

public class ObjectPractice {
    public static void main(String[] args) {
        // 1) User 클래스
        System.out.println("1) User 클래스");
        User alice = new User("Alice", 30, "alice@example.com");
        User tom = new User("Tom", 25, "tom@example.com");

        alice.printUserInfo();
        tom.printUserInfo();


        // 2) Point 클래스
        System.out.println("\n2) Point 클래스");
        Point p1 = new Point(3, 4);
        Point p2 = new Point(5, 12);
        System.out.println("Point(x=" + p1.x + ", y=" + p1.y + ")");
        System.out.println("Distance from origin: " + p1.distanceOrigin());

        System.out.println("Point(x=" + p2.x + ", y=" + p2.y + ")");
        System.out.println("Distance from origin: " + p2.distanceOrigin());


        // 3) BankAccount 클래스
        System.out.println("\n3) BankAccount 클래스");
        BankAccount account1 = new BankAccount("123-456-789", 50000 );
        System.out.println("계좌번호: " + account1.accountNumber);
        System.out.println("잔액: " + account1.balance + "원");

        account1.deposit(25000);
        System.out.println("입금 후 잔액: " + account1.balance + "원");

        account1.withdraw(50000);
        System.out.println("출금 후 잔액: " + account1.balance + "원");
    }
}
