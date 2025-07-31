import java.util.Scanner;

// 1) Person 클래스
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }

    // 성인 여부 확인 메서드
    public void isAdult() {
        if (this.age >= 20) {
            System.out.println("성인입니다.");
        } else {
            System.out.println("미성년자입니다.");
        }
    }
}


// 2) Rectangle 클래스
class Rectangle {
    private int width;
    private int height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    public int getWidth() {
        return width;
    }
    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }
    public void setHeight(int height) {
        this.height = height;
    }

    // 면적 계산 메서드
    public int area() {
        return width * height;
    }

    // 둘레 계산 메서드
    public int perimeter() {
        return 2 * (width + height);
    }
}

public class Capsule {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // 예제 1: Person 클래스
        // 사용자 입력을 통해 Person 객체 생성
        while(true) {
            System.out.print("이름과 나이를 입력하세요. (예: 홍길동 25): ");
            String input = sc.nextLine();
            String[] parts = input.split(" ");

            // 입력 형식 검사
            if (parts.length != 2) {
                System.out.println("잘못된 입력입니다. 다시 시도하세요.");
                continue;
            }

            String name = parts[0];
            int age;
            try {
                age = Integer.parseInt(parts[1]);
                Person person = new Person(name, age);
                System.out.println("이름: " + person.getName() + ", 나이: " + person.getAge());
                person.isAdult();
                break;
            } catch (NumberFormatException e) { // 나이가 숫자가 아닐 경우
                System.out.println("나이는 숫자로 입력해야 합니다. 다시 시도하세요.\n");
                continue;
            }
        }


        // 예제 2: Rectangle 클래스
        while (true) {
            System.out.print("직사각형의 가로를 입력하세요. (예: 5): ");
            int width = sc.nextInt();
            System.out.print("직사각형의 세로를 입력하세요. (예: 10): ");
            int height = sc.nextInt();

            if (width <= 0 || height <= 0) {
                System.out.println("가로와 세로는 양수여야 합니다.");
                continue;
            }
            else {
                Rectangle rectangle = new Rectangle(width, height);
                System.out.println("가로: " + rectangle.getWidth() + ", 세로: " + rectangle.getHeight());
                System.out.println("넓이: " + rectangle.area());
                System.out.println("둘레: " + rectangle.perimeter());
                sc.close();
                break;
            }
        }
    }
}
