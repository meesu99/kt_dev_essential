'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin } from '../../utils/auth';
import { 
  getCustomWordsByLanguage, 
  addWord, 
  updateWord, 
  deleteWord 
} from '../../utils/dictionaryManager';
import WordEditor from '../../components/WordEditor';
import WordCard from '../../components/WordCard';

export default function AdminPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('korean');
  const [customWords, setCustomWords] = useState({});
  const [showEditor, setShowEditor] = useState(false);
  const [editorMode, setEditorMode] = useState('add');
  const [editingWord, setEditingWord] = useState(null);
  const [loading, setLoading] = useState(true);

  const languages = [
    { code: 'korean', label: '한국어', flag: '🇰🇷' },
    { code: 'japanese', label: '일본어', flag: '🇯🇵' }
  ];

  useEffect(() => {
    // 관리자 권한 확인
    if (!isAdmin()) {
      router.push('/');
      return;
    }

    loadCustomWords();
  }, [router]);

  const loadCustomWords = () => {
    setLoading(true);
    try {
      const words = {
        korean: getCustomWordsByLanguage('korean'),
        japanese: getCustomWordsByLanguage('japanese')
      };
      setCustomWords(words);
    } catch (error) {
      console.error('Error loading custom words:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWord = () => {
    setEditorMode('add');
    setEditingWord(null);
    setShowEditor(true);
  };

  const handleEditWord = (word) => {
    setEditorMode('edit');
    setEditingWord(word);
    setShowEditor(true);
  };

  const handleDeleteWord = (word) => {
    if (window.confirm(`"${word.word}" 단어를 삭제하시겠습니까?`)) {
      const success = deleteWord(selectedLanguage, word.word);
      if (success) {
        loadCustomWords();
        alert('단어가 삭제되었습니다.');
      } else {
        alert('단어 삭제에 실패했습니다.');
      }
    }
  };

  const handleSaveWord = async (wordData) => {
    let success = false;
    
    try {
      if (editorMode === 'add') {
        success = addWord(selectedLanguage, wordData);
        if (success) {
          alert('단어가 추가되었습니다.');
        } else {
          alert('단어 추가에 실패했습니다.');
        }
      } else if (editorMode === 'edit' && editingWord) {
        success = updateWord(selectedLanguage, editingWord.word, wordData);
        if (success) {
          alert('단어가 수정되었습니다.');
        } else {
          alert('단어 수정에 실패했습니다.');
        }
      }
      
      if (success) {
        loadCustomWords();
      }
    } catch (error) {
      console.error('Error saving word:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">접근 권한이 없습니다</h1>
          <p className="text-gray-600">관리자만 접근할 수 있는 페이지입니다.</p>
        </div>
      </div>
    );
  }

  const currentLanguageWords = Object.values(customWords[selectedLanguage] || {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            사전 관리 ⚙️
          </h1>
          <p className="text-gray-600">
            사전에 새로운 단어를 추가하거나 기존 단어를 수정/삭제할 수 있습니다.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            {/* 언어 선택 */}
            <div className="flex space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    selectedLanguage === lang.code
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>

            {/* 단어 추가 버튼 */}
            <button
              onClick={handleAddWord}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>➕</span>
              <span>단어 추가</span>
            </button>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            커스텀 {languages.find(l => l.code === selectedLanguage)?.label} 단어: {currentLanguageWords.length}개
          </div>
        </div>

        {/* 단어 목록 */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            불러오는 중...
          </div>
        ) : currentLanguageWords.length > 0 ? (
          <div className="space-y-4">
            {currentLanguageWords.map((word, index) => (
              <div key={`${word.word}-${index}`} className="relative">
                <WordCard
                  word={word}
                  language={selectedLanguage}
                  showFavoriteButton={false}
                />
                
                {/* 관리 버튼들 */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handleEditWord(word)}
                    className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                    title="수정"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteWord(word)}
                    className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    title="삭제"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              아직 추가된 단어가 없습니다
            </h3>
            <p className="text-gray-600 mb-4">
              새로운 단어를 추가해보세요.
            </p>
            <button
              onClick={handleAddWord}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              첫 번째 단어 추가하기
            </button>
          </div>
        )}
      </div>

      {/* 단어 에디터 모달 */}
      <WordEditor
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        onSave={handleSaveWord}
        word={editingWord}
        language={selectedLanguage}
        mode={editorMode}
      />
    </div>
  );
} 