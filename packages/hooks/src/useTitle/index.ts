import type { Signal } from '@builder.io/qwik'
import { useVisibleTask$ } from '@builder.io/qwik'
import { toSignal } from '../utils'

export function useTitle(
  title: Signal<string> | string,
) {
  const newTitle = toSignal(title)

  useVisibleTask$(({ track }) => {
    track(() => newTitle.value)
    document.title = newTitle.value
  }, {
    strategy: 'document-ready'
  })
}
