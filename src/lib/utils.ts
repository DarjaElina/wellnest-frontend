import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tailwindColorMap, type JournalColor } from "./color";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorClass(
  color: JournalColor | string | undefined,
  type: keyof (typeof tailwindColorMap)[JournalColor],
) {
  if (!color || !(color in tailwindColorMap)) return "";
  return tailwindColorMap[color as JournalColor][type];
}
