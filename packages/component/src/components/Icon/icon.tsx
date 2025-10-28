import type { IconProps } from './interface'
import clsx from 'clsx'
import { splitProps } from 'solid-js'
import { useConfig } from '../ConfigProvider'
import { svgMap } from './svgs'

/** 简单的icon */
export function Icon(props: IconProps) {
  const [local, rset] = splitProps(props, ['class', 'style', 'name', 'spin', 'children'])
  const config = useConfig()

  const prefixCls = config.getPrefixCls('icon')

  const svgUrl = () => local.name ? `url(data:image/svg+xml;utf8,${encodeURIComponent(svgMap[local.name])})` : undefined

  return (
    <i
      class={clsx(
        prefixCls,
        {
          [`${prefixCls}-mask`]: svgUrl(),
          [`${prefixCls}-spin`]: local.spin,
        },
        local.class,
      )}
      style={{ '--icon-url': svgUrl(), ...local.style }}
      children={local.children ?? '\xA0'}// 没有 children 的时候，显示一个空格`&nbsp;`,避免周围存在margin
      {...rset}
    />
  )
};
