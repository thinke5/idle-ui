import type { JSXElement } from 'solid-js'
import { MDXProvider } from '~/lib/common/jsx-runtime'
import { CodePreview } from '~/lib/commonComponents/codePreview'

// mdx组件
const MdxComponents = {
  CodePreview,
  a: (props: any) => <a target="_blank" rel="noopener noreferrer" {...props} />,
}

/**  */
export default function MdxProvider(props: { children: JSXElement }) {
  return (
    <MDXProvider components={MdxComponents}>
      {props.children}
    </MDXProvider>
  )
};
