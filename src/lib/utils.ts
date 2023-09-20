import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input));
}
