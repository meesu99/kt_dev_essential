public class ArrayPractice2 {
    public static void main(String[] args) {
        // 1. 배열 뒤집기
        int [] arr = {1, 2, 3, 4, 5};
        for (int v : arrayReverse(arr)) System.out.print(v + " ");


        // 2. 부분합 구하기
        int [] nums = {2, 4, 6, 8, 10};
        int sum = 0;
        for (int i = 0; i < 3; sum += nums[i++]);
        System.out.println("\n\n" + sum);


        // 3. 중복 제거 & 정렬
        int[] seq = {3, 1, 3, 2, 1};
        System.out.println();

        for(int v : arrayUnique(seq)) System.out.print(v + " ");
    }


    // 배열 원소 뒤집기
    public static int[] arrayReverse(int[] arr) {
        for (int i = 0; i < arr.length /2 ; i++) {
            int temp = arr[i];
            arr[i] = arr[arr.length - (1 + i)];
            arr[arr.length - (1 + i)] = temp;
        }
        return arr;
    }


    // 배열을 중복 제거 & 정렬
    public static int[] arrayUnique(int[] arr) {
        // 중복 없이 오름차순 정렬할 배열
        int [] unique = new int[arr.length];
        // 중복 없는 원소의 수
        int length = 0;

        for (int i = 0, count= 0, isDup = 0; i < 10; i++){
            for (int j = 0; j < arr.length; j++){
                if (arr[j] == i) {
                    if (isDup == 0) {   // 중복이 없다면 unique에 추가.
                        unique[length++] = i;
                        isDup = 1;
                    }
                    count++;
                }
            }
            isDup = 0;

            // 입력받은 배열의 길이 이상이면 break;
            if (arr.length <= count)    break;
        }

        // 갯수에 맞춰 넣기.
        int [] result = new int[length];

        // 필요한 길이만큼 생성.
        for (int i = 0; i < length; i++){
            result[i] = unique[i];
        }
        return  result;
    }
}