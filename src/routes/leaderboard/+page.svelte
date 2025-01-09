<script lang="ts">

    import "overlayscrollbars/overlayscrollbars.css"
    import Header from "$lib/components/Header.svelte"
    import { OverlayScrollbarsComponent } from "overlayscrollbars-svelte"
    import { env } from "$env/dynamic/public";

    const options: any = {
        overflow: {
            x: "scroll",
            y: "scroll"
        },
        scrollbars: {
            theme: "os-theme-dark",
            autoHide: "scroll",
            autoHideDelay: 500,
        }
    }

    // interface LeaderboardEntry {
    //     name: string
    //     points: number
    // }

    // let leaderboard: LeaderboardEntry[] = []

    function* enumFrom(values: Array<any>) {
        for( var i = 0; i < values.length; ++i ){
            yield [values[i], i+1]
        }
    }

    async function fetchList() {
        const response = await fetch(env.PUBLIC_API_SERVER+"/leaderboard/list")
        if(!response.ok) {
            return null
        }

        let data = await response.json()
        if(data.length === 0) {
            return null
        }

        return enumFrom(data)
    }
    
    // onMount(async () => {
    //     leaderboard = await (await fetch(env.PUBLIC_API_SERVER+"/leaderboard/list")).json()
    // })
</script>

<Header></Header>
<main class="w-full">
    <div class="w-full h-screen flex justify-center items-center lg:p-5">
        <div class="w-11/12 lg:w-2/3 h-full">
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
                <div class="h-full w-full flex flex-col py-2 lg:p-5">
                    <div class="flex overflow-y-auto w-full h-full bg-secondary">
                        <div class="flex flex-col border w-full">
                            {#if entries === null}
                                <div class="w-full h-full flex justify-center items-center text-4xl"><span class="prose">
                                    <h1 class="text-neutral/30">No entry found</h1>
                                </span></div>
                            {:else}
                                <div class="overflow-hidden h-full flex flex-col">
                                    <div class="p-2 w-full bg-primary text-secondary flex">
                                        <span class="p-2 w-2/12">Rank</span>
                                        <span class="text-center p-2 w-1/2">Name</span>
                                        <span class="text-center p-2 w-1/2">Points</span>
                                    </div>
                                    <OverlayScrollbarsComponent {options} element="div" defer class="!overflow-y-auto">
                                        {#each entries as entry}
                                            <div class="p-2 w-full hover:bg-neutral/10 flex group">
                                                <span class="p-2 w-2/12 font-bold group-first:text-yellow-500 group-[&:nth-child(2)]:text-slate-500 group-[&:nth-child(3)]:text-orange-500">{entry[1]}{entry[1] === 1 ? "st" : (entry[1] === 2 ? "nd" : (entry[1] === 3 ? "rd" : 'th'))}</span>
                                                <span class="p-2 w-1/2 text-center">{entry[0].name}</span>
                                                <span class="font-bold p-2 w-1/2 text-center group-first:text-yellow-500 group-[&:nth-child(2)]:text-slate-500 group-[&:nth-child(3)]:text-orange-500">{entry[0].points}pts</span>
                                            </div>
                                        {/each}
                                    </OverlayScrollbarsComponent>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {/await}
        </div>
    </div>
    <div class="pt-5 px-5 max-h-screen w-full flex justify-center items-center">
        <div class="w-full flex justify-center items-center pb-10 md:pb-20">
            <span>
                <span class="prose text-center">
                        <h2>The leaderboard highlights our most active members!</h2>
                        <h3>🎯 Earn points by:</h3>
                        <p>
                            Attending games <span class="font-bold">(5 points)</span> <br/>
                            Inviting friends <span class="font-bold">(5 points)</span> <br/>
                            Joining events <span class="font-bold">(10 points)</span> <br/>
                        </p>
                        <br/>
                        <h2>🏆 Want to be on top? Stay active and join us regularly!</h2>
                </span>
            </span>
        </div>
    </div>
</main>

<style></style>