public class Java1 {
    public static void main(String[] args) {
        // 1부터 5까지 출력
        for (int i = 1; i <= 5; System.out.println(i++));

        
        // 1부터 10까지 합계 출력
        int sum = 0, j = 1;
        while (j <= 10) sum += j++;
        System.out.println("1~10 합: " + sum);


        //do-while
        int k = 1;
        do System.out.println("현재 값: " + k++); while (k <= 3);


        
    }
    
    // Println() 출력문
   public static void printFunc(String s){
      System.out.println(s);
   }
}
