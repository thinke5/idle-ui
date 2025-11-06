import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/solid-router'
// import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import { Suspense } from 'solid-js'
import { HydrationScript } from 'solid-js/web'
import ErrorComponent from '~/components/ErrorComponent.tsx'
import MdxProvider from '~/lib/mdx/mdx-provider.tsx'
import Header from '../components/Header.tsx'
import TanStackQueryProvider from '../integrations/tanstack-query/provider.tsx'

export const Route = createRootRouteWithContext()({
  head: () => ({
    // links: [{ rel: 'stylesheet', href: styleCss }],
    meta: [{ title: 'IDLE UI' }],
  }),
  shellComponent: RootComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: () => (
    <div class="text-center f-c/c flex-col min-h-100vh">
      <h1 class="text-16 m-0">404</h1>
      <Link class="text-sm text-blue" to="/">HOME</Link>
    </div>
  ),
})

function RootComponent() {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <Suspense>
          <MdxProvider>
            <TanStackQueryProvider>
              <Header />

              <Outlet />
              {/* <TanStackRouterDevtools /> */}
            </TanStackQueryProvider>
          </MdxProvider>
        </Suspense>
        <Scripts />
      </body>
    </html>
  )
}
