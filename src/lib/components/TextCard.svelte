<script lang="ts">

    // Components
    import Button from "$lib/components/Button.svelte";
    import List   from "$lib/components/List.svelte";

    // Props
    let {
        name,
        accuracy,
        speed,
        text,
        setInputText,
        delArray,
        mixArray,
    }: {
        name     : string
        accuracy : string
        speed    : string
        text     : string
        setInputText? : (name: string) => void;
        delArray?     : (name: string) => void;
        mixArray?     : (name: string, text: string) => void;
    } = $props();

</script>

<div class="flex flex-col gap-4">
    <button onclick={() => { setInputText?.(name) }} class="flex flex-col gap-2 text-white backdrop-blur-sm bg-white/15 border-1 border-white/40 rounded-[12px] p-5 cursor-pointer hover:opacity-70">
        <h1 class="font-bold text-[20px] border-white/25 border-b-1 pb-2">{name}</h1>
        <p>accuracy: {accuracy}</p>
        <p>speed: {speed}</p>
        <p>time: </p>
    </button>
    <div class="flex gap-4">
        <Button 
            onclick={() => delArray?.(name)} 
            varibal="glass" flex={true}
            >
            Удалить
        </Button>
        <Button 
            varibal="glass" 
            onclick={() => {mixArray?.(name, text)}} 
            >
            ...
        </Button>
        <List />
    </div>
</div>