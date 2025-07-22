import React, {type ReactElement} from 'react'
import {render, type RenderOptions} from '@testing-library/react'
import { ThemeProvider } from '@/components/shared/theme-provider'
import { SettingsProvider } from '@/context/settingsContext'
import { FilterProvider } from '@/context/filterContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SidebarProvider } from '@/components/ui/sidebar'
import { MemoryRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <FilterProvider>
             <SidebarProvider>
               {children}
             </SidebarProvider>
            </FilterProvider>
          </SettingsProvider>
        </QueryClientProvider>
      </MemoryRouter>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export {customRender as render}