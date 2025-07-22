'use client';

import { useState } from 'react';
import ProfileCard from '../../components/ProfileCard';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제로는 서버로 데이터를 전송하겠지만, 여기서는 시뮬레이션
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };



  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          📞 연락처
        </h1>
        <p className="text-xl text-gray-600">언제든지 편하게 연락주세요!</p>
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 프로필 카드 */}
        <div className="animate-slide-up">
          <ProfileCard 
            name="김개발"
            title="Frontend Developer & React Enthusiast"
            avatar="🚀"
            contactInfo={[
              {
                icon: '📧',
                label: '이메일',
                value: 'kim.developer@email.com',
                link: 'mailto:kim.developer@email.com'
              },
              {
                icon: '💬',
                label: '카카오톡',
                value: '@kim_dev_2024',
                link: '#'
              },
              {
                icon: '🐙',
                label: 'GitHub',
                value: 'github.com/kim-developer',
                link: 'https://github.com/kim-developer'
              },
              {
                icon: '📍',
                label: '위치',
                value: '서울특별시, 대한민국',
                link: null
              },
              {
                icon: '💼',
                label: 'LinkedIn',
                value: 'linkedin.com/in/kim-developer',
                link: 'https://linkedin.com/in/kim-developer'
              }
            ]}
            tips={[
              '새로운 기술 스택에 대한 토론 환영합니다! 💡',
              '오픈소스 프로젝트 기여와 협업을 좋아해요 🤝',
              '보통 하루 안에 답변드리며, 주말에도 확인합니다 ⚡',
              '코드 리뷰나 기술 멘토링 요청도 언제든 연락주세요 📚',
              '스팸이나 광고성 메시지는 정중히 거절합니다 🚫'
            ]}
          />
        </div>

        {/* 메시지 폼 */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✉️</span>
              <h2 className="text-2xl font-bold text-primary">메시지 보내기</h2>
            </div>
            
            {isSubmitted ? (
              <div className="p-8 bg-green-50 border border-green-200 rounded-xl text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-800 mb-2">메시지가 전송되었습니다!</h3>
                <p className="text-green-700">빠른 시일 내에 답변드리겠습니다.</p>
                <div className="mt-4 flex justify-center gap-2">
                  {['✨', '📧', '💝'].map((emoji, index) => (
                    <span 
                      key={index}
                      className="text-2xl animate-bounce"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="이름을 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="이메일을 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="subject">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="메시지 제목을 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="message">
                    메시지 <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400 min-h-[120px] resize-y"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="메시지 내용을 입력해주세요"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full btn-primary text-lg py-4 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>메시지 보내기</span>
                    <span className="text-xl">🚀</span>
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 