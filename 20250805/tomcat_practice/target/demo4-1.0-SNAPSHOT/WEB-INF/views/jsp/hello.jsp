<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello Spring MVC</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            background-color: rgba(255,255,255,0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        h1 { text-align: center; font-size: 2.5em; }
        .message-box {
            background-color: rgba(255,255,255,0.2);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #ff6b6b;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .back-link:hover { background-color: #ff5252; }
    </style>
</head>
<body>
    <div class="container">
        <h1>👋 Hello Spring MVC!</h1>

        <div class="message-box">
            <h3>📧 메시지:</h3>
            <p style="font-size: 20px;">${message}</p>
        </div>

        <div class="message-box">
            <h3>⏰ 현재 시간:</h3>
            <p>${currentTime}</p>
        </div>

        <div class="message-box">
            <h3>⏰ 현재 요일:</h3>
            <p>${currentDate}</p>
        </div>

        <div class="message-box">
            <h3>🔍 처리 과정:</h3>
            <ol>
                <li>/hello 요청이 들어왔습니다</li>
                <li>DispatcherServlet이 HelloController로 전달했습니다</li>
                <li>MessageService에서 메시지를 생성했습니다</li>
                <li>Model에 데이터를 담아 hello.jsp로 전달했습니다</li>
                <li>이 페이지가 완성되었습니다! 🎉</li>
            </ol>
        </div>

        <a href="/" class="back-link">🏠 홈으로 돌아가기</a>
    </div>
</body>
</html>
