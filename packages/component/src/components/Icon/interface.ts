import type { JSX } from 'solid-js'
import type { SvgName } from './svgs'

export interface IconProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'style'> {
  /**
   * 图标名称
   */
  name?: SvgName
  /**
   * 是否旋转
   * @default false
   */
  spin?: boolean
  style?: JSX.CSSProperties
}
