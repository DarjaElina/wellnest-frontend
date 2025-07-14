import { useAuthQuery } from "@/hooks/use-auth-query";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { data: user, isLoading, isError } = useAuthQuery();

  if (isLoading) return <div>Loading...</div>;

  if (isError || !user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
