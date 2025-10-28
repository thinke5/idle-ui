import { Link } from '@tanstack/solid-router'
import { For } from 'solid-js'
import { getAllPath } from '~/utils/getAllPath'

const componentsStr = '/components/'

/**  */
export default function Siber() {
  return (
    <div class="w-50 overflow-auto px-2 shadow h-dvh">
      <Link class="text-dark decoration-none" to="/"><h1 class="m-0 h-20 w-full f-c/c select-none text-3xl font-bold">IDLE UI</h1></Link>

      <div class="text-gray font-bold">Components</div>
      <div class="grid grid-cols-1 gap-1">
        <For each={getAllPath().filter(f => f.startsWith(componentsStr))}>{item => (
          <Link
            class="b-1 b-transparent rd b-dotted px-2 py-1 text-lg text-dark decoration-none hover:b-sky/50 data-[status]:bg-blue-2"
            to={item}
          >{item.replace(componentsStr, '')}
          </Link>
        )}
        </For>
      </div>
    </div>
  )
};
