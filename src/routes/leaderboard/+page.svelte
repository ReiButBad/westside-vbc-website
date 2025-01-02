<script lang="ts">
    import Header from "$lib/components/Header.svelte"
	import { onDestroy, onMount } from "svelte";
    import { env } from "$env/dynamic/public";

    interface LeaderboardEntry {
        name: string
        points: number
    }

    let leaderboard: LeaderboardEntry[] = []

    onMount(async () => {
        leaderboard = await (await fetch(env.PUBLIC_API_SERVER+"/leaderboard/list")).json()
    })
</script>

<Header></Header>
<main class="w-full h-screen">
    <div class="pt-5 px-5 max-h-screen w-full flex justify-center items-center">
        <div class="w-full lg:w-5/6">
            <ul class="p-5">
                {#each leaderboard as entry}
                    <li class="w-full bg-slate-100 my-2 rounded-xl">
                        <div class="p-5 w-full flex">
                            <span class="w-2/3">{entry.name}</span>
                            <span class="border-l border-secondary pl-10">{entry.points}pts</span>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
    <div class="pt-5 px-5 max-h-screen w-full flex justify-center items-center">
        <div>
            <span class="prose">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam earum odio fugiat delectus nobis recusandae magni expedita sed illo ut amet ad aut laborum, eaque doloribus, iste voluptatum voluptas.</p>
            </span>
        </div>
    </div>
</main>