<script lang="ts">
    import Button from "$lib/Button.svelte"

    let {
        show = false,
    } = $props();

    let textArray = $state("Content");
    let nameArray = $state("");
    let arrays    = $state([""]);

    function addArray() {
        localStorage.setItem(nameArray, JSON.stringify(textArray));
        console.log(localStorage.getItem("test2"));
        Arrays();
    }

    function Arrays() {
        arrays = [];
        for (let i = 0 ; i < localStorage.length ; i++) {
            console.log(localStorage.key(i));
            let array = localStorage.key(i);
            if (array) {
                arrays.push(array);
            }
        }
    }

    function delArray(name: string) {
        localStorage.removeItem(name);
        Arrays();
    }

    Arrays(); // Отрисовываем по умолчанию
</script>

<div class="flex flex-col m-auto w-[50vw]">
    <input bind:value={nameArray} type="text" placeholder="nameArray">
    <textarea bind:value={textArray} name="" id="" placeholder="Content"></textarea>
    <div>
        <Button onclick={addArray}>addArray</Button>
        <div>
            {#each arrays as array}
                <div>
                    <p>{array}</p>
                    <Button onclick={() => delArray(array)}>delArray</Button>
                    <Button>mixArray</Button>
                </div>
            {/each}
        </div>
    </div>
</div>