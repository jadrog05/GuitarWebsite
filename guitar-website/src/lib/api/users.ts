import { fetchFromApi } from ".";
import { User } from "../types";

export async function fetchUser(token: string) {
    return fetchFromApi<User>('/users', token, {
        method: 'GET',
    });
}

