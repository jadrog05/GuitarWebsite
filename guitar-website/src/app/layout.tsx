// app/layout.tsx
import './globals.css';
import { UserProvider } from './context/UserProvider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}