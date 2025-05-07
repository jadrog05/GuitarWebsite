import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { UserProvider } from '@/app/context/UserProvider';
import Navbar from '@/components/NavBar';

export const metadata = {
  title: 'Guitar Practice App',
  description: 'Track your guitar progress and goals',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UserProvider>
            <Navbar /> {/* ✅ put here */}
            <main className="container mx-auto px-4 py-6 pt-[4.5rem]">
              {children}
            </main>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
