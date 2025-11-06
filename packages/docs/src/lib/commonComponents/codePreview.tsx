import type { JSXElement } from 'solid-js'
import { createSignal, lazy, Show, Suspense } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import './codePreview.less'

const CodeView = lazy(() => import('../common/CodeView'))
const PropsController = lazy(() => import('./PropsController'))

/** mdx中多行代码的预览 */
export function CodePreview(props: {
  title?: string
  preview: { default: () => JSXElement }
  code: string
  lang?: string
  src?: string
  desc?: string
  children?: JSXElement
  /** 通过简单的配置UI生成props进行试用 */
  propsController?: any
  iframe?: boolean
}) {
  const [param, setParam] = createSignal({})
  const [showCode, setShowCode] = createSignal(false)
  const desc = () => props.children || props.desc

  return (
    <div id={props.title}>
      {/* <a href={`#${props.title}`}></a> */}
      <h2>{props.title}</h2>
      <Show when={desc()}><p class="text-sm m-0">{desc()}</p></Show>
      <Suspense>
        <div class="b-1 b-gray-200 rd-1 b-solid grid grid-cols-[1fr_auto]">
          <Show when={props.preview?.default} fallback={<span class="text-red">预览的组件不存在，请确保组件在默认导出</span>}>
            {/* <Iframe class="h-full w-full b-none"> */}
            <div class="p-xl overflow-auto">
              <Dynamic component={props.preview.default} {...param()} />
            </div>
            {/* </Iframe> */}
          </Show>
          <Show when={props.propsController}>
            <div class="b-0 b-l-1 b-gray-200 b-dashed w-50">
              <Suspense>
                <PropsController config={props.propsController!} onChange={setParam} />
              </Suspense>
            </div>
          </Show>
        </div>
        <div class="py-1 f-c/e">
          <button class="text-xs text-white p-1 px-2 rd b-none bg-sky-800" onClick={() => setShowCode(s => !s)}>
            {showCode() ? '🙈' : '🖥️' }
          </button>
        </div>
        <Show when={showCode()}>
          <Suspense>
            <CodeView code={props.code} lang={props.lang || props.src?.split('.')[-1] || 'tsx'} />
          </Suspense>
        </Show>
      </Suspense>
    </div>
  )
};

export default CodePreview
