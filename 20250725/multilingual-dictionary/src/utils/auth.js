const AUTH_KEY = 'dictionary-auth';

// 관리자 계정 정보 (실제 앱에서는 서버에서 관리해야 함)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  role: 'admin'
};

const USER_CREDENTIALS = [
  { 
    username: 'user1', 
    password: 'user123', 
    role: 'user',
    name: '사용자1'
  },
  {
    username: 'user2',
    password: 'user456',
    role: 'user', 
    name: '사용자2'
  }
];

// 로그인
export function login(username, password) {
  if (typeof window === 'undefined') return null;

  // 관리자 계정 확인
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const user = {
      username: ADMIN_CREDENTIALS.username,
      role: ADMIN_CREDENTIALS.role,
      name: '관리자',
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  }

  // 일반 사용자 계정 확인
  const user = USER_CREDENTIALS.find(u => u.username === username && u.password === password);
  if (user) {
    const userWithLoginTime = {
      ...user,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(userWithLoginTime));
    return userWithLoginTime;
  }

  return null;
}

// 로그아웃
export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
}

// 현재 사용자 정보 가져오기
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;

  try {
    const userStr = localStorage.getItem(AUTH_KEY);
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// 로그인 상태 확인
export function isAuthenticated() {
  return getCurrentUser() !== null;
}

// 관리자 권한 확인
export function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

// 사용자 권한 확인
export function hasPermission(requiredRole) {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (requiredRole === 'admin') {
    return user.role === 'admin';
  }
  
  return user.role === 'admin' || user.role === 'user';
} 