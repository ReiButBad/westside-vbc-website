import { goto } from "$app/navigation";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const accessToken = localStorage.getItem('access_token')
    const expirationTime = localStorage.getItem('access_token_expires_at');
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken !== null && accessToken !== null && expirationTime !== null) {
        return goto("/admin/dashboard")
    }
}