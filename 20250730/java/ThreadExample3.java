class MyRunnable1 implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.printf("%s: %d%n", Thread.currentThread().getName(), i);
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}

public class ThreadExample3 {
    public static void main(String[] args) {
        Thread t1 = new Thread(new MyRunnable1());
        Thread t2 = new Thread(new MyRunnable1());

        t1.setName("A");
        t2.setName("B");

        t1.start();
        t2.start();

    }
}
