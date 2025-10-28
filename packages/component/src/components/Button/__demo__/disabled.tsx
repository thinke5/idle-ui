import { Button } from '@thinke/idle-ui'
import { For } from 'solid-js'

const App = (param: any) => {
  return (
    <div class="grid grid-cols-[repeat(6,100px)] gap-3 ">
      <For each={['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'] as const}>{color => (
        <For each={['solid', 'soft', 'outline', 'dashed', 'text', 'link'] as const}>{variant => (
          <Button variant={variant} color={color} {...param}>
            {color}
          </Button>
        )}
        </For>
      )}
      </For>
    </div>
  )
}

export default App
