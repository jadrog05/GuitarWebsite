import { fetchFromApi } from './index';
import { Session } from '@/lib/types';

export async function fetchSessions(token: string, sessionType?: Session['sessionType']) {
  const query = sessionType ? `?sessionType=${sessionType}` : '';
  return fetchFromApi<Session[]>(`/sessions${query}`, token);
}

export async function createSession(token: string, payload: Partial<Session>) {
  return fetchFromApi<Session>('/sessions', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteSession(token: string, sessionId: string) {
  return fetchFromApi<void>(`/sessions/${sessionId}`, token, {
    method: 'DELETE',
  });
}
