'use client';

import { useState, useEffect } from 'react';

export default function WordEditor({ 
  isOpen, 
  onClose, 
  onSave, 
  word = null, 
  language = 'korean',
  mode = 'add' // 'add' or 'edit'
}) {
  const [formData, setFormData] = useState({
    word: '',
    partOfSpeech: '',
    definition: '',
    meaning: '',
    example: '',
    pronunciation: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (word && mode === 'edit') {
      setFormData({
        word: word.word || '',
        partOfSpeech: word.partOfSpeech || '',
        definition: word.definition || word.meaning || '',
        meaning: word.meaning || word.definition || '',
        example: word.example || '',
        pronunciation: word.pronunciation || ''
      });
    } else {
      setFormData({
        word: '',
        partOfSpeech: '',
        definition: '',
        meaning: '',
        example: '',
        pronunciation: ''
      });
    }
    setErrors({});
  }, [word, mode, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 에러 클리어
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.word.trim()) {
      newErrors.word = '단어는 필수입니다.';
    }
    
    if (!formData.partOfSpeech.trim()) {
      newErrors.partOfSpeech = '품사는 필수입니다.';
    }
    
    const meaningField = language === 'english' ? 'definition' : 'meaning';
    if (!formData[meaningField].trim()) {
      newErrors[meaningField] = '뜻은 필수입니다.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const wordData = {
        word: formData.word.trim(),
        partOfSpeech: formData.partOfSpeech.trim(),
        [language === 'english' ? 'definition' : 'meaning']: formData[language === 'english' ? 'definition' : 'meaning'].trim(),
        example: formData.example.trim(),
        pronunciation: formData.pronunciation.trim()
      };
      
      await onSave(wordData);
      onClose();
    } catch (error) {
      console.error('Error saving word:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      word: '',
      partOfSpeech: '',
      definition: '',
      meaning: '',
      example: '',
      pronunciation: ''
    });
    setErrors({});
    onClose();
  };

  const getLanguageInfo = () => {
    switch (language) {
      case 'korean':
        return { label: '한국어', flag: '🇰🇷' };
      case 'japanese':
        return { label: '일본어', flag: '🇯🇵' };
      case 'english':
        return { label: '영어', flag: '🇺🇸' };
      default:
        return { label: '언어', flag: '📖' };
    }
  };

  const langInfo = getLanguageInfo();
  const meaningField = language === 'english' ? 'definition' : 'meaning';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <span>{langInfo.flag}</span>
              <span>
                {mode === 'add' ? '단어 추가' : '단어 수정'} ({langInfo.label})
              </span>
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-1">
              단어 *
            </label>
            <input
              type="text"
              id="word"
              name="word"
              value={formData.word}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.word ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="단어를 입력하세요"
            />
            {errors.word && <p className="text-red-500 text-sm mt-1">{errors.word}</p>}
          </div>

          <div>
            <label htmlFor="partOfSpeech" className="block text-sm font-medium text-gray-700 mb-1">
              품사 *
            </label>
            <input
              type="text"
              id="partOfSpeech"
              name="partOfSpeech"
              value={formData.partOfSpeech}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.partOfSpeech ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="예: 명사, 동사, 형용사"
            />
            {errors.partOfSpeech && <p className="text-red-500 text-sm mt-1">{errors.partOfSpeech}</p>}
          </div>

          <div>
            <label htmlFor={meaningField} className="block text-sm font-medium text-gray-700 mb-1">
              뜻 *
            </label>
            <textarea
              id={meaningField}
              name={meaningField}
              value={formData[meaningField]}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[meaningField] ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="단어의 뜻을 입력하세요"
            />
            {errors[meaningField] && <p className="text-red-500 text-sm mt-1">{errors[meaningField]}</p>}
          </div>

          <div>
            <label htmlFor="example" className="block text-sm font-medium text-gray-700 mb-1">
              예문
            </label>
            <textarea
              id="example"
              name="example"
              value={formData.example}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예문을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="pronunciation" className="block text-sm font-medium text-gray-700 mb-1">
              발음
            </label>
            <input
              type="text"
              id="pronunciation"
              name="pronunciation"
              value={formData.pronunciation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="발음을 입력하세요"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '저장 중...' : mode === 'add' ? '추가' : '수정'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 