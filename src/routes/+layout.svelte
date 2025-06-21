<script>
  let { children } = $props();
  import "../app.css";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
</script>

<main class="flex flex-col">
    <Header />
    {@render children()}
    <!-- <Footer /> -->
</main>