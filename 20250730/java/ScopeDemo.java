public class ScopeDemo {
    int value= 100;         // 인스턴스 변수
        public void method() {
            int value= 50;  // 지역 변수 (shadowing)
            System.out.println("지역 변수 value = " + value);
            System.out.println("인스턴스 변수 this.value = " + this.value);
        }
    public static void main(String[] args) {
        new ScopeDemo().method();
    }
}
