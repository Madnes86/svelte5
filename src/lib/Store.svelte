<script lang="ts">
    import Button from "$lib/Button.svelte"
    import { parse } from "svelte/compiler";
    import Alert     from "$lib/Alert.svelte"
    import { onMount, onDestroy } from "svelte";

    function handleKeydown(event: KeyboardEvent) {
        if (event.key == "Enter") {
            addArray();
        }
    }

    onMount(() => {
        window.addEventListener("keydown", handleKeydown);
    });

    onDestroy(() => {
        window.removeEventListener("keydown", handleKeydown);
    });

    // Props
    let {
        show = true,
        maxItem = 4,
    }: {
        show: boolean,
        maxItem: number,
    } = $props();

    // Arrays Массив
    let textArray = $state("");
    let nameArray = $state("");
    let arrays    = $state([""]);

    // Alert Окно уведомлений 
    let showAlert = $state(false)
    let textAlert = $state("")

    function addArray() {
        const isArray = localStorage.getItem(nameArray);
        if (isArray != null) {
            showAlert = true;
            textAlert = "Попытка добавить существующий список";
        }
        if (nameArray == "") {
            showAlert = true;
            textAlert = "Попытка добавить пустой список";
        }
        let content = {
            text: textArray,
            accuracy: "99",
            speed: "224",
        }
        if (localStorage.length <= maxItem) {
            localStorage.setItem(nameArray, JSON.stringify(content));
        } else {
            showAlert = true
            textAlert = `Cписков не может быть больше ${maxItem}`
        }
        Arrays();
    }

    function Arrays() {
        arrays = [];
        for (let i = 0 ; i < localStorage.length ; i++) {
            const key  = localStorage.key(i);
            const item = key ? localStorage.getItem(key) : null;
            try {
                const parsed = item ? JSON.parse(item) : null;
                if (key && parse !== null) {
                    arrays.push({name: key, ...parsed});
                }
            } catch {
                alert("error");
            }
        }
    }

    function autoResize(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
    }

    function delArray(name: string) {
        localStorage.removeItem(name);
        Arrays();
    }

    Arrays(); // Отрисовываем по умолчанию

    // Добавление по нажатию Enter
</script>

{#if showAlert}
    <Alert show={showAlert} title="Ошибка:" step={6} text={textAlert} /> 
{/if}

{#if show} 
    <div class="flex flex-col m-auto w-[50vw] p-4 gap-4 mt-20">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col p-4 rounded-xl bg-white/15 border-1 border-white/25 backdrop-blur-sm shadow-lg">
                <input bind:value={nameArray} type="text"  placeholder="Название списка" class="border-b-1 border-white/25 pb-4 text-white font-bold text-[20px] focus:outline-none">
                <textarea bind:value={textArray} on:input={autoResize} maxlength="1000" name="" id="" placeholder="Текст" class="text-white mt-4 font-bold resize-none focus:outline-none"></textarea>
            </div>
            <Button onclick={addArray} varibal="glass" flex={true}>Добавить</Button>
        </div>
        <div class="flex flex-wrap justify-center gap-4">
            {#each arrays as item}
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2 text-white backdrop-blur-sm bg-white/15 border-1 border-white/40 rounded-[12px] p-5">
                        <h1 class="font-bold text-[20px] border-white/25 border-b-1 pb-2">{item.name}</h1>
                        <p>accuracy: {item.accuracy}</p>
                        <p>speed: {item.speed}</p>
                        <p>time: </p>
                    </div>
                    <div class="flex gap-4">
                        <Button onclick={() => delArray(item.name)} varibal="glass" flex={true}>Удалить</Button>
                        <Button varibal="glass">...</Button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}