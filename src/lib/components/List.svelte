<script lang="ts">
    let show = $state(false);
    let lists = ["mix", "del"];
</script>

{#if show}
    <button  onclick={() => {show = true}} class="text-white hover:opacity-40 cursor-pointer">
        {#each lists as list }
            <p>{list}</p>
        {/each}
    </button>
{/if}