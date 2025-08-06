public class Crocodile extends Animal implements Talkable {
    public Crocodile(String name) {
        super(name, "악어", "강인한");
    }
    @Override
    public void talk() {
        System.out.println(name + ": 🐊 크르르~ 물이 좋아!");
    }
    // @Override
    // public void receiveGift(String gift) {
    //     System.out.println(name + "이(가) " + gift + "를 받고 크게 입을 벌립니다! 🦷");
    // }
    @Override
    public void doAction() {
        System.out.println(name + "이(가) 강가에서 뒹굽니다. 🌊");
    }
}
