import { fetchSession } from "@/lib/api/sessions";
import { fetchUser } from "@/lib/api/users";
import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Session } from "inspector";

export function useUserData() {

  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      console.log('Fetching token');
      const res = await fetch('/api/auth/token');
      const { accessToken } = await res.json();
      return fetchUser(accessToken);
    },
  });
}