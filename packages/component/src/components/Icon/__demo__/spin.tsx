import { Icon, Space } from '@thinke/idle-ui'
import { For } from 'solid-js'
import { svgNames } from '../svgs'

export default function (param: any) {
  return (
    <Space>
      <For each={svgNames}>{item => <Icon name={item} spin={param.spin} />}</For>
    </Space>
  )
}
