import type { Signal } from '@builder.io/qwik'
import { $, useSignal, useVisibleTask$ } from '@builder.io/qwik'

export function useHover<T extends HTMLElement = HTMLDivElement>(
  ref: Signal<T | undefined>,
) {
  const hover = useSignal(false)

  const onMouseEnter = $(() => hover.value = true)
  const onMouseLeave = $(() => hover.value = false)

  useVisibleTask$(({ cleanup }) => {

    if (ref.value) {
      ref.value.addEventListener('mouseenter', onMouseEnter)
      ref.value.addEventListener('mouseleave', onMouseLeave)

      cleanup(() => {
        ref.value?.removeEventListener('mouseenter', onMouseEnter)
        ref.value?.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  })

  return hover
}
