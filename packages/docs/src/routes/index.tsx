import { createFileRoute } from '@tanstack/solid-router'
import README from '@thinke/idle-ui/README.md'
import MdBlock from '~/lib/mdx/md-block'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  head: () => ({
    meta: [{
      // title: 'Home',
    }],
  }),
})

function RouteComponent() {
  return (
    <div class="p-xl">
      <MdBlock>
        <README />
      </MdBlock>
    </div>
  )
}
