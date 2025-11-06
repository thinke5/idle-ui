import { Button, Popup, Space } from '@thinke/idle-ui'

export default () => {
  return (
    <Space>
      <Popup trigger="打开弹窗">
        <div class="w-200 h-20 bg-blue"></div>
      </Popup>
      <Popup trigger={<Button color="primary">打开弹窗</Button>}>
        <div class="w-200 h-20 bg-yellow"></div>
      </Popup>
      <Popup trigger={(
        <>
          <div class="size-3 bg-sky rd-2"></div>
          <span>打开弹窗</span>
        </>
      )}
      >
        <div class="w-200 h-20 bg-yellow"></div>
      </Popup>
    </Space>
  )
}
