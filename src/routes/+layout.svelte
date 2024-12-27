<script lang="ts">
	import '../app.css';
	import Favicon from "$lib/images/favicon.ico"
	let { children } = $props();
	// import 'overlayscrollbars/overlayscrollbars.css'
    // import { OverlayScrollbars } from "overlayscrollbars"
	// import { onMount } from "svelte";

    // onMount(() => {
    //     OverlayScrollbars({
    //         target: document.querySelector("body") as HTMLBodyElement
    //     }, {
    //         overflow: {
    //             x: "hidden"
    //         },
    //         scrollbars: {
    //             theme: "os-theme-normal",
    //             autoHide: "scroll"
    //         }
    //     })
    // })
</script>

<svelte:head>
	<title>Westside Volleyball Community</title>
	<link rel="icon" type="image/x-icon" href={Favicon}>
    <meta name="description" content="The next level volleyball community in West Surabaya">
    <meta name="keywords" content="volleyball, voli, olahraga, surabaya, surabaya barat">

    <meta property="og:title" content="Westside Volleyball Community">
    <meta property="og:description" content="The next level volleyball community in West Surabaya">
    <meta property="og:image" content="https://raw.githubusercontent.com/ReiButBad/westside-vbc-website/refs/heads/master/src/lib/images/logo.webp">
    <meta property="og:url" content="https://westsidevbc.top">
</svelte:head>
{@render children()}

<!-- <style>
	:global(.os-theme-normal) {
		--os-size: 10px;
		--os-handle-bg: #b3b3b3af;
		--os-handle-border-radius: 10px;
		--os-padding-perpendicular: -zpx;
	}
</style> -->