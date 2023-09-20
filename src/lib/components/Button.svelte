<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface $$Props extends HTMLButtonAttributes {
    class?: string;
  };

  let className = "";
  export { className as class };
</script>

<button
  class={cn(
    "bg-primary rounded-lg w-full text-white font-smooth p-3 shadow-lg font-medium",
    className,
  )} {...$$restProps}>
  <slot />
</button>
