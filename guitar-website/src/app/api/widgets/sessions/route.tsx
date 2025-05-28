import { auth0 } from '@/lib/auth0'
import { fetchFromApi } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        console.log('👋 Reached route handler')
        const session = await auth0.getSession()
        const token = session?.tokenSet.accessToken
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        try {
            const result = await fetchFromApi('/sessions/theory', token, {
                method: 'GET',
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