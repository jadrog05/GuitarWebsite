import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth0 } from "@/lib/auth0"
import { TheorySessionForm } from "@/components/ui/custom/input-create-theory" // 👈 import your component

export default async function PracticePage() {
  const session = await auth0.getSession()

  // optionally redirect if not logged in
  if (!session?.accessToken) {
    return <div className="p-4 text-muted-foreground">Please log in to access practice sessions.</div>
  }

  return (
    <div className="min-h-screen pt-24 bg-background text-foreground p-4 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Generate Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Generate a personalized practice session based on your current goals.
            </p>

            {/* ⬇️ This is your new input component with popup/preview */}
            <TheorySessionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}