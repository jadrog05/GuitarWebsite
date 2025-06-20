import { OnboardRequest } from "@/hooks/useOnboardUser";
import { fetchFromApi } from ".";
import { User } from "../types";

export async function fetchUser(token: string) {
    return fetchFromApi<User>('/users/me', token, {
        method: 'GET',
    });
}

export async function onboardUser(token: string, user: OnboardRequest) {
    console.log(user);
    return fetchFromApi('/users', token, {
        method: 'POST',
        body: JSON.stringify(user),
    });
}

