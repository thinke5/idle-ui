import type { JSX } from 'solid-js'

export type SpaceSizeEnum = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
export type SpaceSize = SpaceSizeEnum | SpaceSizeEnum[]
/**
 * @title Space
 */
export interface SpaceProps {
  /**
   * @zh 对齐方式
   * @en Alignment of items
   */
  align?: 'start' | 'end' | 'center' | 'baseline'
  /**
   * @zh 间距方向
   * @en The space direction
   * @defaultValue horizontal
   */
  direction?: 'vertical' | 'horizontal'
  /**
   * @zh 尺寸。
   * @en The space size.
   * @defaultValue "small"
   */
  size?: SpaceSize
  /**
   * @zh 环绕类型的间距，用于折行的场景。
   * @en Whether to wrap line automatic
   * @defaultValue false
   */
  wrap?: boolean
  /**
   * @zh 设置分隔符
   * @en Set separator
   */
  split?: JSX.Element
  children?: JSX.Element
  style?: JSX.CSSProperties
  class?: string
}
