<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1>Welcome, {data.session?.user.user_metadata.first_name}</h1>
