'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const JOB_OPTIONS = [
  { value: 'beginner', label: '초보자', color: 'bg-gray-500' },
  { value: 'warrior', label: '전사', color: 'bg-red-500' },
  { value: 'magician', label: '마법사', color: 'bg-blue-500' },
  { value: 'archer', label: '궁수', color: 'bg-green-500' },
  { value: 'thief', label: '도적', color: 'bg-purple-500' },
  { value: 'pirate', label: '해적', color: 'bg-yellow-600' }
]

export default function Ranking() {
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingCharacter, setEditingCharacter] = useState(null)
  const [selectedJobFilter, setSelectedJobFilter] = useState('all')
  const [formData, setFormData] = useState({
    character_name: '',
    userlevel: 1,
    userjob: 'beginner'
  })
  const [editFormData, setEditFormData] = useState({
    character_name: '',
    userlevel: 1,
    userjob: 'beginner'
  })
  const [message, setMessage] = useState('')
  const [tableColumns, setTableColumns] = useState(null) // 올바른 컬럼명 저장
  const [lastUpdated, setLastUpdated] = useState(null) // 마지막 업데이트 시간
  const [refreshing, setRefreshing] = useState(false) // 새로고침 중 상태
  const router = useRouter()

  useEffect(() => {
    checkUser()
    detectTableSchema()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const detectTableSchema = async () => {
    try {
      console.log('테이블 스키마 감지 시작...')
      
      // 첫 번째: 테이블 존재 여부 확인
      const { data: tableCheck, error: tableError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)

      if (tableError) {
        console.log('테이블이 존재하지 않거나 접근 불가:', tableError.message)
        
        // 테이블 생성 시도
        if (tableError.message.includes('relation "profiles" does not exist') || 
            tableError.message.includes('does not exist')) {
          console.log('테이블을 생성하려고 시도 중...')
          await createProfilesTable()
          return
        } else {
          setMessage(`테이블 접근 오류: ${tableError.message}`)
          setLoading(false)
          return
        }
      }

      console.log('테이블이 존재함, 스키마 분석 중...')
      
      if (tableCheck && tableCheck.length > 0) {
        // 기존 데이터에서 컬럼 구조 분석
        const sampleRecord = tableCheck[0]
        console.log('기존 데이터 샘플:', sampleRecord)
        
        const detectedColumns = analyzeTableStructure(sampleRecord)
        if (detectedColumns) {
          console.log('분석된 컬럼 구조:', detectedColumns)
          setTableColumns(detectedColumns)
          fetchProfiles(detectedColumns)
          return
        }
      }

      // 빈 테이블인 경우 - 컬럼 구조를 직접 테스트
      console.log('빈 테이블, 컬럼 구조 테스트 중...')
      const possibleColumnNames = [
        { name: 'character_name', level: 'userlevel', job: 'userjob' },
        { name: 'name', level: 'level', job: 'job' },
        { name: 'character_name', level: 'user_level', job: 'user_job' },
        { name: 'characterName', level: 'userLevel', job: 'userJob' }
      ]

      for (const columns of possibleColumnNames) {
        try {
          console.log(`테스트 컬럼 조합:`, columns)
          const { error } = await supabase
            .from('profiles')
            .select(`${columns.name}, ${columns.level}, ${columns.job}`)
            .limit(1)

          if (!error) {
            console.log('성공한 컬럼 조합:', columns)
            setTableColumns(columns)
            fetchProfiles(columns)
            return
          } else {
            console.log(`실패한 컬럼 조합:`, columns, error.message)
          }
        } catch (err) {
          console.log(`컬럼 조합 테스트 예외:`, columns, err.message)
        }
      }

      // 모든 시도가 실패한 경우
      console.log('모든 컬럼 조합 실패, 테이블 재생성 시도')
      await createProfilesTable()
      
    } catch (error) {
      console.error('스키마 감지 중 심각한 오류:', error)
      setMessage(`데이터베이스 연결 오류: ${error.message}`)
      setLoading(false)
    }
  }

  const analyzeTableStructure = (sampleRecord) => {
    const keys = Object.keys(sampleRecord)
    console.log('사용 가능한 컬럼들:', keys)
    
    // 이름 컬럼 찾기
    let nameCol = null
    if (keys.includes('character_name')) nameCol = 'character_name'
    else if (keys.includes('name')) nameCol = 'name'
    else if (keys.includes('characterName')) nameCol = 'characterName'
    
    // 레벨 컬럼 찾기
    let levelCol = null
    if (keys.includes('userlevel')) levelCol = 'userlevel'
    else if (keys.includes('level')) levelCol = 'level'
    else if (keys.includes('user_level')) levelCol = 'user_level'
    else if (keys.includes('userLevel')) levelCol = 'userLevel'
    
    // 직업 컬럼 찾기
    let jobCol = null
    if (keys.includes('userjob')) jobCol = 'userjob'
    else if (keys.includes('job')) jobCol = 'job'
    else if (keys.includes('user_job')) jobCol = 'user_job'
    else if (keys.includes('userJob')) jobCol = 'userJob'
    
    if (nameCol && levelCol && jobCol) {
      return { name: nameCol, level: levelCol, job: jobCol }
    }
    
    return null
  }

  const createProfilesTable = async () => {
    try {
      console.log('테이블 생성 중...')
      setMessage('데이터베이스 테이블을 생성하고 있습니다...')
      
      // SQL을 통해 테이블 생성
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          character_name TEXT NOT NULL,
          userlevel INTEGER DEFAULT 1 CHECK (userlevel >= 1 AND userlevel <= 200),
          userjob TEXT DEFAULT 'beginner',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- RLS 정책 설정
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS 'Anyone can view profiles' 
          ON profiles FOR SELECT 
          USING (true);
        
        CREATE POLICY IF NOT EXISTS 'Users can insert profiles' 
          ON profiles FOR INSERT 
          WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY IF NOT EXISTS 'Users can update own profiles' 
          ON profiles FOR UPDATE 
          USING (auth.uid() = user_id);
        
        CREATE POLICY IF NOT EXISTS 'Users can delete own profiles' 
          ON profiles FOR DELETE 
          USING (auth.uid() = user_id);
      `
      
      const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL })
      
      if (error) {
        console.error('테이블 생성 실패:', error)
        
        // RPC가 안되면 직접 Supabase에서 생성하도록 안내
        setMessage(`
          테이블을 자동으로 생성할 수 없습니다. 
          Supabase Dashboard에서 다음 SQL을 실행해주세요:
          
          CREATE TABLE profiles (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES auth.users(id),
            character_name TEXT NOT NULL,
            userlevel INTEGER DEFAULT 1 CHECK (userlevel >= 1 AND userlevel <= 200),
            userjob TEXT DEFAULT 'beginner',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `)
        setLoading(false)
      } else {
        console.log('테이블 생성 성공!')
        setTableColumns({ name: 'character_name', level: 'userlevel', job: 'userjob' })
        setMessage('테이블이 생성되었습니다! 이제 캐릭터를 추가할 수 있습니다.')
        fetchProfiles({ name: 'character_name', level: 'userlevel', job: 'userjob' })
      }
    } catch (error) {
      console.error('테이블 생성 중 예외:', error)
      setMessage(`
        테이블 생성에 실패했습니다. Supabase Dashboard → SQL Editor에서 다음을 실행해주세요:

        CREATE TABLE profiles (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES auth.users(id),
          character_name TEXT NOT NULL,
          userlevel INTEGER DEFAULT 1 CHECK (userlevel >= 1 AND userlevel <= 200),
          userjob TEXT DEFAULT 'beginner',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Anyone can view profiles" ON profiles FOR SELECT USING (true);
        CREATE POLICY "Users can insert profiles" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
        CREATE POLICY "Users can update own profiles" ON profiles FOR UPDATE USING (auth.uid() = user_id);
        CREATE POLICY "Users can delete own profiles" ON profiles FOR DELETE USING (auth.uid() = user_id);
      `)
      setLoading(false)
    }
  }

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)
  }

  const fetchProfiles = async (columns = tableColumns) => {
    setLoading(true)
    try {
      const cols = columns || tableColumns || { name: 'character_name', level: 'userlevel', job: 'userjob' }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order(cols.level, { ascending: false })
        .order('created_at', { ascending: true })

      if (error) {
        console.error('프로필 가져오기 오류:', error)
        setMessage('데이터를 가져오는 중 오류가 발생했습니다: ' + error.message)
      } else {
        setProfiles(data || [])
        setLastUpdated(new Date()) // 업데이트 시간 기록
        console.log('가져온 프로필 데이터:', data)
      }
    } catch (error) {
      console.error('예외 발생:', error)
      setMessage('데이터를 가져오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    setMessage('')
    try {
      await fetchProfiles()
      setMessage('랭킹 데이터가 새로고침되었습니다!')
      setTimeout(() => setMessage(''), 2000) // 2초 후 메시지 자동 제거
    } catch (error) {
      console.error('새로고침 중 오류:', error)
      setMessage('새로고침 중 오류가 발생했습니다.')
    } finally {
      setRefreshing(false)
    }
  }

  const formatTimeAgo = (date) => {
    if (!date) return ''
    
    const now = new Date()
    const diffMs = now - date
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSeconds < 10) {
      return '방금 전'
    } else if (diffSeconds < 60) {
      return `${diffSeconds}초 전`
    } else if (diffMinutes < 60) {
      return `${diffMinutes}분 전`
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`
    } else if (diffDays < 7) {
      return `${diffDays}일 전`
    } else {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const handleAddCharacter = async (e) => {
    e.preventDefault()
    
    if (!user) {
      setMessage('로그인이 필요합니다.')
      return
    }

    if (formData.userlevel < 1 || formData.userlevel > 200) {
      setMessage('레벨은 1-200 사이여야 합니다.')
      return
    }

    if (!formData.character_name.trim()) {
      setMessage('캐릭터 이름을 입력해주세요.')
      return
    }

    try {
      // 현재 테이블 스키마 확인
      console.log('현재 사용자 정보:', {
        id: user.id,
        email: user.email
      })

      // 기본적인 필수 필드만 포함
      const insertData = {
        user_id: user.id,
        character_name: formData.character_name.trim(),
        userlevel: parseInt(formData.userlevel),
        userjob: formData.userjob
      }

      console.log('삽입할 데이터:', insertData)

      // 먼저 테이블 스키마 확인
      const { data: schemaTest, error: schemaError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)

      if (schemaError) {
        console.error('테이블 접근 테스트 오류:', schemaError)
        setMessage(`테이블에 접근할 수 없습니다: ${schemaError.message}`)
        return
      }

      console.log('테이블 접근 성공, 샘플 데이터:', schemaTest)

      // 다양한 컬럼명으로 시도해보기
      const possibleColumnNames = [
        { name: 'character_name', level: 'userlevel', job: 'userjob' },
        { name: 'name', level: 'level', job: 'job' },
        { name: 'character_name', level: 'user_level', job: 'user_job' },
        { name: 'characterName', level: 'userLevel', job: 'userJob' }
      ]

      let insertSuccess = false
      
      for (const columns of possibleColumnNames) {
        try {
          console.log(`테스트 중인 컬럼명:`, columns)
          
          const testInsertData = {
            user_id: user.id,
            [columns.name]: formData.character_name.trim(),
            [columns.level]: parseInt(formData.userlevel),
            [columns.job]: formData.userjob
          }

          console.log('테스트 삽입 데이터:', testInsertData)

          const { data, error } = await supabase
            .from('profiles')
            .insert([testInsertData])
            .select()

                     if (!error) {
             console.log('캐릭터 추가 성공:', data)
             console.log('성공한 컬럼명:', columns)
             setTableColumns(columns) // 성공한 컬럼명 저장
             setMessage('캐릭터가 성공적으로 추가되었습니다!')
             setShowAddForm(false)
             setFormData({
               character_name: '',
               userlevel: 1,
               userjob: 'beginner'
             })
             fetchProfiles()
             insertSuccess = true
             break
           } else {
             console.log(`컬럼명 ${JSON.stringify(columns)} 실패:`, error.message)
           }
        } catch (err) {
          console.log(`컬럼명 ${JSON.stringify(columns)} 예외:`, err.message)
        }
      }

             if (!insertSuccess) {
         console.error('모든 컬럼명 시도 실패')
         setMessage('테이블 스키마를 확인할 수 없습니다. Supabase 테이블 구조를 확인해주세요.')
       }
    } catch (error) {
      console.error('예외 발생 상세:', error)
      console.error('예외 전체 객체:', JSON.stringify(error, null, 2))
      setMessage(`캐릭터 추가 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`)
    }
  }

  const handleEditCharacter = async (e) => {
    e.preventDefault()
    
    if (!user || !editingCharacter) {
      setMessage('오류가 발생했습니다.')
      return
    }

    if (editFormData.userlevel < 1 || editFormData.userlevel > 200) {
      setMessage('레벨은 1-200 사이여야 합니다.')
      return
    }

    if (!editFormData.character_name.trim()) {
      setMessage('캐릭터 이름을 입력해주세요.')
      return
    }

    try {
      const cols = tableColumns || { name: 'character_name', level: 'userlevel', job: 'userjob' }
      const updateData = {
        [cols.name]: editFormData.character_name.trim(),
        [cols.level]: parseInt(editFormData.userlevel),
        [cols.job]: editFormData.userjob
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', editingCharacter.id)
        .eq('user_id', user.id) // 본인 캐릭터만 수정 가능
        .select()

      if (error) {
        console.error('캐릭터 수정 오류:', error)
        setMessage(`캐릭터 수정에 실패했습니다: ${error.message || '알 수 없는 오류'}`)
      } else {
        console.log('캐릭터 수정 성공:', data)
        setMessage('캐릭터가 성공적으로 수정되었습니다!')
        setShowEditForm(false)
        setEditingCharacter(null)
        fetchProfiles()
      }
    } catch (error) {
      console.error('캐릭터 수정 중 예외:', error)
      setMessage(`캐릭터 수정 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`)
    }
  }

  const handleDeleteCharacter = async (characterId) => {
    if (!user) {
      setMessage('로그인이 필요합니다.')
      return
    }

    if (!confirm('정말로 이 캐릭터를 삭제하시겠습니까?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', characterId)
        .eq('user_id', user.id) // 본인 캐릭터만 삭제 가능

      if (error) {
        console.error('캐릭터 삭제 오류:', error)
        setMessage(`캐릭터 삭제에 실패했습니다: ${error.message || '알 수 없는 오류'}`)
      } else {
        setMessage('캐릭터가 성공적으로 삭제되었습니다!')
        fetchProfiles()
      }
    } catch (error) {
      console.error('캐릭터 삭제 중 예외:', error)
      setMessage(`캐릭터 삭제 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`)
    }
  }

  const openEditForm = (character) => {
    const cols = tableColumns || { name: 'character_name', level: 'userlevel', job: 'userjob' }
    setEditingCharacter(character)
    setEditFormData({
      character_name: character[cols.name] || character.character_name || character.name,
      userlevel: character[cols.level] || character.userlevel || character.level,
      userjob: character[cols.job] || character.userjob || character.job
    })
    setShowEditForm(true)
  }

  const closeEditForm = () => {
    setShowEditForm(false)
    setEditingCharacter(null)
    setEditFormData({
      character_name: '',
      userlevel: 1,
      userjob: 'beginner'
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const getJobInfo = (job) => {
    return JOB_OPTIONS.find(option => option.value === job) || JOB_OPTIONS[0]
  }

  const getRankIcon = (index) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `${index + 1}`
  }

  const getFilteredProfiles = () => {
    if (selectedJobFilter === 'all') {
      return profiles
    }
                         const cols = tableColumns || { name: 'character_name', level: 'userlevel', job: 'userjob' }
                     return profiles.filter(profile => 
                       (profile[cols.job] || profile.userjob || profile.job) === selectedJobFilter
                     )
  }

  const filteredProfiles = getFilteredProfiles()

  const getJobFilterOptions = () => {
    return [
      { value: 'all', label: '전체', count: profiles.length },
      ...JOB_OPTIONS.map(job => {
        const cols = tableColumns || { name: 'character_name', level: 'userlevel', job: 'userjob' }
        return {
          ...job,
          count: profiles.filter(p => 
            (p[cols.job] || p.userjob || p.job) === job.value
          ).length
        }
      })
    ]
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              🏆 캐릭터 랭킹보드
            </h1>
            
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  안녕하세요, {user.email}님!
                </span>
                <button
                  onClick={() => router.push('/')}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  홈으로
                </button>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  캐릭터 추가
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </header>

        {/* 메시지 */}
        {message && (
          <div className={`p-6 rounded-lg mb-6 ${
            message.includes('성공') ? 'bg-green-50 border border-green-200' : 
            message.includes('테이블') ? 'bg-blue-50 border border-blue-200' :
            'bg-red-50 border border-red-200'
          }`}>
            {message.includes('SQL을 실행해주세요') ? (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-900">
                  🛠️ 데이터베이스 테이블 설정이 필요합니다
                </h3>
                <div className="text-blue-800 mb-4">
                  <p className="mb-2">다음 단계를 따라 테이블을 생성해주세요:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Supabase Dashboard 접속</li>
                    <li>좌측 메뉴에서 &quot;SQL Editor&quot; 클릭</li>
                    <li>아래 SQL 코드를 복사하여 실행</li>
                    <li>페이지를 새로고침</li>
                  </ol>
                </div>
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>{`CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  character_name TEXT NOT NULL,
  userlevel INTEGER DEFAULT 1 CHECK (userlevel >= 1 AND userlevel <= 200),
  userjob TEXT DEFAULT 'beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY 'Anyone can view profiles' 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY 'Users can insert profiles' 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY 'Users can update own profiles' 
  ON profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY 'Users can delete own profiles' 
  ON profiles FOR DELETE 
  USING (auth.uid() = user_id);`}</pre>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  character_name TEXT NOT NULL,
  userlevel INTEGER DEFAULT 1 CHECK (userlevel >= 1 AND userlevel <= 200),
  userjob TEXT DEFAULT 'beginner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY 'Anyone can view profiles' ON profiles FOR SELECT USING (true);
CREATE POLICY 'Users can insert profiles' ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY 'Users can update own profiles' ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY 'Users can delete own profiles' ON profiles FOR DELETE USING (auth.uid() = user_id);`)
                    setMessage('SQL 코드가 클립보드에 복사되었습니다! Supabase SQL Editor에 붙여넣기 하세요.')
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  📋 SQL 코드 복사하기
                </button>
              </div>
            ) : (
              <div className={`${
                message.includes('성공') ? 'text-green-800' : 
                message.includes('테이블') ? 'text-blue-800' :
                'text-red-800'
              }`}>
                {message}
              </div>
            )}
          </div>
        )}

        {/* 캐릭터 추가 폼 */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">새 캐릭터 추가</h3>
              
              <form onSubmit={handleAddCharacter} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    캐릭터 이름
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.character_name}
                    onChange={(e) => setFormData({...formData, character_name: e.target.value})}
                    placeholder="캐릭터 이름을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    레벨 (1-200)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.userlevel}
                    onChange={(e) => setFormData({...formData, userlevel: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    직업
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.userjob}
                    onChange={(e) => setFormData({...formData, userjob: e.target.value})}
                  >
                    {JOB_OPTIONS.map(job => (
                      <option key={job.value} value={job.value}>
                        {job.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    추가하기
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
                  )}

        {/* 캐릭터 수정 폼 */}
        {showEditForm && editingCharacter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">캐릭터 수정</h3>
              
              <form onSubmit={handleEditCharacter} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    캐릭터 이름
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editFormData.character_name}
                    onChange={(e) => setEditFormData({...editFormData, character_name: e.target.value})}
                    placeholder="캐릭터 이름을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    레벨 (1-200)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editFormData.userlevel}
                    onChange={(e) => setEditFormData({...editFormData, userlevel: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    직업
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editFormData.userjob}
                    onChange={(e) => setEditFormData({...editFormData, userjob: e.target.value})}
                  >
                    {JOB_OPTIONS.map(job => (
                      <option key={job.value} value={job.value}>
                        {job.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    수정하기
                  </button>
                  <button
                    type="button"
                    onClick={closeEditForm}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 직업 필터 탭 */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">직업별 랭킹</h3>
            <div className="flex flex-wrap gap-2">
              {getJobFilterOptions().map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedJobFilter(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedJobFilter === option.value
                      ? option.value === 'all' 
                        ? 'bg-blue-600 text-white' 
                        : `${option.color} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 랭킹 테이블 */}
        <main className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedJobFilter === 'all' ? '전체' : getJobInfo(selectedJobFilter).label} 랭킹 ({filteredProfiles.length}명)
              </h2>
              
              <div className="flex items-center space-x-4">
                {lastUpdated && (
                  <div className="text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatTimeAgo(lastUpdated)} 업데이트
                    </span>
                  </div>
                )}
                
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className={`inline-flex items-center px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    refreshing 
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <svg 
                    className={`w-4 h-4 mr-1.5 ${refreshing ? 'animate-spin' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                    />
                  </svg>
                  {refreshing ? '새로고침 중...' : '새로고침'}
                </button>
              </div>
            </div>
          </div>

          {filteredProfiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">📝</div>
              <p className="text-gray-600 mb-4">
                {profiles.length === 0 ? '등록된 캐릭터가 없습니다.' : 
                 selectedJobFilter === 'all' ? '등록된 캐릭터가 없습니다.' : 
                 `${getJobInfo(selectedJobFilter).label} 직업의 캐릭터가 없습니다.`}
              </p>
              {profiles.length === 0 && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  첫 캐릭터 추가하기
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      순위
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      캐릭터명
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      레벨
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      직업
                    </th>
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       소유자
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       관리
                     </th>
                  </tr>
                </thead>
                                 <tbody className="bg-white divide-y divide-gray-200">
                   {filteredProfiles.map((profile, index) => {
                     const cols = tableColumns || { name: 'character_name', level: 'userlevel', job: 'userjob' }
                     const jobInfo = getJobInfo(profile[cols.job] || profile.userjob || profile.job)
                     return (
                       <tr key={profile.id} className={index < 3 ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <div className="flex items-center">
                             <span className="text-lg font-bold">
                               {getRankIcon(index)}
                             </span>
                           </div>
                         </td>
                                                 <td className="px-6 py-4 whitespace-nowrap">
                           <div className="text-sm font-medium text-gray-900">
                             {profile[tableColumns?.name] || profile.character_name || profile.name || '이름없음'}
                           </div>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <div className="text-sm text-gray-900 font-bold">
                             Lv. {profile[tableColumns?.level] || profile.userlevel || profile.level || 1}
                           </div>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${jobInfo.color}`}>
                             {jobInfo.label}
                           </span>
                         </td>
                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                           {profile.email || (profile.user_id === user?.id ? user.email : '익명')}
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                           {profile.user_id === user?.id ? (
                             <div className="flex space-x-2">
                               <button
                                 onClick={() => openEditForm(profile)}
                                 className="text-blue-600 hover:text-blue-900 text-xs px-2 py-1 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                               >
                                 수정
                               </button>
                               <button
                                 onClick={() => handleDeleteCharacter(profile.id)}
                                 className="text-red-600 hover:text-red-900 text-xs px-2 py-1 border border-red-300 rounded hover:bg-red-50 transition-colors"
                               >
                                 삭제
                               </button>
                             </div>
                           ) : (
                             <span className="text-gray-400 text-xs">-</span>
                           )}
                         </td>
                       </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 