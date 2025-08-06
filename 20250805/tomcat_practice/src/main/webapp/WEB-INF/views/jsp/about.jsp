<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 50px;
            background-color: #2c3e50;
            color: #ecf0f1;
        }
        .container {
            max-width: 700px;
            margin: 0 auto;
            padding: 30px;
            background-color: #34495e;
            border-radius: 10px;
        }
        h1 { color: #3498db; }
        .info-section {
            background-color: #2c3e50;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #3498db;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📖 ${title}</h1>
        <p style="font-size: 18px;">${description}</p>

        <div class="info-section">
            <h3>🎯 학습 목표</h3>
            <ul>
                <li>Spring MVC의 기본 구조 이해</li>
                <li>DispatcherServlet의 역할 파악</li>
                <li>Controller-Service-View 흐름 체험</li>
                <li>JavaConfig 설정 방법 습득</li>
            </ul>
        </div>

        <div class="info-section">
            <h3>🏗️ 프로젝트 구조</h3>
            <pre>
src/main/java/
├── config/WebConfig.java          (설정)
├── controller/HelloController.java (요청 처리)
└── service/MessageService.java    (비즈니스 로직)

src/main/webapp/WEB-INF/views/
├── home.jsp    (홈페이지)
├── hello.jsp   (인사 페이지)
└── about.jsp   (이 페이지!)
            </pre>
        </div>

        <a href="/" style="
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        ">🏠 홈으로 돌아가기</a>
    </div>
</body>
</html>
