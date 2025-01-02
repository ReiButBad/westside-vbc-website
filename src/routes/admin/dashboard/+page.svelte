<script lang="ts">
	import { env } from "$env/dynamic/public";

    async function fetchList() {
        const response = await fetch(env.PUBLIC_API_SERVER+"/leaderboard/list")
        if(!response.ok) {
            return null
        }

        return await response.json()
    }
</script>

<div>
    {#await fetchList()}
        <div class="w-full h-full flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 4.03 9 9">
                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
                    <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                </path>
            </svg>
        </div>
    {:then entries}
        <div class="h-screen w-full flex flex-col p-5">
            <div class="flex overflow-y-auto w-full h-full bg-secondary">
                <div class="flex flex-col my-2 border w-full">
                    {#if entries === null}
                        <div>No entry found</div>
                    {:else}
                        <div class="overflow-hidden">
                            <div class="p-2 w-full bg-primary text-secondary flex">
                                <span class="p-2 w-1/2">Name</span>
                                <span class="p-2 w-1/2">Points</span>
                            </div>
                            <div class="h-full !overflow-y-auto">
                                {#each entries as entry}
                                    <div class="p-2 w-full hover:bg-neutral/10 flex">
                                        <span class="p-2 w-1/2">{entry.name}</span>
                                        <span class="p-2 w-1/3">{entry.points}pts</span>
                                        <a class="p-2 px-5 border border-neutral text-neutral hover:border-primary hover:text-secondary hover:bg-primary" href="/admin/dashboard/edit?name={entry.name}"><button>Edit</button></a>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {/await}
</div>