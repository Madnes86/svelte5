<script>
// @ts-nocheck
    import { onMount } from 'svelte';
    import Button from "$lib/Button.svelte";

    let { 
        text,
        show  = $bindable(false), 
        title = "Окно",
        step  = 5,
    } = $props();

    const WIDTH = 50;  // vw
    step = WIDTH / step;
    const DELAY = 500;
    let progress = $state(WIDTH);

    // Закрываем Alert
    function close() { show = false };

    // Уменьшаем progress на долю step за DELAY
    function startProgress() {
        const interval = setInterval(() => {progress -= step
            if (progress == 0) {
                clearInterval(interval);
            }
        }, DELAY);
    };

    // Быстрое закрытие Alert
    function quickClose(e) {
        if (e.key === "Enter") {
            show = false;
        }
    };

    onMount(() => {
        startProgress();
        window.addEventListener('keydown', quickClose);
    });

    $effect(() => {
        if (progress <= 0) {
            show = false;
        }
    });

</script>

<main class="absolute w-full h-full bg-rose-800/40">
    <div class="m-auto mt-20 flex flex-col rounded-2xl bg-white" style="width: {WIDTH}vw;">
        <h2  class="p-4">{title}</h2>
        <p   class="p-4">{text}</p>
        <div class="h-4 bg-red-400 transition-all" style="width: {progress}vw;"></div>
        <Button  varibal="primary" onclick={close}>Закрыть</Button>
    </div>
</main>