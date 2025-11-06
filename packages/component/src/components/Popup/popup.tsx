import type { PopupComponent, PopupProps } from './interface'
import { Dialog as ArkDialog } from '@ark-ui/solid/dialog'
import clsx from 'clsx'
import { Match, mergeProps, Show, splitProps, Switch } from 'solid-js'
import { Portal } from 'solid-js/web'
import { isJsxElement } from '../_utils/jsxElement'
import { Button } from '../Button'
import { useConfig } from '../ConfigProvider'
import { Icon } from '../Icon'

const splitPropsKeys = ['children', 'class', 'style', 'trigger', 'position', 'blur'] satisfies (keyof PopupProps)[]

const defaultPopupProps = {
  position: 'center',
} satisfies PopupProps
/** 弹出窗口 */
function PopupCom(_props: PopupProps) {
  const config = useConfig()
  const props = mergeProps(
    defaultPopupProps,
    _props,
  )
  const [local, others] = splitProps(props, splitPropsKeys)

  const prefixCls = config.getPrefixCls('popup')

  function triggerClick(e: Event) {
    // console.log(e)
  }

  return (
    <ArkDialog.Root {...others}>
      <Switch>
        <Match when={isJsxElement(local.trigger)}>
          <ArkDialog.Trigger asChild={p => <div {...p()} />} onClick={triggerClick}>
            {local.trigger}
          </ArkDialog.Trigger>
        </Match>
        <Match when={local.trigger}>
          <ArkDialog.Trigger asChild={p => <Button {...p() as any} variant="solid" />} onClick={triggerClick}>
            {local.trigger}
          </ArkDialog.Trigger>
        </Match>
      </Switch>
      <Portal>
        <div class={clsx(
          prefixCls,
          `${prefixCls}-${local.position}`,
        )}
        >
          <ArkDialog.Backdrop style={{ '--backdrop-blur': local.blur != null ? `${local.blur}px` : undefined }} />
          <ArkDialog.Positioner>
            <ArkDialog.Content class={local.class} style={local.style}>
              {local.children}
            </ArkDialog.Content>
          </ArkDialog.Positioner>
        </div>
      </Portal>
    </ArkDialog.Root>
  )
};

PopupCom.CloseTrigger = (props: ArkDialog.CloseTriggerProps) => {
  return (
    <Show when={!props.children} fallback={<ArkDialog.CloseTrigger {...props} />}>
      <ArkDialog.CloseTrigger
        {...props}
        asChild={p => <Button {...p} variant="text" size="sm" icon={() => <Icon name="close" />} />}
      />
    </Show>
  )
}

PopupCom.Context = ArkDialog.Context
PopupCom.Title = ArkDialog.Title
PopupCom.Description = ArkDialog.Description

export const Popup: PopupComponent = PopupCom
