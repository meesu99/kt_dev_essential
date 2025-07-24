import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// DELETE - 댓글 삭제
export async function DELETE(request, { params }) {
  try {
    const { id } = await params

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting comment:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: '댓글이 삭제되었습니다.' })
  } catch (error) {
    console.error('Error in DELETE /api/comments/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 