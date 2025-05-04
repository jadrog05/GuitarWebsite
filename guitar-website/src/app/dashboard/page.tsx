import { auth0 } from "@/lib/auth0";

export default async function DashboardPage() {
  const session = await auth0.getSession();
  const user = session?.user;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🎸 Welcome {user?.given_name}</h1>
          <a href="/auth/logout" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Log out with Auth0
          </a>
        </div>
      </div>
    );
  }