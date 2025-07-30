// 1) Thread 상속
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.printf("[%s] MyThread 실행: %d%n", getName(), i);
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}


// 2) Runnable 구현
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.printf("[%s] MyRunnable 실행: %d%n", Thread.currentThread().getName(), i);
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}


// 3) Thread 동작
public class ThreadExample1 {
    public static void main(String[] args) {
        Thread t1 = new MyThread();                 // Thread 상속
        Thread t2 = new Thread(new MyRunnable());   // Runnable 구현

        t1.setName("Thread-A");
        t2.setName("Thread-B");

        t1.start();
        t2.start();
    }
}
