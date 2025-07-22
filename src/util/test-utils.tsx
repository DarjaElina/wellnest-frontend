import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SettingsProvider } from "@/context/settingsContext";
import { FilterProvider } from "@/context/filterContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";

import * as ReactRouterDom from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { Toaster } from "sonner";

export const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof ReactRouterDom>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <FilterProvider>
              <SidebarProvider>
                <Toaster />
                {children}
              </SidebarProvider>
            </FilterProvider>
          </SettingsProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
