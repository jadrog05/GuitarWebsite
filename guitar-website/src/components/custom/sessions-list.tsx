'use client';

import { useSessions } from '@/hooks/useSessions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SessionsList({ sessionType }: { sessionType?: 'theory' | 'learn' | 'technique' }) {
    const { data: sessions, isLoading, error } = useSessions(sessionType);

    if (isLoading) return <p className="text-sm">Loading sessions...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;
    if (!sessions || sessions.length === 0) return <p className="text-muted-foreground">No sessions found.</p>;

    return (
        <div className='p-4'>
            {sessions.map((session) => {
                const isCompleted = session.completed !== '0001-01-01T00:00:00';
                const dateLabel = new Date(session.start).toLocaleDateString();

                return (
                    <Card key={session.sessionId} className="shrink-0 my-2">
                        <CardHeader>
                            <CardTitle className="text-base capitalize">{session.sessionType}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p className="text-muted-foreground">{dateLabel}</p>
                            <ul className="list-disc list-inside">
                                {session.items.map((item, idx) => <li key={idx}>{item}</li>)}
                            </ul>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <Badge variant={isCompleted ? 'success' : 'destructive'} className="text-xs">
                                    {isCompleted ? 'Completed' : 'In Progress'}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    Confidence: {session.confidence}/5
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
