// app/layout.tsx
import "./globals.css";
import { auth0 } from "@/lib/auth0";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import PublicLayout from "@/components/layouts/PublicLayout";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth0.getSession();
  const isLoggedIn = !!session?.user;

  return (
    <html lang="en">
      <body>
        {isLoggedIn ? (
          <AuthenticatedLayout>{children}</AuthenticatedLayout>
        ) : (
          <PublicLayout>{children}</PublicLayout>
        )}
      </body>
    </html>
  );
}