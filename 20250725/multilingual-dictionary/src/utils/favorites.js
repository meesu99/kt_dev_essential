const FAVORITES_KEY = 'dictionary-favorites';

// 즐겨찾기 목록 가져오기
export function getFavorites() {
  if (typeof window === 'undefined') return [];
  
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
}

// 단어를 즐겨찾기에 추가
export function addToFavorites(word, language) {
  if (typeof window === 'undefined') return false;
  
  try {
    const favorites = getFavorites();
    const wordWithId = {
      ...word,
      id: `${language}-${word.word}-${Date.now()}`,
      language,
      addedAt: new Date().toISOString()
    };
    
    // 중복 확인
    const exists = favorites.some(fav => 
      fav.word === word.word && fav.language === language
    );
    
    if (!exists) {
      favorites.push(wordWithId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
}

// 즐겨찾기에서 단어 제거
export function removeFromFavorites(wordId) {
  if (typeof window === 'undefined') return false;
  
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== wordId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
}

// 단어가 즐겨찾기에 있는지 확인
export function isFavorite(word, language) {
  if (typeof window === 'undefined') return false;
  
  const favorites = getFavorites();
  return favorites.some(fav => 
    fav.word === word && fav.language === language
  );
}

// 언어별 즐겨찾기 가져오기
export function getFavoritesByLanguage(language) {
  const favorites = getFavorites();
  return favorites.filter(fav => fav.language === language);
} 