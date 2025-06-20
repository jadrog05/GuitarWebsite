'use client'

import { auth0 } from '@/lib/auth0'
import Navbar from '@/components/NavBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notFound, redirect, useRouter } from 'next/navigation'
import { useSession } from '@/hooks/useSessions'
import { Button } from '@/components/ui/button'
import SessionItemCard from '@/components/custom/SessionItemCard'
import { useUser } from '@/app/context/UserProvider'
import { useEffect } from 'react'
import { Progress } from '@/components/ui/progress'

type PracticeSessionPageProps = {
    params: { id: string }
}

export default function PracticeSessionPage({ params }: PracticeSessionPageProps) {
    console.log('PracticeSessionPage loaded with ID:', params.id)
    const router = useRouter()
    const { user, isLoading: authLoading } = useUser()
    const { data: session, error, isLoading } = useSession(params.id)

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace("/login")
        }
    }, [authLoading, user, router])

    if (authLoading || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-muted-foreground">Loading session...</p>
            </div>
        )
    }

    if (error || !session) {
        console.error("Error fetching session:", error)
        return notFound()
    }

    const total = session.items.length
    const completed = session.items.filter((item) => item.completed).length
    const progress = total > 0 ? (completed / total) * 100 : 0

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-25 bg-background text-foreground flex">
                

                {/* Session Items */}
                <div className="space-y-6">
                    {session.items.map((item) => (
                        <SessionItemCard key={item.id} item={item} />
                    ))}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full border-t bg-background shadow-sm z-50">
                <div className="max-w-5xl mx-auto p-4 flex justify-end gap-4">
                    <Button variant="default">Mark Complete</Button>
                    <Button variant="outline">Regenerate</Button>
                </div>
            </div>
        </>
    )
}
