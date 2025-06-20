import { useQuery } from '@tanstack/react-query';
import { fetchSession } from '@/lib/api/sessions';
import { Session } from '@/lib/types';

export function useSession(sessionId: string) {

  return useQuery<Session, Error>({
    queryKey: ['session', sessionId],
    queryFn: async () => {
      console.log('Fetching token');
      const res = await fetch('/api/auth/token');
      const { accessToken } = await res.json();
      return fetchSession(accessToken, sessionId);
    },
  });
}
