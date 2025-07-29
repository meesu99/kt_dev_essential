import java.util.Scanner;

public class SpiralMatrix {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("정사각형의 한 변의 길이를 입력하세요.: ");
        int n = sc.nextInt();
        sc.close();
        int [][] spiral = new int[n][n];
        int x = 0, y = 0;
        int direction = 0;

        for (int i = 1; i <= n*n; i++) {
            // 값 입력
            spiral[y][x] = i;

            switch(direction % 4) {
                // 우측 방향
                case 0: {
                    if (x == n - 1 || spiral[y][x + 1] > 0){
                        direction += 1;
                        y += 1;
                        break;
                    }
                    else
                        x += 1;
                        break;
                }

                // 하단 방향
                case 1: {
                    if (y == n - 1 || spiral[y + 1][x] > 0){
                        direction += 1;
                        x -= 1;
                        break;
                    }
                    else
                        y += 1;
                        break;
                }
                
                // 좌측 방향
                case 2: {
                    if (x == 0 || spiral[y][x - 1] > 0){
                        direction += 1;
                        y -= 1;
                        break;
                    }
                    else
                        x -= 1;
                        break;
                }

                // 상단 방향
                case 3: {
                    if (y == 0 || spiral[y - 1][x] > 0){
                        direction += 1;
                        x += 1;
                        break;
                    }
                    else
                        y -= 1;
                        break;
                }
            }
        }

        // 배열 출력
        for (int i = 0; i < n; i++){
            for (int j = 0; j < n; j++)
                System.out.print(spiral[i][j] + "   ");
            System.out.println();
        }


    }
}
