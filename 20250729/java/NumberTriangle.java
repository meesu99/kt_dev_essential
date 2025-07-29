// 숫자 삼각형 만들기
public class NumberTriangle {
    public static void main(String[] args) {  
        // 출력할 수
        int num = 1;  
        // 한 줄씩 출력
        for (int i = 1; i < 5; i++){  
            // 한 줄당 출력할 갯수
            for (int j = 0; j < i; j++, num++)  
                System.out.print(num + " ");
            System.out.println();
        }
    }
}
