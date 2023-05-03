import { $, useOnWindow, useSignal, useVisibleTask$ } from '@builder.io/qwik'

export interface UseWindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
  /**
   * Listen to window `orientationchange` event
   *
   * @default true
   */
  listenOrientation?: boolean

  /**
   * Whether the scrollbar should be included in the width and height
   * @default true
   */
  includeScrollbar?: boolean
}

export function useWindowSize(options: UseWindowSizeOptions = {}) {
  const {
    initialWidth = Infinity,
    initialHeight = Infinity,
    includeScrollbar = true,
  } = options

  const width = useSignal(initialWidth)
  const height = useSignal(initialHeight)

  const updateSize = $(() => {
    if (window) {
      if (includeScrollbar) {
        width.value = window.innerWidth
        height.value = window.innerHeight
      }
      else {
        width.value = document.documentElement.clientWidth
        height.value = document.documentElement.clientHeight
      }
    }
  })

  useOnWindow('resize', updateSize)

  useVisibleTask$(() => {
    updateSize()
  }, {
    strategy: 'intersection-observer',
  })

  return { width, height }
}
