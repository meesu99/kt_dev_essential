const DICTIONARY_STORAGE_KEY = 'custom-dictionary';

// 커스텀 사전 데이터 가져오기
export function getCustomDictionary() {
  if (typeof window === 'undefined') return { korean: {}, japanese: {} };
  
  try {
    const data = localStorage.getItem(DICTIONARY_STORAGE_KEY);
    return data ? JSON.parse(data) : { korean: {}, japanese: {} };
  } catch (error) {
    console.error('Error getting custom dictionary:', error);
    return { korean: {}, japanese: {} };
  }
}

// 커스텀 사전 데이터 저장
export function saveCustomDictionary(dictionary) {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.setItem(DICTIONARY_STORAGE_KEY, JSON.stringify(dictionary));
    return true;
  } catch (error) {
    console.error('Error saving custom dictionary:', error);
    return false;
  }
}

// 단어 추가
export function addWord(language, wordData) {
  const dictionary = getCustomDictionary();
  
  if (!dictionary[language]) {
    dictionary[language] = {};
  }
  
  dictionary[language][wordData.word] = wordData;
  return saveCustomDictionary(dictionary);
}

// 단어 수정
export function updateWord(language, oldWord, newWordData) {
  const dictionary = getCustomDictionary();
  
  if (dictionary[language] && dictionary[language][oldWord]) {
    // 단어가 바뀐 경우 기존 단어 삭제
    if (oldWord !== newWordData.word) {
      delete dictionary[language][oldWord];
    }
    
    dictionary[language][newWordData.word] = newWordData;
    return saveCustomDictionary(dictionary);
  }
  
  return false;
}

// 단어 삭제
export function deleteWord(language, word) {
  const dictionary = getCustomDictionary();
  
  if (dictionary[language] && dictionary[language][word]) {
    delete dictionary[language][word];
    return saveCustomDictionary(dictionary);
  }
  
  return false;
}

// 모든 커스텀 단어 가져오기 (언어별)
export function getCustomWordsByLanguage(language) {
  const dictionary = getCustomDictionary();
  return dictionary[language] || {};
}

// 단어 존재 여부 확인
export function wordExists(language, word) {
  const dictionary = getCustomDictionary();
  return dictionary[language] && dictionary[language][word] !== undefined;
} 