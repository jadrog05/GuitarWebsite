import { auth0 } from '@/lib/auth0'
import { fetchFromApi } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    
  try {
    const session = await auth0.getSession()
    const token = session?.tokenSet.accessToken
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    try {
      const result = await fetchFromApi('/sessions', token, {
        method: 'GET',
        body: JSON.stringify(body),
      })

      return NextResponse.json(result)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      } else {
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
      }
    }

  } catch (err: unknown) {
    console.error('Error in route:', err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}