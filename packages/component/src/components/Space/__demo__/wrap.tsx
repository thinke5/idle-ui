import { Space } from '@thinke/idle-ui'
import { For } from 'solid-js'

export default (param: any) => {
  return (
    <Space {...param}>
      <For each={Array.from({ length: 20 })}>{() => <div class="size-16 bg-gray"></div>}</For>
    </Space>
  )
}
