import type { JSX } from 'solid-js'
import type { SpaceProps } from './interface'
import clsx from 'clsx'
import { For, mergeProps, Show, splitProps } from 'solid-js'
import { useChildrenArray } from '../_utils/children'
import { useConfig } from '../ConfigProvider'

const splitPropsKeys = ['children', 'class', 'size', 'direction', 'align', 'wrap', 'split', 'style'] as const

function isNumber(value: any): value is number {
  return typeof value === 'number'
}

function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

const gapMap: Record<string, string> = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
}

function getGap(size: any): string {
  const gap = gapMap[size]
  if (gap) {
    return gap
  }
  if (isNumber(size)) {
    return `${size}px`
  }
  return size
}

const defaultSpaceProps: SpaceProps = {
  size: 'sm',
  direction: 'horizontal',
  wrap: false,
}
/** 间距 */
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
  const gapKey = `--${prefixCls}-gap`
  function getGapValue(): JSX.CSSProperties {
    const size = local.size

    if (typeof size === 'string' || typeof size === 'number') {
      return { [gapKey]: getGap(size) }
    }

    if (isArray(size)) {
      return { [gapKey]: size.reverse().map(getGap).join(' ') }
    }

    return {}
  }

  return (
    <div class={classNames()} style={{ ...getGapValue(), ...local.style }} {...others}>
      <For each={childrenList()}>
        {(child, index) => {
          return (
            <>
              <Show when={'split' in local && index() > 0}>
                <div class={`${prefixCls}-item-split`}>{local.split}</div>
              </Show>
              {child}
            </>
          )
        }}
      </For>
    </div>
  )
}
