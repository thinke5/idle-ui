import { Button, Space } from '@thinke/idle-ui'

const App = (param: any) => {
  return (
    <Space
      style={{
        width: `${param.width}px`,
        border: '1px solid #ddd',
        padding: '20px',
      }}
      direction="vertical"
    >
      <Button variant="solid" block>Solid</Button>
      <Button variant="soft" block>Secondary</Button>
      <Button variant="dashed" block>Dashed</Button>
      <Button variant="outline" block>Outline</Button>
      <Button variant="text" block>Text</Button>
      <Button variant="link" block>Link</Button>
    </Space>
  )
}

export default App
