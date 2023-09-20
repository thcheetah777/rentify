<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface $$Props extends HTMLInputAttributes {
    class?: string;
    containerClass?: string;
    id: string;
    optional?: boolean;
    placeholder: string;
  };

  let className = "";
  export { className as class };

  export let containerClass = "";
  export let id = "";
  export let value = "";
  export let optional = false;
  export let placeholder = "";
</script>

<div class={cn("space-y-1", containerClass)}>
  <label for={id} class="block space-y-1"><slot /></label>
  <input class={cn(
    "block w-full border border-neutral-200 bg-neutral-50 py-2 px-4 outline-none rounded-lg",
    className,
  )} bind:value required={!optional} {...$$restProps}>
</div>
