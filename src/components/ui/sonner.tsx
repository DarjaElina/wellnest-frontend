import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import type { ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-popover, hsl(0 0% 100%))",
          "--normal-text": "var(--color-popover-foreground, hsl(220 20% 20%))",
          "--normal-border": "var(--color-border, hsl(220 20% 88%))",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
