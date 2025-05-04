import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth0.getSession();

  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🎸 Guitar Practice App</h1>
        <a href="/auth/login" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Log in with Auth0
        </a>
      </div>
    </div>
  );
}
