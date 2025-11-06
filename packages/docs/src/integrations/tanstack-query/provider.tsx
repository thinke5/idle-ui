import type { JSX } from 'solid-js'

import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

const queryClient = new QueryClient({

})

export default function AppTanstackQueryProvider(props: {
  children: JSX.Element
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}
