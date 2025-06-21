<script lang="ts">
    import Button from '$lib/Button.svelte';
    import Buner  from '$lib/Baner.svelte';
    import { globalCounter } from '../../global'

    let count = $state(0);
    let disabled = $state(false);

    function increment() {
        $globalCounter += 1;
        count += 1;
    }
</script>

<main class="min-h-100%">
    <h1>Increment component</h1>
    <Button 
        {disabled}
        onclick={increment} 
    >increment {count}</Button>
    <Buner />
</main>