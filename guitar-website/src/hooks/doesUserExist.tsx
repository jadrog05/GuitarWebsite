import { useQuery } from '@tanstack/react-query';
import { User } from '@/lib/types';
import { fetchUser } from '@/lib/api/users';

export function doesUserExist() {
    return useQuery<User, Error>({
        queryKey: ['userExists'],
        queryFn: async () => {
            const res = await fetch('/api/auth/token');
            const { accessToken } = await res.json();
            return fetchUser(accessToken);
        },
    });
}