import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ResourceNotFoundProps {
  label?: string;
  message?: string;
}

export function ResourceNotFound({
  label = "Resource not found",
  message = "This item might have been deleted or doesn’t exist.",
}: ResourceNotFoundProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-24 px-6">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4 animate-pulse" />
      <h2 className="text-2xl font-semibold text-foreground mb-2">{label}</h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      <Button onClick={() => navigate("/dashboard")} variant="default">
        <Home className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>
    </div>
  );
}
