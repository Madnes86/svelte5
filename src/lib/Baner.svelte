<script lang="ts">
    import { globalCounter, store } from '../global';
    import Button from '$lib/Button.svelte';

    let double: number = 0;
    store.subscribe((value: number) => {double = value * 2});
    

</script>

<main class="m-4 p-2 rounded-2xl bg-red-400 text-white">
    globalCounter: {$globalCounter}
    double: {double}
    store: {$store}
</main>