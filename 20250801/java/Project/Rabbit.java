public class Rabbit extends Animal implements Talkable, GiftReceivable {
    public Rabbit(String name) {
        super(name, "토끼", "활발한");
    }
    @Override
    public void talk() {
        System.out.println(name + ": 🐰 안녕! 당근 좋아해!");
    }
    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 받고 깡총깡총 뜁니다! 🥕");
    }
    @Override
    public void doAction() {
        System.out.println(name + "이(가) 풀밭을 뛰어다닙니다. 🌱");
    }
}
