public class ArrayPractice3 {
    public static void main(String[] args) {
        // 점수 배열 평균 구하기
        int[] scores = {80, 90, 75, 88, 92};
        int sum = 0;
        for (int s : scores) sum += s;

        System.out.println("평균: " + (sum / (double)scores.length));

        
        // 최대 최소값 출력하기
        int[] values = {5, 3, 9, 1, 6};
        int max = values[0], min = values[0];
        for (int v : values) {
            if (v > max) max = v;
            if (v < min) min = v;
        }
        System.out.println("최고: " + max + ", 최저: " + min);


        // 문자열 배열 검색
        String[] langs = {"Java", "Python", "C++", "JavaScript"};
        String target = "JavaScript";
        boolean found = false;

        for (String v : langs) if (v == target) found = true;
        System.out.print("검색 문자 \"" + target + "\"에 해당하는 파일이 ");
        if (found)  System.out.println("있습니다.");
        else        System.out.println("없습니다.");
        
        

    }
}
