import type { Signal } from '@builder.io/qwik'
import { $, useSignal, useTask$ } from '@builder.io/qwik'
import { isBrowser, isServer } from '@builder.io/qwik/build'

export function useHover<T extends HTMLElement = HTMLDivElement>(
  ref: Signal<T | undefined>,
) {
  const hover = useSignal(false)

  const onMouseEnter = $(() => hover.value = true)
  const onMouseLeave = $(() => hover.value = false)

  useTask$(({ cleanup, track }) => {
    const element = track(() => ref.value)

    if (element) {
      element.addEventListener('mouseenter', onMouseEnter)
      element.addEventListener('mouseleave', onMouseLeave)

      cleanup(() => {
        element?.removeEventListener('mouseenter', onMouseEnter)
        element?.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  })

  return hover
}
