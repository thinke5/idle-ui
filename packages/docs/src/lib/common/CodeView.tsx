/* eslint-disable ts/ban-ts-comment */
import sh from '@shikijs/langs/sh'
import ts from '@shikijs/langs/ts'
import tsx from '@shikijs/langs/tsx'
import darkPlus from '@shikijs/themes/dark-plus'
import clsx from 'clsx'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import { customElement } from 'solid-element'
import { createSignal, onMount } from 'solid-js'
import { isServer } from 'solid-js/web'
import { copyText } from '~/utils/copyText'
import cssStr from './CodeView.less?inline'

if (!isServer) {
  const highlighterPromise = createHighlighterCore({
    themes: [darkPlus],
    langs: [tsx, ts, sh],
    engine: createJavaScriptRegexEngine(),
  })

  customElement('tk-mdx-code', { code: '', lang: '' }, (props, { element }) => {
    const [sikiHtml, setSikiHtml] = createSignal<string | undefined>(undefined)
    onMount(async () => {
    // 代码高亮
      const highlighter = await highlighterPromise
      const html = highlighter.codeToHtml(props.code, { lang: props.lang, theme: 'dark-plus' })
      setSikiHtml(html)
    })

    return (
      <>
        <style>{cssStr}</style>
        <div class={clsx('tku-codeview', props.lang)}>
          <div class="tku-codeview-header">
            <div class="tku-codeview-title">{props.lang}</div>
            <button class="tku-codeview-copy" onClick={() => copyText(props.code)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z" /></svg>
            </button>
          </div>
          {/* copy todo */}
          <div class="tku-codeview-scroll-container" part="codeview-container">
            <div class="tku-codeview-scroll-content">
              {/* code */}
              <div innerHTML={sikiHtml()}>
                <pre>{props.code}</pre>
              </div>
              <textarea
                name="null"
                class="tku-codeview-textarea"
                value={props.code}
                autocomplete="off"
                autocorrect="off"
                // @ts-ignore
                autosave="off"
                spellcheck={false}
              >
              </textarea>
            </div>
          </div>
        </div>
      </>
    )
  })
}
/** 显示代码，支持 代码高亮、复制 */
export function CodeView(props: { code: string, lang: string }) {
  // @ts-ignore
  return (<tk-mdx-code code={props.code} lang={props.lang} />)
}

export default CodeView
