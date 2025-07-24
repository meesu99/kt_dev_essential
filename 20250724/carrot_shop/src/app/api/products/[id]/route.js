import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - 특정 상품 조회
export async function GET(request, { params }) {
  try {
    const { id } = params

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: '상품을 찾을 수 없습니다.' }, { status: 404 })
      }
      console.error('Error fetching product:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error in GET /api/products/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - 상품 정보 수정
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { title, description, price, image, category, location, status } = body

    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = parseInt(price)
    if (image !== undefined) updateData.image = image
    if (category !== undefined) updateData.category = category
    if (location !== undefined) updateData.location = location
    if (status !== undefined) updateData.status = status
    
    updateData.updated_at = new Date().toISOString()

    const { data: product, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: '상품을 찾을 수 없습니다.' }, { status: 404 })
      }
      console.error('Error updating product:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error in PUT /api/products/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - 상품 삭제
export async function DELETE(request, { params }) {
  try {
    const { id } = params

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting product:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: '상품이 삭제되었습니다.' })
  } catch (error) {
    console.error('Error in DELETE /api/products/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH - 상품 좋아요/채팅 수 업데이트
export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { action } = body

    if (action === 'like') {
      const { data: product, error } = await supabase
        .from('products')
        .update({ likes: supabase.raw('likes + 1') })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating likes:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json(product)
    }

    if (action === 'chat') {
      const { data: product, error } = await supabase
        .from('products')
        .update({ chats: supabase.raw('chats + 1') })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating chats:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json(product)
    }

    return NextResponse.json({ error: '유효하지 않은 액션입니다.' }, { status: 400 })
  } catch (error) {
    console.error('Error in PATCH /api/products/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 