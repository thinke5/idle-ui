import type { JSXElement } from 'solid-js'
import './github.less'

/**  */
export default function MdBlock(props: { children: JSXElement }) {
  return <div class="md-root">{props.children}</div>
};
