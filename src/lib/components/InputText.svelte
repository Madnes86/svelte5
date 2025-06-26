<script lang="ts">
    // Components
    import Alert from "$lib/components/Alert.svelte";

    // Store
    import { inputTextStore } from '../../global';

    // Var InputText
    const DEFAULT_VALUE: string = "";

    let symbols     : string   = $state(DEFAULT_VALUE);
    let lastSymbols : string   = $state(DEFAULT_VALUE);
    let nextSymbols : string[] = $state([]);
    let inputSymbol : string   = $state(DEFAULT_VALUE);

    // Var Alert
    let showAlert   : boolean  = $state(false);
    let error       : string   = $state("Неизвестная");

    // Methods
    function getArrays(text: string) {
        try {
            const item = localStorage.getItem(`${text}`);
            const parsed = item ? JSON.parse(item) : null;
            symbols = parsed?.text ?? [""];
            clearInputText();
        } catch (e) {
            console.error("Ошибка парсинга:", e);
            symbols = "null";
        }
    };

    function inputKey(e: KeyboardEvent) {
        if (showAlert) {
            return;
        }
        if (e.key === inputSymbol) {
            lastSymbols = lastSymbols + inputSymbol;
            nextSymbols = nextSymbols.slice(1);
            inputSymbol = nextSymbols[0];
        } else if (e.key !== inputSymbol && e.key !== "Shift") {
            error = e.key;
            showAlert = true;
        };
    };

    function clearInputText() {
        lastSymbols = "";
        nextSymbols = [...symbols];
        inputSymbol = nextSymbols[0];
    }

    inputTextStore.subscribe((value: string) => {
        getArrays(value);
    });

    $effect(() => {
        if (nextSymbols.length == 0) {
            alert("Текст закончился");
            clearInputText();
        }
    });

</script>

<!--
@component
- Принимает строку из store и выводит ее считывая нажатия клавиатуры при фокусировки
-->

<svelte:window onkeydown={inputKey} />

<main class="flex justify-center m-4 p-2 text-xl bg-white/15 backdrop-blur-md rounded-md border-1 border-white/40">
    <div class="flex justify-end w-[48vw] text-sky-600">
        {#each lastSymbols as symbol}
            <p class="whitespace-pre">{symbol}</p>
        {/each}
    </div>
    <div class="flex w-[48vw] text-white overflow-hidden">
        {#each nextSymbols as symbol}
            <p class="whitespace-pre">{symbol}</p>
        {/each}
    </div>
</main>

{#if showAlert}
    <Alert bind:show={showAlert} title="Ошибка ввода:" text={error} step={4} />
{/if}