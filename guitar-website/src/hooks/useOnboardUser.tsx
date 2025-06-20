import { onboardUser } from '@/lib/api/users'
import { useMutation } from '@tanstack/react-query'

export type OnboardRequest = {
  name: string
  email?: string
  genres: string[]
  artists: string[]
  experienceLevel?: string
  experienceDescription?: string
}

export function useOnboardUser() {
  return useMutation({
    mutationFn: async (user: OnboardRequest) => {
      const res = await fetch('/api/auth/token');
      const { accessToken } = await res.json();
      console.log('Onboarding user with token:', accessToken);
      return onboardUser(accessToken, user);
    },
  });
}
