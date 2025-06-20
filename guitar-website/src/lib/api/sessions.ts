import { fetchFromApi } from './index';
import { Session } from '@/lib/types';

export async function fetchSession(token: string, sessionId: string) {
  return fetchFromApi<Session>(`/sessions/${sessionId}`, token);
}


export async function deleteSession(token: string, sessionId: string) {
  return fetchFromApi<void>(`/sessions/${sessionId}`, token, {
    method: 'DELETE',
  });
}
