import { auth0 } from "@/lib/auth0";
import '@app/globals.css';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/NavBar";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Practice Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You’ve practiced for 3.5 hours this week.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Session</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Scales, arpeggios, and fretboard mapping.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Update Goals</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}