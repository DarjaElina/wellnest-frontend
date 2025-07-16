export type JournalColor =
  | "moss"
  | "clay"
  | "sky"
  | "lavender"
  | "rose"
  | "sand"
  | "ocean";

export const JOURNAL_COLORS = [
  "moss",
  "clay",
  "sky",
  "lavender",
  "rose",
  "sand",
  "ocean",
] as const;

export const colorOptions = [
  { name: "Moss", value: "moss", className: "bg-journal-moss" },
  { name: "Clay", value: "clay", className: "bg-journal-clay" },
  { name: "Sky", value: "sky", className: "bg-journal-sky" },
  { name: "Lavender", value: "lavender", className: "bg-journal-lavender" },
  { name: "Rose", value: "rose", className: "bg-journal-rose" },
  { name: "Sand", value: "sand", className: "bg-journal-sand" },
  { name: "Ocean", value: "ocean", className: "bg-journal-ocean" },
];

export const ringColorMap: Record<string, string> = {
  moss: "ring-journal-moss",
  clay: "ring-journal-clay",
  sky: "ring-journal-sky",
  lavender: "ring-journal-lavender",
  rose: "ring-journal-rose",
  sand: "ring-journal-sand",
  ocean: "ring-journal-ocean",
};

export const bgColorMap: Record<string, string> = {
  moss: "bg-journal-moss",
  clay: "bg-journal-clay",
  sky: "bg-journal-sky",
  lavender: "bg-journal-lavender",
  rose: "bg-journal-rose",
  sand: "bg-journal-sand",
  ocean: "bg-journal-ocean",
};

export const textColorMap: Record<string, string> = {
  moss: "text-journal-moss",
  clay: "text-journal-clay",
  sky: "text-journal-sky",
  lavender: "text-journal-lavender",
  rose: "text-journal-rose",
  sand: "text-color-journal-sand",
  ocean: "text-journal-ocean",
};

export const hoverColorMap: Record<string, string> = {
  moss: "hover:bg-journal-moss/70",
  clay: "hover:bg-journal-clay/70",
  sky: "hover:bg-journal-sky/70",
  lavender: "hover:bg-journal-lavender/70",
  rose: "hover:bg-journal-rose/70",
  sand: "hover:bg-journal-sand/70",
  ocean: "hover:bg-journal-ocean/70",
};
