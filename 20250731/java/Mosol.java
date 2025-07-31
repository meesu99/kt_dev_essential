// 모태솔로지만 연애는 하고 싶어

import java.util.Random;
import java.util.Scanner;

class DatingBeginner {
    String name;
    int coupleCount;
    int effort;
    int likeabillity;
    int confidence;

    // 생성자
    public DatingBeginner(String name, int coupleCount, int effort, int likeabillity, int confidence) {
        this.name = name;
        this.coupleCount = coupleCount;
        this.effort = effort;
        this.likeabillity = likeabillity;
        this.confidence = confidence;
    }

    // 대화 연습 메서드
    public void conversationPractice() {
        int effort = (int)(Math.random() * 20) - 10;
        int likeabillity = (int)(Math.random() * 10) - 5;
        int confidence = (int)(Math.random() * 20) - 5;

        this.effort += effort;
        this.likeabillity += likeabillity;
        this.confidence += confidence;

        System.out.println(this.name + "님이 대화 연습 중입니다. 노력: " + this.effort + "(" + effort +") | 호감도: " + this.likeabillity + "(" + likeabillity + ")" + 
                " | 자신감: " + this.confidence + "(" + confidence + ")");
    }

    // 선물하기 메서드
    public void gift() {
        int effort = (int)(Math.random() * 20);
        int likeabillity = (int)(Math.random() * 30) - 5;
        int confidence = (int)(Math.random() * 10);

        this.effort += effort;
        this.likeabillity += likeabillity;
        this.confidence += confidence;

        System.out.println(this.name + "님이 선물을 했습니다. 노력: " + this.effort + "(" + effort +") | 호감도: " + this.likeabillity + "(" + likeabillity + ")" + 
                " | 자신감: " + this.confidence + "(" + confidence + ")");
    }

    // 데이트 메서드
    public void date() {
        int effort = (int)(Math.random() * 20) - 10;
        int likeabillity = (int)(Math.random() * 40) - 20;
        int confidence = (int)(Math.random() * 40) - 15;

        this.effort += effort;
        this.likeabillity += likeabillity;
        this.confidence += confidence;

        System.out.println(this.name + "님이 데이트 중입니다. 노력: " + this.effort + "(" + effort +") | 호감도: " + this.likeabillity + "(" + likeabillity + ")" + 
                " | 자신감: " + this.confidence + "(" + confidence + ")");

        if (this.name == "상호") {
            this.confidence += 30; // 상호는 데이트를 마치면 자신감이 30 증가
            System.out.println("상호님이 데이트를 마쳐 자신감에 찼습니다. 자신감: " + this.confidence + "(30");
        }
    }

    // 파트너 선택 메서드
    // 일정 이상의 호감도와 자신감 필요
    public void selectPartner() {
        int likeabillity = (int)(Math.random() * 40) + 20;
        int confidence = (int)(Math.random() * 40) + 20;
        System.out.println(this.name + "님이 파트너를 선택합니다. (필요 호감도: " + likeabillity + " | 필요 자신감: " + confidence + ")");
        if (this.likeabillity >= likeabillity && this.confidence >= confidence) {
            System.out.print("축하드립니다! " + this.name + "님은 파트너 선택에 성공했습니다! ");
            this.coupleCount++;
        } else {
            System.out.println(this.name + "님은 호감도 혹은 자신감이 부족해 파트너 선택에 실패했습니다.");
        }
    }
}


public class Mosol {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random rand = new Random();

