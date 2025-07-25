import koreanDictionary from '../data/korean-dictionary.json';
import japaneseDictionary from '../data/japanese-dictionary.json';
import { getCustomWordsByLanguage } from './dictionaryManager';

// 영어 사전 API 호출
export async function searchEnglishWord(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
    
    if (!response.ok) {
      throw new Error('Word not found');
    }
    
    const data = await response.json();
    const entry = data[0];
    
    return {
      word: entry.word,
      partOfSpeech: entry.meanings[0]?.partOfSpeech || 'unknown',
      definition: entry.meanings[0]?.definitions[0]?.definition || 'Definition not available',
      example: entry.meanings[0]?.definitions[0]?.example || 'No example available',
      pronunciation: entry.phonetic || entry.phonetics[0]?.text || 'Pronunciation not available'
    };
  } catch (error) {
    console.error('Error fetching English word:', error);
    return null;
  }
}

// 한국어 사전 검색 (기본 + 커스텀)
export function searchKoreanWord(word) {
  // 먼저 기본 사전에서 검색
  let result = koreanDictionary[word];
  if (result) {
    return result;
  }
  
  // 커스텀 사전에서 검색
  const customWords = getCustomWordsByLanguage('korean');
  result = customWords[word];
  if (result) {
    return result;
  }
  
  return null;
}

// 일본어 사전 검색 (기본 + 커스텀)
export function searchJapaneseWord(word) {
  // 먼저 기본 사전에서 검색
  let result = japaneseDictionary[word];
  if (result) {
    return result;
  }
  
  // 커스텀 사전에서 검색
  const customWords = getCustomWordsByLanguage('japanese');
  result = customWords[word];
  if (result) {
    return result;
  }
  
  return null;
}

// 언어별 사전 검색 통합 함수
export async function searchWord(word, language) {
  switch (language) {
    case 'english':
      return await searchEnglishWord(word);
    case 'korean':
      return searchKoreanWord(word);
    case 'japanese':
      return searchJapaneseWord(word);
    default:
      return null;
  }
} 