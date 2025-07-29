import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class MultiExcept {
    public static void main(String[] args) {
        try{
            BufferedReader br = new BufferedReader(new FileReader("data.txt"));
            String line = br.readLine();
            int num = Integer.parseInt(line);
            System.out.println("Number: " + num);
            br.close();
        } catch (IOException e) {
            System.err.println("파일을 읽는 중 오류가 발생했습니다.");
        } catch (NumberFormatException e) {
            System.err.println("파일의 내용이 숫자가 아닙니다: " + e.getMessage());
        } finally {
            System.out.println("파일 처리 완료");
        }
    }
    
}
