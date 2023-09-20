<script lang="ts">
  import type { LayoutData } from "./$types";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";

  import Logo from "$components/Logo.svelte";

  export let data: LayoutData;

  let profileDropdown = false;

  async function handleLogOut() {
    await toast.promise(
      data.supabase.auth.signOut(),
      {
        loading: "Logging out...",
        success: "Successfully logged out!",
        error: "There was a problem logging you out",
      },
    );

    goto("/login");
  }
</script>

<!-- Navbar cuz I'm lazy -->
<nav class="flex items-center justify-between h-nav px-sm border border-neutral-200">
  <header>
    <a href="/">
      <Logo class="text-2xl" />
    </a>
  </header>

  <div class="relative">
    <button
      on:click={() => profileDropdown = !profileDropdown}
      class="flex items-center gap-2 rounded-full px-4 py-2 border border-neutral-200">
      <iconify-icon icon="ic:round-menu" class="text-xl"></iconify-icon>
      <h1>{data.session?.user.user_metadata.first_name}</h1>
    </button>

    {#if profileDropdown}
      <div
        class="absolute py-2 z-10 w-60 right-0 rounded-lg shadow-lg bg-white text-sm"
        transition:fade={{ duration: 50 }}>
        <div class="hover:bg-neutral-100 px-4 py-2">
          <h1 class="font-semibold">
            {data.session?.user.user_metadata.first_name} {data.session?.user.user_metadata.last_name}
          </h1>
          <h2>{data.session?.user.email}</h2>
        </div>

        <div class="hover:bg-neutral-100 px-4 py-2">
          <button
            on:click={handleLogOut}
            class="w-full flex items-center justify-between">
            <span>Log Out</span>
            <iconify-icon icon="gg:log-out" class="text-xl"></iconify-icon>
          </button>
        </div>
      </div>
    {/if}
  </div>
</nav>

<!-- Main page content -->
<main class="h-content overflow-auto">
  <slot />
</main>
