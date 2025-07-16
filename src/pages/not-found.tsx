import { Button } from "@/components/ui/button";
import { Ghost, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-background">
      <Ghost className="w-20 h-20 text-muted-foreground animate-bounce mb-6" />
      <h1 className="text-4xl font-bold mb-2 text-foreground">
        404 — Not Found
      </h1>
      <p className="text-muted-foreground mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button onClick={() => navigate(-1)} variant="outline">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </Button>
    </div>
  );
}
