import { writable } from "svelte/store";

export interface User {
    id: number;
    name: string;
}

export const currentUser = writable<User | undefined>()

export function getAuthHeader() {
    const token = localStorage.getItem("access_token")
    if(token === null) return null
    return {
        Authorization: `Bearer ${token}`
    }
}