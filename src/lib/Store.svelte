<script lang="ts">
    import Button from "$lib/Button.svelte"
    import { parse } from "svelte/compiler";

    let {
        show = false,
    } = $props();

    let textArray = $state("");
    let nameArray = $state("");
    let arrays    = $state([""]);

    function addArray() {
        let content = {
            text: textArray,
            accuracy: "99",
            speed: "224",
        }
        localStorage.setItem(nameArray, JSON.stringify(content));
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

    function delArray(name: string) {
        localStorage.removeItem(name);
        Arrays();
    }

    Arrays(); // Отрисовываем по умолчанию
</script>

<div class="flex flex-col m-auto w-[50vw] bg-red-400 p-4 gap-4">
    <div class="flex flex-col p-4 rounded-xl bg-white/15 border-1 border-white/25 backdrop-blur-sm shadow-lg">
        <input bind:value={nameArray} type="text"  placeholder="nameArray" class="border-b-1 border-white/25 pb-4 text-white font-bold text-[20px] ">
        <textarea bind:value={textArray} name="" id="" placeholder="Content" class="text-white mt-4 font-bold resize-none"></textarea>
        <Button onclick={addArray}>addArray</Button>
    </div>
    <div class="flex flex-wrap gap-4">
        {#each arrays as item}
            <div class="flex flex-col text-white p-4 rounded-xl bg-white/15 border-1 border-white/25 backdrop-blur-sm w-50 gap-2 shadow-lg">
                <h1 class="font-bold text-[20px] border-white/25 border-b-1 pb-3">{item.name}</h1>
                <p>accuracy: {item.accuracy}</p>
                <p>speed: {item.speed}</p>
                <p>time: </p>
                <div class="flex gap-2">
                    <Button onclick={() => delArray(item.name)}>delArray</Button>
                    <Button>...</Button>
                </div>
            </div>
        {/each}
    </div>
</div>