<script lang="ts">
	import type { Session } from "@supabase/supabase-js";
  import Logo from "$components/Logo.svelte";

  export let session: Session | null;
</script>

<nav class="flex items-center justify-between h-nav px-sm border border-neutral-200">
  <header>
    <a href="/">
      <Logo class="text-2xl" />
    </a>
  </header>

  <div>
    <h1>{session?.user.user_metadata.first_name}</h1>
  </div>
</nav>
