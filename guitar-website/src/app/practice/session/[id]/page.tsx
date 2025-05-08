import { auth0 } from '@/lib/auth0'
import { fetchFromApi } from '@/lib/api'
import Navbar from '@/components/NavBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function PracticeSessionPage({ params }: { params: { id: string } }) {
    const session = await auth0.getSession()
    if (!session?.user) return <div>Not authenticated</div>

    //const sessionData = await fetchFromApi(`/practice/session/${params.id}`, session.tokenSet.accessToken)

    return (
        <>
            <Navbar />
            <div className='min-h-screen pt-25 bg-background text-foreground p-4 justify-center'>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Practice Session {params.id}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <a>THIS WILL BE A THEORY SESSION</a>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}