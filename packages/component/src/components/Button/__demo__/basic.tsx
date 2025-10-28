import { Button, Space } from '@thinke/idle-ui'

export default function () {
  return (
    <Space>
      <Button>Default</Button>
      <Button variant="soft">soft</Button>
      <Button variant="outline">outline</Button>
      <Button variant="dashed">dashed</Button>
      <Button variant="text">text</Button>
      <Button variant="link">link</Button>
    </Space>
  )
}
