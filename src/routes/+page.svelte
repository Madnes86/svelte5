<script>
// @ts-nocheck

    import Button from "../lib/Button.svelte";
    import Buner  from "$lib/Baner.svelte";
    import { globalCounter } from '../global.js'

    let count = $state(0);

    function onButtonClick() {
        $globalCounter += 1;
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Button 
    onclick={onButtonClick} 
    varibal="primary"
>
    Hello world! {count}
</Button>
<Buner />