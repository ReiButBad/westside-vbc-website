<script lang="ts">
	import { env } from "$env/dynamic/public";
	import { getAuthHeader } from "$lib/user";

    let name: string | undefined;
    let points: number = 0;
    let isCreating = false;
    let success: boolean | null = null

    async function submit() {
        if(success !== null) {
            success = null
            return
        }
        isCreating = true
        try {
            const response = await fetch(env.PUBLIC_API_SERVER+"/leaderboard/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeader()
                },
                body: JSON.stringify({
                    name: name,
                    points: points
                })
            })
            if(!response.ok) {
                success = false;
                return
            }
            success = true;
            name = undefined;
            points = 0;
        } catch {
            success = false;
        } finally {
            isCreating = false
        }
    }

    function disable() {
        if(success == true || success == false) return false
        if (name === "" || !Number.isInteger(points)) return true
    }


</script>

<div class="h-screen w-full flex flex-col p-5">
    <form class="flex flex-col md:block">
        <span class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 pb-2">
            <input class="w-full" bind:value={name} type="text" placeholder="name" class:border-red-500={name == ""}>
            <input class="w-full" class:border-red-500={!Number.isInteger(points)} bind:value={points} type="number" min="0" step="1" placeholder="points">
        </span>
        <span class="w-full">
            <button on:click|preventDefault={submit} class="w-full p-3 border-primary enabled:hover:bg-primary enabled:hover:text-secondary disabled:border-primary/50 border-2 text-primary flex justify-center {(success !== null) ? ((success || !(success === false)) ? 'hover:!bg-green-600' : 'hover:!bg-red-600') : ''}" class:!border-green-500={success} class:bg-green-500={success} class:!border-red-500={success === false} class:bg-red-500={success === false} class:text-secondary={success !== null} disabled={disable()}>
                {#if isCreating}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 4.03 9 9">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
                            <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                        </path>
                    </svg>
                {:else if success == null}
                    Create
                {:else if success}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" />
                    </svg><span class="pl-2">(click to dismiss)</span>
                {:else if success === false}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2z" />
                    </svg><span class="pl-2">Something went wrong!</span>
                {/if}
            </button>
        </span>
    </form>
</div>