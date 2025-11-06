import { createFileRoute } from '@tanstack/solid-router'
import README from '@thinke/idle-ui/README.md'

import MdBlock from '~/lib/mdx/md-block'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>

      <MdBlock>
        <README />
      </MdBlock>
    </div>
  )
}
