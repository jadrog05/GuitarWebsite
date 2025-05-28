import { auth0 } from "@/lib/auth0"
import { TheorySessionForm } from "@/components/custom/input-create-theory"
import Navbar from "@/components/NavBar"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default async function PracticePage() {
    const session = await auth0.getSession()

    if (!session?.user) {
        return <div className="p-4 text-muted-foreground">Please log in to access practice sessions.</div>
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-25 bg-background text-foreground flex">
                <Tabs defaultValue="theory" className="rounded-lg w-full align-center">
                    <TabsList className="bg-background align-center">
                        <TabsTrigger value="theory" className="tab-trigger active:bg-primary active:text-primary-foreground;">Theory</TabsTrigger>
                        <TabsTrigger value="learn" className="tab-trigger active:bg-primary active:text-primary-foreground;">Learn</TabsTrigger>
                        <TabsTrigger value="technique" className="tab-trigger active:bg-primary active:text-primary-foreground;">Technique</TabsTrigger>
                    </TabsList>
                    <TabsContent value="theory">
                        <Card className="bg-card outline ">
                            <CardHeader>
                                <CardTitle>Learn Some Theory</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">
                                    Generate a personalized practice session based on your current goals.
                                </p>
                                <TheorySessionForm />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="learn">
                        <Card className="bg-card">
                            <CardHeader>
                                <CardTitle>Learn Something!</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">
                                    Generate a personalized practice session based on your current goals.
                                </p>
                                <TheorySessionForm />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="technique">
                        <Card className="bg-card">
                            <CardHeader>
                                <CardTitle>Practice Your Technique</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">
                                    Generate a personalized practice session based on your current goals.
                                </p>
                                <TheorySessionForm />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}