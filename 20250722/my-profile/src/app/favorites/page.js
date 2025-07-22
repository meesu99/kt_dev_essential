import FavoriteList from '../../components/FavoriteList';

export default function Favorites() {
  // 새로운 데이터 구조로 변경
  const hobbies = [
    { id: 1, title: '야구', description: '롯데 자이언츠 팬입니다!', icon: '⚾' },
    { id: 2, title: '커피', description: '하루 3잔은 기본이에요.', icon: '☕' },
    { id: 3, title: '게임', description: '스팀 게임과 모바일 게임을 즐겨요', icon: '🎮' },
    { id: 4, title: '독서', description: '기술서적과 소설 읽기를 좋아해요', icon: '📚' }
  ];

  const music = [
    { id: 1, title: 'IU - Through the Night', description: '감성적인 발라드의 대표곡', icon: '🎵' },
    { id: 2, title: 'BTS - Dynamite', description: '신나는 K-POP 댄스곡', icon: '💃' },
    { id: 3, title: 'Ed Sheeran - Perfect', description: '완벽한 러브송', icon: '💕' },
    { id: 4, title: '볼빨간사춘기 - 썸 탈꺼야', description: '귀여운 K-POP 곡', icon: '🎶' }
  ];

  const books = [
    { id: 1, title: '클린 코드', description: '로버트 C. 마틴 저 - 개발자 필독서', icon: '📖' },
    { id: 2, title: '자바스크립트 Deep Dive', description: '이웅모 저 - JS 심화 학습서', icon: '📘' },
    { id: 3, title: '리액트를 다루는 기술', description: '김민준 저 - React 실전 가이드', icon: '⚛️' },
    { id: 4, title: 'Node.js 프로그래밍', description: '윤인성 저 - 모던 웹 개발', icon: '📗' }
  ];

  const food = [
    { id: 1, title: '피자', description: '페퍼로니 피자가 최고!', icon: '🍕' },
    { id: 2, title: '라면', description: '신라면과 불닭볶음면', icon: '🍜' },
    { id: 3, title: '치킨', description: '바삭한 후라이드 치킨', icon: '🍗' },
    { id: 4, title: '케이크', description: '티라미수와 치즈케이크', icon: '🍰' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          💝 내가 좋아하는 것들
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          저의 관심사와 취향을 소개합니다
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </div>
      </div>
      
      <div>
        <FavoriteList 
          title="취미" 
          items={hobbies} 
          icon="🎯"
          columns="repeat(auto-fit, minmax(300px, 1fr))"
        />

        <FavoriteList 
          title="음악" 
          items={music} 
          icon="🎵"
          columns="repeat(auto-fit, minmax(300px, 1fr))"
        />

        <FavoriteList 
          title="책" 
          items={books} 
          icon="📚"
          columns="repeat(auto-fit, minmax(300px, 1fr))"
        />

        <FavoriteList 
          title="음식" 
          items={food} 
          icon="🍴"
          columns="repeat(auto-fit, minmax(300px, 1fr))"
        />
      </div>

      <div className="mt-20 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl text-center border border-blue-200 shadow-xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 text-6xl">🎵</div>
          <div className="absolute top-4 right-4 text-6xl">📚</div>
          <div className="absolute bottom-4 left-4 text-6xl">🍕</div>
          <div className="absolute bottom-4 right-4 text-6xl">⚾</div>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-primary text-2xl font-bold mb-6 flex items-center justify-center gap-3">
            <span className="animate-bounce">🤝</span>
            함께 하고 싶어요!
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
            이런 것들을 좋아하는 분들과 대화하고 싶습니다.<br />
            <span className="font-semibold text-primary">공통 관심사</span>가 있다면 언제든 연락해주세요! 
          </p>
          <div className="mt-6 flex justify-center gap-2">
            {['💬', '📧', '🤗'].map((emoji, index) => (
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
      </div>
    </div>
  );
} 