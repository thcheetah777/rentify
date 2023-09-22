import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load = (async ({ params, locals: { supabase } }) => {
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .limit(1)
    .eq("id", params.id)
    .single();

  if (!product) {
    throw error(404, {
      message: "Not found",
    });
  }

  return { product };
}) satisfies PageServerLoad;
