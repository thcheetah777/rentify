<script lang="ts">
  import { USDollar } from "$src/lib/utils";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<img src={data.product.photos?.[0]} alt={data.product.category} />
<h1>{data.product.category}</h1>
<h2>{USDollar.format(data.product.price ?? 0)}</h2>
