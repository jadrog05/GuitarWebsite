import '@app/globals.css';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/NavBar";

export default async function DashboardPage() {

  return (
    <>
      <Navbar />
      <div className='min-h-screen pt-25 bg-background text-foreground p-4 justify-center'>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
          <Card className="bg-card shadow-md outline">
            <CardHeader>
              <CardTitle>Practice Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You’ve practiced for 3.5 hours this week.</p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-md outline">
            <CardHeader>
              <CardTitle>Latest Session</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Scales, arpeggios, and fretboard mapping.</p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-md outline">
            <CardHeader>
              <CardTitle>Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Update Goals</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}