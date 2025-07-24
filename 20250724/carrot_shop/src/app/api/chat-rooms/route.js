import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - 모든 채팅방 조회
export async function GET(request) {
  try {
    const { data: chatRooms, error } = await supabase
      .from('chat_rooms')
      .select(`
        *,
        products (title, image, price)
      `)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching chat rooms:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(chatRooms)
  } catch (error) {
    console.error('Error in GET /api/chat-rooms:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - 새 채팅방 생성
export async function POST(request) {
  try {
    const body = await request.json()
    const { product_id, buyer_name, seller_name } = body

    if (!product_id) {
      return NextResponse.json(
        { error: '상품 ID가 필요합니다.' },
        { status: 400 }
      )
    }

    // 이미 존재하는 채팅방이 있는지 확인
    const { data: existingRoom, error: checkError } = await supabase
      .from('chat_rooms')
      .select('*')
      .eq('product_id', product_id)
      .eq('buyer_name', buyer_name || '구매자')
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing room:', checkError)
      return NextResponse.json({ error: checkError.message }, { status: 500 })
    }

    if (existingRoom) {
      return NextResponse.json(existingRoom)
    }

    // 새 채팅방 생성
    const { data: chatRoom, error } = await supabase
      .from('chat_rooms')
      .insert([
        {
          product_id: parseInt(product_id),
          buyer_name: buyer_name || '구매자',
          seller_name: seller_name || '판매자'
        }
      ])
      .select(`
        *,
        products (title, image, price)
      `)
      .single()

    if (error) {
      console.error('Error creating chat room:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(chatRoom, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/chat-rooms:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 