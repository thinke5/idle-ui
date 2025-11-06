/* solid-js/h 无法在服务器里运行，所以自行实现 ，有问题再说 */

import { createComponent, createContext, useContext } from 'solid-js'
import { createDynamic, Dynamic } from 'solid-js/web'

export const MDXContext = createContext(
  Object.create(null),
)

export const MDXProvider = (
  properties,
) => {
  const context = useContext(MDXContext)
  return createComponent(MDXContext.Provider, {
    get value () {
      return {
        ...context,
        ...properties.components,
      }
    },
    get children () {
      return properties.children
    },
  })
}

export const useMDXComponents = (
  components,
) => {
  const contextComponents = useContext(MDXContext)
  return { ...contextComponents, ...components }
}

function Fragment (props) {
  return props.children
}
function jsx (type, props) {
  return createDynamic(() => type, props)
  // return createComponent(Dynamic, { component: type, ...props })
  // return h(type, props)
}

export { Fragment, jsx, jsx as jsxDEV, jsx as jsxs }
