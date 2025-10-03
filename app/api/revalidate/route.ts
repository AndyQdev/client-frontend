import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    const { tag, secret } = await req.json()
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
    }
    if (!tag) {
      return NextResponse.json({ ok: false, message: 'Missing tag' }, { status: 400 })
    }
    revalidateTag(tag)
    return NextResponse.json({ ok: true, revalidated: true, tag })
  } catch (e) {
    return NextResponse.json({ ok: false, message: 'Bad request' }, { status: 400 })
  }
}
