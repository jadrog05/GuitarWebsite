import { auth0 } from '@/lib/auth0'
import { fetchFromApi } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth0.getSession()
  const token = session?.tokenSet.accessToken
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  try {
    const result = await fetchFromApi('/sessions/theory', token, {
      method: 'POST',
      body: JSON.stringify(body),
    })

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}