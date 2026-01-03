import { Outlet, useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { getStorageItem } from '@/lib/localstorage'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SkipToMain } from '@/components/skip-to-main'
import { useAppSelector } from '@/lib/reduxTypes'
import React from 'react'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { user, loading } = useAppSelector(state => state.Auth)
  const defaultOpen = getStorageItem('sidebar_state') !== 'false'
  const nav = useNavigate();

  const isAdmin =
    !!user &&
    user.role?.name === "ADMIN" &&
    user.isProfileComplete && !loading;
  React.useEffect(() => {
    if (!isAdmin) {
      nav({ to: "/sign-in" });
    }
  }, [isAdmin, nav]);

  // 🔒 BLOCK UI (render nothing)
  if (!isAdmin) {
    return null;
  }

  // 🚦 Redirect AFTER render
  return (
    <SearchProvider>
      <LayoutProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SkipToMain />
          <AppSidebar />
          <SidebarInset
            className={cn(
              // Set content container, so we can use container queries
              '@container/content',

              // If layout is fixed, set the height
              // to 100svh to prevent overflow
              'has-data-[layout=fixed]:h-svh',

              // If layout is fixed and sidebar is inset,
              // set the height to 100svh - spacing (total margins) to prevent overflow
              'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
            )}
          >
            {children ?? <Outlet />}
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  )
}

