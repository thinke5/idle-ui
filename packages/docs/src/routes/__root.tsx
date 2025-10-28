import type { QueryClient } from '@tanstack/solid-query'
import { createRootRouteWithContext, HeadContent, Outlet } from '@tanstack/solid-router'
import Siber from '~/components/Siber'
import ErrorComponent from '~/lib/commonComponents/ErrorComponent'
import NotFound from '~/lib/commonComponents/NotFound'
import MdxProvider from '~/lib/mdx/mdx-provider'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  head: () => ({
    meta: [
      { title: 'IDLE UI' },
    ],
  }),
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
  pendingComponent: () => <div class="s-full f-c/c"><i class="i-mdi:loading animate-spin text-2xl text-blue" /></div>,
})

/** 根元素 */
function RootComponent() {
  return ([
    <HeadContent />,
    <MdxProvider>
      <div class="grid grid-cols-[auto_1fr]">
        <Siber />
        <div class="overflow-auto p-2 pb-60 pt-1 h-dvh"><Outlet /></div>
      </div>
    </MdxProvider>,
  ])
}
