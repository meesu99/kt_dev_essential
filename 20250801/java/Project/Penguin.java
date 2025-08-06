public class Penguin extends Animal implements Talkable, GiftReceivable {
    public Penguin(String name) {
        super(name, "펭귄", "명랑한");
    }
    @Override
    public void talk() {
        System.out.println(name + ": 🐧 펭펭! 얼음이 좋아!");
    }
    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 받고 미끄럼을 탑니다! ❄️");
    }
    @Override
    public void doAction() {
        System.out.println(name + "이(가) 얼음 위를 미끄러집니다. 🧊");
    }
}
