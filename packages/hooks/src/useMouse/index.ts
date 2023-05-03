import type { Signal } from '@builder.io/qwik'
import { useSignal, useVisibleTask$ } from '@builder.io/qwik'

export function useMouse<T extends HTMLElement = any>(
  ref: Signal<T | undefined>,
  options: { resetOnExit?: boolean } = { resetOnExit: false },
) {
  const x = useSignal(0)
  const y = useSignal(0)

  useVisibleTask$(({ track, cleanup }) => {
    track(() => ref.value)

    const setMousePosition = (event: MouseEvent) => {
      if (ref.value) {
        // @ts-expect-error
        const rect = event?.currentTarget?.getBoundingClientRect()

        x.value = Math.max(
          0,
          Math.round(event.pageX - rect.left - (window.pageXOffset || window.scrollX)),
        )

        y.value = Math.max(
          0,
          Math.round(event.pageY - rect.top - (window.pageYOffset || window.scrollY)),
        )
      }
      else {
        x.value = event.clientX
        y.value = event.clientY
      }
    }

    const element = ref.value ? ref.value : window

    element.addEventListener('mousemove', setMousePosition as any)
    if (options.resetOnExit)
      element.addEventListener('touchmove', setMousePosition as any)

    cleanup(() => {
      element.removeEventListener('mousemove', setMousePosition as any)
      if (options.resetOnExit)
        element.removeEventListener('touchmove', setMousePosition as any)
    })
  })

  return {
    x,
    y,
  }
}
