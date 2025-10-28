import { Button, Icon, Space } from '@thinke/idle-ui'
import { createStore } from 'solid-js/store'

export default function (param: any) {
  const [store, setStore] = createStore({
    loading1: false,
  })

  function toLoading(index: number) {
    setStore({ [`loading${index}`]: true })
    setTimeout(() => {
      setStore({ [`loading${index}`]: false })
    }, 2000)
  }
  function sleep(t: number) {
    return new Promise(resolve => setTimeout(resolve, t))
  }

  return (
    <Space direction="vertical">
      <Space>
        <Button {...param} color="primary">Default</Button>
        <Button {...param} icon={<Icon name="close" />} color="secondary" variant="soft">soft</Button>
        <Button {...param} color="accent" variant="outline">outline</Button>
        <Button {...param} color="info" variant="dashed">dashed</Button>
        <Button {...param} color="success" variant="dashed">dashed</Button>
        <Button {...param} color="warning" variant="text">text</Button>
        <Button {...param} color="error" variant="link">link</Button>
        <Button {...param} color="error" shape="square" icon={<Icon name="close" />}></Button>
        <Button {...param} color="error" shape="circle" icon={<Icon name="close" />}></Button>
      </Space>
      <Space>
        <Button
          loading={store.loading1}
          onClick={() => toLoading(1)}
          icon={<Icon name="close" />}
          loadingFixedWidth={param.loadingFixedWidth}
        >参数控制
        </Button>
        <Button onClick={async () => sleep(2000)} loadingFixedWidth={param.loadingFixedWidth}>自动控制</Button>
        <Button onClick={async () => sleep(2000)} iconPosition="end" loadingFixedWidth={param.loadingFixedWidth}>loding在尾部</Button>
      </Space>
    </Space>
  )
}
