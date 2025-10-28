import { createFileRoute } from '@tanstack/solid-router'
import README from '@thinke/idle-ui/components/Space/README.mdx'
import MdBlock from '~/lib/mdx/md-block'

export const Route = createFileRoute('/components/space')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MdBlock>
      <README />
    </MdBlock>
  )
}
