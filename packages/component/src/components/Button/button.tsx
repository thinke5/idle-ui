import type { ButtonProps } from './interface'
import clsx from 'clsx'
import { createSignal, mergeProps, Show, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { isPromise } from '../_utils/promise'
import { useConfig } from '../ConfigProvider'
import { Icon } from '../Icon'

const splitPropsKeys = ['children', 'class', 'variant', 'size', 'shape', 'disabled', 'block', 'loading', 'onClick', 'icon', 'color', 'iconPosition', 'loadingFixedWidth'] satisfies (keyof ButtonProps)[]

const defaultButtonProps: ButtonProps = {
  size: 'md',
  shape: 'rectangle',
  iconPosition: 'start',
  variant: 'soft',
  // loadingFixedWidth: true,
}

/** 按钮 */
export function Button(_props: ButtonProps) {
  const config = useConfig()

  // 不能直接读取会导致水合错误 https://github.com/solidjs/solid/issues/2558
  const hasIcon = () => 'icon' in _props

  const props = mergeProps(
    defaultButtonProps,
    {
      size: config.size,
      variant: _props.href ? 'link' : undefined, // _props.color ? undefined : 'solid',
      shape: hasIcon() && !_props.children ? 'square' : undefined,
    },
    _props,
  )
  const [local, others] = splitProps(props, splitPropsKeys)
  const prefixCls = config.getPrefixCls('btn')

  const [innerLoading, setInnerLoading] = createSignal(false)
  const loading = () => local.loading || innerLoading()
  const disabled = () => local.disabled // || loading()

  const classNames = () => clsx(
    prefixCls,
    `${prefixCls}-icon-${local.iconPosition}`,
    `${prefixCls}-${local.shape}`,
    `${prefixCls}-${local.size}`,
    {
      [`${prefixCls}-${local.variant}`]: local.variant,
      [`${prefixCls}-${local.color}`]: local.color,
      [`${prefixCls}-has-icon`]: hasIcon(),
      [`${prefixCls}-disabled`]: disabled(),
      [`${prefixCls}-block`]: local.block,
      [`${prefixCls}-loading`]: loading(),
      [`${prefixCls}-loading-fixed-width`]: local.loadingFixedWidth,
    },
  )

  async function handleClick(e: Event) {
    if (local.disabled || loading()) {
      return
    }
    const promise = local.onClick?.(e)

    if (isPromise(promise)) {
      try {
        setInnerLoading(true)
        await promise
        setInnerLoading(false)
      }
      catch (e) {
        setInnerLoading(false)
        throw e
      }
    }
  }
  return (
    <Dynamic
      component={props.href ? 'a' : 'button'}
      class={classNames()}
      disabled={disabled()}
      {...others as any}
      onClick={handleClick}
    >
      <Show when={loading()} fallback={local.icon}>
        <Icon name="loading" spin />
      </Show>
      {local.children}
    </Dynamic>
  )
};
