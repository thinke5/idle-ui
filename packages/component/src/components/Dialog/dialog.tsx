import type { DialogProps } from './interface'
import { Dialog as ArkDialog } from '@ark-ui/solid/dialog'
import { splitProps, Suspense } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useConfig } from '../ConfigProvider'
import { Icon } from '../Icon'

const splitPropsKeys = ['open', 'children'] satisfies (keyof DialogProps)[]

/** 对话框 */
export function Dialog(props: DialogProps) {
  const [local, others] = splitProps(props, splitPropsKeys)
  const config = useConfig()
  const prefixCls = config.getPrefixCls('dialog')
  return (
    <ArkDialog.Root {...others}>
      <ArkDialog.Trigger>Open Dialog</ArkDialog.Trigger>
      <Portal>
        <div class={prefixCls}>
          <ArkDialog.Backdrop />
          <ArkDialog.Positioner>
            <ArkDialog.Content>

              <ArkDialog.CloseTrigger>
                <Icon name="close" />
              </ArkDialog.CloseTrigger>
              <ArkDialog.Title>Dialog Title</ArkDialog.Title>
              <ArkDialog.Description>
                {local.children}
              </ArkDialog.Description>

            </ArkDialog.Content>
          </ArkDialog.Positioner>
        </div>
      </Portal>
    </ArkDialog.Root>
  )
};
