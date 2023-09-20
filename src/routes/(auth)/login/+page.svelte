<script lang="ts">
  import type { PageData } from "./$types";

	import Button from "$components/Button.svelte";
  import Input from "$components/Input.svelte";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";

  export let data: PageData;

  let email = "";
  let password = "";

  let loading = false;

  async function handleLogin() {
    loading = true;

    const { error } = await data.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);

      switch (error.message) {
        case "Invalid login credentials": {
          toast.error("Incorrect password");
          break;
        }
        default: {
          toast.error("There was a problem logging you in");
          break;
        }
      }
    } else {
      toast.success("Login successful!");
      goto("/home");
    }

    loading = false;
  }
</script>

<h1 class="font-medium text-xl">Login</h1>

<form class="space-y-4 text-sm" on:submit|preventDefault={handleLogin}>
  <!-- Email -->
  <Input
    type="email"
    id="email"
    placeholder="name@company"
    bind:value={email}>
    Email
  </Input>

  <!-- Password -->
  <Input
    type="password"
    id="password"
    placeholder="••••••••••"
    bind:value={password}>
    Password
  </Input>

  <!-- Login button -->
  <Button type="submit" bind:loading>Login</Button>
</form>

<small class="text-center block text-neutral-500">
  Don't have an account?
  <a href="/signup" class="text-primary">Sign Up</a>
</small>
