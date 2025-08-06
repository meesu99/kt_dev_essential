public class Dog extends Animal implements Talkable, GiftReceivable {
    public Dog(String name) {
        super(name, "강아지", "활발한");
    }

    @Override
    public void talk() {
        System.out.println(name + ": 🐶 멍멍! 놀아줘! 🐾");
    }

    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 받고 신나게 꼬리를 흔듭니다! 🦴");
    }

    @Override
    public void doAction() {
        System.out.println(name + "이(가) 공을 물고 달립니다. 🏃‍♂️");
    }
}
