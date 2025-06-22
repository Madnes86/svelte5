<script>
  let { children } = $props();
  import "../app.css";
  import NavBar    from "$lib/NavBar.svelte";
  import Wallpaper from "$lib/Wallpaper.svelte";
</script>

<main class="flex flex-col">
    <NavBar />
    {@render children()}
    <Wallpaper />
</main>