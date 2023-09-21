import type { PageServerLoad } from "./$types";

export const load = (async ({ url, locals: { supabase } }) => {
  const category = url.searchParams.get("category") ?? "";

  let result = supabase.from("products").select("*");
  if (category) {
    result = result.eq("category", category);
  }

  const { data: products } = await result;

  return {
    products,
    category,
  };
}) satisfies PageServerLoad;
