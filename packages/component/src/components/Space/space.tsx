import type { JSX } from 'solid-js'
import type { SpaceProps } from './interface'
import clsx from 'clsx'
import { For, mergeProps, Show, splitProps } from 'solid-js'
import { useChildrenArray } from '../_utils/children'
import { useConfig } from '../ConfigProvider'

const splitPropsKeys = ['children', 'class', 'size', 'direction', 'align', 'wrap', 'split'] as const

function isNumber(value: any): value is number {
  return typeof value === 'number'
}

function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

function getMargin(size: any): number {
  if (isNumber(size)) {
    return size
  }
  switch (size) {
    case 'xs':
      return 4
    case 'sm':
      return 8
    case 'md':
      return 16
    case 'lg':
      return 24
    case 'xl':
      return 32
    default:
      return 8
  }
}

const defaultSpaceProps: SpaceProps = {
  size: 'sm',
  direction: 'horizontal',
  wrap: false,
}

export function Space(_props: SpaceProps) {
  const config = useConfig()
  const props = mergeProps(defaultSpaceProps, _props)
  const [local, others] = splitProps(props, splitPropsKeys)

  const prefixCls = config.getPrefixCls('space')

  const innerAlign = () => local.align || (local.direction === 'horizontal' ? 'center' : '')

  const classNames = () => clsx(
    prefixCls,
    `${prefixCls}-${local.direction}`,
    {
      [`${prefixCls}-align-${innerAlign()}`]: innerAlign(),
      [`${prefixCls}-wrap`]: local.wrap,
      [`${prefixCls}-rtl`]: config.rtl,
    },
    local.class,
  )

  const childrenList = useChildrenArray(() => local.children)

  function getMarginStyle(index: number): JSX.CSSProperties {
    const isLastOne = childrenList().length === index + 1
    const marginDirection = config.rtl ? 'margin-left' : 'margin-right'
    const direction = local.direction
    const size = local.size
    const wrap = local.wrap

    if (typeof size === 'string' || typeof size === 'number') {
      const margin = getMargin(size)
      if (wrap) {
        return isLastOne
          ? { 'margin-bottom': `${margin}px` }
          : {
              [`${marginDirection}`]: `${margin}px`,
              'margin-bottom': `${margin}px`,
            }
      }

      return !isLastOne
        ? {
            [direction === 'vertical' ? 'margin-bottom' : marginDirection]: `${margin}px`,
          }
        : {}
    }

    if (isArray(size)) {
      const marginHorizontal = getMargin(size[0])
      const marginBottom = getMargin(size[1])
      if (wrap) {
        return isLastOne
          ? { 'margin-bottom': `${marginBottom}px` }
          : {
              [`${marginDirection}`]: `${marginHorizontal}px`,
              'margin-bottom': `${marginBottom}px`,
            }
      }
      if (direction === 'vertical') {
        return { 'margin-bottom': `${marginBottom}px` }
      }
      return { [`${marginDirection}`]: `${marginHorizontal}px` }
    }

    return {}
  }

  return (
    <div class={classNames()} {...others}>
      <For each={childrenList()}>
        {(child, index) => {
          return (
            <>
              <Show when={local.split && index() > 0}>
                <div class={`${prefixCls}-item-split`} style={getMarginStyle(index() - 1)}>{local.split}</div>
              </Show>
              <div class={`${prefixCls}-item`} style={getMarginStyle(index())}>
                {child}
              </div>
            </>
          )
        }}
      </For>
    </div>
  )
}
