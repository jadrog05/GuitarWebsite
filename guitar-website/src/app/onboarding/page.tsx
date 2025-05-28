import Navbar from "@/components/NavBar";
import { auth0 } from "@/lib/auth0";

export default async function Onboarding() {
    const session = await auth0.getSession();
    const user = session?.user;
    if (!user) {
        return <div>Not authenticated</div>;
    }
    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-25 bg-background text-foreground justify-center">

            </div>
        </>

    )
}