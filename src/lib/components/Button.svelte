<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface $$Props extends HTMLButtonAttributes {
    class?: string;
    loading?: boolean;
  };

  let className = "";
  export { className as class };

  export let loading = false;
</script>

<button
  class={cn(
    "bg-primary rounded-lg w-full text-white font-smooth p-3 shadow-lg active:shadow-none active:scale-smaller font-semibold duration-200 text-sm",
    className,
  )} {...$$restProps}>
  {#if loading}
    <iconify-icon icon="gg:spinner" class="animate-spin text-base"></iconify-icon>
  {:else}
    <slot />
  {/if}
</button>
