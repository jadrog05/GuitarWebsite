import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/app/theme-provider';
import { UserProvider } from '@/app/context/UserProvider';
import { ToastProvider } from './toast-provider';
import ReactQueryProvider from '@/lib/react-query-provider';

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
            <ToastProvider>
              <ReactQueryProvider>
                <main >
                  {children}
                </main>
              </ReactQueryProvider>
            </ToastProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
