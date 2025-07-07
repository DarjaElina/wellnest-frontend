const colorOptions = [
  { name: "Rose", value: "rose", className: "bg-rose-500" },
  { name: "Sky", value: "sky", className: "bg-sky-500" },
  { name: "Emerald", value: "emerald", className: "bg-emerald-500" },
  { name: "Amber", value: "amber", className: "bg-amber-500" },
  { name: "Violet", value: "violet", className: "bg-violet-500" },
  { name: "Indigo", value: "indigo", className: "bg-indigo-500" },
  { name: "Pink", value: "pink", className: "bg-pink-500" },
];

const ringColorMap: Record<string, string> = {
  rose: "ring-rose-300",
  amber: "ring-amber-300",
  emerald: "ring-emerald-300",
  sky: "ring-sky-300",
  violet: "ring-violet-300",
  indigo: "ring-indigo-300",
  pink: "ring-pink-300",
};

interface ColorPickerProps {
  value: string;
  onChange: (e: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-4 max-w-sm">
      {colorOptions.map((color) => (
        <label key={color.value} htmlFor={color.value} className="relative">
          <input
            type="radio"
            id={color.value}
            name="color"
            value={color.value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only peer"
            checked={value === color.value}
          />
          <div
            className={`w-10 h-10 rounded-full cursor-pointer border-2 transition-all
            ${color.className} hover:opacity-80
            peer-checked:ring-4 peer-checked:ring-offset-2 ${ringColorMap[color.value]} 
          `}
          ></div>
          <span className="block text-xs text-center text-muted-foreground mt-1">
            {color.name}
          </span>
        </label>
      ))}
    </div>
  );
}
