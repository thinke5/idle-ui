import type { ConfigProviderProps } from './interface'
import { createContext, useContext } from 'solid-js'

const defaultPrefixCls = 'idle'

export const DefaultConfigProviderProps: ConfigProviderProps = {
  rtl: false,
  prefixCls: defaultPrefixCls,
  // getPopupContainer: () => document.body,
  size: 'md',
  // focusLock: {
  //   modal: { autoFocus: true },
  //   drawer: { autoFocus: true },
  // },
}

export const ConfigContext = createContext<ConfigProviderProps & {
  getPrefixCls: (componentName: string, customPrefix?: string) => string
}>({
  getPrefixCls: (componentName, customPrefix) => `${customPrefix || defaultPrefixCls}-${componentName}`,
  ...DefaultConfigProviderProps,
})

export const useConfig = () => useContext(ConfigContext)
