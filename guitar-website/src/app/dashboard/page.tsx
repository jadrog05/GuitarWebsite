import Navbar from "@/components/NavBar";
import SessionsList from "@/components/custom/sessions-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchUser } from "@/lib/api/users";
import { auth0 } from "@/lib/auth0";
import { redirect } from 'next/navigation'

export default async function DashboardPage() {

  const session = await auth0.getSession()
  if (!session || !session.user) {
    redirect('/auth/login')
  }
  const user = await fetchUser(session.tokenSet.accessToken)
  console.log('User fetched:', user)
  if(user.Exists === false) {
    redirect('/onboarding')
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background text-foreground pt-24 px-4 grid grid-cols-3 gap-4">
        <div className="rounded-xl shadow h-[calc(100vh-6rem)] grid grid-rows-[auto_1fr] overflow-hidden p-4">
          <div className="flex items-center justify-center py-4">
            <h2 className="text-muted-foreground text-center">Your History</h2>
          </div>
          <ScrollArea className="h-full w-full">
            <SessionsList />
          </ScrollArea>
        </div>

        <div></div>
        <div></div>
      </div>
    </>

  );
}
