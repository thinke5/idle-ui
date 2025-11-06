import type { JSXElement } from 'solid-js'
import { lazy, Show, Suspense } from 'solid-js'
import { Hydration } from 'solid-js/web'
import { MDXProvider } from '~/lib/common/jsx-runtime'
import { CodePreview } from '~/lib/commonComponents/codePreview'

const CodeView = lazy(() => import('../common/CodeView'))

// mdx组件
const MdxComponents = {
  CodePreview,
  a: (props: any) => <a target="_blank" rel="noopener noreferrer" {...props} />,
  code: (props: any) => {
    const className = () => props.className || props.class

    return (
      <Show when={className()} fallback={<code {...props} />}>
        <Suspense>
          <CodeView class={className()} code={props.children} />
        </Suspense>
      </Show>
    )
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
