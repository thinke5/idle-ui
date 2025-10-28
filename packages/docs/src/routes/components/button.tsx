import { createFileRoute } from '@tanstack/solid-router'
import README from '@thinke/idle-ui/components/Button/README.mdx'
import MdBlock from '~/lib/mdx/md-block'

export const Route = createFileRoute('/components/button')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MdBlock>
      <README />
    </MdBlock>
  )
}
