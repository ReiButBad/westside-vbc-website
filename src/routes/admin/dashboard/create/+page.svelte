<script lang="ts">
    let name = "";
    let points = 0;

    function submit() {
        console.log(points)
    }


</script>

<div>
    <form class="flex flex-col md:block">
        <span class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 pb-2">
            <input class="w-full" bind:value={name} type="text" placeholder="name" class:border-red-500={name == ""}>
            <input class="w-full" class:border-red-500={!Number.isInteger(points)} bind:value={points} type="number" min="0" step="1" placeholder="points">
        </span>
        <span class="w-full">
            <button on:click|preventDefault={submit} class="w-full p-3 border-primary enabled:hover:bg-primary enabled:hover:text-secondary disabled:border-primary/50 border-2 text-primary" disabled={name === "" || Number.isInteger(points)}>Create</button>
        </span>
    </form>
</div>