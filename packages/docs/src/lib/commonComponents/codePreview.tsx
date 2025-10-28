import type { JSXElement } from 'solid-js'
import { createSignal, lazy, Show, Suspense } from 'solid-js'
import { Dynamic, isServer } from 'solid-js/web'
import Frame from '../common/solid-frame-component'
// import { CodeView } from '../common/CodeView'
// import { PropsController } from './PropsController'
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
      <Show when={desc()}><p class="m-0 text-sm">{desc()}</p></Show>
      <Suspense>
        <div class="grid grid-cols-[1fr_auto] b-1 b-gray-2 rd-1 b-solid">
          <Show when={props.preview?.default} fallback={<span class="text-red">预览的组件不存在，请确保组件在默认导出</span>}>
            {/* <Iframe class="h-full w-full b-none"> */}
            <div class="overflow-auto p-xl">
              <Dynamic component={props.preview.default} {...param()} />
            </div>
            {/* </Iframe> */}
          </Show>
          <Show when={props.propsController}>
            <div class="w-50 b-0 b-l-1 b-gray-2 b-dashed">
              <Suspense>
                <PropsController config={props.propsController!} onChange={setParam} />
              </Suspense>
            </div>
          </Show>
        </div>
        <div class="f-c/e py-1">
          <button class="rd b-none bg-sky-8 p-1 px-2 text-xs text-white" onClick={() => setShowCode(!showCode())}>{showCode() ? '🙈' : '🖥️' }</button>
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
