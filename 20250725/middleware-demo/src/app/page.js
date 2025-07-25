'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const authToken = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
    if (authToken) {
      setIsLoggedIn(true);
      const tokenValue = authToken.split('=')[1];
      const user = tokenValue.replace('_token', '');
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsLoggedIn(false);
    setUsername('');
    alert('로그아웃 되었습니다.');
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '50px auto', 
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
        🔒 미들웨어 데모
      </h1>
      
      <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#666' }}>
        Next.js 미들웨어를 사용한 인증 시스템 데모입니다.
      </p>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px' 
      }}>
        {isLoggedIn ? (
          <div>
            <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
              ✅ <strong>{username}</strong>님으로 로그인되어 있습니다.
            </p>
            <button 
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
              ❌ 현재 로그인되어 있지 않습니다.
            </p>
            <Link 
              href="/login"
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#0070f3',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              로그인하기
            </Link>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <Link 
          href="/protected"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        >
          🔐 보호된 페이지로 이동
        </Link>
        
        <Link 
          href="/login"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#17a2b8',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        >
          📝 로그인 페이지로 이동
        </Link>
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#e9ecef', 
        borderRadius: '8px' 
      }}>
        <h3>📋 테스트 방법</h3>
        <ol style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <li>로그인하지 않은 상태에서 "보호된 페이지로 이동" 클릭</li>
          <li>자동으로 로그인 페이지로 리다이렉트됨</li>
          <li>아무 아이디/비밀번호로 로그인</li>
          <li>보호된 페이지에 접근 가능</li>
          <li>로그아웃 후 다시 테스트</li>
        </ol>
      </div>
    </div>
  );
}
