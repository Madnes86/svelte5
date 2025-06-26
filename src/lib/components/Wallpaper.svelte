<script lang="ts">
    const images = [
        "https://avatars.mds.yandex.net/i?id=114a76fc7e937bcbbd81cb69ede1a1bc_l-9065777-images-thumbs&n=13",
        "https://i.pinimg.com/originals/84/e0/ae/84e0aea37e39c645052bc8c17320b184.jpg",
        "https://i.pinimg.com/originals/44/82/75/44827580845d327964c840dc8af2fc5b.jpg",
        "https://avatars.mds.yandex.net/i?id=85c0eb1d11dc369813b0a5176742980d_l-9227992-images-thumbs&ref=rim&n=13&w=1280&h=720",
    ];
    let imageSelect = $state(images[1]);
    let sortImages  = $derived.by(() => {
        return images.filter((image) => {
            return image != imageSelect
        });
    });

    function imageInstall(image) {
        imageSelect = image;
    }
</script>

<!-- @component
- Отображает имеющие обои с возможностью переключения. Не отобрает установленные обои
-->

<img class="fixed h-full w-full -z-10" src="{imageSelect}" alt="">

<div class="flex flex-col gap-2 fixed left-2 bottom-2 w-32">
    {#each sortImages as image }
        <img 
        onclick={() => imageInstall(image)} 
        src={image} 
        class="rounded-[12px] cursor-pointer hover:opacity-50 w-32 border-1 border-white/40"
        >
    {/each}
</div>