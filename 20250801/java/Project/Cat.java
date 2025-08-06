public class Cat extends Animal implements Talkable, GiftReceivable {

    public Cat(String name) {
        super(name, "고양이", "느긋한");
    }

    @Override
    public void talk() {
        System.out.println(name + ": 😺 야옹~ 오늘도 좋은 하루야! 😺");
    }

    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 받고 좋아합니다! 😻");
    }

    @Override
    public void doAction() {
        System.out.println(name + "이(가) 나무 위에서 낮잠을 잡니다. 😽");
    }
}