export const JOURNAL_COLORS = [
  "rose",
  "sky",
  "emerald",
  "amber",
  "violet",
  "indigo",
  "pink",
] as const;

export type JournalColor = (typeof JOURNAL_COLORS)[number];

export const tailwindColorMap: Record<
  JournalColor,
  {
    bg: string;
    text: string;
    ring: string;
    border: string;
    hover: string;
    softBg: string;
  }
> = {
  rose: {
    bg: "bg-rose-400",
    text: "text-rose-500",
    ring: "ring-rose-300",
    border: "border-rose-500",
    hover: "hover:bg-rose-600",
    softBg: "bg-rose-100",
  },
  sky: {
    bg: "bg-sky-400",
    text: "text-sky-500",
    ring: "ring-sky-300",
    border: "border-sky-500",
    hover: "hover:bg-sky-600",
    softBg: "bg-sky-100",
  },
  emerald: {
    bg: "bg-emerald-400",
    text: "text-emerald-500",
    ring: "ring-emerald-300",
    border: "border-emerald-500",
    hover: "hover:bg-emerald-600",
    softBg: "bg-emerald-100",
  },
  amber: {
    bg: "bg-amber-400",
    text: "text-amber-500",
    ring: "ring-amber-300",
    border: "border-amber-500",
    hover: "hover:bg-amber-600",
    softBg: "bg-amber-100",
  },
  violet: {
    bg: "bg-violet-400",
    text: "text-violet-500",
    ring: "ring-violet-300",
    border: "border-violet-500",
    hover: "hover:bg-violet-600",
    softBg: "bg-violet-100",
  },
  indigo: {
    bg: "bg-indigo-400",
    text: "text-indigo-500",
    ring: "ring-indigo-300",
    border: "border-indigo-500",
    hover: "hover:bg-indigo-600",
    softBg: "bg-indigo-100",
  },
  pink: {
    bg: "bg-pink-400",
    text: "text-pink-500",
    ring: "ring-pink-300",
    border: "border-pink-500",
    hover: "hover:bg-pink-600",
    softBg: "bg-pink-100",
  },
};
