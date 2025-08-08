package com.example.controller;

// controller/StudentController.java
@Controller
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // 학생 목록 페이지
    @GetMapping
    public String studentList(Model model) {
        model.addAttribute("students", studentService.getAllStudents());
        return "students/list";
    }

    // 트랜잭션 테스트 페이지
    @GetMapping("/test")
    public String testPage() {
        return "students/test";
    }

    // 트랜잭션 없이 추가 (위험!)
    @PostMapping("/add-without-tx")
    public String addWithoutTransaction(RedirectAttributes redirectAttributes) {
        try {
            studentService.addStudentsWithoutTransaction();
            redirectAttributes.addFlashAttribute("message", "추가 성공");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error",
                "오류 발생: " + e.getMessage() + " (일부 데이터는 저장됨!)");
        }

        return "redirect:/students";
    }

    // 트랜잭션으로 추가 (안전!)
    @PostMapping("/add-with-tx")
    public String addWithTransaction(RedirectAttributes redirectAttributes) {
        try {
            studentService.addStudentsWithTransaction();
            redirectAttributes.addFlashAttribute("message", "추가 성공");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error",
                "오류 발생: " + e.getMessage() + " (모든 데이터 롤백됨!)");
        }

        return "redirect:/students";
    }

    // 정상 추가
    @PostMapping("/add-safely")
    public String addSafely(RedirectAttributes redirectAttributes) {
        try {
            studentService.addStudentsSafely();
            redirectAttributes.addFlashAttribute("message", "학생들이 성공적으로 추가되었습니다!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "오류 발생: " + e.getMessage());
        }

        return "redirect:/students";
    }

    // 데이터 초기화
    @PostMapping("/clear")
    public String clearData(RedirectAttributes redirectAttributes) {
        studentService.clearAllStudents();
        redirectAttributes.addFlashAttribute("message", "모든 데이터가 초기화되었습니다.");
        return "redirect:/students";
    }
}
