import type { JSXElement } from 'solid-js'
import { MDXProvider } from '~/lib/common/jsx-runtime'
import { CodePreview } from '~/lib/commonComponents/codePreview'
import CodeView from '../common/CodeView'

// mdx组件
const MdxComponents = {
  CodePreview,
  a: (props: any) => <a target="_blank" rel="noopener noreferrer" {...props} />,
  code: (props: any) => {
    const className = props.className || props.class
    if (!className) {
      return <code {...props} />
    }
    const lang = className?.match(/language-(\w+)/)?.[1]
    return <CodeView code={props.children} lang={lang} />
  },
}

/**  */
export default function MdxProvider(props: { children: JSXElement }) {
  return (
    <MDXProvider components={MdxComponents}>
      {props.children}
    </MDXProvider>
  )
};
