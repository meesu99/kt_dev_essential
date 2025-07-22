'use client';

export default function ProfileCard({ 
  name = "웹 개발자",
  title = "Frontend Developer", 
  avatar = "👨‍💻",
  contactInfo = [],
  tips = []
}) {
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e9ecef'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '25px'
  };

  const avatarStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#0070f3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 15px auto',
    fontSize: '40px',
    color: 'white'
  };

  const nameStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px'
  };

  const titleStyle = {
    color: '#666',
    fontSize: '16px',
    marginBottom: '15px'
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    transition: 'background-color 0.2s'
  };

  const iconStyle = {
    fontSize: '20px',
    marginRight: '12px',
    width: '24px',
    textAlign: 'center'
  };

  // 기본값 설정
  const defaultContactInfo = [
    {
      icon: '📧',
      label: '이메일',
      value: 'example@email.com',
      link: 'mailto:example@email.com'
    },
    {
      icon: '💬',
      label: '카카오톡',
      value: '@my_kakao_id',
      link: '#'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'github.com/myusername',
      link: 'https://github.com/myusername'
    },
    {
      icon: '📍',
      label: '위치',
      value: '서울, 대한민국',
      link: null
    }
  ];

  const defaultTips = [
    '프로젝트 협업 제안 환영합니다!',
    '기술적인 질문이나 조언 요청 가능합니다.',
    '보통 24시간 내에 답변드려요.',
    '스팸이나 광고성 메시지는 삼가해 주세요.'
  ];

  // props가 비어있으면 기본값 사용
  const finalContactInfo = contactInfo.length > 0 ? contactInfo : defaultContactInfo;
  const finalTips = tips.length > 0 ? tips : defaultTips;

  const tipsStyle = {
    marginTop: '25px',
    padding: '15px',
    backgroundColor: '#f0f8ff',
    borderRadius: '8px',
    borderLeft: '4px solid #0070f3'
  };

  const tipsHeaderStyle = {
    color: '#0070f3',
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '14px'
  };

  return (
    <div style={cardStyle}>
      {/* 프로필 헤더 */}
      <div style={headerStyle}>
        <div style={avatarStyle}>
          {avatar}
        </div>
        <h2 style={nameStyle}>{name}</h2>
        <p style={titleStyle}>{title}</p>
      </div>

      {/* 연락처 정보 */}
      <div>
        <h3 style={{ color: '#0070f3', marginBottom: '15px', fontSize: '18px' }}>
          📞 연락처 정보
        </h3>
        {finalContactInfo.map((item, index) => (
          <div 
            key={index} 
            style={contactItemStyle}
            onMouseOver={(e) => e.target.closest('div').style.backgroundColor = '#e3f2fd'}
            onMouseOut={(e) => e.target.closest('div').style.backgroundColor = '#f8f9fa'}
          >
            <span style={iconStyle}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <strong style={{ color: '#333', display: 'block' }}>{item.label}</strong>
              {item.link ? (
                <a 
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  style={{ 
                    color: '#0070f3', 
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                  {item.value}
                </a>
              ) : (
                <span style={{ color: '#666', fontSize: '14px' }}>{item.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 연락 시 참고사항 */}
      <div style={tipsStyle}>
        <div style={tipsHeaderStyle}>💡 연락 시 참고사항</div>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '16px', 
          color: '#666', 
          fontSize: '13px',
          lineHeight: '1.5'
        }}>
          {finalTips.map((tip, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 