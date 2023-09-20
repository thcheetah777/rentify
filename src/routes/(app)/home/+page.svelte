<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { cn } from "$lib/utils";

  export let data: PageData;

  let topOfPage = true;

  function checkTopOfPage() {
    topOfPage = window.scrollY === 0;
  }

  onMount(() => {
    document.addEventListener("scroll", checkTopOfPage);
    () => document.removeEventListener("scroll", checkTopOfPage);
  });
</script>

<nav
  class={cn(
    "flex items-center justify-center bg-white fixed top-nav border-neutral-200 w-full h-nav",
    { "border-b": !topOfPage }
  )}>
  Hello
</nav>

<div class="mt-nav p-sm">
  <ul class="grid grid-cols-4 gap-x-6 gap-y-sm">
    {#each new Array(20).fill(0).map((_, i) => i) as item}
      <li class="space-y-4">
        <img
          src="https://source.unsplash.com/random/300x300?{item}"
          alt="Randomized"
          class="bg-neutral-200 rounded-xl aspect-[10/9]" />

        <div class="text-sm">
          <h1 class="font-semibold">{item * 12345}</h1>
          <h2 class="text-neutral-500">{item * 100}</h2>
        </div>
      </li>
    {/each}
  </ul>
</div>
