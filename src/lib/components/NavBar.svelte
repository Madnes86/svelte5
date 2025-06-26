<script lang="ts">
    let links = [
        { name: "/icons/home.png", href: "/" },
        { name: "/icons/key.png",  href: "/InputText" },
        { name: "/icons/auth.png", href: "/Auth"},
    ];
    let linkSelect  = $state("/");
    let linksFilter = $derived.by(() => {
        return links.filter((link) => {
            if (link.href != linkSelect) {
                return link
            }
        });
    });

    function linkSelecting(link: string) {
        linkSelect = link;
    }
</script>

<!-- @component
- Навигационная панель имеет иконки и ссылки
 -->

<main class="fixed flex flex-col gap-4 right-4 bottom-4">
    {#each linksFilter as { name, href }}
        <a 
        onclick={() => {linkSelecting(href)}} 
        href="{href}">
            <img 
            src="{name}"
            alt="" 
            class="w-8 h-8 cursor-pointer hover:opacity-70">
        </a>
    {/each}
</main>