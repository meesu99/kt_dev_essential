public class ThreadJoinExample {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            System.out.println("Work started");
            try { Thread.sleep(1000); } catch (InterruptedException e) { }
            System.out.println("Work finished");
        });
        worker.start();
        worker.join();  // 작업이 끝날 때까지 메인 스레드 대기
        System.out.println("Main thread resumes");
    }
}