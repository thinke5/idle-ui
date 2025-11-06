import type { Dialog as ArkDialog } from '@ark-ui/solid/dialog'

export interface DialogProps extends Omit<ArkDialog.RootProps, 'open'> {
  /**
   * 对话框是否可见
   * @ignore
   */
  open?: boolean
}
