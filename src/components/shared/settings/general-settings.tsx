import { Button } from "@/components/ui/button";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { Trash2 } from "lucide-react";

export default function GeneralSettings() {
  const { data: user } = useAuthQuery();
  

  return (
    <div className="space-y-6 mt-6">
     {user.firstName && user.lastName && user.email && (
       <div className="flex items-center space-x-4">
       <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center text-sm font-medium uppercase">
       {user.firstName.slice(0, 1)}{user.lastName.slice(0, 1)}
       </div>
       <div>
         <p className="text-base font-semibold">{user.firstName} {user.lastName}</p>
         <p className="text-sm text-muted-foreground">{user.email}</p>
       </div>
     </div>
     )}
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
