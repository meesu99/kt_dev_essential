import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - 특정 채팅방의 메시지 조회
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const chatRoomId = searchParams.get('chat_room_id')

    if (!chatRoomId) {
      return NextResponse.json({ error: 'chat_room_id가 필요합니다.' }, { status: 400 })
    }

    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('chat_room_id', chatRoomId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error in GET /api/chat-messages:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - 새 메시지 전송
export async function POST(request) {
  try {
    const body = await request.json()
    const { chat_room_id, sender_name, message } = body

    if (!chat_room_id || !sender_name || !message) {
      return NextResponse.json(
        { error: '채팅방 ID, 보낸 사람, 메시지 내용이 필요합니다.' },
        { status: 400 }
      )
    }

    const { data: newMessage, error } = await supabase
      .from('chat_messages')
      .insert([
        {
          chat_room_id: parseInt(chat_room_id),
          sender_name: sender_name.trim(),
          message: message.trim()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error sending message:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // 채팅방의 updated_at도 업데이트
    await supabase
      .from('chat_rooms')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', chat_room_id)

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/chat-messages:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 