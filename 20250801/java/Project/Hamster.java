public class Hamster extends Animal implements Talkable, GiftReceivable {
    public Hamster(String name) {
        super(name, "햄스터", "귀여운");
    }
    @Override
    public void talk() {
        System.out.println(name + ": 🐹 햄~ 햄~ 먹을거 있어?");
    }
    
    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 볼에 가득 담아요! 🌻");
    }
    @Override
    public void doAction() {
        System.out.println(name + "이(가) 바퀴를 열심히 돌립니다. 🏃‍♀️");
    }
}
