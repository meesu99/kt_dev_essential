public class Tiger extends Animal implements Talkable, GiftReceivable {
    public Tiger(String name) {
        super(name, "호랑이", "위엄있는");
    }
    @Override
    public void talk() {
        System.out.println(name + ": 🐯 어흥! 내가 왕이야!");
    }
    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 받고 으르렁거립니다! 👑");
    }
    @Override
    public void doAction() {
        System.out.println(name + "이(가) 풀숲을 거닙니다. 🌾");
    }
}
