import type { JSX } from 'solid-js'

export interface BaseButtonProps {
  /**
   * 按钮主要分为六种按钮类型：主要按钮、次级按钮、虚框按钮、文字按钮、线性按钮，`default` 为次级按钮。
   * @default 'soft'
   */
  variant?: 'solid' | 'dashed' | 'outline' | 'soft' | 'text' | 'text' | 'link'
  /**
   * @zh 按钮颜色
   * @en Color of the button
   */
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  /**
   * @zh 按钮的尺寸
   * @en Size of the button
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * @zh 按钮形状，`circle` - 圆形， `round` - 全圆角， `rectangle` - 长方形 `square` - 正方形
   * @en Four button shapes are available: `circle`, `round`, `rectangle` and `square`
   * @defaultValue rectangle
   */
  shape?: 'circle' | 'round' | 'square' | 'rectangle'
  /**
   * 添加跳转链接，设置此属性，使用a标签渲染。
   * 默认 **variant** 为 `link`
   */
  href?: string
  /**
   * @zh 是否禁用
   * @en Whether to disable the button
   */
  disabled?: boolean
  /**
   * @zh 按钮是否是加载状态
   * @en Whether the button is in the loading state
   */
  loading?: boolean
  /**
   * 当 loading 的时候，不改变按钮的宽度。
   * @default false
   */
  loadingFixedWidth?: boolean
  /**
   * @zh 设置按钮的图标
   * @en Icon of the button
   */
  icon?: JSX.Element
  /**
   * 设置按钮图标组件的位置
   * @default 'start'
   */
  iconPosition?: 'start' | 'end'
  /**
   * @zh 按钮宽度随容器自适应。
   * @en Whether the width of the button should adapt to the container.
   */
  block?: boolean
  /**
   * @zh 点击按钮的回调
   * @en Callback fired when the button is clicked
   */
  onClick?: (e: Event) => void | Promise<any>
}

export type ButtonProps = (
  Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
  | Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'href' | 'shape'>
)
& BaseButtonProps
