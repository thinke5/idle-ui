import { Icon } from '@thinke/idle-ui'
import { For } from 'solid-js'
import { svgNames } from '../svgs'

export default function (param: any) {
  return (
    <div class=" b-1 b-solid b-gray-3 flex gap-2">
      <For each={svgNames}>{item => (
        <Icon
          class="text-12 text-blue"
          name={item}
          spin={param.spin}
        />
      )}
      </For>
    </div>
  )
}
