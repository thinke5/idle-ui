import type { FrameProps } from './types'
import {
  createEffect,
  createRoot,
  createSignal,
  onCleanup,
  onMount,
  children as resolveChildren,
} from 'solid-js'
import { delegateEvents, render } from 'solid-js/web'
import Content from './Content'
import { FrameContextProvider } from './Context'

function FrameComponent(props: FrameProps) {
  const [iframeLoaded, setIframeLoaded] = createSignal(false)
  let nodeRef: HTMLIFrameElement | undefined
  let _isMounted = false
  let loadCheckInterval: ReturnType<typeof setInterval> | undefined

  const resolvedChildren = resolveChildren(() => props.children)

  // Default props equivalent
  const style = () => props.style || {}
  const head = () => props.head || null
  const mountTarget = () => props.mountTarget
  const contentDidMount = () => props.contentDidMount || (() => {})
  const contentDidUpdate = () => props.contentDidUpdate || (() => {})
  const initialContent = () =>
    props.initialContent
    || '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'

  onMount(() => {
    _isMounted = true

    const doc = getDoc()

    if (doc && nodeRef) {
      nodeRef.contentWindow?.addEventListener('DOMContentLoaded', handleLoad)
    }
  })

  onCleanup(() => {
    _isMounted = false

    if (nodeRef) {
      nodeRef.removeEventListener('DOMContentLoaded', handleLoad)
    }

    if (loadCheckInterval) {
      clearInterval(loadCheckInterval)
    }

    if (renderDispose) {
      renderDispose()
    }
  })

  const getDoc = (): Document | null => {
    return nodeRef ? nodeRef.contentDocument : null
  }

  const getMountTarget = (): Element | null => {
    const doc = getDoc()
    if (!doc)
      return null

    if (mountTarget()) {
      return doc.querySelector(mountTarget()!)
    }

    // Try to find the frame-root div first
    const frameRoot = doc.querySelector('.frame-root')

    if (frameRoot)
      return frameRoot
    // Fall back to first body child
    return doc.body?.children[0] || null
  }

  const setRef = (node: HTMLIFrameElement) => {
    nodeRef = node

    if (typeof props.ref === 'function') {
      props.ref(node)
    }
  }

  const handleLoad = () => {
    if (loadCheckInterval) {
      clearInterval(loadCheckInterval)
    }
    // Bail update as some browsers will trigger on both DOMContentLoaded & onLoad ala firefox
    if (!iframeLoaded()) {
      setIframeLoaded(true)
    }
  }

  // In certain situations on a cold cache DOMContentLoaded never gets called
  // fallback to an interval to check if that's the case
  const loadCheck = () => {
    loadCheckInterval = setInterval(() => {
      handleLoad()
    }, 500)
  }

  let renderDispose: (() => void) | undefined

  const renderFrameContents = () => {
    if (!_isMounted)
      return null

    const doc = getDoc()
    if (!doc)
      return null

    const win = doc?.defaultView || (doc as any).parentView
    const mountTargetEl = getMountTarget()

    // Add null check - if no mount target, don't try to render
    if (!mountTargetEl) {
      // In testing environments, the iframe document might not be ready
      // We can either wait or skip rendering
      return null
    }

    // Clean up previous render
    if (renderDispose) {
      renderDispose()
    }

    // Only render if we have children
    // const children = resolvedChildren();
    // if (!children) return null;

    // Create new root for iframe context
    renderDispose = createRoot((dispose) => {
      const children = resolvedChildren()

      const contents = (
        <Content
          contentDidMount={contentDidMount()}
          contentDidUpdate={contentDidUpdate()}
        >
          <FrameContextProvider value={{ document: doc, window: win }}>
            <div class="frame-content">{children}</div>
          </FrameContextProvider>
        </Content>
      )

      // Render head content
      if (head()) {
        render(() => head(), doc.head)
      }

      // Render main content
      render(() => contents, mountTargetEl)

      delegateEvents(
        [
          'click',
          'dblclick',
          'contextmenu',
          'input',
          'change',
          'keydown',
          'keyup',
          'keypress',
          'mousedown',
          'mouseup',
          'mouseover',
          'mouseout',
          'mousemove',
          'mouseenter',
          'mouseleave',
          'touchstart',
          'touchend',
          'touchmove',
          'touchcancel',
          'focus',
          'blur',
          'focusin',
          'focusout',
          'submit',
          'reset',
          'drag',
          'dragstart',
          'dragend',
          'dragover',
          'dragenter',
          'dragleave',
          'drop',
          'scroll',
          'wheel',
          'load',
          'error',
        ],
        doc,
      )

      return dispose
    })

    return null
  }

  createEffect(() => {
    if (iframeLoaded()) {
      renderFrameContents()
    }
  })

  createEffect(() => {
    if (iframeLoaded()) {
      // Start load check as fallback - matching React's behavior
      loadCheck()
    }
  })

  // Create props object excluding Frame-specific props
  const createIframeProps = () => {
    const iframeProps: any = { ...props }
    iframeProps.srcDoc = initialContent()
    iframeProps.style = style()

    // Remove Frame-specific props
    delete iframeProps.children
    delete iframeProps.head
    delete iframeProps.initialContent
    delete iframeProps.mountTarget
    delete iframeProps.contentDidMount
    delete iframeProps.contentDidUpdate
    delete iframeProps.ref

    return iframeProps
  }

  return <iframe {...createIframeProps()} ref={setRef} onLoad={handleLoad} />
}

export { FrameComponent as Frame }

export default FrameComponent
