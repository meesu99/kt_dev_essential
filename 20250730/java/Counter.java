public class Counter {
    public static int count = 0;    // 클래스 변수
    public Counter() {
        count++;
    }
    public static void main(String[] args) {
        new Counter();
        new Counter();
        System.out.println("생성된 객체 수 = " + Counter.count);
    }
}
