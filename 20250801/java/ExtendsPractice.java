/*
class Animal {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    // 부모 클래스의 생성자
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Animal 생성자 호출");
    }

    void speak() {
        System.out.println("동물이 소리를 냅니다.");
    }
}

class Dog extends Animal {
    private String breed;

    // 자식 클래스의 생성자
    public Dog(String name, int age, String breed) {
        super(name, age); // 부모 생성자 호출 (반드시 첫 번째 줄에 위치)
        this.breed = breed;
        System.out.println("Dog 생성자 호출");
    }

    @Override
    void speak() {
        super.speak(); // 부모 클래스의 speak() 먼저 호출
        System.out.println("멍멍!");
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }
}

public class ExtendsPractice {
    public static void main(String[] args) {
        Dog myDog = new Dog("백구", 3, "진돗개");
        myDog.speak(); // Dog 클래스의 speak() 호출
    }
}
    */