<script lang="ts">
    import { onMount } from "svelte";

    // Components
    import Button from "$lib/components/Button.svelte";
    import Alert  from "$lib/components/Alert.svelte";
    import List   from "$lib/components/List.svelte";
    import TextCard from "$lib/components/TextCard.svelte"

    // Store
    import { inputTextStore } from "../../global";

    // Type
    import type { TArrayItem } from "../types/cards";

    // Props
    let {
        showEdit = true,
        maxItem = 4,
    }: {
        showEdit: boolean,
        maxItem: number,
    } = $props();

    // Arrays Массив
    let textArray = $state("");
    let nameArray = $state("");
    let arrays: TArrayItem[] = $state([]);
    

    // Alert Окно уведомлений 
    let showAlert = $state(false)
    let textAlert = $state("")

    // Methods
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
        nameArray = "";
        textArray = "";
        setArrays();
    }

    function setArrays() {
        arrays = [];
        for (let i = 0 ; i < localStorage.length ; i++) {
            const key  = localStorage.key(i);
            const item = key ? localStorage.getItem(key) : null;
            try {
                const parsed = item ? JSON.parse(item) : null;
                if (key && parsed !== null) {
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
        setArrays();
    }

    function setInputText(name: string) {
        $inputTextStore = name;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key == "Enter") {
            addArray();
        }
    }

    function mixArray(name: string, text: string) {
        const words = text.trim().split(/\s+/);
        for (let i = 0; i < words.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]];
        };
        nameArray = name + "-mix"
        textArray = words.join(" ");
        addArray()
    }

    // $inspect(mixArray)

    onMount(() => {
        setArrays(); // Отрисовываем по умолчанию
    });

    // Добавление по нажатию Enter
</script>
<!-- @component
- Имеет форму добавления списка через localStorage и вывода сохраненых списков с возможностью CRUD
-->

<svelte:window onkeydown={handleKeydown} />

{#if showAlert}
    <Alert bind:show={showAlert} title="Ошибка:" step={6} text={textAlert} /> 
{/if}

<div class="flex flex-col m-auto w-[50vw] p-4 gap-4 mt-20">
    {#if showEdit}
        <div class="flex flex-col gap-4">
            <div class="flex flex-col p-4 rounded-xl bg-white/15 border-1 border-white/25 backdrop-blur-sm shadow-lg">
                <input 
                bind:value={nameArray} 
                type="text"  
                placeholder="Название списка" 
                class="border-b-1 border-white/25 pb-4 text-white font-bold text-[20px] focus:outline-none">
                <textarea 
                bind:value={textArray} 
                oninput={autoResize} 
                maxlength="5000"
                placeholder="Текст" 
                class="text-white mt-4 font-bold resize-none focus:outline-none"></textarea>
            </div>
            <Button 
                onclick={addArray} 
                varibal="glass"
                flex={true}
                >
                Добавить
            </Button>
        </div>
    {/if}
    <List />
    <div class="flex flex-wrap justify-center gap-4">
        {#each arrays as {name, accuracy, speed, text}}
            <TextCard 
                {name} 
                {accuracy}
                {speed}
                {text}
                setInputText={setInputText}
                delArray={delArray}
                mixArray={mixArray}
            />
        {/each}
    </div>
</div>
