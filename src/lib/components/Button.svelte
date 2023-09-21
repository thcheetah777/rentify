<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface $$Props extends HTMLButtonAttributes {
    class?: string;
    loading?: boolean;
    outline?: boolean;
  };

  let className = "";
  export { className as class };

  export let loading = false;
  export let outline = false;
</script>

<button
  class={cn(
    "w-full font-smooth font-semibold duration-200 text-sm outline-none p-3",
    (
      outline ?
      "border border-border rounded-xl bg-white text-black" :
      "bg-primary text-white rounded-lg shadow-lg active:shadow-none active:scale-smaller"
    ),
    className,
  )} {...$$restProps}>
  {#if loading}
    <iconify-icon icon="gg:spinner" class="animate-spin text-base"></iconify-icon>
  {:else}
    <slot />
  {/if}
</button>
