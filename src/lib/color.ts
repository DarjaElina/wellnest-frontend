export const JOURNAL_COLORS = [
  "rose",
  "sky",
  "teal",
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
    bg: "bg-rose-500",
    text: "text-rose-500",
    ring: "ring-rose-400",
    border: "border-rose-600",
    hover: "hover:bg-rose-600",
    softBg: "bg-rose-100",
  },
  sky: {
    bg: "bg-sky-500",
    text: "text-sky-500",
    ring: "ring-sky-400",
    border: "border-sky-600",
    hover: "hover:bg-sky-600",
    softBg: "bg-sky-100",
  },
  teal: {
    bg: "bg-teal-500",
    text: "text-teal-500",
    ring: "ring-teal-400",
    border: "border-teal-600",
    hover: "hover:bg-teal-600",
    softBg: "bg-teal-100",
  },
  amber: {
    bg: "bg-amber-500",
    text: "text-amber-500",
    ring: "ring-amber-400",
    border: "border-amber-600",
    hover: "hover:bg-amber-600",
    softBg: "bg-amber-100",
  },
  violet: {
    bg: "bg-violet-500",
    text: "text-violet-500",
    ring: "ring-violet-400",
    border: "border-violet-600",
    hover: "hover:bg-violet-600",
    softBg: "bg-violet-100",
  },
  indigo: {
    bg: "bg-indigo-500",
    text: "text-indigo-500",
    ring: "ring-indigo-400",
    border: "border-indigo-600",
    hover: "hover:bg-indigo-600",
    softBg: "bg-indigo-100",
  },
  pink: {
    bg: "bg-pink-500",
    text: "text-pink-500",
    ring: "ring-pink-400",
    border: "border-pink-600",
    hover: "hover:bg-pink-600",
    softBg: "bg-pink-100",
  },
};

