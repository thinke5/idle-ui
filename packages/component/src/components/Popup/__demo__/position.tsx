import type { PopupProps } from '../interface'
import { Popup, Space } from '@thinke/idle-ui'
import { For } from 'solid-js'

export default () => {
  return (
    <Space>
      <For each={['center', 'top', 'right', 'bottom', 'left'] as PopupProps['position'][]}>{
        position => (
          <Popup trigger={position} position={position}>
            <div class="w-160 h-120 bg-blue"></div>
          </Popup>
        )
      }
      </For>
    </Space>
  )
}
