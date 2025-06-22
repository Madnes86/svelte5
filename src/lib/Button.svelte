<script lang="ts">
    import type { Snippet } from "svelte";

    // Props
    let { 
        loading  = false,
        disabled = false, 
        varibal  = "primary",
        flex     = false,
        onclick  = () => {},
        children,
    }: {
        loading?: boolean,
        disabled?: boolean,
        varibal?: "glass" | "primary" | "secondary",
        flex?   : boolean,
        onclick?: () => void,
        children?: Snippet
    } = $props();

    // Methods
    const onClick = () => {
        if (loading || disabled) 
            return;
        onclick?.();
    }
</script>

<button 
    class:color={disabled}
    class:glass={varibal == "glass"}
    class:primary={varibal == "primary"}
    class:secondary={varibal == "secondary"}
    class:flex={flex == true}
    class="p-2 rounded-[12px] text-white "
    onclick={onClick}
>
    {@render children?.()}
</button>

<style>
    .color {
        background: #4e4e4e;
    }
    .glass {
        backdrop-filter: blur(4px);
        border: 1px solid #ffffff4f;
        background: rgba(255, 255, 255, 0.133);
    }
    .primary {
        background: green;
    }
    .secondary {
        background: red;
    }
    .flex {
        display: flex;
        justify-content: center;
        width: 100%;
    }
</style>