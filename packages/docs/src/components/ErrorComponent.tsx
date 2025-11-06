import { isServer } from 'solid-js/web'
import { isDEV } from '~/config'

/** 处理错误信息 */
export default function ErrorComponent(props: { error: Error }) {
  const showError = isDEV
  if (props.error.message.startsWith('Hydration Mismatch.')) { // 水合失败，抛出错误，直接在客户端重新进行渲染
    throw props.error
  }
  showError && console.error(props.error)
  if (isServer) {
    throw props.error
  }

  return (
    <div class="text-red f-c/c flex-col min-h-68 w-full">
      <span class="text-2xl">页面崩溃</span>
      <button class="mt-4 px-3 py-1 rd b-none bg-cyan" onClick={() => window.location.reload()}>重新加载</button>
      {showError
        ? (
            <div class="mx-3 mt-2 p-3 rd bg-cyan/10 max-w-dvw">
              <span class="text-xs text-cyan my-2">错误信息，仅会在测试环境展示</span>
              <div class="">{props.error.message}</div>
            </div>
          )
        : null}
    </div>
  )
};
