<script lang="ts">
  import type { PageData } from "./$types";
  import { afterUpdate, onMount } from "svelte";
  import { USDollar, cn } from "$lib/utils";
  import { categories } from "$lib/categories";
  import { fade } from "svelte/transition";

  import Modal from "$components/Modal.svelte";
  import Button from "$components/Button.svelte";

  export let data: PageData;

  let topOfPage = true;
  let categoryBar: HTMLElement;
  let categoryBarScroll: "start" | "end" | "none" = "start";
  let filterModal: Modal;

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
  }

  function scrollCategoryBar(direction: -1 | 1) {
    categoryBar.scrollBy(direction * 2000, 0);
  }

  function scrollNextElement(this: HTMLElement) {
    this.nextElementSibling?.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  }

  function scrollPreviousElement(this: HTMLElement) {
    this.previousElementSibling?.scrollBy({
      left: 250,
      behavior: "smooth",
    });
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
    "px-12 bg-white fixed top-nav border-border w-full h-nav flex items-center gap-4 z-10",
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
        "text-neutral-500 h-full w-12 hover:text-neutral-900 duration-200 gap-1 group border-b-2",
        { "text-neutral-900 border-neutral-900": category.slug === data.category },
        { "hover:border-neutral-300 border-transparent": category.slug !== data.category },
      )}>
          <div class="group-active:scale-95 duration-100 flex flex-col items-center justify-center h-full">
            <iconify-icon icon={category.icon} class="text-2xl"></iconify-icon>
            <small class="font-smooth font-semibold">{category.name}</small>
          </div>
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
  <Button
    on:click={filterModal.show}
    class="flex items-center justify-center gap-2 w-28 h-2/3"
    outline>
    <iconify-icon icon="gg:options" class="text-base"></iconify-icon>
    <span>Filter</span>
  </Button>
</nav>

<Modal bind:this={filterModal} heading="Filters">
  <h2 class="font-medium text-xl">Type of place</h2>
</Modal>

{#if data.products}
  <div class="mt-nav px-sm pt-4 pb-sm">
    <ul class="grid grid-cols-4 gap-x-6 gap-y-sm">
      {#each data.products as product (product.id)}
        <li class="group">
          <a href="/item/{product.id}" class="space-y-4">
            <!-- Photo row container -->
            <div class="relative">
              <!-- Previous photo -->
              <button
                on:click|preventDefault={scrollNextElement}
                class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full aspect-square h-sm shadow-md bg-white hover:scale-110 active:scale-smaller duration-200 flex justify-center items-center opacity-0 group-hover:opacity-90 hover:!opacity-100">
                <iconify-icon icon="ic:round-chevron-left" class="text-lg"></iconify-icon>
              </button>

              <!-- Photo row -->
              <div class="aspect-[10/9] overflow-x-auto flex snap-x snap-mandatory no-scrollbar rounded-xl">
                {#if product.photos}
                  {#each product.photos as photo}
                    <img
                      src={photo}
                      alt={product.category}
                      class="w-full h-full object-cover flex-shrink-0 snap-center" />
                  {/each}
                {/if}
              </div>

              <!-- Next photo -->
              <button
                on:click|preventDefault={scrollPreviousElement}
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full aspect-square h-sm shadow-md bg-white hover:scale-110 active:scale-smaller duration-200 flex justify-center items-center opacity-0 group-hover:opacity-90 hover:!opacity-100">
                <iconify-icon icon="ic:round-chevron-right" class="text-lg"></iconify-icon>
              </button>
            </div>

            <div class="text-sm">
              <h1 class="font-semibold">
                {product.category[0].toUpperCase() + product.category.slice(1)}
              </h1>
              <h2 class="text-neutral-500">{USDollar.format(product.price)}</h2>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
{/if}
