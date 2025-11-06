import json5 from 'json5'
import { cloneDeep, isEqual } from 'lodash'
import { createEffect, createMemo, For, Match, Switch } from 'solid-js'
import { createStore } from 'solid-js/store'

/** 简单的UI form */
export function PropsController(props: {
  config: string | PropsControlConfig
  onChange?: (value: Record<string, any>) => void
}) {
  const [store, setStore] = createStore<Record<string, any>>({})
  const configList = createMemo<PropsControlConfig>(() => {
    if (!props.config) {
      return []
    }
    if (Array.isArray(props.config)) {
      return props.config
    }
    if (typeof props.config === 'object') {
      const list: PropsControlConfig = []
      Object.entries(props.config).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          list.push({ type: (typeof value) as any, key, defaultValue: value as any })
        }
        else if (Array.isArray(value)) {
          list.push({ type: 'select', key, options: value, defaultValue: value[0] })
        }
        else if (typeof value === 'object') {
          list.push({ type: 'select', key, options: value as any, defaultValue: Object.values(value as any)[0] as any })
        }
      })
      return list
    }
    try {
      return json5.parse(props.config)
    }
    catch (error) {
      return []
    }
  })
  createEffect(() => {
    const param = cloneDeep(store)
    // console.log(param)
    props.onChange?.(param)
  })

  return (
    <div class="p-xs size-full">
      <For each={configList()} fallback="调试配置错误">
        {(item) => {
          if (!store[item.key] && item.defaultValue) {
            setStore({ [item.key]: item.defaultValue })
          }
          const selectOptions = () => Array.isArray(item.options) ? item.options.map(v => [String(v), v]) : Object.entries(item.options || {})
          return (
            <div class="my-1 f-c/sb gap-1 w-full">
              <span class="">{item.label || item.key}</span>
              <Switch fallback={<span class="text-2">不支持的类型「{item.type}」</span>}>
                <Match when={item.type === 'string' || item.type === 'number'}>
                  <input
                    class="px-1 b-1 b-gray-100 b-solid w-3/5"
                    type={item.type === 'number' ? 'number' : 'text'}
                    placeholder={item.label || item.key}
                    value={(store[item.key as any] as any) ?? ''}
                    onInput={(event) => {
                      if (item.type === 'number') {
                        setStore({ [item.key]: Number(event.target.value) })
                        return
                      }
                      setStore({ [item.key]: event.target.value })
                    }}
                  />
                </Match>
                <Match when={item.type === 'boolean'}>
                  <input
                    class="px-1 b-1 b-gray-100 b-solid w-3/5"
                    type="checkbox"
                    placeholder={item.label || item.key}
                    checked={(store[item.key as any] as any)}
                    onInput={(event) => {
                      // console.log({ v: event.target.checked })
                      setStore({ [item.key]: event.target.checked })
                    }}
                  />
                </Match>

                <Match when={item.type === 'select'}>
                  <select
                    class="b-1 b-gray-200 b-solid"
                    value={selectOptions().findIndex(v => isEqual(v[1], store[item.key as any])) ?? 0}
                    onInput={(event) => {
                      const index = event.target.value
                      const value = selectOptions()[index as any][1]
                      setStore({ [item.key]: value })
                    }}
                  >
                    <For each={selectOptions()}>{(item, i) => <option value={i()}>{item[0]}</option>}
                    </For>
                  </select>
                </Match>
              </Switch>
            </div>
          )
        }}
      </For>
    </div>
  )
}
export default PropsController

type PropsControlConfig = PropsControlConfigItem[]

type PropsControlConfigItem
  = {
    key: string
    label?: string
    type: 'string' | 'number' | 'select' | 'boolean'
    options?: Record<string, string> | string[]
    defaultValue?: string
  }
