'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
  name?: string;
  email?: string;
  picture?: string;
  sub: string;
};

type UserContextValue = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  isLoading: true,
  error: null,
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) throw new Error('Failed to fetch user');

        const data = await res.json();
        setUser(data.user || null);
      } catch (err) {
        setError(err as Error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
}
