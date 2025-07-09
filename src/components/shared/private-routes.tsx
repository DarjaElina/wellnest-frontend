import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const auth = useSelector(
    (state: RootState) => state.auth,
  );
  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" />;
}
