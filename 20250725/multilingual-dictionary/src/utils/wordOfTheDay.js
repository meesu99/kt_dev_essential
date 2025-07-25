import wordOfTheDayData from '../data/word-of-the-day.json';

// 날짜를 기준으로 오늘의 단어 가져오기
export function getWordOfTheDay(language) {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  
  const words = wordOfTheDayData[language] || [];
  if (words.length === 0) return null;
  
  const wordIndex = dayOfYear % words.length;
  return words[wordIndex];
}

// 퀴즈용 오답 선택지 생성
export function generateQuizOptions(correctAnswer, language, count = 3) {
  const allWords = wordOfTheDayData[language] || [];
  const wrongAnswers = allWords
    .filter(word => word.word !== correctAnswer.word)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map(word => word.meaning);
  
  return wrongAnswers;
}

// 모든 언어의 오늘의 단어 가져오기
export function getAllWordsOfTheDay() {
  return {
    english: getWordOfTheDay('english'),
    korean: getWordOfTheDay('korean'),
    japanese: getWordOfTheDay('japanese')
  };
} 