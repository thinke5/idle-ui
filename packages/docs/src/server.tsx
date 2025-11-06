import type { ServerEntry } from '@tanstack/solid-start/server-entry'
import {
  createStartHandler,
  defaultRenderHandler,
  defaultStreamHandler,
  defineHandlerCallback,
} from '@tanstack/solid-start/server'

// console.log('Hello from the server!')
const customHandler = defineHandlerCallback((ctx) => {
  // add custom logic here
  return defaultRenderHandler(ctx)
})

const fetch = createStartHandler(customHandler)

export default {
  fetch,
} satisfies ServerEntry
