<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { goto } from "$app/navigation";
	import Header from "$lib/components/Header.svelte";
    import { currentUser, getDeviceId, signOut, getAuthHeader, credentialsMissing } from "$lib/user";
    import type { User } from "$lib/user";
	import { page } from "$app/state";
	import Confirm from "$lib/components/Confirm.svelte";

	let { children } = $props();
    let signingOut = $state(false);

    async function refreshToken() {
        console.info("refreshing token")
        const accessToken = localStorage.getItem('access_token')
        const expirationTime = localStorage.getItem('access_token_expires_at');
        const refreshToken = localStorage.getItem('refresh_token');

        if (refreshToken === null || accessToken === null || expirationTime === null) {
            if(accessToken !== null) {
                await fetch(env.PUBLIC_API_SERVER+"/auth/token/invalidate", {method: "POST", headers: {...getAuthHeader()}})
            }

            // localStorage.removeItem("access_token")
            // localStorage.removeItem("access_token_expires_at")
            // localStorage.removeItem("refresh_token")
            // return goto("/admin/login", {invalidateAll: true, replaceState: true})
            return
        }

        try {
            const response = await fetch(env.PUBLIC_API_SERVER+"/auth/token/refresh?"+new URLSearchParams({device_id: getDeviceId()}).toString(), {
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
            localStorage.removeItem("access_token")
            localStorage.removeItem("access_token_expires_at")
            localStorage.removeItem("refresh_token")
            window.location.href = "/admin/login"
            return
        }
    }

    function scheduleTokenRefresh(expiresAt: number) {
        const currentTime = Date.now() / 1000;
        const timeUntilExpiration = expiresAt - currentTime;

        if(window.refreshTimeout !== undefined ) {
            clearTimeout(window.refreshTimeout);
        }

        if (timeUntilExpiration > 0) {
            window.refreshTimeout = setTimeout(refreshToken, (timeUntilExpiration - 5) * 1000);
        }
    }

    async function initializeTokenManagement() {
        const accessToken = localStorage.getItem('access_token')
        const expiresAt = localStorage.getItem('access_token_expires_at');
        const refreshToken = localStorage.getItem('refresh_token');
        const currentTime = Date.now() / 1000;

        window.addEventListener("storage", (event) => {
            if(event.key === null) return
            if (["refresh_token", "access_token_expires_at", "access_token"].includes(event.key)) {
                if(event.newValue === null) credentialsMissing.set(true);
            }
        })
        
        if (refreshToken && expiresAt && currentTime < parseInt(expiresAt, 10)) {
            const response = await fetch(env.PUBLIC_API_SERVER+"/auth/me", {
                    headers: {"Authorization": `Bearer ${accessToken}`}
                })
            
            if(!response.ok) {
                localStorage.removeItem("access_token")
                localStorage.removeItem("access_token_expires_at")
                localStorage.removeItem("refresh_token")
                window.location.href = "/admin/login"
                return
            }
            const userData: User = await response.json()
            currentUser.set(userData)
            scheduleTokenRefresh(parseInt(expiresAt, 10));

            return credentialsMissing.set(false)
        } else {
            if(accessToken !== null && refreshToken !== null && expiresAt !== null) {
                const response = await fetch(env.PUBLIC_API_SERVER+"/auth/token/refresh?"+new URLSearchParams({device_id: getDeviceId()}).toString(), {
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

                    credentialsMissing.set(false)
                    return currentUser.set(userData)
                }
                
            } else if(accessToken !== null) {
                await fetch(env.PUBLIC_API_SERVER+"/auth/token/invalidate", {method: "POST", headers: {Authorization: `Bearer ${accessToken}`}})
            }
            localStorage.removeItem("access_token")
            localStorage.removeItem("access_token_expires_at")
            localStorage.removeItem("refresh_token")
            window.location.href = "/admin/login"
            return

        }
    }

    initializeTokenManagement();
</script>

<svelte:head>
    <link rel="manifest" href="/manifest.json">
</svelte:head>

<div class="fixed top-0 left-0 w-screen h-screen z-50 bg-primary transition-opacity duration-1000" class:opacity-0={$currentUser} class:pointer-events-none={$currentUser}>
    <div class="w-full h-full flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
            <path class="stroke-secondary !transition-none" fill="none" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 4.03 9 9">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
                <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
            </path>
        </svg>
    </div>
</div>

<div class="h-screen">
    <div>
        <Header showNav={false}/>
    </div>
    <div class="w-full h-full flex flex-col md:flex-row">
        <div class="w-full flex flex-col md:w-1/2">
            <div class="w-full p-10">
                <span class="prose">
                    <h1 class="text-neutral">Welcome {$currentUser?.name}</h1>
                </span>
            </div>
            <div class="w-full lg:w-1/2 flex flex-col p-10 space-y-2">
                <a href={page.url.pathname !== "/admin/dashboard" ? "/admin/dashboard/" : ""} class="border-primary hover:bg-primary hover:text-secondary border-2 text-primary px-10 py-2" class:bg-primary={page.url.pathname === "/admin/dashboard"} class:text-secondary={page.url.pathname === "/admin/dashboard"} data-sveltekit-noscroll data-sveltekit-replacestate><button>List</button></a>
                <a href={page.url.pathname !== "/admin/dashboard/edit" ? "/admin/dashboard/edit" : ""} class="border-primary hover:bg-primary hover:text-secondary border-2 text-primary px-10 py-2" class:bg-primary={page.url.pathname === "/admin/dashboard/edit"} class:text-secondary={page.url.pathname === "/admin/dashboard/edit"} data-sveltekit-noscroll data-sveltekit-replacestate><button>Edit</button></a>
                <a href={page.url.pathname !== "/admin/dashboard/create" ? "/admin/dashboard/create" : ""} class="border-primary hover:bg-primary hover:text-secondary border-2 text-primary px-10 py-2" class:bg-primary={page.url.pathname === "/admin/dashboard/create"} class:text-secondary={page.url.pathname === "/admin/dashboard/create"} data-sveltekit-noscroll data-sveltekit-replacestate><button>Create</button></a>
                <a href={page.url.pathname !== "/admin/dashboard/delete" ? "/admin/dashboard/delete" : ""} class="border-primary hover:bg-primary hover:text-secondary border-2 text-primary px-10 py-2" class:bg-primary={page.url.pathname === "/admin/dashboard/delete"} class:text-secondary={page.url.pathname === "/admin/dashboard/delete"} data-sveltekit-noscroll data-sveltekit-replacestate><button>Delete</button></a>
            </div>
            <div class="w-full lg:w-1/2 h-full flex flex-col justify-end p-10 space-y-2">
                <button onclick={() => signingOut = true} class="border-red-400 hover:bg-red-500 hover:text-secondary border-2 text-red-400 px-10 py-2">Sign out</button>
            </div>
        </div>
        <div class="h-full w-full md:w-1/2 border">
            {@render children()}
        </div>
    </div>
</div>

{#if $credentialsMissing}
    <div class="h-screen w-screen bg-primary z-50 fixed top-0 left-0">
        <div class="w-full h-full flex flex-col justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
                <path class="fill-secondary" d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-5h-2z" />
            </svg>
            <div>
                <span class="text-2xl text-secondary">Session error please refresh page (necessary data are missing)</span>
            </div>
        </div>
    </div>
{/if}

{#if signingOut}
    <Confirm yesFunc={() => {signOut(); window.location.href = "/admin/login"}} noFunc={() => signingOut = false} text="Are you sure you want to sign out?"></Confirm>
{/if}