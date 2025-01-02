import { env } from "$env/dynamic/public";
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

export async function signOut() {
    const response = await fetch(env.PUBLIC_API_SERVER+"/auth/token/invalidate", {
        method: "POST",
        headers: {
            ...getAuthHeader()
        }
    })
    if(!response.ok) {
        return console.error(response.status, response.statusText)
    }

    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("access_token_expires_at")
    localStorage.removeItem("refresh_token_expires_at")
}

export const generateDeviceId = () => `${Math.trunc(Date.now() / 1000)} - ${navigator.userAgent}`