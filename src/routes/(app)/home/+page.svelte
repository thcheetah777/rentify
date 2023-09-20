<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import toast from "svelte-french-toast";

  export let data: PageData;

  async function handleLogOut() {
    await data.supabase.auth.signOut();
    toast("Log out successful!", { icon: "👋" });
    goto("/login");
  }
</script>

<h1>Welcome, {data.session?.user.user_metadata.first_name}</h1>

<button on:click={handleLogOut}>Log out</button>
