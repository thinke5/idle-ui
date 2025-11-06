import type { Dialog as ArkDialog } from '@ark-ui/solid/dialog'

import type { Component, JSX } from 'solid-js'

export type PopupPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

export interface PopupProps extends ArkDialog.RootBaseProps {
  /**
   * 弹出框的受控打开状态
   */
  'open'?: boolean
  /**
   * 弹出框渲染时的初始打开状态。
   * 当您不需要控制弹出框的打开状态时使用。
   * @default false
   */
  'defaultOpen'?: boolean
  /**
   * 弹出框内部修改打开状态改变时调用的函数
   */
  'onOpenChange'?: (details: { open: boolean }) => void
  /**
   * 触发弹出，不是`JSXElement`时会自动使用`Button`渲染
   */
  'trigger'?: JSX.Element
  /**
   * 弹出框位置
   * @default "center"
   */
  'position'?: PopupPosition
  /**
   * 是否启用延迟挂载
   * @default false
   */
  'lazyMount'?: boolean
  /**
   * 退出时是否卸载
   * @default false
   */
  'unmountOnExit'?: boolean
  /**
   * 动画结束时处于关闭状态时调用的函数
   */
  'onExitComplete'?: VoidFunction | undefined
  /**
   * 弹出框的模糊程度
   * @default 4
   */
  'blur'?: number
  /**
   * 是否在弹出框打开时将焦点移入弹出框内部
   * @default true
   */
  'trapFocus'?: boolean
  // /**
  //  * 是否在弹出框打开时阻止背景滚动
  //  * @default true
  //  */
  // 'preventScroll'?: boolean
  /**
   * 是否阻止外部指针交互并隐藏其下方的所有内容
   * @default true
   */
  'modal'?: boolean
  /**
   * 弹出框打开时接收焦点的元素
   */
  'initialFocusEl'?: () => HTMLElement
  /**
   * 弹出框关闭时接收焦点的元素
   */
  'finalFocusEl'?: () => HTMLElement
  /**
   * 是否在弹出框打开前将焦点恢复到之前拥有焦点的元素
   */
  'restoreFocus'?: boolean
  /**
   * 是否点击外部区域关闭弹出框
   * @default true
   */
  'closeOnInteractOutside'?: boolean
  /**
   * 是否可以按ESC键关闭弹出框
   * @default true
   */
  'closeOnEscape'?: boolean
  /**
   * 弹出框的可读标签，在未渲染弹出框标题时使用
   */
  'aria-label'?: string
  /**
   * 弹出框的角色
   * @default "dialog"
   */
  'role'?: 'dialog' | 'alertdialog'

  /**
   * 弹出框 content 类名
   */
  'class'?: string
  'children'?: JSX.Element
  'style'?: JSX.CSSProperties

}

export type PopupComponent = Component<PopupProps> & {
  Context: Component<ArkDialog.ContextProps>
  CloseTrigger: Component<ArkDialog.CloseTriggerProps>
  Title: Component<ArkDialog.TitleProps>
  Description: Component<ArkDialog.DescriptionProps>
}
