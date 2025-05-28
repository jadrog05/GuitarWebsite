import { useQuery } from '@tanstack/react-query';
import { fetchSessions } from '@/lib/api/sessions';
import { Session } from '@/lib/types';

export function useSessions(sessionType?: Session['sessionType']) {

  return useQuery<Session[], Error>({
    queryKey: ['sessions', sessionType],
    queryFn: async () => {
      const res = await fetch('/api/auth/token');
      const { accessToken } = await res.json();
      return fetchSessions(accessToken, sessionType);
    },
  });
}
