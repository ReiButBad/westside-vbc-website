<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { goto } from "$app/navigation";
	import Header from "$lib/components/Header.svelte";
    import { currentUser } from "$lib/user";
    import type { User } from "$lib/user";

	let { children } = $props();

    async function refreshToken() {
        const accessToken = localStorage.getItem('access_token')
        const expirationTime = localStorage.getItem('access_token_expires_at');
        const refreshToken = localStorage.getItem('refresh_token');
        const currentTime = Date.now() / 1000;

        // Check if the refresh token has expired
        if (!refreshToken === null || accessToken === null || expirationTime === null) {
            return goto("/admin/login", {invalidateAll: true, replaceState: true})
        }

        try {
            const response = await fetch(env.PUBLIC_API_SERVER+"/auth/token/refresh", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: (new URLSearchParams({
                        access_token: accessToken as string,
                        refresh_token: refreshToken as string
                    })).toString()
                });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const token = await response.json()
            localStorage.setItem("access_token", token.access_token.token)
            localStorage.setItem("access_token_expires_at", token.access_token.expires_at)
            localStorage.setItem("refresh_token", token.refresh_token.token)

            return scheduleTokenRefresh(token.access_token.expires_at)

        } catch (error) {
            console.error('Error refreshing token:', error);
            return goto("/admin/login", {invalidateAll: true, replaceState: true})
        }
    }

    // Function to schedule the token refresh
    function scheduleTokenRefresh(expiresAt: number) {
        const currentTime = Date.now() / 1000;
        const timeUntilExpiration = expiresAt - currentTime;

        if(window.refreshTimeout !== undefined ) {
            clearTimeout(window.refreshTimeout);
        }

        // Schedule a refresh 10 seconds before expiration
        if (timeUntilExpiration > 0) {
            window.refreshTimeout = setTimeout(refreshToken, (timeUntilExpiration - 5) * 1000);
        }
    }

    // Initial call to check and refresh the token
    async function initializeTokenManagement() {
        const accessToken = localStorage.getItem('access_token')
        const expiresAt = localStorage.getItem('access_token_expires_at');
        const refreshToken = localStorage.getItem('refresh_token');
        const currentTime = Date.now() / 1000;

        if (expiresAt && currentTime < parseInt(expiresAt, 10)) {
            // Token is still valid, schedule refresh
            const response = await fetch(env.PUBLIC_API_SERVER+"/auth/me", {
                    headers: {"Authorization": `Bearer ${accessToken}`}
                })
            
            if(!response.ok) {
                return goto("/admin/login", {invalidateAll: true, replaceState: true})
            }
            const userData: User = await response.json()
            currentUser.set(userData)
            scheduleTokenRefresh(parseInt(expiresAt, 10));
        } else {
            if(accessToken !== null && refreshToken !== null) {
                const response = await fetch(env.PUBLIC_API_SERVER+"/auth/token/refresh", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: (new URLSearchParams({
                        access_token: accessToken,
                        refresh_token: refreshToken
                    })).toString()
                })
                if(response.ok) {
                    const token = await response.json()
                    localStorage.setItem("access_token", token.access_token.token)
                    localStorage.setItem("access_token_expires_at", token.access_token.expires_at)
                    localStorage.setItem("refresh_token", token.refresh_token.token)
                    scheduleTokenRefresh(token.access_token.expires_at)
                    const userData: User = await (await fetch(env.PUBLIC_API_SERVER+"/auth/me",
                        {
                            headers: {"Authorization": `Bearer ${token.access_token.token}`}
                        }
                    )).json()
                    currentUser.set(userData)
                }
                
            }
            return goto("/admin/login", {invalidateAll: true, replaceState: true})
        }
    }

    initializeTokenManagement();
</script>

<svelte:head>
    <link rel="manifest" href="/manifest.json">
</svelte:head>

<div class="h-screen">
    <header class="bg-primary">
        <Header></Header>
    </header>
    <div class="w-full h-full flex flex-col md:flex-row">
        <div class="w-full md:w-1/2">
            <div class="w-full p-10">
                <span class="prose">
                    <h1 class="text-neutral">Welcome {$currentUser?.name}</h1>
                </span>
            </div>
            <div class="w-full lg:w-1/2 flex flex-col p-10 space-y-2">
                <a href="/admin/dashboard/edit" class="border-primary hover:bg-primary hover:text-secondary border-2 text-primary px-10 py-2"><button>Edit</button></a>
                <a href="/admin/dashboard/create" class="border-primary hover:bg-primary hover:text-secondary border-2 text-primary px-10 py-2"><button>Create</button></a>
            </div>
        </div>
        <div class="h-full w-full md:w-1/2 border p-5">
            {@render children()}
        </div>
    </div>
</div>