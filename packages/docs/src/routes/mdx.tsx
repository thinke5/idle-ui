import { createFileRoute } from '@tanstack/solid-router'
import { MdBlock } from '~/lib/mdx/md-block'
import MdxMain from '../MDX/test.mdx'

export const Route = createFileRoute('/mdx')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MdBlock>
      <MdxMain />
    </MdBlock>
  )
}
