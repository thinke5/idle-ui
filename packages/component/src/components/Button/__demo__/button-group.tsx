import { Button, ButtonGroup, Icon, Space } from '@thinke/idle-ui'
import { For } from 'solid-js'

const App = (param: any) => {
  return (
    <Space size="lg" direction="vertical">
      <Space size="lg">
        <ButtonGroup>
          <Button>Publish</Button>
          <Button icon={<Icon class="i-mdi:chevron-down" />} />
        </ButtonGroup>
        <ButtonGroup>
          <Button color="secondary">Publish</Button>
          <Button color="secondary" icon={<Icon class="i-mdi:more" />} />
        </ButtonGroup>
      </Space>
      <ButtonGroup>
        <Button color="primary">Publish</Button>
        <Button color="primary" icon={<Icon class="i-mdi:chevron-down" />} />
      </ButtonGroup>
      <Space size="lg">
        <ButtonGroup>
          <Button
            variant="solid"
            color="primary"
            icon={<Icon class="i-mdi:chevron-left" />}
            shape="round"
            style={{ padding: '0 8px' }}
          >
            Prev
          </Button>
          <Button
            variant="solid"
            color="primary"
            shape="round"
            style={{ padding: '0 8px' }}
          >
            Next
            <Icon class="i-mdi:chevron-right" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button color="primary" icon={<Icon class="i-mdi:star" />} />
          <Button color="primary" icon={<Icon class="i-mdi:message-bulleted" />} />
          <Button color="primary" icon={<Icon class="i-mdi:cog" />} />
        </ButtonGroup>
        <ButtonGroup>
          <Button color="primary" icon={<Icon class="i-mdi:star" />}>
            Favorite
          </Button>
          <Button color="primary" icon={<Icon class="i-mdi:cog" />}>
            Setting
          </Button>
        </ButtonGroup>
      </Space>

      <Space>
        <For each={['solid', 'soft', 'outline', 'dashed', 'text', 'link'] as const}>{variant => (
          <ButtonGroup>
            <Button color={param.color} variant={variant}>Publish</Button>
            <Button color={param.color} variant={variant} icon={<Icon class="i-mdi:chevron-down" />} />
          </ButtonGroup>
        )}
        </For>
      </Space>

    </Space>
  )
}

export default App
