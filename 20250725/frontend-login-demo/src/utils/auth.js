// 쿠키에서 값을 가져오는 함수
export const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// 인증 상태 확인 함수
export const isAuthenticated = () => {
  const authCookie = getCookie('auth');
  const expirationCookie = getCookie('authExpiration');
  
  if (!authCookie || authCookie !== 'authenticated') {
    return false;
  }
  
  if (!expirationCookie) {
    return false;
  }
  
  // 만료 시간 체크
  const expirationTime = new Date(expirationCookie);
  const currentTime = new Date();
  
  if (currentTime >= expirationTime) {
    // 만료된 경우 쿠키 삭제
    clearAuthCookies();
    return false;
  }
  
  return true;
};

// 쿠키 삭제 함수
export const clearAuthCookies = () => {
  if (typeof document === 'undefined') return;
  
  document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'authExpiration=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

// 로그아웃 함수
export const logout = (redirectPath = '/login') => {
  clearAuthCookies();
  alert('로그아웃되었습니다.');
  window.location.href = redirectPath;
};

// 남은 시간 계산 함수
export const getRemainingTime = () => {
  const expirationCookie = getCookie('authExpiration');
  
  if (!expirationCookie) {
    return null;
  }
  
  const expirationTime = new Date(expirationCookie);
  const currentTime = new Date();
  const remainingMs = expirationTime - currentTime;
  
  if (remainingMs <= 0) {
    return null;
  }
  
  const remainingMinutes = Math.floor(remainingMs / (1000 * 60));
  const remainingSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
  
  return {
    totalMs: remainingMs,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
    formatted: `${remainingMinutes}분 ${remainingSeconds}초`
  };
}; 