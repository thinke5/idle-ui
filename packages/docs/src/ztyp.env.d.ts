/// <reference types="vite/client" />

declare module '*.mdx' {
  export default () => string
}

declare module '*.md' {
  export default () => string
}
