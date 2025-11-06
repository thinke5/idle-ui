import type { JSX } from 'solid-js'

const jsxLikeProps = ['children', 'props', 'type', 'key', 'ref']
const solidJsxProps = ['t', 'e', 'v']

/** 判断是否为solidjs的JSX元素 */
export function isJsxElement(el: JSX.Element): el is (Node | JSX.ArrayElement) {
  if (el === null || el === undefined) {
    return false
  }

  const type = typeof el

  // 字符串、数字、布尔值不是JSX元素
  if (type === 'string' || type === 'number' || type === 'boolean') {
    return false
  }

  // 函数组件返回的是JSX元素
  if (type === 'function') {
    return true
  }

  // 数组需要进一步检查
  if (Array.isArray(el)) {
    return true // el.length > 0 && el.some(item => isJsxElement(item))
  }

  // DOM节点是JSX元素
  // if (el instanceof Element) { // ssr 存在问题
  if ((el as any).nodeType > 0) {
    return true
  }

  // 检查是否为SolidJS的虚拟DOM对象
  if (typeof el === 'object') {
    // SolidJS的虚拟DOM通常有特定的属性
    if (solidJsxProps.some(prop => prop in el)) {
      return true
    }

    // 检查是否有常见的JSX属性

    return jsxLikeProps.some(prop => prop in el)
  }

  return false
}

/** 判断是否为单个JSX元素 */
export function isOneJsxElement(el: JSX.Element): el is Element {
  return isJsxElement(el) && !Array.isArray(el)
}
