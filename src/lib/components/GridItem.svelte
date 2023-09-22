<script lang="ts">
  import type { Tables } from "$src/database.types";
  import { USDollar } from "$lib/utils";
  import { fade } from "svelte/transition";

  export let product: Tables<"products">;

  let photoRow: HTMLElement;

  function scroll(direction: -1 | 1) {
    photoRow.scrollBy({
      left: direction * 250,
      behavior: "smooth",
    });
  }
</script>

<li class="group">
  <a href="/item/{product.id}" class="space-y-4">
    <!-- Photo row container -->
    <div class="relative">
      <!-- Previous photo -->
      <button
        on:click|preventDefault={() => scroll(-1)}
        transition:fade={{ duration: 100 }}
        class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full aspect-square h-sm shadow-md bg-white hover:scale-110 active:scale-smaller duration-200 flex justify-center items-center opacity-0 group-hover:opacity-90 hover:!opacity-100">
        <iconify-icon icon="ic:round-chevron-left" class="text-lg"></iconify-icon>
      </button>

      <!-- Photo row -->
      <div
        class="aspect-[10/9] overflow-x-auto flex snap-x snap-mandatory no-scrollbar rounded-xl"
        bind:this={photoRow}>
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
        on:click|preventDefault={() => scroll(1)}
        transition:fade={{ duration: 100 }}
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
