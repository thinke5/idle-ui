import { createRouter } from '@tanstack/solid-router'
import { isServer } from 'solid-js/web'
import { BUILD_TIME, RouteBasePah } from './config'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
// style
import './styles.css'
import 'uno.css'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    basepath: RouteBasePah,

    context: {

    },
    // scrollRestoration: !true,
    defaultPreload: 'intent',
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: () => <div class="f-c/c s-full"><i class="i-mdi:loading text-2xl text-blue animate-spin" /></div>,
    trailingSlash: 'always', // 如何处理尾部斜杠
  })
  return router
}

if (!isServer) {
  //  eslint-disable-next-line no-console
  console.log(`%c bulid in ${BUILD_TIME} `, 'background:#4a0;color:#fff;padding:6px;') // 打印版本
}
