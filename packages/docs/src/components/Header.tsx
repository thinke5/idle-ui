import { Link } from '@tanstack/solid-router'
import { createSignal, For } from 'solid-js'
import { getAllPath } from '~/utils/getAllPath'
// import TanStackQueryHeaderUser from '../integrations/tanstack-query/header-user'

export default function Header() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <header class="text-white p-4 bg-gray-800 flex shadow-lg items-center">
        <button
          onClick={() => setIsOpen(true)}
          class="p-2 rounded-lg transition-colors hover:bg-gray-700"
          aria-label="Open menu"
        >
          M
        </button>
        <h1 class="text-3xl font-semibold ml-4">
          <Link to="/">
            IDLE UI
          </Link>
        </h1>
      </header>

      <aside
        class={`text-white bg-gray-900 flex flex-col h-full w-80 shadow-2xl transform transition-transform duration-300 ease-in-out left-0 top-0 fixed z-50 ${
          isOpen() ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div class="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 class="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            class="p-2 rounded-lg transition-colors hover:bg-gray-800"
            aria-label="Close menu"
          >
            X
          </button>
        </div>

        <nav class="p-4 flex-1 overflow-y-auto">
          <For each={getAllPath()}>{item => (
            <Link
              to={item}
              onClick={() => setIsOpen(false)}
              class="mb-2 p-3 rounded-lg flex gap-3 transition-colors items-center hover:bg-gray-800"
              activeProps={{
                class: 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
              }}
            >
              <span class="font-medium">{item}</span>
            </Link>
          )}
          </For>

          {/* Demo Links End */}
        </nav>

      </aside>
    </>
  )
}
