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
	<title>WestSide Volleyball Community</title>
	<link rel="icon" type="image/x-icon" href={Favicon}>
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