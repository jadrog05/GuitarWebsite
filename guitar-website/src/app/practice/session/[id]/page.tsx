import { auth0 } from '@/lib/auth0'
import Navbar from '@/components/NavBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notFound, redirect } from 'next/navigation'

type tParams = Promise<{ id: string[] }>;

export default async function PracticeSessionPage(props: { params: tParams }) {
    const { id } = await props.params

    if (!id) notFound()

    const session = await auth0.getSession()

    if (!session?.user) redirect('/login')

    return (
        <>
            <Navbar />
            <div className='min-h-screen pt-25 bg-background text-foreground p-4 justify-center'>
                <Card>
                    <CardHeader>
                        <CardTitle>Practice Session {id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>THIS WILL BE A THEORY SESSION</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
