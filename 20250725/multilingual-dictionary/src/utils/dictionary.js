import koreanDictionary from '../data/korean-dictionary.json';
import japaneseDictionary from '../data/japanese-dictionary.json';

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

// 한국어 사전 검색
export function searchKoreanWord(word) {
  const result = koreanDictionary[word];
  if (result) {
    return result;
  }
  return null;
}

// 일본어 사전 검색
export function searchJapaneseWord(word) {
  const result = japaneseDictionary[word];
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