        // 출연진 12명 생성
        DatingBeginner[] cast = {
            new DatingBeginner("상호", 0, rand.nextInt(15), rand.nextInt(15), 30),
            new DatingBeginner("재윤", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15)),
            new DatingBeginner("승리", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15)),
            new DatingBeginner("정목", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15)),
            new DatingBeginner("현규", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15)),
            new DatingBeginner("승찬", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15)),
            new DatingBeginner("지수", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15)),
            new DatingBeginner("여명", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15)),
            new DatingBeginner("민홍", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15)),
            new DatingBeginner("이도", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15)),
            new DatingBeginner("지연", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15)),
            new DatingBeginner("미지", 0, rand.nextInt(15), rand.nextInt(15), rand.nextInt(15))
        };

        // 프로그램 시작
        System.out.println("================================ [모솔연애] ===============================");
        System.out.println("모솔연애에 오신 것을 환영합니다!");
        System.out.println("\n=== [모솔연애 출연진 목록] ===");
        for (int i = 0; i < cast.length; i++) {
            if (i == 6) System.out.println();
            System.out.println((i + 1) + ". " + cast[i].name+ "  (노력: " + cast[i].effort + " | 호감도: " + cast[i].likeabillity + " | 자신감: " + cast[i].confidence + ")");
        }

        System.out.print("\n육성할 출연진의 번호를 선택하세요 (1~12): ");
        int choice = sc.nextInt() - 1;

        // 유효성 검사
        if (choice < 0 || choice >= cast.length) {
            System.out.println("잘못된 입력입니다. 프로그램을 종료합니다.");
            sc.close();
            return;
        }

        DatingBeginner selected = cast[choice];
        System.out.println("\n" + selected.name + "님을 선택하셨습니다.");

        int partnerCount = 0, day = 1;
        while (true) {
            // 메뉴 출력
            System.out.println("\n================================ [메뉴] ===============================");
            System.out.println("1. 대화 연습 (호감도: -10 ~ +10 | 자신감:  -5 ~  +5 | 노력:  -5 ~ +15)");
            System.out.println("2. 데이트    (호감도:   0 ~ +20 | 자신감:  -5 ~ +25 | 노력:   0 ~ +10)");
            System.out.println("3. 선물하기  (호감도: -10 ~ +10 | 자신감: -20 ~ +20 | 노력: -15 ~ +25)");
            System.out.println();
            System.out.println("8. 현재 상태 확인");
            System.out.println("9. 파트너 선택 (호감도와 자신감이 충분해야 성공)");
            System.out.println("0. 종료");
            System.out.println("========================================================================");
            System.out.print("번호를 선택하세요: ");
            int action = sc.nextInt();

            switch (action) {
                case 1: {   // 대화 연습
                    System.out.println();
                    System.out.println("📅 Day " + day++);
                    selected.conversationPractice();
                    break;
                } case 2: {  // 데이트
                    System.out.println();
                    System.out.println("📅 Day " + day++);
                    selected.date();
                    break;
                } case 3: {  // 선물하기
                    System.out.println();
                    System.out.println("📅 Day " + day++);
                    selected.gift();
                    break;
                } case 8: {  // 현재 상태 확인
                    System.out.println();
                    System.out.println(selected.name + "님의 현재 상태 (노력: " + selected.effort + " | 호감도: " + selected.likeabillity + " | 자신감: " + selected.confidence + " | 고백 공격: " + partnerCount + "회)");
                    break;
                } case 9: {  // 파트너 선택
                    System.out.println();
                    selected.selectPartner();
                    if (selected.coupleCount > 0){  // 파트너 선택 성공
                        System.out.println("프로그램을 종료합니다.");
                        return;
                    }
                    else {
                        partnerCount++;
                        if (partnerCount >= 3) {  // 파트너 선택 실패 3회
                            System.out.println(selected.name + "님은 3번의 파트너 선택에 실패해 강제 퇴소됩니다.");
                            sc.close();
                            return;
                        }
                        System.out.println("파트너 선택에 3번 실패하면 강제 퇴소됩니다. (현재 " + partnerCount + "번)");
                        break;
                    }
                } case 0: {   // 종료
                    System.out.println();
                    System.out.println("프로그램을 종료합니다.");
                    sc.close();
                    return;
                } default: {
                    System.out.println();
                    System.out.println("잘못된 입력입니다. 다시 시도하세요.");
                }
            }

            // 호감도와 자신감이 모두 0 이하일 경우 연애 실패
            if (selected.confidence <= 0 && selected.likeabillity <= 0) {
                System.out.println("\n" + selected.name + "님은 호감도와 자신감이 떨어져 연애에 실패했습니다.\n프로그램을 종료합니다.");
                sc.close();
                return;
            }

            // 9일이 지날경우 프로그램 종료
            if (day >= 10) {
                System.out.println("\n" + selected.name + "님은 9일 동안 연애를 시도했지만 성공하지 못했습니다. 프로그램을 종료합니다.");
                sc.close();
                return;
            }
        }

    }
}
