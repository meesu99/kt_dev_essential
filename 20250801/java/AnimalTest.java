// 부모 클래스 (추상 클래스) - 추상화는 직접 생성자를 호출할 수 없으며
// 구현할 때 사용하기 위한 것이 아닌 상속을 위해서 선언을 해두는 것
abstract class Animal {
    protected String name;
    protected int age;

    // 자식 클래스에서 super. 생성자로 호출해서 사용하기 위함
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 추상 메서드 - 자식 클래스에서 반드시 구현해야 함
    abstract void speak();

    // 일반 메서드
    void introduce() {
        System.out.println("이름: " + name + ", 나이: " + age + "살");
    }

    void sleep() {
        System.out.println(name + "이(가) 잠을 잡니다. Zzz...");
    }

    void pet() {
        System.out.println(name + "이(가) 애교를 부립니다! 😊");
    }

    void eat() {
        System.out.println(name + "이(가) 밥을 먹습니다. 🍽️");
    }

    public String name() {
        return name;
    }
}


// 자식 클래스 1
class Cat extends Animal {
    private String furColor;

    public Cat(String name, int age, String furColor) {
        super(name, age);
        this.furColor = furColor;
    }

    // 추상 메서드의 경우는 아래와 같이 오버라이딩으로 반드시
    // 자식 클래스에서 작성해줘야 합니다!!
    @Override
    void speak() {
        System.out.println(name + ": 야옹! 🐱");
    }

    @Override
    void introduce() {
        super.introduce();
        System.out.println("털 색깔: " + furColor);
    }

    @Override
    void sleep() {
        System.out.println(name + "이(가) 고양이처럼 잠을 잡니다. Zzz... 🐾");
    }

    void scratch() {
        System.out.println(name + "이(가) 할퀴었습니다! 🐾");
    }
}


// 자식 클래스 2
class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);
        this.breed = breed;
    }

    @Override
    void speak() {
        System.out.println(name + ": 멍멍! 🐶");
    }

    @Override
    void introduce() {
        super.introduce();
        System.out.println("품종: " + breed);
    }

    @Override
    void sleep() {
        System.out.println(name + "이(가) 개처럼 잠을 잡니다. Zzz... 🐾");
    }

    void fetch() {
        System.out.println(name + "이(가) 공을 가져왔습니다! 🎾");
    }
}

// 자식 클래스 3
class Bird extends Animal {
    private String species;

    public Bird(String name, int age, String species) {
        super(name, age);
        this.species = species;
    }

    @Override
    void speak() {
        System.out.println(name + ": 짹짹! 🐦");
    }

    @Override
    void introduce() {
        super.introduce();
        System.out.println("종: " + species);
    }

    @Override
    void sleep() {
        System.out.println(name + "이(가) 새처럼 잠을 잡니다. Zzz... ");
    }

    void fly() {
        System.out.println(name + "이(가) 하늘을 날아다닙니다! ✈️");
    }
}

// 실행 및 테스트
public class AnimalTest {
    public static void main(String[] args) {

        // 추상 클래스는 직접 인스턴스 생성 불가
        // Animal animal = new Animal("test", 1); // 컴파일 에러!

        // 객체 생성
        Cat cat = new Cat("나비", 2, "흰색");
        Dog dog = new Dog("멍멍이", 3, "골든 리트리버");
        

        System.out.println("=== 고양이 소개 ===");
        cat.introduce();
        cat.speak();
        cat.sleep();
        cat.scratch();

        System.out.println("\n=== 강아지 소개 ===");
        dog.introduce();
        dog.speak();
        dog.sleep();
        dog.fetch();

        System.out.println("\n=== 다형성 예제 ===");
        Animal[] pets = {cat, dog};

        for (Animal pet : pets) {
            pet.introduce();
            pet.speak();
            System.out.println("---");
        }
    }   
}
