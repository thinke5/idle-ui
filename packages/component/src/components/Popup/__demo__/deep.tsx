import { Popup, Space } from '@thinke/idle-ui'

export default () => {
  return (
    <Space>
      <Popup trigger="打开弹窗1">
        <AnyCom />
        <Popup trigger="打开弹窗2">
          <AnyCom />
          <Popup trigger="打开弹窗3">
            <AnyCom />
            <Popup trigger="打开弹窗4">
              <AnyCom />
              <Popup trigger="打开弹窗5">
                <AnyCom />
              </Popup>
            </Popup>
          </Popup>
        </Popup>
      </Popup>
    </Space>
  )
}

function AnyCom() {
  return (
    <div style={{ width: `${800 - 400 * Math.random()}px`, height: `${600 - 300 * Math.random()}px` }}>
      <p>显示在主要内容上方的模态窗口</p>
      <p>{Math.random()}</p>
    </div>
  )
}
