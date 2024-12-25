<script lang="ts">
    import Header from "$lib/components/Header.svelte"
    import SpikeBlocked from "$lib/images/spike_blocked.webp"
    import SpikeBlockedHorizontal from "$lib/images/spike_blocked_banner.webp"
    import Group1 from "$lib/images/group.jpg"
    import Group2 from "$lib/images/group_2.jpg"
    import Court from "$lib/images/court.jpg"
    import Group3Horizontal from "$lib/images/group3_horizontal.jpg"
    import Group3 from "$lib/images/group3.jpg"
    import SekolahC from "$lib/images/sekolah_ciputra.jpg"
    import SekolahMDC from "$lib/images/sekolah_mdc.webp"
</script>

<main>
    <div class="flex flex-col-reverse xl:flex-row w-full xl:h-dvh">
        <div class="flex flex-col items-center max-xl:pt-10 xl:items-start xl:flex-grow xl:h-full bg-primary">
            <div class="hidden xl:block"><Header/></div>
            <div class="prose min-w-full h-full px-10 pb-10 xl:pb-0 xl:px-24">
                <h1 class="text-secondary font-normal font-norwester xl:text-5xl">THE NEXT LEVEL VOLLEYBALL COMMUNITY IN WEST SURABAYA</h1>
                <p class="text-secondary text-lg xl:text-xl">Welcome to the WESTSIDE Volleyball Community! Join us as we bring the excitement of volleyball to life in a place where the sport is just beginning to take root. Our vibrant community gathers every weekend and occasionally on weekdays for friendly matches that welcome players of all skill levels. Whether you're looking to sharpen your skills, make new friends, or simply enjoy the thrill of the game, you'll find your place here!
                </p>
            </div>
        </div>
        <div class="w-full xl:w-max h-full">
            <picture>
                <source 
                  media="(min-width: 1280px)" 
                  srcset="{SpikeBlocked}">
                <source 
                  media="(max-width: 1280px)" 
                  srcset="{SpikeBlockedHorizontal}">
                <img 
                  class="overflow-hidden w-full xl:h-dvh object-cover" 
                  src="{SpikeBlocked}" 
                  alt="banner">
            </picture>
            <!-- <img
                class="w-full lg:h-dvh object-cover"
                srcset="{SpikeBlockedHorizontal} 1023w,{SpikeBlocked} 1024w"
                src={SpikeBlocked}
                alt="banner"> -->
        </div>
        <div class="xl:hidden bg-primary"><Header/></div>
    </div>
    <div class="flex w-full xl:h-dvh">
        <div class="w-full h-full">
            <picture class="brightness-100">
                <source 
                  media="(min-width: 1024px)" 
                  srcset="{Group3Horizontal}">
                <source
                    media="(max-width: 1024px)" 
                  srcset="{Group3}">
                <img 
                  class="overflow-hidden w-full lg:h-dvh object-cover" 
                  src="{Group3Horizontal}"
                  alt="banner">
                <div class="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-t max-xl:to-primary max-xl:via-transparent from-neutral">
                    <div class="w-full h-full flex flex-col items-start justify-end">
                        <span class="prose">
                            <h1 class="p-5 text-secondary font-norwester font-normal xl:text-6xl">LOCATION</h1>
                        </span>
                    </div>
                </div>
            </picture>
        </div>
    </div>
    <div class="flex flex-col w-full bg-neutral">
        <div class="flex">
            <div class="w-full p-2 lg:p-5 lg:pt-14 h-max flex justify-center items-center">
                <img class="w-max rounded-lg bg-neutral" src={Group1} alt="group">
            </div>
            <div class="w-full p-2 lg:p-5 h-max flex justify-center items-center">
                <img class="w-max rounded-lg bg-neutral" src={Court} alt="court">
            </div>
            <div class="w-full p-2 lg:p-5 lg:pt-14 h-max flex justify-center items-center">
                <img class="w-max rounded-lg bg-neutral" src={Group2} alt="group">
            </div>
        </div>
        <div class="w-full py-20 px-5">
            <span class="prose text-secondary">
                <p class="text-xl">We usually play in <a target="_blank" href="https://maps.app.goo.gl/94kQcQ2opjreAUyT6">Sekolah Ciputra Surabaya</a> for most of our matches. But we occasionally play in <a target="_blank" href="https://maps.app.goo.gl/wJFnHrA6AXUTVLEz9">SMP SMA Kristen Masa Depan Cerah</a>, so it depends on our members and our availablity. Even so, we still gurantee matches on weekend (except when its a national or international holiday)</p>
            </span>
        </div>
    </div>
    <!-- <div class="w-full flex justify-around">
        <img class="xl:h-dvh rounded-xl" src={SekolahC} alt="sekolah ciputra">
        <img class="xl:h-dvh rounded-xl" src={SekolahMDC} alt="sekolah mdc">
    </div> -->
</main>

<style>
    * {
        @apply transition-all duration-200;
    }

    a {
        @apply text-primary;
        text-decoration: none;
        filter: brightness(2)
    }

    a:hover {
        filter: brightness(1.5);
    }
</style>