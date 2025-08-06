/** 
 * 동물의 숲 in Java
 * 동물 인터페이스:     Animal.java
 * 동물 리스트 클래스:  ResidentList.java
 * 대화 인터페이스:     Talkable.java
 * 선물 인터페이스:     GiftReceivable.java
 * 플레이어 클래스:     Player.java
 * 게임 로직 클래스:    Game.java
 **/

import java.util.Scanner;

public class Game {
    private ResidentList residentList = new ResidentList();

    public void startGame(Player player) {
        Scanner sc = new Scanner(System.in);
        boolean running = true;
        // 게임 시작 및 초기 화면
        while (running) {
            System.out.println("\n===== 동물의 숲 메인 메뉴 =====");
            System.out.println("1. 동물과의 상호작용");
            System.out.println("2. 개인 행동");
            System.out.println("0. 게임 종료");
            System.out.print("메뉴 선택: ");
            int mainChoice = sc.nextInt();
            sc.nextLine();
            switch (mainChoice) {
                case 1:
                    animalInteractionMenu(player, sc);
                    break;
                case 2:
                    personalActionMenu(player, sc);
                    break;
                case 0:
                    running = false;
                    System.out.println("다음에 또 봐!");
                    break;
                default:
                    System.out.println("잘못 입력한 것 같아.");
            }
        }
        sc.close();
    }

    // 개인 행동 메뉴
    private void personalActionMenu(Player player, Scanner sc) {
        boolean running = true;
        while (running) {
            System.out.println("\n--- 개인 행동 메뉴 ---");
            System.out.println("1. 내 가방");
            System.out.println("2. 무 심기");
            System.out.println("3. 무 수확");
            System.out.println("4. 너굴상점");
            System.out.println("5. 무트코인");
            System.out.println("6. 낚시");
            System.out.println("0. 뒤로가기");
            System.out.print("메뉴 선택: ");
            int choice = sc.nextInt();
            sc.nextLine();
            switch (choice) {
                case 1:
                    player.printMoney();
                    break;
                case 2:
                    player.plantRadish(sc);
                    break;
                case 3:
                    player.harvestRadish(sc);
                    break;
                case 4:
                    player.shopMenu(sc);
                    break;
                case 5:
                    player.sellRadishCoin(sc);
                    break;
                case 6:
                    player.fishing(sc);
                    break;
                case 0:
                    running = false;
                    break;
                default:
                    System.out.println("잘못 입력한 것 같아.");
            }
        }
    }

    // 동물 상호작용 메뉴
    private void animalInteractionMenu(Player player, Scanner sc) {
        boolean running = true;
        while (running) {
            System.out.println("\n--- 동물과의 상호작용 메뉴 ---");
            System.out.println("1. 주민 리스트 출력");
            System.out.println("2. 주민과 대화");
            System.out.println("3. 선물 주기");
            System.out.println("4. 고유 행동 보기");
            System.out.println("8. 새 주민 추가");
            System.out.println("9. 주민 이주하기");
            System.out.println("0. 뒤로가기");
            System.out.print("메뉴 선택: ");
            int choice = sc.nextInt();
            sc.nextLine();
            switch (choice) {
                case 1:
                    printAnimalList();
                    break;
                case 2:
                    talkToAnimal(player, sc);
                    break;
                case 3:
                    giveGiftToAnimal(player, sc);
                    break;
                case 4:
                    showAnimalAction(sc);
                    break;
                case 8:
                    addNewAnimal(sc);
                    break;
                case 9:
                    deleteAnimal(sc);
                    break;
                case 0:
                    running = false;
                    break;
                default:
                    System.out.println("잘못 입력한 것 같아.");
            }
        }
    }

    private void printAnimalList() {
        residentList.printResidents();
    }

    private void talkToAnimal(Player player, java.util.Scanner scanner) {
        printAnimalList();
        System.out.print("\n누구랑 대화할까? ");
        int idx = scanner.nextInt() - 1;
        scanner.nextLine();
        Animal animal = residentList.getResident(idx);
        if (animal != null) {
            player.talkTo(animal);
        } else {
            System.out.println("잘못 입력한 것 같아.");
        }
    }

    private void giveGiftToAnimal(Player player, java.util.Scanner scanner) {
        printAnimalList();
        System.out.print("\n누구에게 선물할까? ");
        int idx = scanner.nextInt() - 1;
        scanner.nextLine();
        Animal animal = residentList.getResident(idx);
        if (animal != null) {
            System.out.print("어떤걸 선물할까? ");
            String gift = scanner.nextLine();
            player.giveGift(animal, gift);
        } else {
            System.out.println("잘못 입력한 것 같아.");
        }
    }

    private void showAnimalAction(java.util.Scanner scanner) {
        printAnimalList();
        System.out.print("\n누구의 행동을 볼까? ");
        int idx = scanner.nextInt() - 1;
        scanner.nextLine();
        Animal animal = residentList.getResident(idx);
        if (animal != null) {
            animal.doAction();
        } else {
            System.out.println("잘못 입력한 것 같아.");
        }
    }

    private void addNewAnimal(java.util.Scanner scanner) {
        System.out.println("\n[새 주민 추가]");
        System.out.println("Bear | Cat | Crocodile | Deer | Dog | Eagle\nHamster | Mouse | Penguin | Rabbit | Tiger | Wolf");
        System.out.print("\n주민은 어떤 친구야? ");
        String type = scanner.nextLine();
        System.out.print("친구의 이름은? ");
        String name = scanner.nextLine();
        Animal newAnimal = null;
        switch (type.toLowerCase()) {
            case "bear":
                newAnimal = new Bear(name);
                break;
            case "cat":
                newAnimal = new Cat(name);
                break;
            case "crocodile":
                newAnimal = new Crocodile(name);
                break;
            case "deer":
                newAnimal = new Deer(name);
                break;
            case "dog":
                newAnimal = new Dog(name);
                break;
            case "eagle":
                newAnimal = new Eagle(name);
                break;
            case "hamster":
                newAnimal = new Hamster(name);
                break;
            case "mouse":
                newAnimal = new Mouse(name);
                break;
            case "penguin":
                newAnimal = new Penguin(name);
                break;
            case "rabbit":
                newAnimal = new Rabbit(name);
                break; 
            case "tiger":
                newAnimal = new Tiger(name);
                break;
            case "wolf":
                newAnimal = new Wolf(name);
                break;
            // 필요한 경우 동물 추가
            default:
                System.out.println("잘못 입력한 것 같아.");
                return;
        }
        residentList.addResident(newAnimal);
        System.out.println(name + "이(가) 우리 마을로 찾아왔어!");
    }

    private void deleteAnimal(Scanner sc) {
        printAnimalList();
        System.out.print("\n누구를 이주시킬까? ");
        int idx = sc.nextInt() - 1;
        sc.nextLine();
        Animal removedAnimal = residentList.getResident(idx);
        if (removedAnimal != null) {
            residentList.removeResident(idx);
            System.out.println(removedAnimal.getName() + "이(가) 떠났어...");
        } else {
            System.out.println("잘못 입력한 것 같아.");
        }
    }

    public static void main(String[] args) {
        System.out.println("[ 동물의 숲에 온 걸 환영해! ]");
        Scanner sc = new Scanner(System.in);
        Player player = new Player(sc);
        Game game = new Game();
        game.startGame(player);
    }
}
