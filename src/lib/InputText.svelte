<script>
// @ts-nocheck
    // Переименованны элементы, добавленно исключение для клавиши Shift, изученно contenteditable, событие в конце? Добавленна верска
    import Alert from "$lib/Alert.svelte"

    function Arrays() {
        try {
            const item = localStorage.getItem("svelte");
            const parsed = item ? JSON.parse(item) : null;
            console.log(parsed?.text ?? []);
            return parsed?.text ?? ["null"];
        } catch (e) {
            console.error("Ошибка парсинга:", e);
            return ["null"];
        }
    }

    let inputValue = $state("");
    let symbols = Arrays();
    // let symbols = "p-4 aspect-square aspect-auto aspect-video md: columns-3 columns-3xs columns-3sm gap-8 hover:bg-sky-800 columns-[30vw] box-decoration-clone box-decoration-slice";
    let lastSymbols = $state("");
    let nextSymbols = $state([...symbols]);
    let inputSymbol = $state(nextSymbols[0]);
    let showAlert   = $state(false);
    let error       = $state("Неизвестная");

    $effect(() => {
        if (nextSymbols.length == 0) {
            alert("Текст закончился");
            lastSymbols = ""
            nextSymbols = symbols; // Временно
            inputSymbol = nextSymbols[0];
        }
    });

    function inputKey(e) {
        if (showAlert) {
            return;
        }
        if (e.key === inputSymbol) {
            lastSymbols = [...lastSymbols, inputSymbol];
            nextSymbols = nextSymbols.slice(1);
            inputSymbol = nextSymbols[0];
        } else if (e.key !== inputSymbol && e.key !== "Shift") {
            error = e.key;
            showAlert = true;
        }
    }

</script>

<main class="flex justify-center m-4 p-2 text-xl bg-white/15 backdrop-blur-md rounded-md border-1 border-white/40">
    <div class="flex justify-end w-[40vw] text-sky-600">
        {#each lastSymbols as symbol}
            <p class="whitespace-pre">{symbol}</p>
        {/each}
    </div>
    <input 
        onkeydown={inputKey}
        oninput={() => inputValue = ""}
        bind:value={inputValue}
        class="w-1"
        type="text"
    >
    <div class="flex w-[40vw] text-white">
        {#each nextSymbols as symbol}
            <p class="whitespace-pre">{symbol}</p>
        {/each}
    </div>
</main>

{#if showAlert}
    <Alert bind:show={showAlert} title="Ошибка ввода:" text={error} step={4} />
{/if}