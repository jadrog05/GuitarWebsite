'use client'

import { TheorySession } from '@/types/theory-session'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Props {
  session: TheorySession
  onUseSession?: () => void
  onRegenerate?: () => void
}

export function TheorySessionCard({ session, onUseSession, onRegenerate }: Props) {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-6 rounded-radius shadow-lg bg-card border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-foreground">
          {session.topic}
        </CardTitle>
        <CardDescription>
          Estimated duration: {session.estimatedDurationMinutes} minutes
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 text-sm text-foreground">
        <section className="bg-muted rounded-lg p-4">
          <h3 className="text-base font-medium mb-1">Explanation</h3>
          <p className="text-muted-foreground">{session.explanation}</p>
        </section>

        <section className="bg-muted rounded-lg p-4">
          <h3 className="text-base font-medium mb-2">Practice Exercises</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {session.practiceExercises.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
        </section>

        <section className="bg-muted rounded-lg p-4">
          <h3 className="text-base font-medium mb-1">Recommended Reading</h3>
          <p className="text-muted-foreground">{session.recommendedReading}</p>
        </section>

        {session.youtubeUrl && (
          <section className="bg-muted rounded-lg p-4">
            <h3 className="text-base font-medium mb-1">YouTube</h3>
            <a
              href={session.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-700 transition"
            >
              Watch video
            </a>
          </section>
        )}

        {session.tabUrl && (
          <section className="bg-muted rounded-lg p-4">
            <h3 className="text-base font-medium mb-1">Tab Resource</h3>
            <a
              href={session.tabUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-700 transition"
            >
              View tab
            </a>
          </section>
        )}

        {(onUseSession || onRegenerate) && (
          <div className="flex justify-end gap-3 pt-2">
            {onRegenerate && (
              <Button variant="outline" onClick={onRegenerate}>
                Generate Another
              </Button>
            )}
            {onUseSession && (
              <Button onClick={onUseSession}>Use This Session</Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
