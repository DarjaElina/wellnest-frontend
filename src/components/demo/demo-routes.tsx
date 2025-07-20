import { Outlet } from "react-router-dom";
import { DemoProvider } from "@/context/demoContext";

export default function DemoRoutes() {
  return (
    <DemoProvider>
      <Outlet />
    </DemoProvider>
  );
}
