import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
  return { category: url.searchParams.get("category") };
}) satisfies PageServerLoad;
