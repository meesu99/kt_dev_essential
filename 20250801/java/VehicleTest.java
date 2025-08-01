// 부모 클래스
class Vehicle {
    String brand;
    int speed;

    public Vehicle(String brand) {
        this.brand = brand;
        this.speed = 0;
    }

    void move() {
        System.out.println(brand + "이(가) 이동 중입니다.");
    }

    void accelerate(int increment) {
        speed += increment;
        System.out.println("속도가 " + speed + "km/h로 증가했습니다.");
    }
}

// 자식 클래스 1
class Car extends Vehicle {
    int doors;

    public Car(String brand, int doors) {
        super(brand);
        this.doors = doors;
    }

    @Override
    void move() {
        System.out.println(brand + " 자동차가 도로를 달립니다.");
    }

    void honk() {
        System.out.println("빵빵!");
    }
}


// 자식 클래스 2
class Bicycle extends Vehicle {
    boolean hasGear;

    public Bicycle(String brand, boolean hasGear) {
        super(brand);
        this.hasGear = hasGear;
    }

    @Override
    void move() {
        System.out.println(brand + " 자전거가 페달을 밟으며 이동합니다.");
    }

    void ringBell() {
        System.out.println("따르릉!");
    }
}


// 실행 클래스
public class VehicleTest {
    public static void main(String[] args) {
        Vehicle v1 = new Car("현대", 4);
        Vehicle v2 = new Bicycle("삼천리", true);

        v1.move();
        v1.accelerate(50);

        v2.move();
        v2.accelerate(20);

        // 다운캐스팅으로 자식 클래스 고유 메서드 호출
        if (v1 instanceof Car) {
            ((Car) v1).honk();
        }

        if (v2 instanceof Bicycle) {
            ((Bicycle) v2).ringBell();
        }
    }
    
}
