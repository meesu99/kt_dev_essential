// 1) Car 클래스 정의
class Car {
    String model;           // 필드: 자동차 모델
    int speed;              // 필드: 현재 속도
    boolean isRunning;      // 필드: 엔진 상태

    void startEngine() {
        isRunning = true;
        System.out.println(model + " 엔진이 시동되었습니다.");
    }

    void drive() {
        if (isRunning) {
            System.out.println(model + " is driving at " + speed + " km/h");
        } else {
            System.out.println("먼저 시동을 걸어주세요!");
        }
    }

    void setSpeed(int newSpeed) {
        if (newSpeed >= 0) {
            speed = newSpeed;
            System.out.println("속도가 " + speed + " km/h로 변경되었습니다.");
        } else {
            System.out.println("속도는 0 이상이어야 합니다.");
        }
    }
}


// 2) 인스턴스 생성 및 사용
public class Main {
    public static void main(String[] args) {
        // 객체 생성
        Car tesla = new Car();
        tesla.model = "Tesla Model S";
        tesla.speed = 0;

        // 메서드 호출
        tesla.startEngine();
        tesla.setSpeed(120);
        tesla.drive();


        Car bmw = new Car();
        bmw.model = "BMW M3";
        bmw.speed = 100;   
        bmw.drive();        // 먼저 시동을 걸어주세요!

        // null 참조예시
        Car emptyCar = null;
        // emptyCar.drive(); // NullPointerException 발생 가능

        if (emptyCar != null) {
            emptyCar.drive();
        } else {
            System.out.println("차량 객체가 생성되지 않았습니다.");
        }
    }
}