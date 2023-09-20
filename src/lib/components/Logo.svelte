<script lang="ts">
  import { cn } from "$lib/utils";
  import "iconify-icon";

  let className = "";
  export { className as class };
</script>

<div class={cn("flex font-smooth items-center text-2xl cursor-pointer group", className)}>
  <iconify-icon
    icon="ic:round-vpn-key"
    class="text-primary -rotate-90 relative bottom-0.5 left-0.5 group-hover:-rotate-[115deg] duration-200">
  </iconify-icon>
  <span class="font-bold">Rentify</span>
</div>
