public class Eagle extends Animal implements Talkable, GiftReceivable {
    public Eagle(String name) {
        super(name, "독수리", "자유로운");
    }
    @Override
    public void talk() {
        System.out.println(name + ": 🦅 푸르른 하늘을 날고 싶어!");
    }
    
    @Override
    public void receiveGift(String gift) {
        System.out.println(name + "이(가) " + gift + "를 받고 높이 날아오릅니다! ☁️");
    }
    @Override
    public void doAction() {
        System.out.println(name + "이(가) 하늘을 힘차게 날아다닙니다. 🌤️");
    }
}
