import { $, useSignal, useVisibleTask$ } from '@builder.io/qwik'

export function useWindowScroll() {
  const x = useSignal(0)
  const y = useSignal(0)

  const updateScroll = $(() => {
    if (window) {
      x.value = window.scrollX
      y.value = window.scrollY
    }
  })

  useVisibleTask$(({ cleanup }) => {
    window.addEventListener('scroll', updateScroll, {
      capture: true,
      passive: true,
    })

    cleanup(() => window.removeEventListener('scroll', updateScroll))

    updateScroll()
  }, {
    strategy: 'intersection-observer',
  })

  return { x, y }
}
