<script lang="ts">
  import type { LayoutData } from "./$types";
  import NavBar from "$components/NavBar.svelte";

  export let data: LayoutData;
</script>


<NavBar session={data.session} />

<main class="h-content overflow-auto">
  <slot />
</main>
