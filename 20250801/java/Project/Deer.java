public class Deer extends Animal implements Talkable, GiftReceivable {
    public Deer(String name) {
        super(name, "사슴", "수줍은");
    }

    @Override
    public void talk() {
        System.out.println(name + ": 🦌 안녕... 조용한 숲이 좋아. 🌲");
    }

    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 받고 수줍게 좋아합니다! 🎁");
    }

    @Override
    public void doAction() {
        System.out.println(name + "이(가) 숲속을 조용히 거닙니다. 🌳");
    }
}
