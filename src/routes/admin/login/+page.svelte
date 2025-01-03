<script lang="ts">
	import { goto } from "$app/navigation";
    import { env } from "$env/dynamic/public";
	import { generateDeviceId } from "$lib/user";
    
    let button_disabled = false
    let username: string | undefined;
    let password: string | undefined;
    let msg: string = "";

    async function login() {
        msg = ""
        button_disabled = true
        const deviceId = generateDeviceId()
        const response = await fetch(
            env.PUBLIC_API_SERVER+"/auth/token?"+new URLSearchParams({device_id: deviceId}).toString(),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: (new URLSearchParams({
                    username: username as string,
                    password: password as string
                })).toString()
        })

        if(!response.ok) {
            button_disabled = false
            if(response.status === 401) {
                msg = "Invalid username or password!"
            }
            return
        }
        const token = await response.json()
        localStorage.setItem("access_token", token.access_token.token)
        localStorage.setItem("access_token_expires_at", token.access_token.expires_at)
        localStorage.setItem("refresh_token", token.refresh_token.token)
        goto("/admin/dashboard")
        localStorage.setItem("westside_device_id", deviceId)
    }

</script>

<div class="h-screen w-screen bg-primary">
    <div class="w-full h-full flex justify-center items-center">
        <div class="w-5/6 h-2/3 lg:w-1/4 lg:h-auto flex flex-col bg-secondary p-5 rounded-sm">
            <span class="text-lg pb-10">
                <p>Westsidevbc Admin</p>
            </span>
            <div class="w-full text-red-600">
                {msg}
            </div>
            <form class="flex flex-col w-full h-full space-y-2">
                <input class="w-full" bind:value={username} type="text" placeholder="username" class:border-red-500={username === ""}>
                <input class="w-full" class:border-red-500={password === ""} bind:value={password} type="password" placeholder="password">
                <button class="border bg-primary border-primary text-neutral disabled:bg-[#cccccc] disabled:border-[#cccccc] p-3 enabled:hover:bg-[#0957c3] enabled:hover:border-[#0957c3] enabled:text-secondary !transition-colors !duration-200" disabled={button_disabled || (!username || !password)} on:click|preventDefault={login}>Login</button>
            </form>
        </div>
    </div>
</div>