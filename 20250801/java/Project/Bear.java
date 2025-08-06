public class Bear extends Animal implements Talkable, GiftReceivable {
    public Bear(String name) {
        super(name, "곰", "느긋한");
    }
    @Override
    public void talk() {
        System.out.println(name + ": 🐻 으으~ 꿀이 최고야!");
    }
    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 받고 꿀꺽 먹습니다! 🍯");
    }
    @Override
    public void doAction() {
        System.out.println(name + "이(가) 나무에 기대어 잠을 잡니다. 💤");
    }
}