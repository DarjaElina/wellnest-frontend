import { createContext, useContext } from "react";

type DemoContextValue = {
  isDemo: boolean;
};

const DemoContext = createContext<DemoContextValue | undefined>(undefined);

export function useIsDemo(): boolean {
  const ctx = useContext(DemoContext);
  if (!ctx) return false;
  return ctx.isDemo;
}

export function DemoProvider({
  children,
  isDemo = true,
}: {
  children: React.ReactNode;
  isDemo?: boolean;
}) {
  return (
    <DemoContext.Provider value={{ isDemo }}>{children}</DemoContext.Provider>
  );
}
