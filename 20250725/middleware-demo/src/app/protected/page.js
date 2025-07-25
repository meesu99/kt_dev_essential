'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const authToken = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
    if (authToken) {
      setIsLoggedIn(true);
      // 토큰에서 사용자명 추출 (예: "user_token" -> "user")
      const tokenValue = authToken.split('=')[1];
      const user = tokenValue.replace('_token', '');
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    // 쿠키 삭제
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    alert('로그아웃 되었습니다.');
    router.push('/login');
  };

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <p>로그인이 필요합니다. 잠시만 기다려주세요...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '50px auto', 
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>🔐 보호된 페이지</h1>
      <p style={{ fontSize: '18px', margin: '20px 0' }}>
        환영합니다, <strong>{username}</strong>님!
      </p>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        이 페이지는 로그인한 사용자만 볼 수 있습니다.
      </p>
      
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => router.push('/')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          홈으로 가기
        </button>
        
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
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
    </div>
  );
}