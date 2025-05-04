"use client";

import { auth0 } from "@/lib/auth0";
import Link from "next/link";

export async function Navbar() {
  const session = await auth0.getSession();
  const user = session?.user

  return (
    <header className="bg-white shadow px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          🎸 GuitarPractice
        </Link>

        {!isLoading && (
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">Hello, {user.name || "Guitarist"}!</span>
                <Link
                  href="/auth/logout"
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
