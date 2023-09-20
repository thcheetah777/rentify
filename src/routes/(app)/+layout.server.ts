import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals: { getSession }, url }) => {
  const session = await getSession();
  if (!session) throw redirect(307, "/login");

  if (url.pathname === "/") throw redirect(307, "/home");
}) satisfies LayoutServerLoad;
