class Zoo {
    private Animal[] cages;
    private String zooName;
    private int animalCount;

    public Zoo(String zooName, int maxAnimals) {
        this.zooName = zooName;
        this.cages = new Animal[maxAnimals];
        this.animalCount = 0;
    }

    // 동물 추가
    void addAnimal(Animal animal) {
        if (animalCount < cages.length) {
            cages[animalCount++] = animal;
            System.out.println(animal.name() + "이(가) "+ zooName + "에 입장했습니다!");
        } else {
            System.out.println("동물원이 가득 찼습니다.");
        }
    }

    // 동물 제거
    void removeAnimal(String name) {
        for (int i = 0; i < animalCount; i++) {
            if (cages[i].name().equals(name)) {
                System.out.println("\n=== " + zooName + " 작별 시간 ===");
                System.out.println(name + "이(가) " + zooName + "에서 자연으로 돌아갔습니다.");
                cages[i] = cages[animalCount - 1]; // 마지막 동물로 대체
                cages[animalCount - 1] = null; // 마지막 동물 제거
                animalCount--;
            }
        }
    }

    // 모든 동물 소리내기
    void makeAllSounds() {
        System.out.println("\n=== " + zooName + " 동물들의 합창 ===");
        for (int i = 0; i < animalCount; i++) {
            cages[i].speak();
        }
    }

    // 급식 시간
    void feedingTime() {
        System.out.println("\n=== " + zooName + " 급식 시간 ===");
        for (int i = 0; i < animalCount; i++) {
            cages[i].eat();
        }
    }

    // 취침 시간
    void sleepTime() {
        System.out.println("\n=== " + zooName + " 취침 시간 ===");
        for (int i = 0; i < animalCount; i++) {
            cages[i].sleep();
        }
    }

    // 동물원 현황
    void showZooStatus() {
        System.out.println("\n=== " + zooName + " 현황 ===");
        System.out.println("총 동물 수: " + animalCount + "마리");
        for (int i = 0; i < animalCount; i++) {
            System.out.println((i + 1) + ". " + cages[i].name() + " (" + cages[i].getClass().getSimpleName() + ")");
        }
    }

    // 동물이 애교 부리는 함수
    void petAnimals() {
        System.out.println("\n=== " + zooName + " 애교 시간 ===");
        for (int i = 0; i < animalCount; i++) {
            cages[i].pet();
        }
    }

    // 특별 활동 시간 (instanceof 사용)
    void specialActivity() {
        System.out.println("\n=== " + zooName + " 특별 활동 시간 ===");
        for (int i = 0; i < animalCount; i++) {
            Animal animal = cages[i];

            // instanceof로 타입 확인 후 다운캐스팅
            if (animal instanceof Dog) {
                Dog dog = (Dog) animal;
                dog.fetch();
            } else if (animal instanceof Cat) {
                Cat cat = (Cat) animal;
                cat.scratch();
            } else if (animal instanceof Bird) {
                 Bird bird = (Bird) animal;
                 bird.fly();
            }
        } 
    }
}

// 동물원 테스트 클래스
public class ZooSimulation {
    public static void main(String[] args) {
        // 동물원 생성
        Zoo happyZoo = new Zoo("행복 동물원", 6);

        // 동물들 생성 및 추가
        happyZoo.addAnimal(new Dog("토토", 4, "시바견"));
        happyZoo.addAnimal(new Cat("야미", 3, "러시안블루"));
        happyZoo.addAnimal(new Dog("루비", 2, "말티즈"));
        happyZoo.addAnimal(new Bird("짹짹이", 1, "앵무새"));
        happyZoo.addAnimal(new Cat("치즈", 5, "치즈색"));

        // 동물원 현황
        happyZoo.showZooStatus();

        // 다양한 활동
        happyZoo.makeAllSounds();
        happyZoo.feedingTime();
        happyZoo.specialActivity();
        happyZoo.sleepTime();
        happyZoo.petAnimals();

        // 동물 제거
        happyZoo.removeAnimal("야미");
        
        // 변경된 현황 확인
        happyZoo.showZooStatus();
    }
    
}
