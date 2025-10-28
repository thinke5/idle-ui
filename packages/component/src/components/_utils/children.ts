import type { Accessor, JSX } from 'solid-js'
import { children, createMemo } from 'solid-js'

export function useChildrenArray(fn: Accessor<JSX.Element>) {
  const nodes = children(fn)
  return createMemo<JSX.Element[]>(() => {
    if (Array.isArray(nodes())) {
      return Array.from(nodes() as any).filter(f => f != null) as JSX.Element[]
    }
    return [nodes()]
  })
}
