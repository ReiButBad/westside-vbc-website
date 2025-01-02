<script>
    import { goto } from "$app/navigation";

    goto("/admin/login", {invalidateAll: true, replaceState: true})
</script>