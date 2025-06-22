<script>
    import InputText from "$lib/InputText.svelte";
    import Store     from "$lib/Store.svelte";
</script>

<img class="fixed h-full w-full -z-10" src="https://avatars.mds.yandex.net/i?id=114a76fc7e937bcbbd81cb69ede1a1bc_l-9065777-images-thumbs&n=13" alt="">
<InputText />
<Store show={true} maxItem={6} />