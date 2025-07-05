import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateChars(text: string, maxChars: number): string {
  return text.length > maxChars ? text.slice(0, maxChars) + "..." : text;
}
