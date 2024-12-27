<script lang="ts">
    import Header from "$lib/components/Header.svelte"
    import SpikeBlocked from "$lib/images/spike_blocked.webp"
    import Group1 from "$lib/images/group.webp"
    import Group2 from "$lib/images/group2.webp"
    import Court from "$lib/images/court.webp"
    import Group3Horizontal from "$lib/images/group3_horizontal.webp"
    import Group3 from "$lib/images/group3.webp"
</script>

<main>
    <div class="flex flex-col-reverse xl:flex-row w-full xl:h-screen">
        <div style="background-image: url('{SpikeBlocked}'); background-size: cover;" class="flex flex-col items-center h-svh xl:items-start xl:flex-grow xl:h-full xl:!bg-none xl:bg-primary">
            <div class="flex justify-center lg:justify-start bg-primary w-full xl:mb-10"><Header/></div>
            <div class="prose min-w-full h-full px-10 sm:px-24 pb-10 pt-10 sm:pt-24 xl:pt-0 xl:pb-0 xl:px-24 bg-neutral/70 xl:bg-transparent">
                <h1 class="text-secondary font-normal font-norwester md:text-5xl">THE NEXT LEVEL VOLLEYBALL COMMUNITY IN WEST SURABAYA</h1>
                <span class="w-full flex flex-col-reverse justify-center items-center h-full sm:block"><a href="#home" class="border-secondary hover:bg-secondary hover:text-neutral border-2 text-secondary px-10 py-2"><button>Learn More</button></a></span>
            </div>
        </div>
        <div class="w-full xl:w-max h-full">
            <picture class="hidden xl:block">
                <source srcset="{SpikeBlocked}">
                <img 
                  class="overflow-hidden w-full xl:h-dvh object-cover" 
                  src="{SpikeBlocked}" 
                  alt="banner">
            </picture>
        </div>
        <!-- <div class="xl:hidden bg-primary"><Header/></div> -->
    </div>
    <div class="w-full h-dvh flex justify-center items-center bg-secondary" id="home">
        <div class="w-full h-5/6 md:h-1/2 lg:w-2/3 lg:h-2/3 p-10">
            <span class="prose">
                <h2 class="text-neutral text-center text-3xl md:text-5xl">Join The WestSide Volleyball Community!</h2>
                <p class="text-neutral text-lg text-center lg:text-xl">Welcome to the WESTSIDE Volleyball Community! Join us as we bring the excitement of volleyball to life in a place where the sport is just beginning to take root. Our vibrant community gathers every weekend and occasionally on weekdays for friendly matches that welcome players of all skill levels. Whether you're looking to sharpen your skills, make new friends, or simply enjoy the thrill of the game, you'll find your place here!
                </p>
                <span class="w-full flex justify-center items-center"><a href="https://chat.whatsapp.com/IsYs9YcvnXO12uWsaoUW35" target="_blank" class="border-primary hover:bg-primary hover:text-secondary border-2 text-primary px-10 py-2"><button>Join Our WhatsApp Group!</button></a></span>
            </span>
        </div>
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
                <div class="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-t to-secondary via-transparent from-neutral">
                    <!-- <div class="w-full h-full flex flex-col items-start justify-end">
                        <span class="prose">
                            <h1 class="p-5 text-secondary font-norwester font-normal xl:text-6xl">LOCATION</h1>
                        </span>
                    </div> -->
                </div>
            </picture>
        </div>
    </div>
    <div class="flex flex-col w-full">
        <div class="flex items-center md:h-screen bg-neutral">
            <div class="w-full p-2 lg:p-20 h-full flex flex-col-reverse lg:flex-row justify-center items-center">
                <img class="lg:h-full p-10 md:px-40 lg:px-0 lg:pr-20" src={Group1} alt="group">
                <span class="prose p-10">
                    <h2 class="text-secondary text-3xl lg:text-4xl">Activities</h2>
                    <p class="text-secondary lg:text-lg">We have matches on weekends, usually on Saturdays and Sundays, and occasionally on weekdays depending on player availability. We also sometimes host post-match dinners to celebrate and appreciate our efforts.</p>
                </span>
            </div>
        </div>
        <div class="flex items-center lg:h-screen bg-primary">
            <div class="w-full p-2 lg:p-20 h-full flex flex-col-reverse lg:flex-row-reverse justify-center items-center">
                <img class="lg:h-full p-10 md:px-40 lg:px-0 lg:pl-20" src={Group2} alt="group">
                <span class="prose px-10 pt-10 lg:p-10">
                    <h2 class="text-secondary text-3xl lg:text-4xl">Members</h2>
                    <p class="text-secondary lg:text-lg">We offer our members the privilege of playing on Sekolah Ciputra's court for free during practices or matches. Additionally, free water is provided to ensure you stay hydrated during activities.</p>
                    <span class="w-full flex justify-center lg:justify-start"><a href="/" class="border-neutral bg-neutral hover:border-secondary hover:bg-secondary text-secondary hover:text-neutral border-2 px-10 py-2"><button>View Our Committee</button></a></span>
                </span>
            </div>
        </div>
        <div class="flex items-center lg:h-screen bg-secondary">
            <div class="w-full p-2 lg:p-20 h-full flex flex-col-reverse lg:flex-row justify-center items-center">
                <img class="lg:h-full p-10 md:px-40 lg:px-0 lg:pr-20" src={Court} alt="court">
                <span class="prose p-10">
                    <h2 class="text-neutral text-3xl lg:text-4xl">Training</h2>
                    <p class="text-neutral lg:text-lg">We hold training sessions on match days, allowing players to immediately apply what they've practiced to real gameplay. Our training doubles as a warm-up, focusing on building confidence and honing skills through hands-on experience. It's all about growing together as a team and leveling up through practice and play.</p>
                </span>
            </div>
        </div>
        <!-- <div class="w-full py-20 px-5">
            <span class="prose text-secondary">
                <p class="text-xl">We usually play in <a target="_blank" href="https://maps.app.goo.gl/94kQcQ2opjreAUyT6">Sekolah Ciputra Surabaya</a> for most of our matches. But we occasionally play in <a target="_blank" href="https://maps.app.goo.gl/wJFnHrA6AXUTVLEz9">SMP SMA Kristen Masa Depan Cerah</a>, so it depends on our members and our availablity. Even so, we still gurantee matches on weekend (except when its a national or international holiday)</p>
            </span>
        </div> -->
    </div>
</main>

<style>
    * {
        @apply transition-all duration-75;
    }

    /* a {
        @apply text-primary;
        text-decoration: none;
        filter: brightness(2)
    }

    a:hover {
        filter: brightness(1.5);
    } */
</style>