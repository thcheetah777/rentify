<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";
  import { categories } from "$lib/categories";
	import Button from "$components/Button.svelte";

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
    "px-12 bg-white fixed top-nav border-border w-full h-nav flex items-center gap-4",
    { "shadow-md": !topOfPage }
  )}>
  <div class="overflow-auto no-scrollbar flex items-center gap-12 h-full pr-2">
    {#each categories as category}
      <a
        href="/home?tab={category.slug}"
        class={cn(
        "flex flex-col items-center text-neutral-500 h-full justify-center w-12 hover:text-neutral-900 duration-100 gap-1",
        { "text-neutral-900 border-neutral-900 border-b-2": category.slug === data.category },
        { "border-neutral-300 hover:border-b-2": category.slug !== data.category },
      )}>
          <iconify-icon icon={category.icon} class="text-2xl"></iconify-icon>
          <small class="font-smooth font-semibold">{category.name}</small>
      </a>
    {/each}
  </div>

  <Button class="flex items-center justify-center gap-2 w-28 h-2/3" outline>
    <iconify-icon icon="gg:options" class="text-lg"></iconify-icon>
    <span>Filter</span>
  </Button>
</nav>

<div class="mt-nav px-sm py-4">
  <ul class="grid grid-cols-4 gap-x-6 gap-y-sm">
    {#each new Array(20).fill(0).map((_, i) => i) as item}
      <li class="space-y-4">
        <img
          src="https://source.unsplash.com/random/300x300?{item}"
          alt="Randomized"
          class="rounded-xl aspect-[10/9] object-cover" />

        <div class="text-sm">
          <h1 class="font-semibold">{item * 12345}</h1>
          <h2 class="text-neutral-500">{item * 100}</h2>
        </div>
      </li>
    {/each}
  </ul>
</div>
