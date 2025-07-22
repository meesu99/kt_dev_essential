'use client';

export default function Home() {
  return (
    <div style={{
      padding: '1.25rem',
      maxWidth: '56rem',
      margin: '0 auto',
      textAlign: 'center'
    }} className="animate-fade-in">
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem'
        }} className="gradient-text">
          🌟 My Profile
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#64748b',
          lineHeight: '1.7',
          maxWidth: '32rem',
          margin: '0 auto'
        }}>
          안녕하세요! 웹 개발에 열정을 가진 개발자입니다.<br />
          Next.js와 React를 활용한 프로젝트들을 만들고 있습니다.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        <div className="card" style={{
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }} 
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            transition: 'transform 0.2s ease'
          }}>👨‍💻</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.75rem'
          }} className="text-primary">개발자 소개</h3>
          <p style={{
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            저의 개발 여정과 관심 분야, 기술 스택을 소개합니다.
          </p>
        </div>

        <div className="card" style={{
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            transition: 'transform 0.2s ease'
          }}>❤️</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.75rem'
          }} className="text-primary">좋아하는 것들</h3>
          <p style={{
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            취미, 음악, 책, 음식 등 제가 좋아하는 것들을 소개합니다.
          </p>
        </div>

        <div className="card" style={{
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            transition: 'transform 0.2s ease'
          }}>📬</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.75rem'
          }} className="text-primary">연락하기</h3>
          <p style={{
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            협업 제안이나 문의사항이 있으시면 언제든 연락주세요!
          </p>
        </div>
      </div>

      <div style={{
        marginTop: '4rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
        borderRadius: '1rem',
        border: '1px solid #bfdbfe',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }} className="text-primary">
          🚀 최근 프로젝트
        </h2>
        <p style={{
          color: '#64748b',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          현재 React와 Next.js를 학습하며 다양한 프로젝트를 진행하고 있습니다.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}>
          {['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'Git'].map((tech, index) => (
            <span 
              key={tech}
              style={{
                backgroundColor: '#0070f3',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                animationDelay: `${index * 0.1}s`
              }}
              className="animate-slide-up"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0051cc';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#0070f3';
                e.target.style.transform = 'scale(1)';
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}