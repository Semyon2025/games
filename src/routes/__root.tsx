
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'
import { LogoutButton } from '../components/LogoutButton'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <LogoutButton />
      <Outlet />
    </>
  )
}
