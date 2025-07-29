// 1부터 100까지 더해서 500 넘을 때까지
public class Accumulator {
    public static void main(String[] args) {
        // break 사용 버전
        int sum = 0;
        for (int i = 1; sum <= 500; sum += i++);  
        System.out.println(sum);


        // break 사용 X 버전.
        int j = 1;  sum = 0;
        while(sum < 500) {
            sum += j++;
        }  System.out.println(sum);
    }
    
}
