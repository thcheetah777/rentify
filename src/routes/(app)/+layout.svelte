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
<nav
  class="flex items-center justify-between h-nav fixed top-0 w-full px-sm border border-border bg-white z-10">
  <header>
    <a href="/"><Logo class="text-2xl" /></a>
  </header>

  <!-- Options menu -->
  <div class="relative">
    <button
      on:click={() => profileDropdown = !profileDropdown}
      class="flex items-center gap-2 rounded-full px-4 py-2 border border-border hover:shadow-md duration-200">
      <iconify-icon icon="ic:round-menu" class="text-xl"></iconify-icon>
      <h1>{data.session?.user.user_metadata.first_name}</h1>
    </button>

    <!-- Options dropdown -->
    {#if profileDropdown}
      <div
        class="absolute py-2 z-10 w-64 right-0 rounded-xl shadow-around top-12 bg-white text-sm z-20"
        transition:fade={{ duration: 100 }}>
        <div class="hover:bg-neutral-100 px-4 py-2">
          <a href="/profile">
            <h1 class="font-semibold">
              {data.session?.user.user_metadata.first_name} {data.session?.user.user_metadata.last_name}
            </h1>
            <h2>{data.session?.user.email}</h2>
          </a>
        </div>

        <div class="hover:bg-neutral-100 px-4 py-2">
          <a
            href="/profile"
            class="w-full flex items-center justify-between">
            <span>Profile</span>
            <iconify-icon icon="gg:profile" class="text-xl"></iconify-icon>
          </a>
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
<main class="overflow-auto mt-nav">
  <slot />
</main>