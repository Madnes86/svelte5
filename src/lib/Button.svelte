<script lang="ts">
    import type { Snippet } from "svelte";

    // Props
    let { 
        loading = false,
        disabled = false, 
        varibal = "primary",
        onclick = () => {},
        children,
    }: {
        loading?: boolean,
        disabled?: boolean,
        varibal?: "primary" | "secondary",
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
    class:primary={varibal == "primary"}
    class:secondary={varibal == "secondary"}
    class="p-2 rounded-md text-white m-4"
    onclick={onClick}
>
    {@render children?.()}
</button>

<style>
    .color {
        background: #4e4e4e;
    }
    .primary {
        background: green;
    }
    .secondary {
        background: red;
    }
</style>