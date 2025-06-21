<script>
// @ts-nocheck

    import Button from "../lib/Button.svelte";
    import Buner  from "$lib/Baner.svelte";
    import { globalCounter, store } from '../global'
    import InputText from "$lib/InputText.svelte";

    let count = $state(0);

    function onButtonClick() {
        $globalCounter += 1;
        $store +=1;
    }
</script>

<main class="">
    <h1>Welcome to main page</h1>
    <Button 
        onclick={onButtonClick} 
        varibal="primary"
    >
        Hello world! {count}
    </Button>
</main>