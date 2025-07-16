import { colorOptions, ringColorMap } from "@/lib/journalColor";

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
