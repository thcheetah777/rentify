<script lang="ts">
  import type { PageData } from "./$types";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";

  export let data: PageData;

  let name: [string, string] = ["", ""];
  let email = "";
  let password = "";

  async function handleSignUp() {
    const { error } = await data.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: name[0],
          last_name: name[1],
        },
      },
    });

    if (error) {
      console.error(error.message);

      switch (error.message) {
        case "User already registered": {
          toast.error("That email is already taken");
          break;
        }
        default: {
          toast.error("There was an error signing you up");
          break;
        }
      }
    } else {
      toast.success("Sign up successful!");
      goto("/home");
    }
  }
</script>

<h1 class="font-medium text-xl">Sign Up</h1>

<form class="space-y-4 text-sm" on:submit|preventDefault={handleSignUp}>
  <!-- Name input group -->
  <div class="flex gap-2">
    <!-- First Name -->
    <div class="w-1/2 space-y-1">
      <label for="first-name">First name</label>
      <input
        type="text"
        name="first-name"
        id="first-name"
        placeholder="John"
        class="block w-full border border-neutral-200 bg-neutral-50 py-2 px-4 outline-none rounded-lg"
        required
        bind:value={name[0]} />
    </div>

    <!-- Last Name -->
    <div class="w-1/2 space-y-1">
      <label for="last-name">Last name</label>
      <input
        type="text"
        name="last-name"
        id="last-name"
        placeholder="Smith"
        class="block w-full border border-neutral-200 bg-neutral-50 py-2 px-4 outline-none rounded-lg"
        required
        bind:value={name[1]} />
    </div>
  </div>

  <!-- Email -->
  <div class="space-y-1">
    <label for="email" class="block space-y-1">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="name@company.com"
      class="block w-full border border-neutral-200 bg-neutral-50 py-2 px-4 outline-none rounded-lg"
      required
      bind:value={email} />
  </div>

  <!-- Password -->
  <div class="space-y-1">
    <label for="password" class="block space-y-1">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="••••••••••"
      class="block w-full border border-neutral-200 bg-neutral-50 py-2 px-4 outline-none rounded-lg"
      minlength="6"
      required
      bind:value={password} />
  </div>

  <!-- Terms of use -->
  <div class="block">
    <input type="checkbox" name="Agreement" id="agreement" required>
    <label for="agreement">
      I agree to the
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        class="text-primary">terms of use</a>
    </label>
  </div>

  <!-- Create account button -->
  <button class="bg-primary rounded-lg w-full text-white font-smooth p-3 shadow-lg font-medium">
    Create Account
  </button>
</form>

<small class="text-center block text-neutral-500">
  Already have an account?
  <a href="/login" class="text-primary">Login</a>
</small>
