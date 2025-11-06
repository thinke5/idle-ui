import { createFileRoute } from '@tanstack/solid-router'
// import README from '@thinke/idle-ui/components/Popup/README.mdx'
// import MdBlock from '~/lib/mdx/md-block'

export const Route = createFileRoute('/components/popup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <p>1234</p>
  // return (
  //   <MdBlock>
  //     {/* <README /> */}
  //   </MdBlock>
  // )
}
