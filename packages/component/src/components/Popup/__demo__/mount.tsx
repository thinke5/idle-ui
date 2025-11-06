import { Popup, Space } from '@thinke/idle-ui'
import { onCleanup, onMount } from 'solid-js'

export default () => {
  return (
    <Space>
      <Popup trigger="打开弹窗" lazyMount>
        <AnyCom />
      </Popup>
      <Popup trigger="打开弹窗" unmountOnExit>
        <AnyCom />
      </Popup>
      <Popup trigger="打开弹窗" lazyMount unmountOnExit>
        <AnyCom />
      </Popup>
    </Space>

  )
}

function AnyCom() {
  onMount(() => {
    console.log('onMount AnyCom')
  })
  onCleanup(() => {
    console.log('onCleanup AnyCom')
  })

  return (
    <div>
      <p>显示在主要内容上方的模态窗口</p>
      <p>{Math.random()}</p>
    </div>
  )
}
