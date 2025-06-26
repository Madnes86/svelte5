<script>
  let { children } = $props();
  import "../app.css";
  import NavBar    from "$lib/components/NavBar.svelte";
  import Wallpaper from "$lib/components/Wallpaper.svelte";
</script>

<main class="flex flex-col">
    <NavBar />
    {@render children()}
    <Wallpaper />
</main>