import { createContext, useContext, useEffect, useState } from "react";
import type { UserSettings } from "@/types/settings.types";
import { DEFAULT_SETTINGS } from "@/helper/settings-db";
import { db } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { getRemoteSettings } from "@/services/user";
import { useIsDemo } from "./demoContext";

type SettingsContextType = {
  settings: UserSettings;
  updateSettings: (newSettings: UserSettings) => Promise<void>;
  isBooting: boolean;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isBooting, setIsBooting] = useState(true);
  const isDemo = useIsDemo();

  const { data: remoteSettings } = useQuery({
    queryKey: ["settings"],
    queryFn: getRemoteSettings,
    enabled: !isDemo,
  });

  useEffect(() => {
    const loadSettings = async () => {
      if (!isDemo) {
        if (remoteSettings) {
          await db.settings.put(remoteSettings);
          setSettings(remoteSettings);
        } else {
          const local = await db.settings.toCollection().first();
          setSettings(local ?? DEFAULT_SETTINGS);
        }
      } else {
        const local = await db.settings.toCollection().first();
        const demoSettings = local ?? DEFAULT_SETTINGS;
        await db.settings.put(demoSettings);
        setSettings(demoSettings);
      }

      setIsBooting(false);
    };

    loadSettings();
  }, [isDemo, remoteSettings]);

  const updateSettings = async (newSettings: UserSettings) => {
    setSettings(newSettings);
    await db.settings.put(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isBooting }}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
