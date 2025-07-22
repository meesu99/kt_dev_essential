export default function About() {
  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          👋 나에 대해
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
      </div>
      
      <div className="space-y-12">
        {/* Introduction */}
        <section className="card group hover:shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl group-hover:animate-bounce">👋</span>
            <h2 className="text-2xl font-bold text-primary">안녕하세요!</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            저는 웹 개발에 관심이 많은 개발자입니다. Next.js와 React를 사용해서 
            사용자 친화적인 웹 애플리케이션을 만드는 것을 좋아합니다.
          </p>
        </section>

        {/* Interests */}
        <section className="card group hover:shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl group-hover:animate-bounce">🎯</span>
            <h2 className="text-2xl font-bold text-primary">관심 분야</h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            {[
                             '프론트엔드 개발 (React, Next.js, JavaScript)',
              '사용자 경험(UX) 디자인',
              '웹 성능 최적화',
              '모바일 반응형 웹 개발'
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 group/item">
                <span className="w-2 h-2 bg-primary rounded-full group-hover/item:animate-ping"></span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="card group hover:shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl group-hover:animate-bounce">🛠️</span>
            <h2 className="text-2xl font-bold text-primary">기술 스택</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {['JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'Node.js', 'Git'].map((skill, index) => (
              <span 
                key={skill}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-blue-200 hover:from-primary hover:to-blue-600 hover:text-white transition-all duration-200 transform hover:scale-105 shadow-md animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Currently Learning */}
        <section className="card group hover:shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl group-hover:animate-bounce">📚</span>
            <h2 className="text-2xl font-bold text-primary">학습 중</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            현재는 React의 useState, useEffect 등의 훅들을 깊이 있게 학습하고 있으며,
            <span className="font-semibold text-primary"> TypeScript</span>와 
            <span className="font-semibold text-primary"> 백엔드 기술</span>들도 공부하고 있습니다.
          </p>
        </section>

        {/* Goals */}
        <section className="card group hover:shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl group-hover:animate-bounce">🎯</span>
            <h2 className="text-2xl font-bold text-primary">목표</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            사용자가 정말 필요로 하는 서비스를 만드는 개발자가 되는 것이 목표입니다.
            깔끔하고 직관적인 인터페이스로 복잡한 문제를 간단하게 해결하는 
            애플리케이션을 개발하고 싶습니다.
          </p>
        </section>
      </div>
    </div>
  );
} 