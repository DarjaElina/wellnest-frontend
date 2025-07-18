import { useAuthQuery } from "@/hooks/useAuthQuery";
import { Navigate, Outlet } from "react-router-dom";

import { AppLoader } from "@/components/ui/app-loader";

export default function PrivateRoute() {
  const { data: user, isLoading, isError } = useAuthQuery();

  if (isLoading) return <AppLoader />;
  if (isError || !user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
