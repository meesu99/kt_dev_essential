public class PrintArray {
    public static void main(String[] args) {
        String [] arr = {"자바는", " ", "재미있다~", "\n", "다음은", " ", "Spring!"};
        printArray(arr);
    }
    public static void printArray(String [] arr){
        for (String v : arr) System.out.print(v + " ");
    }
}
