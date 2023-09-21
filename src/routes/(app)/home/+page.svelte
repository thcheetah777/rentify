<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";
  import { categories } from "$lib/categories";
	import Button from "$components/Button.svelte";
  import { fade } from "svelte/transition";

  export let data: PageData;

  let topOfPage = true;
  let categoryBar: HTMLElement;
  let categoryBarScroll: "start" | "end" | "none" = "start";

  function checkTopOfPage() {
    topOfPage = window.scrollY === 0;
  }

  function checkCategoryBar() {
    if (categoryBar.scrollLeft === 0) {
      categoryBarScroll = "start";
    } else if (categoryBar.scrollWidth - categoryBar.scrollLeft - categoryBar.clientWidth < 1) {
      categoryBarScroll = "end";
    } else {
      categoryBarScroll = "none";
    }

    console.log(categoryBarScroll);
  }

  function scrollCategoryBar(direction: -1 | 1) {
    categoryBar.scrollBy(direction * 2000, 0);
  }

  onMount(() => {
    document.addEventListener("scroll", checkTopOfPage);
    categoryBar.addEventListener("scroll", checkCategoryBar);

    return () => {
      document.removeEventListener("scroll", checkTopOfPage);
      categoryBar.removeEventListener("scroll", checkCategoryBar);
    }
  });
</script>

<nav
  class={cn(
    "px-12 bg-white fixed top-nav border-border w-full h-nav flex items-center gap-4",
    { "shadow-md": !topOfPage }
  )}>
  <!-- Categories bar -->
  <div
    class="overflow-auto no-scrollbar flex items-center gap-[45px] h-full px-2 relative scroll-smooth"
    bind:this={categoryBar}>
    {#if categoryBarScroll !== "start"}
      <div
        class="fixed left-10 bg-gradient-to-r from-white from-80% w-16 h-nav flex items-center justify-start"
        transition:fade={{ duration: 200 }}>
        <button
          on:click={() => scrollCategoryBar(-1)}
          class="aspect-square rounded-full w-sm border border-border bg-white hover:shadow-md flex justify-center items-center relative left-2">
          <iconify-icon icon="ic:round-chevron-left" class="text-xl"></iconify-icon>
        </button>
      </div>
    {/if}

    {#each categories as category}
      <a
        href="/home?category={category.slug}"
        class={cn(
        "flex flex-col items-center text-neutral-500 h-full justify-center w-12 hover:text-neutral-900 duration-100 gap-1",
        { "text-neutral-900 border-neutral-900 border-b-2": category.slug === data.category },
        { "border-neutral-300 hover:border-b-2": category.slug !== data.category },
      )}>
          <iconify-icon icon={category.icon} class="text-2xl"></iconify-icon>
          <small class="font-smooth font-semibold">{category.name}</small>
      </a>
    {/each}

    {#if categoryBarScroll !== "end"}
      <div
        class="fixed right-36 bg-gradient-to-l from-white from-80% w-16 h-nav flex items-center justify-end"
        transition:fade={{ duration: 200 }}>
        <button
          on:click={() => scrollCategoryBar(1)}
          class="aspect-square rounded-full w-sm border border-border bg-white hover:shadow-md flex justify-center items-center relative right-2">
          <iconify-icon icon="ic:round-chevron-right" class="text-xl"></iconify-icon>
        </button>
      </div>
    {/if}
  </div>

  <!-- Button for filtering -->
  <Button class="flex items-center justify-center gap-2 w-28 h-2/3" outline>
    <iconify-icon icon="gg:options" class="text-base"></iconify-icon>
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
