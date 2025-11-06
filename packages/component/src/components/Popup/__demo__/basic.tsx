import { Button, Popup, Space } from '@thinke/idle-ui'
import { createSignal } from 'solid-js'

export default () => {
  const [open, setOpen] = createSignal(false)
  return (
    <Space>
      <div>
        <Button color="accent" onClick={() => setOpen(old => !old)}>打开弹窗</Button>
        <Popup
          open={open()}
          onOpenChange={({ open }) => {
            setOpen(open)
          }}
        >
          <p>显示在主要内容上方的模态窗口 </p>
          <p>窗口1</p>
        </Popup>
      </div>

      <Popup trigger="打开弹窗">
        <p>显示在主要内容上方的模态窗口 </p>
        <p>窗口2</p>
      </Popup>

      <Popup trigger={<Button disabled variant="outline">禁止打开</Button>}>
        <p>显示在主要内容上方的模态窗口 </p>
        <p>窗口3</p>
      </Popup>
    </Space>
  )
}
