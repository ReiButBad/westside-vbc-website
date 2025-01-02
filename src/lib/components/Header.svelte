<script>
    import LogoBanner from "$lib/images/logo_banner.webp"
</script>

<header id="header" class="w-full sticky top-0 z-20 shadow-md shadow-neutral/20">
    <div class="py-2 md:pl-2 sticky flex flex-col md:flex-row justify-center xl:justify-start z-50 bg-primary">
        <div class="z-30 w-full flex justify-center items-center md:justify-start">
            <img class="w-32 md:w-60" src={LogoBanner} alt="logo westside">
        </div>
        <div class="w-full bg-primary/40 py-1 md:py-0">
            <div class="w-full h-full flex items-center">
                <div class="w-full h-full flex justify-center md:justify-end items-center md:pr-10">
                    <a class="hover:text-secondary text-md text-secondary/70 px-3 md:px-6" href="/">Home</a>
                    <a class="hover:text-secondary text-md text-secondary/70 px-3 md:px-6" href="/leaderboard">Leaderboard</a>
                    <a class="hover:text-secondary text-md text-secondary/70 px-3 md:px-6" href="/merch">Merch</a>
                    <a class="hover:text-secondary text-md text-secondary/70 px-3 md:px-6" href="/contact">Contact</a>
                </div>
            </div>
        </div>
    </div>
</header>
