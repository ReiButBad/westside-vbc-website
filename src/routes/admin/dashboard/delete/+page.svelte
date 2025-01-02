<script lang="ts">
	import { env } from "$env/dynamic/public";
    import { page } from "$app/state";
	import { getAuthHeader } from "$lib/user";
	import Confirm from "$lib/components/Confirm.svelte";


    interface Data {
        name: string
        points: number
    }

    const params = new URLSearchParams(window.location.search);

    let suggestions: Data[] = []
    let timeout: number | undefined;
    let isDeleting: boolean = false;
    let isFetching: boolean = false;
    let confirming: boolean = false;
    let success: boolean | null = null;
    let dataSelected: Data | undefined = page.data.entry;
    let name = "";

    if(dataSelected) {
        name = dataSelected.name
    }

    async function fetchSuggestions(query: string) {
        isFetching = true
        dataSelected = undefined
        
        try {
            if (query.length === 0) {
                suggestions = [];
                return;
            }

            const response = await fetch(env.PUBLIC_API_SERVER+"/leaderboard/list?" + new URLSearchParams({
                name: name
            }));

            if(!response.ok) { 
                console.error(response.status)
                suggestions = []
                dataSelected = undefined
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
        if(name === dataSelected?.name || name === "") return
        isFetching = true
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fetchSuggestions(name);
        }, 1000);
    }

    $: if(name) updateSuggestions();

    // Function to handle suggestion selection
    function selectSuggestion(data: Data) {
        dataSelected = data;
        name = data.name;
        suggestions = [];
    }

    function disable() {
        if(success == true || success == false) return false
        return dataSelected === undefined
    }

    function inputDisabled() {
        return success !== null
    }

    async function submit() {
        if(success !== null) {
            if(success) {
                name = ""
            }
            success = null
            return
        }

        if(!confirming) {
            confirming = true
            return
        }

        confirming = false


        isDeleting = true
        try {
            const body = {
                name: name,
            }
            const response = await fetch(`${env.PUBLIC_API_SERVER}/leaderboard/${dataSelected?.name}`, {
                method: "DELETE",
                headers: {
                    ...getAuthHeader()
                },
            });
            if(!response.ok) {
                throw Error(`${response.status} ${response.statusText}`)
            }

            success = true
            dataSelected = undefined
            name = "";
        } catch (e) {
            console.error(e)
            success = false;
        } finally {
            isDeleting = false
        }
    }
</script>

<div class="h-screen w-full flex flex-col p-5">
    <div class="w-full flex flex-col">
        <div class="w-full flex">
            <p class="w-full m-1">Name</p>
            <p class="w-full m-1">Points</p>
        </div>
        <form class="flex">
            <input bind:value={name} type="text">
            <input disabled value={dataSelected?.points} type="number">
        </form>
        <div class="flex justify-end">
            <button on:click|preventDefault={submit} class="m-1 p-2 w-full border-primary enabled:hover:bg-primary enabled:hover:text-secondary disabled:border-primary/50 border-2 text-primary flex justify-center {(success !== null) ? ((success || !(success === false)) ? 'hover:!bg-green-600' : 'hover:!bg-red-600') : ''}" class:!border-green-500={success} class:bg-green-500={success} class:!border-red-500={success === false} class:bg-red-500={success === false} class:text-secondary={success !== null} disabled={disable()}>
                {#if isDeleting}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 4.03 9 9">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
                            <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                        </path>
                    </svg>
                {:else if success == null}
                    Delete
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

{#if confirming}
    <Confirm yesFunc={() => submit()} noFunc={() => confirming = false} text="Are you sure you want to delete '{dataSelected?.name}'?"></Confirm>
{/if}

<style>
    input {
        @apply m-1 p-2 w-full border-neutral disabled:border-neutral/50
    }
</style>