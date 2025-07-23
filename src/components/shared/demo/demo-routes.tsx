import { Outlet } from "react-router-dom";
import { DemoProvider } from "@/context/demoContext";
import { SettingsProvider } from "@/context/settingsContext";

export default function DemoRoutes() {
  return (
    <DemoProvider>
      <SettingsProvider>
        <Outlet />
      </SettingsProvider>
    </DemoProvider>
  );
}
