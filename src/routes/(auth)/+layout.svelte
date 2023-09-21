<script lang="ts">
  import Logo from "$components/Logo.svelte";
</script>

<main class="flex flex-col justify-center items-center gap-4 min-h-screen py-sm">
  <Logo class="text-4xl" />

  <div class="rounded-lg px-6 py-4 w-1/3 space-y-sm">
    <slot />
  </div>
</main>
