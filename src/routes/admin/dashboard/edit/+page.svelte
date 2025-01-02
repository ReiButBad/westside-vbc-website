<script lang="ts">
	import { env } from "$env/dynamic/public";
    import { page } from "$app/state";


    interface Data {
        name: string
        points: number
    }

    const params = new URLSearchParams(window.location.search);

    let suggestions: Data[] = []
    let timeout: number | undefined;
    let isEditing: boolean = false;
    let isFetching: boolean = false;
    let success: boolean | null = null;
    let dataSelected: Data | undefined = page.data.entry;
    let oldName = "";
    let newName = "";
    let oldPoints: number | undefined;
    let newPoints: number | undefined;

    if(dataSelected) {
        oldName = dataSelected.name
        oldPoints = dataSelected.points
    }

    async function fetchSuggestions(query: string) {
        isFetching = true
        dataSelected = undefined
        oldPoints = undefined
        
        try {
            if (query.length === 0) {
                suggestions = [];
                return;
            }

            const response = await fetch(env.PUBLIC_API_SERVER+"/leaderboard/list?" + new URLSearchParams({
                name: oldName
            }));

            if(!response.ok) { 
                console.error(response.status)
                suggestions = []
                dataSelected = undefined
                oldPoints = undefined
                return
            }

            suggestions = await response.json();
        } catch (e) {
            console.error(e)
        } finally {
            isFetching = false
        }
    }

    // Update suggestions with debouncing
    function updateSuggestions() {
        if(oldName === dataSelected?.name || oldName === "") return
        isFetching = true
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fetchSuggestions(oldName);
        }, 1000);
    }

    $: if(oldName) updateSuggestions();

    // Function to handle suggestion selection
    function selectSuggestion(data: Data) {
        dataSelected = data;
        oldName = data.name;
        oldPoints = data.points;
        suggestions = [];
    }

    function disable() {
        if(success == true || success == false) return false
        if (newName === "" || !Number.isInteger(newPoints)) return true
    }

    function submit() {
        isEditing = true
        const body = {
            name: newName || oldName
        }
        console.log(body)
        isEditing = false
    }
</script>

<div class="h-screen w-full flex flex-col p-5">
    <div class="w-full flex flex-col">
        <div class="w-full flex">
            <p class="w-full m-1">Old data</p>
            <p class="w-full m-1">New data</p>
        </div>
        <form class="flex">
            <input bind:value={oldName} type="text" placeholder="name">
            <input bind:value={newName} type="text" placeholder="name" disabled={dataSelected === undefined}>
        </form>
        <form class="flex">
            <input bind:value={oldPoints} type="number" placeholder="points" disabled>
            <input bind:value={newPoints} type="number" placeholder="points" disabled={dataSelected === undefined}>
        </form>
        <div class="flex justify-end">
            <div class="w-full m-1 p-2"></div>
            <button on:click|preventDefault={submit} class="m-1 p-2 w-full border-primary enabled:hover:bg-primary enabled:hover:text-secondary disabled:border-primary/50 border-2 text-primary flex justify-center {(success !== null) ? ((success || !(success === false)) ? 'hover:!bg-green-600' : 'hover:!bg-red-600') : ''}" class:!border-green-500={success} class:bg-green-500={success} class:!border-red-500={success === false} class:bg-red-500={success === false} class:text-secondary={success !== null} disabled={disable()}>
                {#if isEditing}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 4.03 9 9">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
                            <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                        </path>
                    </svg>
                {:else if success == null}
                    Edit
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
        </div>
    </div>
    <div class="flex overflow-y-auto w-full h-full bg-secondary">
        <div class="flex flex-col my-2 border w-full">
            {#if isFetching}
                <div class="w-full h-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 4.03 9 9">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
                            <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                        </path>
                    </svg>
                </div>
            {:else}
                <div class="!overflow-y-auto">
                    {#each suggestions as suggestion}
                        <button class="p-2 w-full hover:bg-neutral hover:text-secondary text-left" on:click={() => selectSuggestion(suggestion)} disabled={dataSelected?.name === suggestion.name}>
                            <span class="p-2">{suggestion.name}</span>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    input {
        @apply m-1 p-2 w-full border-neutral disabled:border-neutral/50
    }
</style>