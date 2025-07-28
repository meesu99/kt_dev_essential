public class Greeting {     // Greeting 클래스 생성
    public static void main(String[] args) {    // 메인 메서드 생성
        sayHello();     // sayHello 메서드 호출
        sayBye();       // sayBye 메서드 호출
        sayName();
    }

    public static void sayHello() {  // sayHello 메서드 생성
        System.out.println("안녕하세요!");
    }

    public static void sayBye() {   // sayBye 메서드 생성
        System.out.println("다음에 또 봐요!");
    }

    public static void sayName() {   // sayBye 메서드 생성
        System.out.println("민수".repeat(3));
    }
}
