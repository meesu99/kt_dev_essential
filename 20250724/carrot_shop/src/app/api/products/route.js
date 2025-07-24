import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - 모든 상품 조회
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    // 카테고리 필터
    if (category && category !== '전체') {
      query = query.eq('category', category)
    }

    // 검색 필터
    if (search) {
      query = query.or(`title.ilike.%${search}%, description.ilike.%${search}%`)
    }

    const { data: products, error } = await query

    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error in GET /api/products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - 새 상품 생성
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, description, price, image, category, location } = body

    // 필수 필드 검증 (price는 0일 수 있으므로 별도 처리)
    if (!title || !description || price === undefined || price === null || !category || !location) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // 가격이 음수인지 검증
    const numericPrice = parseInt(price)
    if (isNaN(numericPrice) || numericPrice < 0) {
      return NextResponse.json(
        { error: '가격은 0 이상의 숫자여야 합니다.' },
        { status: 400 }
      )
    }

    const { data: product, error } = await supabase
      .from('products')
      .insert([
        {
          title,
          description,
          price: numericPrice,
          image: image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
          category,
          location,
          status: '판매중',
          likes: 0,
          chats: 0
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating product:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 