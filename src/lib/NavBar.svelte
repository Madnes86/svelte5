<script lang="ts">
    let links = [
        { name: "/icons/home.png", href: "/" },
        { name: "/icons/key.png",  href: "/InputText" },
        { name: "/icons/auth.png", href: "/Auth"},
    ];
    let linkSelect = $state("/home");
</script>

<main class="fixed flex flex-col gap-4 right-4 bottom-4">
    {#each links as { name, href }}
        {#if linkSelect != href}
            <a href="{href}">
                <img src="{name}" class="w-8 h-8 cursor-pointer hover:opacity-70">
            </a>
        {/if}
    {/each}
</main>