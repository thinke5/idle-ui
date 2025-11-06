import { Button, Icon, Popup, Space } from '@thinke/idle-ui'

export default () => {
  return (
    <Space>
      <Popup trigger="打开弹窗" closeOnInteractOutside={false}>
        <div class="flex justify-between">
          <Popup.Title>标题</Popup.Title>
          <Popup.CloseTrigger />
        </div>
        <Popup.Description>
          <div class="w-200 h-20 bg-blue">描述</div>
        </Popup.Description>
      </Popup>
      <Popup trigger="打开弹窗" closeOnInteractOutside={false} class="bg-transparent shadow-none b-none" blur={0}>
        <div class="flex flex-col justify-center items-center gap-8">
          <div class="w-90 h-160 bg-sky-8"></div>
          <Popup.CloseTrigger asChild={p => <div {...p()} />}>
            <Icon class="text-8 text-orange" name="close" />
          </Popup.CloseTrigger>
        </div>
      </Popup>

    </Space>
  )
}
