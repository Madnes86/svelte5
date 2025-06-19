<script>
  let { children } = $props();
  import "../app.css";
  import Header from "../Header.svelte"
</script>

<Header />
{@render children()}