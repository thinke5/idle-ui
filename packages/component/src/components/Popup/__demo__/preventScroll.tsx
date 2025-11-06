import { Popup, Space } from '@thinke/idle-ui'

export default () => {
  return (
    <Space>
      <Popup trigger="阻止滚动" preventScroll closeOnInteractOutside={false}>
        <Popup.CloseTrigger />
        <div class="w-200 h-20 bg-blue"></div>
      </Popup>
      <Popup trigger="不阻止滚动" preventScroll={false} closeOnInteractOutside={false}>
        <Popup.CloseTrigger />
        <div class="w-200 h-20 bg-yellow"></div>
      </Popup>
    </Space>
  )
}
