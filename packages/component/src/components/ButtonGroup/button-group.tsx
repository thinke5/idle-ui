import type { JSX } from 'solid-js'
import clsx from 'clsx'
import { splitProps } from 'solid-js'
import { useConfig } from '../ConfigProvider'

export function ButtonGroup(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ['class'])
  const config = useConfig()
  const prefixCls = config.getPrefixCls('btn-group')

  return <div class={clsx(prefixCls, local.class)} {...others} />
};
