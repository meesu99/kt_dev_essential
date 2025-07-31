// 캡슐화 적용 전 - 문제가 많은 코드
class BadBankAccount {
    public String accountNumber;
    public int balance;     // 직접 접근 가능 - 위험!

    public void printInfo() {
        System.out.println("계좌: " + accountNumber + ", 잔액: " + balance);
    }
}


// 캡슐화 적용 후 - 안전한 코드
class GoodBankAccount {
    private String accountNumber; 
    private int balance;     

    // 생성자
    public GoodBankAccount(String accountNumber, int initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance >= 0 ? initialBalance : 0;
    }

    // Getter 메서드
    public String getAccountNumber() {
        return accountNumber;
    }

    public int getBalance() {
        return balance;
    }

    // 입금 메서드 (검증 로직 포함)
    public boolean deposit(int amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println(amount + "원 입금 완료. 현재 잔액: " + balance + "원");
            return true;
        } else {
            System.out.println("입금액은 0보다 커야 합니다.");
            return false;
        }
    }

    // 출금 메서드 (검증 로직 포함)
    public boolean withdraw(int amount) {
        if (amount <= 0) {
            System.out.println("출금액은 0보다 커야 합니다.");
            return false;
        } else if (amount > balance) {
            System.out.println("잔액이 부족합니다. 현재 잔액: " + balance + "원");
            return false;
        } else {
            balance -= amount;
            System.out.println(amount + "원 출금 완료. 현재 잔액: " + balance + "원");
            return true;
        }
    }

    public void printInfo() {
        System.out.println("계좌: " + accountNumber + ", 잔액: " + balance + "원");
    }
}


// 사용 예시
public class Bank {
    public static void main(String[] args) {
        // 문제가 있는 코드
        BadBankAccount badAccount = new BadBankAccount();
        badAccount.accountNumber = "123-456";
        badAccount.balance = -1000; // 음수 잔액 설정 가능 - 문제!

        // 안전한 코드
        GoodBankAccount goodAccount = new GoodBankAccount("789-012", 10000);
        
        // goodAccount.balance = -500; // 컴파일 에러! private 접근 불가

        goodAccount.deposit(5000); // 15000원
        goodAccount.withdraw(3000); // 12000원
        goodAccount.withdraw(20000); // 잔액 부족

        // 안전한 방법으로만 데이터 접근
        System.out.println("현재 잔액: " + goodAccount.getBalance() + "원");
    }
}
