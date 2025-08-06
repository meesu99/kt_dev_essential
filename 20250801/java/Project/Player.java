import java.util.Scanner;
import java.util.Random;

public class Player {
    private String name;
    private int money = 10000;
    private int radishSeed = 0; // 애기무
    private int radishGrown = 0; // 어른 무
    private int shovel = 0;
    private int fishingRod = 0;
    private int fish = 0;

    public Player(Scanner sc) {
        System.out.print("너의 이름을 알려줘! ");
        this.name = sc.nextLine();
        System.out.println("어서와, " + this.name + "!");
    }

    public String getName() {
        return name;
    }

    public void printMoney() {
        System.out.println("현재 " + money + "벨");
        System.out.println("애기무: " + radishSeed + "개 | 어른 무: " + radishGrown + "개 | 삽: " + shovel + "개\n낚시대: " + fishingRod + "개 | 생선: " + fish + "마리");
    }

    public void plantRadish(Scanner sc) {
        System.out.println("보유 애기무: " + radishSeed + "개, 삽: " + shovel + "개");
        if (shovel < 1) {
            System.out.println("삽이 없이는 무를 심을 수 없어...");
            return;
        }
        if (radishSeed < 1) {
            System.out.println("애기무가 없어. 상점에서 구매하자!");
            return;
        }
        System.out.print("몇 개를 심을까? ");
        int num = sc.nextInt();
        sc.nextLine();
        if (num <= 0 || num > radishSeed) {
            System.out.println("개수가 이상한걸?");
            return;
        }
        radishSeed -= num;
        radishGrown += num;
        System.out.println("무 " + num + "개를 심었다! 이제 수확하러 갈까?");
    }

    public void harvestRadish(Scanner sc) {
        System.out.println("보유 어른 무: " + radishGrown + "개");
        if (radishGrown < 1) {
            System.out.println("심은 무(어른 무)가 없어... 애기무를 심고 수확하자!");
            return;
        }
        System.out.print("몇 개를 수확할까? ");
        int num = sc.nextInt();
        sc.nextLine();
        if (num <= 0 || num > radishGrown) {
            System.out.println("개수가 잘못 됐는걸?");
            return;
        }
        radishGrown -= num;
        System.out.println("어른 무 " + num + "개를 수확했다! (판매는 무트코인에서)");
        radishGrown += num;
    }

    public void shopMenu(Scanner sc) {
        boolean running = true;
        while (running) {
            System.out.println("\n--- 너굴상점 ---");
            System.out.println("현재 자금: " + money + "벨");
            System.out.println("1. 애기무 구매 (200벨)");
            System.out.println("2. 낚시대 구매 (10,000벨)");
            System.out.println("3. 삽 구매 (5,000벨)");
            System.out.println("4. 생선 판매 (1마리 1,000벨)");
            System.out.println("0. 뒤로가기");
            System.out.print("메뉴 선택: ");
            int choice = sc.nextInt();
            sc.nextLine();
            switch (choice) {
                case 1:
                    System.out.print("애기무를 몇 개 구매할까? ");
                    int numRadish = sc.nextInt();
                    sc.nextLine();
                    int costRadish = numRadish * 200;
                    if (numRadish <= 0 || costRadish > money) {
                        System.out.println("그만큼은 살 수 없어.");
                    } else {
                        radishSeed += numRadish;
                        money -= costRadish;
                        System.out.println("애기무 " + numRadish + "개를 구매했다!");
                    }
                    break;
                case 2:
                    if (money < 10000) {
                        System.out.println("벨이 부족해!");
                    } else {
                        fishingRod++;
                        money -= 10000;
                        System.out.println("낚시대를 구매했다!");
                    }
                    break;
                case 3:
                    if (money < 5000) {
                        System.out.println("벨이 부족해!");
                    } else {
                        shovel++;
                        money -= 5000;
                        System.out.println("삽을 구매했다!");
                    }
                    break;
                case 4:
                    if (fish < 1) {
                        System.out.println("판매할 생선이 없어...");
                    } else {
                        System.out.print("몇 마리 팔거야? ");
                        int numFish = sc.nextInt();
                        sc.nextLine();
                        if (numFish <= 0 || numFish > fish) {
                            System.out.println("수량이 잘못됐는걸?");
                        } else {
                            fish -= numFish;
                            money += numFish * 200;
                            System.out.println("생선 " + numFish + "마리를 판매했어!");
                        }
                    }
                    break;
                case 0:
                    running = false;
                    break;
                default:
                    System.out.println("잘못 입력했어.");
            }
        }
    }

    public void sellRadishCoin(Scanner sc) {
        Random rand = new Random();
        int todayPrice = rand.nextInt(701) + 100; // 100~800원
        System.out.println("오늘의 무트코인 시세: " + todayPrice + "벨");
        if (radishGrown < 1) {
            System.out.println("판매할 어른 무가 없어.");
            return;
        }
        System.out.print("어른무 몇 개를 팔래? ");
        int num = sc.nextInt();
        sc.nextLine();
        if (num <= 0 || num > radishGrown) {
            System.out.println("개수가 잘못됐어...");
            return;
        }
        int total = todayPrice * num;
        radishGrown -= num;
        money += total;
        System.out.println("어른 무 " + num + "개를 개당 " + todayPrice + "원에 판매했다! 총 " + total + "벨을 얻었다!");
    }

    public void fishing(Scanner sc) {
        if (fishingRod < 1) {
            System.out.println("낚시대가 없네... 너굴상점에서 구매해야지!");
            return;
        }
        Random rand = new Random();
        int chance = rand.nextInt(100);
        if (chance < 30) {
            System.out.println("오늘은 날이 안 좋네... (낚시 실패)");
        } else {
            int fishCaught = rand.nextInt(3) + 1; // 1~3마리
            fish += fishCaught;
            System.out.println("생선 " + fishCaught + "마리를 낚았다!");
        }
    }

    public void giveGift(Animal animal, String gift) {
        if (animal instanceof GiftReceivable) {
            ((GiftReceivable) animal).receiveGift(gift);
        } else {
            System.out.println(animal.getName() + "은(는) 선물을 받지 않네요!");
        }
    }

    public void talkTo(Animal animal) {
        if (animal instanceof Talkable) {
            ((Talkable) animal).talk();
        } else {
            System.out.println(animal.getName() + "은(는) 말이 없네요...");
        }
    }
}