<script lang="ts">
	import { goto } from "$app/navigation";
    import { env } from "$env/dynamic/public";
    
    let button_disabled = false
    let username = "";
    let password = "";

    async function login() {
        button_disabled = true
        const response = await fetch(env.PUBLIC_API_SERVER+"/auth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: (new URLSearchParams({
                username: username,
                password: password
            })).toString()
        })

        if(!response.ok) {
            button_disabled = false
            return
        }
        const token = await response.json()
        localStorage.setItem("access_token", token.access_token.token)
        localStorage.setItem("access_token_expires_at", token.access_token.expires_at)
        localStorage.setItem("refresh_token", token.refresh_token.token)
        goto("/admin/dashboard")
    }

</script>

<form>
    <input bind:value={username} type="text" placeholder="name">
    <input bind:value={password} type="password" placeholder="password">
    <button disabled={button_disabled} on:click|preventDefault={login}>Login</button>
</form>