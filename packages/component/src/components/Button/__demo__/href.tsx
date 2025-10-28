import { Button, Space } from '@thinke/idle-ui'

export default function () {
  return (
    <Space>
      <Button href="#基本用法" target="_self">Default</Button>
      <Button href="#基本用法" variant="solid">solid</Button>
      <Button href="#基本用法" variant="soft">soft</Button>
      <Button href="#基本用法" variant="outline">outline</Button>
      <Button href="#基本用法" variant="dashed">dashed</Button>
      <Button href="#基本用法" variant="text">text</Button>
      <Button href="#基本用法" variant="link">link</Button>
    </Space>
  )
}
