import { Button, Space } from '@thinke/idle-ui'

export default () => {
  return (
    <>
      <Space split={<span class="text-red-600 text-xl">-</span>}>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Space>
      <hr />
      <Space split={<span>|</span>}>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Space>
    </>
  )
}
