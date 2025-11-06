import type { JSXElement } from 'solid-js'
import './github.less'

/**  */
export function MdBlock(props: { children: JSXElement }) {
  return (
    <div class="md-root">{props.children}</div>
  )
};
export default MdBlock
