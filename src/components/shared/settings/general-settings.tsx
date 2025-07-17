import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function GeneralSettings() {
  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center space-x-4">
        <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center text-sm font-medium uppercase">
          AU
        </div>
        <div>
          <p className="text-base font-semibold">Anna Example</p>
          <p className="text-sm text-muted-foreground">anna@example.com</p>
        </div>
      </div>
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start cursor-pointer">
          Disconnect Google Account
        </Button>

        <Button
          variant="destructive"
          className="w-full justify-start cursor-pointer"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Account
        </Button>
      </div>
    </div>
  );
}
