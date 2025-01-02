<script lang="ts">
    const { yesFunc, noFunc, text, yesText = "Yes", noText = "No" } = $props();
</script>

<div class="fixed top-0 left-0 w-screen h-screen bg-neutral/50 z-50">
    <div class="w-full h-full flex justify-center items-center">
        <div class="bg-secondary w-5/6 lg:w-1/4 h-40 p-5">
            <div class="w-full h-full flex flex-col">
                <span class="w-full h-full">
                    <p>{text}</p>
                </span>
                <div class="w-full flex space-x-5">
                    <button onclick={yesFunc} class="w-full rounded-sm h-10 bg-neutral/10 hover:bg-neutral/20">{yesText}</button>
                    <button onclick={noFunc} class="w-full rounded-sm h-10 bg-red-400 hover:bg-red-500">{noText}</button>
                </div>
            </div>
        </div>
    </div>
</div>