import { Button } from "@/components/ui/button";

export default function SidebarTabButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      onClick={onClick}
      className="w-full justify-start text-sm cursor-pointer"
    >
      {label}
    </Button>
  );
}
