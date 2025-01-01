<script>
    const { children } = $props();
</script>

<svelte:head>
    <meta name="mobile-wep-app-capable" content="yes">
    <meta name="apple-mobile-wep-app-capable" content="yes">
</svelte:head>

{@render children()}