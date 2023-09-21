<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLDialogAttributes } from "svelte/elements";
  import { fade, fly } from "svelte/transition";

  interface $$Props extends HTMLDialogAttributes {
    class?: string;
    open?: boolean;
    heading?: string;
  };

  let className = "";
  export { className as class };

  export let open = false;
  export let heading = "";

  export function close() {
    open = false;
  }

  export function show() {
    open = true;
  }
</script>

{#if open}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center z-50"
    transition:fade={{ duration: 400 }}
    on:click={close}>
    <!-- Modal content -->
    <div
      class={cn(
        "bg-white border border-border rounded-xl shadow-lg w-3/5",
        className
      )}
      transition:fly={{ duration: 400, y: window.innerHeight }}
      on:click|stopPropagation>
      <!-- Heading -->
      <div class={cn(
        "flex justify-between items-center w-full p-4",
        { "border-b border-border": heading }
      )}>
        <button
          on:click={close}
          class="aspect-square w-sm rounded-full hover:bg-neutral-100 flex justify-center items-center duration-200">
          <iconify-icon icon="mdi:window-close" class="text-lg"></iconify-icon>
        </button>
        <h1 class="font-bold">{heading}</h1>
        <div></div>
      </div>

      <!-- Modal content -->
      <div class="p-6">
        <slot />
      </div>
    </div>
  </div>
{/if}
