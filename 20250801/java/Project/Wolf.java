public class Wolf extends Animal implements Talkable, GiftReceivable {
    public Wolf(String name) {
        super(name, "늑대", "용감한");
    }
    @Override
    public void talk() {
        System.out.println(name + ": 🐺 아우~ 달빛이 멋져!");
    }
    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 받고 으르렁거립니다! 🌕");
    }
    @Override
    public void doAction() {
        System.out.println(name + "이(가) 숲속을 달립니다. 🌲");
    }
}
