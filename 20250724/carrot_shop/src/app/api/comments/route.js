import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - 특정 상품의 댓글 조회
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('product_id')

    if (!productId) {
      return NextResponse.json({ error: 'product_id가 필요합니다.' }, { status: 400 })
    }

    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching comments:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error in GET /api/comments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - 새 댓글 생성
export async function POST(request) {
  try {
    const body = await request.json()
    const { product_id, author_name, content } = body

    if (!product_id || !content) {
      return NextResponse.json(
        { error: '상품 ID와 댓글 내용이 필요합니다.' },
        { status: 400 }
      )
    }

    const { data: comment, error } = await supabase
      .from('comments')
      .insert([
        {
          product_id: parseInt(product_id),
          author_name: author_name || '익명',
          content: content.trim()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating comment:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/comments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 