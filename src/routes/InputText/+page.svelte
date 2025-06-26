<script>
    import InputText from "$lib/components/InputText.svelte";
    import Store     from "$lib/components/TextCards.svelte";
</script>

<InputText />
<Store  showEdit={false} maxItem={6} />
