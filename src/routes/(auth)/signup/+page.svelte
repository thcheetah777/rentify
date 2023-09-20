<script lang="ts">
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

	import Button from "$components/Button.svelte";
  import Input from "$components/Input.svelte";

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
    <Input
      id="first-name"
      containerClass="w-1/2"
      placeholder="John"
      bind:value={name[0]}>
      First name
    </Input>

    <!-- Last Name -->
    <Input
      id="last-name"
      containerClass="w-1/2"
      placeholder="Smith"
      bind:value={name[1]}>
      Last name
    </Input>
  </div>

  <!-- Email -->
  <Input
    type="email"
    id="email"
    placeholder="name@company.com"
    bind:value={email}>
    Email
  </Input>

  <!-- Password -->
  <Input
    type="password"
    id="password"
    placeholder="••••••••••"
    bind:value={password}
    minlength={6}>
    Password
  </Input>

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
  <Button type="submit">Create Account</Button>
</form>

<small class="text-center block text-neutral-500">
  Already have an account?
  <a href="/login" class="text-primary">Login</a>
</small>
