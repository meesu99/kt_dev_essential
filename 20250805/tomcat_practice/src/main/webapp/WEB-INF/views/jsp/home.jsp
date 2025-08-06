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
            background-color: #f0f8ff;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        h1 { color: #2e8b57; }
        .navigation { margin: 20px 0; }
        .navigation a {
            display: inline-block;
            margin: 10px;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .navigation a:hover { background-color: #45a049; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌱 ${title}</h1>
        <p style="font-size: 18px;">${message}</p>

        <div class="navigation">
            <h3>페이지 둘러보기:</h3>
            <a href="/hello">👋 인사하기</a>
            <a href="/about">📖 소개 보기</a>
        </div>

        <hr>
        <p><strong>💡 학습 포인트:</strong></p>
        <ul>
            <li>이 페이지는 "/" 경로로 접근했습니다</li>
            <li>HelloController의 home() 메서드가 처리했습니다</li>
            <li>Model을 통해 제목과 메시지를 전달받았습니다</li>
        </ul>
    </div>
</body>
</html>
