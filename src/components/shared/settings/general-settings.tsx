import { Button } from "@/components/ui/button";
import { showErrorToast } from "@/helper/error";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { db } from "@/lib/db";
import { deleteUserAccount } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useIsDemo } from "@/context/demoContext";

export default function GeneralSettings() {
  const { data: user } = useAuthQuery();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isDemo = useIsDemo();

  const deleteAccountMutation = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: async () => {
      localStorage.clear();
      await db.delete();
      await db.open();
      queryClient.clear();
      navigate("/");
    },
    onError: (e) => {
      showErrorToast(e);
    },
  });

  const handleDeleteAccount = async () => {
    await deleteAccountMutation.mutateAsync();
  };

  const userData = {
    firstName: user?.firstName ?? "Example",
    lastName: user?.lastName ?? "User",
    email: user?.email ?? "example@user.com",
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center space-x-4">
        <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center text-sm font-medium uppercase">
          {userData.firstName.slice(0, 1)}
          {userData.lastName.slice(0, 1)}
        </div>
        <div>
          <p className="text-base font-semibold">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{userData.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isDemo}
              className="justify-start cursor-pointer"
              variant="destructive"
            >
              {" "}
              <Trash2 className="w-4 h-4 mr-2" /> Delete account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer"
                onClick={handleDeleteAccount}
                disabled={deleteAccountMutation.isPending}
              >
                {deleteAccountMutation.isPending
                  ? "Proccessing..."
                  : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
