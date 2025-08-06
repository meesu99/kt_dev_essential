public class Mouse extends Animal implements Talkable, GiftReceivable {
    public Mouse(String name) {
        super(name, "쥐", "영리한");
    }
    @Override
    public void talk() {
        System.out.println(name + ": 🐭 찍찍! 치즈 좋아해요!");
    }
    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 받고 깡총깡총 기뻐합니다! 🧀");
    }
    @Override
    public void doAction() {
        System.out.println(name + "이(가) 구멍 속을 빠르게 달립니다. 🏃");
    }
}
